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


    public async obtenerOrigenContacto(request: IRequest, response: Hapi.ResponseToolkit): Promise<any> {
        return await OrigenContacto.findAll();
    }

    public async obtenerObraSocial(request: IRequest, response: Hapi.ResponseToolkit): Promise<any> {
        return await ObraSocial.findAll();
    }

    public async obtenerPersonaXId(request: IRequest, response: Hapi.ResponseToolkit): Promise<any> {
        const persona: Persona = await Persona.findOne({
            where: {idPersona: request.params.id},
            include: [{model: ContactoEmergencia, required: false}, {model: DatosSeguro, required: false}]
        });

        return persona;
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
                coordenadasResidencia: request.payload.persona.coordenadasResidencia,
                direccionResidencia: request.payload.persona.direccionResidencia,
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


            await ContactoEmergencia.create({
                idPersona: persona.idPersona,
                nombre: request.payload.persona.nombreContacto,
                apellido: request.payload.persona.apellidoContacto,
                relacion: request.payload.persona.relacion,
                telefono: request.payload.persona.telefonoContacto
            });

            await DatosSeguro.create({
                idPersona: persona.idPersona,
                idObraSocial: request.payload.persona.idObraSocial,
                emfermedades: request.payload.persona.emfermedades,
                grupoSanguineo: request.payload.persona.grupoSanguineo,
                medicaciones: request.payload.persona.medicaciones
            });

            return {persona};
        } else {
            return response.response(error.message).message("No se encontro request de persona").code(400);
        }
    }

    public async crearPersonaExterno(request: IReqPersona, response: Hapi.ResponseToolkit) {
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
                estado: "Inscripto",
                fechaNacimiento: request.payload.persona.fechaNacimiento,
            });

            return {
                persona: persona,
            };
        } else {
            return response.response(error.message).message("No se encontro request de persona").code(400);
        }
    }

    public async actualizarPersona(request: IReqPersona, response: Hapi.ResponseToolkit) {
        const exist: Persona = await Persona.findOne({where: {idPersona: request.params.id}});
        if (exist) {
            try {

                await Persona.update({
                    nombre: request.payload.persona.nombre,
                    apellido: request.payload.persona.apellido,
                    idExterno: request.payload.persona.idExterno,
                    tipoDocumento: request.payload.persona.tipoDocumento,
                    idDocumento: request.payload.persona.idDocumento,
                    paisOrigen: request.payload.persona.paisOrigen,
                    paisResidencia: request.payload.persona.paisResidencia,
                    coordenadasResidencia: request.payload.persona.coordenadasResidencia,
                    direccionResidencia: request.payload.persona.direccionResidencia,
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

                await this.actualizarUsuario(request);

                await ContactoEmergencia.update({
                    nombre: request.payload.persona.nombreContacto,
                    apellido: request.payload.persona.apellidoContacto,
                    telefono: request.payload.persona.telefonoContacto,
                    relacion: request.payload.persona.relacion,
                }, {where: {idPersona: request.params.id}});

                await DatosSeguro.update({
                    grupoSanguineo: request.payload.persona.grupoSanguineo,
                    emfermedades: request.payload.persona.emfermedades,
                    medicaciones: request.payload.persona.medicaciones,
                    idObraSocial: request.payload.persona.idObraSocial,
                }, {where: {idPersona: request.params.id}});

                return await Persona.findOne({where: {idPersona: request.params.id}});
            } catch (e) {
                return await Persona.findOne({where: {idPersona: request.params.id}});
            }
        } else {
            return response.response().code(400);
        }
    }

    public async eliminarPersona(request: IRequest, response: Hapi.ResponseToolkit) {
        const exist: Persona = await Persona.findOne({where: {idPersona: request.params.id}});
        if (exist) {
            await this.eliminarUsuario(request);
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


    private async actualizarUsuario(request) {
        const exist: Usuario = await Usuario.findOne({where: {idPersona: request.params.id}});
        if (exist) {
            try {
                const [cont, User] = await Usuario.update({
                    apellido: request.payload.persona.apellido,
                    email: request.payload.persona.email,
                    nombre: request.payload.persona.nombre,
                }, {where: {idPersona: request.params.id}});

                const fireData: UpdateRequest = {
                    displayName: request.payload.persona.nombre,
                    email: request.payload.persona.email,
                    emailVerified: false,
                };
                await this.firebaseAdmin.auth().updateUser(request.params.id, fireData);

                return await Usuario.findOne({where: {fechaBaja: null, token: request.params.id}});
            } catch (e) {
                return e;
            }

        }
    }

    public async eliminarUsuario(request) {
        const exist: Usuario = await Usuario.findOne({where: {idPersona: request.params.id}});
        if (exist) {
            const [cont, user] = await Usuario.update({
                fechaBaja: new Date()
            }, {where: {idPersona: request.params.id}});

            const fireData: UpdateRequest = {
                disabled: true,
            };

            await this.firebaseAdmin.auth().updateUser(exist.token, fireData);

            return await Usuario.findOne({where: {token: request.params.id}});
        } else {

        }
    }


}
