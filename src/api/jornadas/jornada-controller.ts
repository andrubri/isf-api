import * as admin from "firebase-admin";
import * as Hapi from "hapi";
import * as socketio from "socket.io";
import {IServerConfigurations} from "../../configurations";
import {Jornada} from "../../database/entidades/jornada";
import {IRequest, IReqJornada, IReqVoluntario, IReqConfirmacion, IReqConfirExt} from "../../interfaces/request";
import FirebaseAdmin from "../../lib/firebase";
import UpdateRequest = admin.auth.UpdateRequest;
import {PersonaJornada} from "../../database/entidades/personas_jornada";
import {Persona} from "../../database/entidades/persona";
import {Equipo} from "../../database/entidades/equipo";
import {EquipoPersona} from "../../database/entidades/equipo_persona";
import {HashConfirmacion} from "../../database/entidades/hashConfirmacion";
import {DatosSeguro} from "../../database/entidades/datosSeguro";
import {ContactoEmergencia} from "../../database/entidades/contactoEmergencia";
import {MedioTransporte} from "../../database/entidades/medioTransporte";
import {Rol} from "../../database/entidades/rol";

export default class JornadaController {
    private configs: IServerConfigurations;
    private firebaseAdmin: any;

    constructor(configs: IServerConfigurations, io: socketio.Server) {
        this.configs = configs;

        this.firebaseAdmin = FirebaseAdmin.get();
    }

    public async obtenerJornadas(request: IRequest, response: Hapi.ResponseToolkit): Promise<Jornada[]> {
        const result: Jornada[] = await Jornada.findAll();
        return result;
    }

    public async obtenerJornadasXId(request: IRequest, response: Hapi.ResponseToolkit): Promise<Jornada> {
        const result: Jornada = await Jornada.findOne({where: {idJornadas: request.params.id}});
        return result;
    }

    public async crearJornada(request: IReqJornada, response: Hapi.ResponseToolkit) {
        if (true) {
            const jornada: Jornada = await Jornada.create({
                descripcion: request.payload.descripcion,
                fecha: request.payload.fecha,
                direccion: request.payload.direccion,
                idEquipo: request.payload.idEquipo,
            });

            return jornada;
        } else {
            return response.response("El Jornada ya existe").code(400);
        }
    }


    public async actualizarJornada(request: IReqJornada, response: Hapi.ResponseToolkit) {
        const exist: Jornada = await Jornada.findOne({where: {idJornadas: request.params.id}});
        if (exist) {
            try {
                const [cont, jornada] = await Jornada.update({
                    descripcion: request.payload.descripcion,
                    fecha: request.payload.fecha,
                    idEquipo: request.payload.idEquipo,
                    direccion: request.payload.direccion,
                }, {where: {idJornadas: request.params.id}});


                return await Jornada.findOne({where: {idJornadas: request.params.id}});
            } catch (e) {
                return e;
            }
        } else {
            return response.response().code(400);
        }
    }

    public async eliminarJornada(request: IRequest, response: Hapi.ResponseToolkit) {
        const exist: Jornada = await Jornada.findOne({where: {idJornadas: request.params.id}});
        if (exist) {
            await Jornada.destroy({where: {idJornadas: request.params.id}});

            return exist;
        } else {
            return response.response().code(400);
        }
    }

    public async obtenerPersonasXId(request: IRequest, response: Hapi.ResponseToolkit): Promise<PersonaJornada[]> {

        const result = await PersonaJornada.findAll({
            where: {idJornada: request.params.id},
            include: [{
                model: Jornada,
                required: true
            }, {
                model: Persona,
                required: true,
            }, {
                model: MedioTransporte,
                required: false
            }],
        });
        return result;
    }

    public async addPersonas(request: IReqVoluntario, response: Hapi.ResponseToolkit) {
        const exist: Jornada = await Jornada.findOne({where: {idJornadas: request.params.id}});
        const existPer: Persona = await Persona.findOne({where: {idPersona: request.payload.idPersona}});
        if (exist && existPer) {
            const existRel: PersonaJornada = await PersonaJornada.findOne({
                where: {
                    idPersona: existPer.idPersona,
                    idJornada: exist.idJornadas
                }
            });
            if (!existRel) {
                const voluntario: PersonaJornada = new PersonaJornada({
                    idJornada: exist.idJornadas,
                    idPersona: request.payload.idPersona
                });
                await voluntario.save();

                return voluntario;
            } else {
                return response.response("Ya se encuentra confirmado el voluntario").code(400);
            }
        } else {
            return response.response().code(400);
        }
    }

    public async editPersonas(request: IReqConfirmacion, response: Hapi.ResponseToolkit) {
        const exist: Jornada = await Jornada.findOne({where: {idJornadas: request.params.id}});
        if (exist) {
            const voluntario: PersonaJornada = await PersonaJornada.findOne({
                where: {
                    idJornada: exist.idJornadas,
                    idPersona: request.payload.idPersona
                }
            });

            voluntario.confirmacion = (request.payload.confirmacion) ? 'true' : 'false';

            await voluntario.save();

            return voluntario;
        } else {
            return response.response().code(400);
        }
    }

    public async getPersonasHash(request: IRequest, response: Hapi.ResponseToolkit) {
        const exist: HashConfirmacion = await HashConfirmacion.findOne({where: {idHashConfirmacion: request.params.id}});
        if (exist) {
            if (!exist.fechaConfirmacion) {
                const voluntario: Persona = await Persona.findOne({
                    where: {idPersona: exist.idPersona},
                    include: [{model: DatosSeguro, required: false}, {model: ContactoEmergencia, required: false}]
                });
                const jornada: Jornada = await Jornada.findOne({where: {idJornadas: exist.idJornada}});
                const medioTransporte: MedioTransporte[] = await MedioTransporte.findAll();

                return {voluntario, jornada, medioTransporte};
            } else {
                return response.response("El codigo de confirmacion ya fue utilizado").code(400);
            }
        } else {
            return response.response("No es valido el codigo de confirmacion").code(400);
        }
    }

    public async setPersonasHash(request: IReqConfirExt, response: Hapi.ResponseToolkit) {
        const exist: HashConfirmacion = await HashConfirmacion.findOne({where: {idHashConfirmacion: request.params.id}});
        if (exist) {
            const voluntario: PersonaJornada = new PersonaJornada({
                idJornada: exist.idJornada,
                idPersona: exist.idPersona,
                lugaresLibres: request.payload.espacioLibre,
                idMedioTransporte: request.payload.idMedioTransporte,
                coordenadasOrigen: request.payload.coordenadas,
                direccionOrigen: request.payload.direccion
            });
            await voluntario.save();

            await ContactoEmergencia.update({
                nombre: request.payload.nombreEmergencia,
                apellido: request.payload.apellidoEmergencia,
                telefono: request.payload.telefonoEmergencia,
                relacion: request.payload.relacionEmergencia
            }, {where: {idPersona: exist.idPersona}});

            await HashConfirmacion.update({fechaConfirmacion: new Date()}, {where: {idHashConfirmacion: request.params.id}});

            return {voluntario};
        } else {
            return response.response("No es valido el hash").code(400);
        }
    }
}
