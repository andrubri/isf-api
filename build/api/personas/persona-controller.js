"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const persona_1 = require("../../database/persona");
const origenContacto_1 = require("../../database/origenContacto");
const contactoEmergencia_1 = require("../../database/contactoEmergencia");
const datosSeguro_1 = require("../../database/datosSeguro");
const obraSocial_1 = require("../../database/obraSocial");
const firebase_1 = require("../../lib/firebase");
class PersonaController {
    constructor(configs, io) {
        this.configs = configs;
        this.firebaseAdmin = firebase_1.default.get();
    }
    obtenerPersonas(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield persona_1.Persona.findAll();
            return result;
        });
    }
    crearPersona(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            //const exist: Persona = await Persona.findOne({where: {idPersona: request.payload.id}});
            if (true) {
                /* const personaFireBase: any = await this.firebaseAdmin.auth().createPersona({
                    descripcion: request.payload.descripcion,
                    fecha: request.payload.fecha,
                    direccion: request.payload.direccion,
                    idEquipo: request.payload.idEquipo,
                }); */
                const persona = yield persona_1.Persona.create({
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
                const origenContacto = yield origenContacto_1.OrigenContacto.create({
                    descripcion: request.payload.origenContacto.descripcion,
                });
                const contactoEmergencia = yield contactoEmergencia_1.ContactoEmergencia.create({
                    idPersona: request.payload.contactoEmergencia.idPersona,
                    nombre: request.payload.contactoEmergencia.nombre,
                    apellido: request.payload.contactoEmergencia.apellido,
                    relacion: request.payload.contactoEmergencia.relacion,
                    telefono: request.payload.contactoEmergencia.telefono
                });
                const datosSeguro = yield datosSeguro_1.DatosSeguro.create({
                    idObraSocial: request.payload.datosSeguro.idObraSocial,
                    emfermedades: request.payload.datosSeguro.emfermedades,
                    grupoSanguineo: request.payload.datosSeguro.grupoSanguineo,
                    medicaciones: request.payload.datosSeguro.medicaciones
                });
                const obraSocial = yield obraSocial_1.ObraSocial.create({
                    empresa: request.payload.obraSocial.empresa,
                    plan: request.payload.obraSocial.plan,
                });
                return {
                    persona: persona,
                    datosSeguro: datosSeguro,
                    obraSocial: obraSocial,
                    origenContacto: origenContacto
                };
            }
            else {
                return response.response("El Persona ya existe").code(400);
            }
        });
    }
    actualizarPersona(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const exist = yield persona_1.Persona.findOne({ where: { idPersona: request.params.id } });
            if (exist) {
                try {
                    const [cont, persona] = yield persona_1.Persona.update({
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
                    }, { where: { idPersona: request.params.id } });
                    return yield persona_1.Persona.findOne({ where: { idPersona: request.params.id } });
                }
                catch (e) {
                    return e;
                }
            }
            else {
                return response.response().code(400);
            }
        });
    }
    eliminarPersona(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const exist = yield persona_1.Persona.findOne({ where: { idPersona: request.params.id } });
            if (exist) {
                /*  const [cont, persona] = await Persona.update({
                     fechaBaja: new Date()
                 }, {where: {idPersona: request.params.id}});
      */
                yield persona_1.Persona.destroy({ where: { idPersona: request.params.id } });
                return exist;
                //return await Persona.findOne({where: {idPersona: request.params.id}});
            }
            else {
                return response.response().code(400);
            }
        });
    }
}
exports.default = PersonaController;
//# sourceMappingURL=persona-controller.js.map