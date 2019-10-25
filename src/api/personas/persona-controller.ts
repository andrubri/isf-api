import * as admin from "firebase-admin";
import * as Hapi from "hapi";
import * as socketio from "socket.io";
import {IServerConfigurations} from "../../configurations";
import {Persona} from "../../database/entidades/persona";
import {OrigenContacto} from "../../database/entidades/origenContacto";
import {ContactoEmergencia} from "../../database/entidades/contactoEmergencia";
import {DatosSeguro} from "../../database/entidades/datosSeguro";
import {ObraSocial} from "../../database/entidades/obraSocial";
import {IRequest, IReqPersona} from "../../interfaces/request";
import FirebaseAdmin from "../../lib/firebase";
import UpdateRequest = admin.auth.UpdateRequest;
import {personaSchema} from "./persona-validator";
import {Usuario} from "../../database/entidades/usuario";

export default class PersonaController {
    private configs: IServerConfigurations;
    private firebaseAdmin: any;

    constructor(configs: IServerConfigurations, io: socketio.Server) {
        this.configs = configs;

        this.firebaseAdmin = FirebaseAdmin.get();
    }

    public async obtenerPersonas(request: IRequest, response: Hapi.ResponseToolkit): Promise<Persona[]> {
        const result: Persona[] = await Persona.findAll();
        return result;
    }


    public async crearPersona(request: IReqPersona, response: Hapi.ResponseToolkit) {
        const {error, value} = personaSchema.validate(request.payload);
        if (!error) {
            const persona: Persona = await Persona.create({
                nombre: request.payload.persona.nombre,
                apellido: request.payload.persona.apellido,
                idExterno: request.payload.persona.idExterno,
                tipoDocumento: request.payload.persona.tipoDocumento,
                idDocumento: request.payload.persona.idDocumento,
                paisOrigen: request.payload.persona.paisOrigen,
                paisResidencia: request.payload.persona.paisResidencia,
                provinciaResidencia: request.payload.persona.provinciaResidencia,
                ciudadResidencia: request.payload.persona.ciudadResidencia,
                telefono: request.payload.persona.telefono,
                email: request.payload.persona.email,
                nivelEstudios: request.payload.persona.nivelEstudios,
                carrera: request.payload.persona.carrera,
                universidad: request.payload.persona.universidad,
                ocupacion: request.payload.persona.ocupacion,
                comentarios: request.payload.persona.comentarios,
                estado: request.payload.persona.estado,
                dieta: request.payload.persona.dieta,
                fechaNacimiento: request.payload.persona.fechaNacimiento,
                idOrigenContacto: request.payload.persona.idOrigenContacto,
            });

            const origenContacto: OrigenContacto = await OrigenContacto.create({
                descripcion: request.payload.origenContacto.descripcion,
            });
            const contactoEmergencia: ContactoEmergencia = await ContactoEmergencia.create({
                idPersona: persona.idPersona,
                nombre: request.payload.contactoEmergencia.nombre,
                apellido: request.payload.contactoEmergencia.apellido,
                relacion: request.payload.contactoEmergencia.relacion,
                telefono: request.payload.contactoEmergencia.telefono
            });
            const datosSeguro: DatosSeguro = await DatosSeguro.create({
                idObraSocial: request.payload.datosSeguro.idObraSocial,
                emfermedades: request.payload.datosSeguro.emfermedades,
                grupoSanguineo: request.payload.datosSeguro.grupoSanguineo,
                medicaciones: request.payload.datosSeguro.medicaciones
            });

            const obraSocial: ObraSocial = await ObraSocial.create({
                empresa: request.payload.obraSocial.empresa,
                plan: request.payload.obraSocial.plan,
            });


            return {
                persona: persona,
                datosSeguro: datosSeguro,
                obraSocial: obraSocial,
                origenContacto: origenContacto,
                contactoEmergencia: contactoEmergencia
            };
        } else {
            return response.response(error.message).message("No se encontro request de persona").code(400);
        }
    }


    public async actualizarPersona(request: IReqPersona, response: Hapi.ResponseToolkit) {
        const exist: Persona = await Persona.findOne({where: {idPersona: request.params.id}});
        if (exist) {
            try {
                const [cont, persona] = await Persona.update({
                    nombre: request.payload.persona.nombre,
                    apellido: request.payload.persona.apellido,
                    idExterno: request.payload.persona.idExterno,
                    tipoDocumento: request.payload.persona.tipoDocumento,
                    idDocumento: request.payload.persona.idDocumento,
                    paisOrigen: request.payload.persona.paisOrigen,
                    paisResidencia: request.payload.persona.paisResidencia,
                    provinciaResidencia: request.payload.persona.provinciaResidencia,
                    ciudadResidencia: request.payload.persona.ciudadResidencia,
                    telefono: request.payload.persona.telefono,
                    email: request.payload.persona.email,
                    nivelEstudios: request.payload.persona.nivelEstudios,
                    carrera: request.payload.persona.carrera,
                    universidad: request.payload.persona.universidad,
                    ocupacion: request.payload.persona.ocupacion,
                    comentarios: request.payload.persona.comentarios,
                    estado: request.payload.persona.estado,
                    dieta: request.payload.persona.dieta,
                    fechaNacimiento: request.payload.persona.fechaNacimiento,
                    idOrigenContacto: request.payload.persona.idOrigenContacto,
                }, {where: {idPersona: request.params.id}});

                const [contE, contactoEmergencia] = await ContactoEmergencia.update({
                    nombre: request.payload.contactoEmergencia.nombre,
                    apellido: request.payload.contactoEmergencia.apellido,
                    telefono: request.payload.contactoEmergencia.telefono,
                    relacion: request.payload.contactoEmergencia.relacion,
                }, {where: {idPersona: request.params.id}});

                const [contD, datosSeguro] = await DatosSeguro.update({
                    grupoSanguineo: request.payload.datosSeguro.grupoSanguineo,
                    emfermedades: request.payload.datosSeguro.emfermedades,
                    medicaciones: request.payload.datosSeguro.medicaciones,
                    idObraSocial: request.payload.datosSeguro.idObraSocial,
                }, {where: {idPersona: request.params.id}});

                const [contO, obraSocial] = await ObraSocial.update({
                    empresa: request.payload.obraSocial.empresa,
                    plan: request.payload.obraSocial.plan,
                }, {where: {idObraSocial: datosSeguro[0].idObraSocial}});

                const [contC, origenContacto] = await ObraSocial.update({
                    descripcion: request.payload.origenContacto.descripcion,
                }, {where: {idOrigenContacto: persona[0].idOrigenContacto}});


                return await Persona.findOne({where: {idPersona: request.params.id}});
            } catch (e) {
                return e;
            }
        } else {
            return response.response().code(400);
        }
    }

    public async eliminarPersona(request: IRequest, response: Hapi.ResponseToolkit) {
        const exist: Persona = await Persona.findOne({where: {idPersona: request.params.id}});
        if (exist) {
            await Persona.destroy({where: {idPersona: request.params.id}});
            return exist;
        } else {
            return response.response().code(400);
        }
    }

    public async obtenerCoordinador(request: IRequest, response: Hapi.ResponseToolkit) {
        const result: Persona[] = await Persona.findAll({
                include: [{model: Usuario, required: true}]
            }
        );

        return result;
    }
}
