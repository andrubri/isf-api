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
const jornada_1 = require("../../database/jornada");
const firebase_1 = require("../../lib/firebase");
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
    crearJornada(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const exist = yield jornada_1.Jornada.findOne({ where: { idJornada: request.payload.id } });
            if (!exist) {
                const jornadaFireBase = yield this.firebaseAdmin.auth().createJornada({
                    descripcion: request.payload.descripcion,
                    fecha: request.payload.fecha,
                    direccion: request.payload.direccion,
                    idActividad: request.payload.idActividad,
                });
                const Jornada = yield Jornada.create({
                    descripcion: request.payload.descripcion,
                    fecha: request.payload.fecha,
                    direccion: request.payload.direccion,
                    idActividad: request.payload.idActividad,
                });
                return Jornada;
            }
            else {
                return response.response("El Jornada ya existe").code(400);
            }
        });
    }
    actualizarJornada(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const exist = yield jornada_1.Jornada.findOne({ where: { idJornada: request.params.id } });
            if (exist) {
                try {
                    const [cont, Jornada] = yield Jornada.update({
                        descripcion: request.payload.descripcion,
                        fecha: request.payload.fecha,
                        idActividad: request.payload.idActividad,
                        direccion: request.payload.direccion,
                    }, { where: { idJornada: request.params.id } });
                    return yield Jornada.findOne({ where: { idJornada: request.params.id } });
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
            const exist = yield jornada_1.Jornada.findOne({ where: { idJornada: request.params.id } });
            if (exist) {
                const [cont, Jornada] = yield Jornada.update({
                    fechaBaja: new Date()
                }, { where: { idJornada: request.params.id } });
                return yield Jornada.findOne({ where: { idJornada: request.params.id } });
            }
            else {
                return response.response().code(400);
            }
        });
    }
}
exports.default = JornadaController;
//# sourceMappingURL=jornada-controller.js.map