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
const personas_jornada_1 = require("../../database/personas_jornada");
const firebase_1 = require("../../lib/firebase");
const jornada_1 = require("../../database/jornada");
const persona_1 = require("../../database/persona");
class PersonaJornadaController {
    constructor(configs, io) {
        this.configs = configs;
        this.firebaseAdmin = firebase_1.default.get();
    }
    crearPersonaJornada(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundJornda = yield jornada_1.Jornada.findOne({ where: { idJornadas: request.payload.idJornada } });
            const foundPersona = yield persona_1.Persona.findOne({ where: { idPersona: request.payload.idPersona } });
            const foundPersonaJornada = yield personas_jornada_1.PersonaJornada.findOne({ where: { idJornada: request.payload.idJornada, idPersona: request.payload.idPersona } });
            if (!foundJornda) {
                return response.response("La jornada con ese id no existe").code(400);
            }
            if (!foundPersona) {
                return response.response("La Persona con ese id no existe").code(400);
            }
            if (foundPersonaJornada) {
                return response.response("La Persona ya esta adherida a esa jornada").code(400);
            }
            const jornada = yield personas_jornada_1.PersonaJornada.create({
                idJornada: request.payload.idJornada,
                idPersona: request.payload.idPersona,
                idMedioTransporte: request.payload.idMedioTransporte,
                asistencia: request.payload.asistencia,
                direccionOrigen: request.payload.direccionOrigen,
                confirmacion: request.payload.confirmacion,
            });
            return jornada;
        });
    }
    eliminarPersonaJornada(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const exist = yield personas_jornada_1.PersonaJornada.findOne({ where: { idPersonaJornadas: request.params.id } });
            if (exist) {
                yield personas_jornada_1.PersonaJornada.destroy({ where: { idPersonaJornadas: request.params.id } });
                return exist;
            }
            else {
                return response.response().code(400);
            }
        });
    }
}
exports.default = PersonaJornadaController;
//# sourceMappingURL=persona-jornada-controller.js.map