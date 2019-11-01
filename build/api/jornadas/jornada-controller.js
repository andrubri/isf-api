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
const jornada_1 = require("../../database/entidades/jornada");
const firebase_1 = require("../../lib/firebase");
const personas_jornada_1 = require("../../database/entidades/personas_jornada");
const persona_1 = require("../../database/entidades/persona");
class JornadaController {
    constructor(configs, io) {
        this.configs = configs;
        this.firebaseAdmin = firebase_1.default.get();
    }
    obtenerJornadas(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield jornada_1.Jornada.findAll();
            return result;
        });
    }
    obtenerJornadasXId(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield jornada_1.Jornada.findOne({ where: { idJornadas: request.params.id } });
            return result;
        });
    }
    crearJornada(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            if (true) {
                const jornada = yield jornada_1.Jornada.create({
                    descripcion: request.payload.descripcion,
                    fecha: request.payload.fecha,
                    direccion: request.payload.direccion,
                    idEquipo: request.payload.idEquipo,
                });
                return jornada;
            }
            else {
                return response.response("El Jornada ya existe").code(400);
            }
        });
    }
    actualizarJornada(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const exist = yield jornada_1.Jornada.findOne({ where: { idJornadas: request.params.id } });
            if (exist) {
                try {
                    const [cont, jornada] = yield jornada_1.Jornada.update({
                        descripcion: request.payload.descripcion,
                        fecha: request.payload.fecha,
                        idEquipo: request.payload.idEquipo,
                        direccion: request.payload.direccion,
                    }, { where: { idJornadas: request.params.id } });
                    return yield jornada_1.Jornada.findOne({ where: { idJornadas: request.params.id } });
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
    eliminarJornada(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const exist = yield jornada_1.Jornada.findOne({ where: { idJornadas: request.params.id } });
            if (exist) {
                yield jornada_1.Jornada.destroy({ where: { idJornadas: request.params.id } });
                return exist;
            }
            else {
                return response.response().code(400);
            }
        });
    }
    obtenerPersonasXId(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield persona_1.Persona.findAll({
                include: [{
                        model: jornada_1.Jornada,
                        through: { where: { idJornada: request.params.id } },
                        required: true
                    }],
            });
            return result;
        });
    }
    addPersonas(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const exist = yield jornada_1.Jornada.findOne({ where: { idJornadas: request.params.id } });
            if (exist) {
                const voluntario = new personas_jornada_1.PersonaJornada({
                    idJornada: exist.idJornadas,
                    idPersona: request.payload.idPersona
                });
                yield voluntario.save();
                return voluntario;
            }
            else {
                return response.response().code(400);
            }
        });
    }
    editPersonas(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const exist = yield jornada_1.Jornada.findOne({ where: { idJornadas: request.params.id } });
            if (exist) {
                const voluntario = yield personas_jornada_1.PersonaJornada.findOne({ where: { idJornada: exist.idJornadas, idPersona: request.payload.idPersona } });
                voluntario.confirmacion = (request.payload.confirmacion) ? 'true' : 'false';
                yield voluntario.save();
                return voluntario;
            }
            else {
                return response.response().code(400);
            }
        });
    }
    addPersonasHash(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const exist = yield jornada_1.Jornada.findOne({ where: { idJornadas: request.params.id } });
            if (exist) {
                const voluntario = new personas_jornada_1.PersonaJornada({
                    idJornada: exist.idJornadas,
                    idPersona: request.params.hash,
                });
                yield voluntario.save();
                return voluntario;
            }
            else {
                return response.response().code(400);
            }
        });
    }
}
exports.default = JornadaController;
//# sourceMappingURL=jornada-controller.js.map