import * as admin from "firebase-admin";
import * as Hapi from "hapi";
import * as socketio from "socket.io";
import {IServerConfigurations} from "../../configurations";
import {Jornada} from "../../database/entidades/jornada";
import {IRequest, IReqJornada, IReqVoluntario, IReqConfirmacion} from "../../interfaces/request";
import FirebaseAdmin from "../../lib/firebase";
import UpdateRequest = admin.auth.UpdateRequest;
import {PersonaJornada} from "../../database/entidades/personas_jornada";
import {Persona} from "../../database/entidades/persona";
import {Equipo} from "../../database/entidades/equipo";
import {EquipoPersona} from "../../database/entidades/equipo_persona";

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

    public async obtenerPersonasXId(request: IRequest, response: Hapi.ResponseToolkit): Promise<Persona[]> {
       
        const result = await Persona.findAll({
            include: [{
                model: Jornada,
                through: { where: { idJornada: request.params.id } },
                required: true
            }],
        });
        return result;
    }

    public async addPersonas(request: IReqVoluntario, response: Hapi.ResponseToolkit) {
        const exist: Jornada = await Jornada.findOne({where: {idJornadas: request.params.id}});
        if (exist) {
            const voluntario: PersonaJornada = new PersonaJornada({
                idJornada: exist.idJornadas,
                idPersona: request.payload.idPersona
            });
            await voluntario.save();

            return voluntario;
        } else {
            return response.response().code(400);
        }
    }

    public async editPersonas(request: IReqConfirmacion, response: Hapi.ResponseToolkit) {
        const exist: Jornada = await Jornada.findOne({where: {idJornadas: request.params.id}});
        if (exist) {
            const voluntario: PersonaJornada = await PersonaJornada.findOne({where: {idJornada: exist.idJornadas, idPersona: request.payload.idPersona}});

            voluntario.confirmacion = (request.payload.confirmacion) ? 'true' : 'false';

            await voluntario.save();

            return voluntario;
        } else {
            return response.response().code(400);
        }
    }

    public async addPersonasHash(request: IRequest, response: Hapi.ResponseToolkit) {
        const exist: Jornada = await Jornada.findOne({where: {idJornadas: request.params.id}});
        if (exist) {
            const voluntario: PersonaJornada = new PersonaJornada({
                idJornada: exist.idJornadas,
                idPersona: request.params.hash,
            });
            await voluntario.save();

            return voluntario;
        } else {
            return response.response().code(400);
        }
    }
}
