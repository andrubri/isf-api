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
const firebase_1 = require("../../lib/firebase");
const actividad_1 = require("../../database/actividad");
class ActividadController {
    constructor(configs, io) {
        this.configs = configs;
        this.firebaseAdmin = firebase_1.default.get();
    }
    obtenerActividad(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield actividad_1.Actividad.findAll({
                where: { fechaBaja: null },
            });
            return result || [];
        });
    }
    obtenerActividadXId(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield actividad_1.Actividad.findOne({ where: { fechaBaja: null, idActividad: request.params.id } });
            return result;
        });
    }
    crearActividad(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const exist = yield actividad_1.Actividad.findOne({ where: { nombre: request.payload.nombre } });
            if (!exist) {
                const act = yield actividad_1.Actividad.create({
                    nombre: request.payload.nombre,
                    direccion: request.payload.direccion,
                    idLocalidad: request.payload.idLocalidad,
                });
                return act;
            }
            else {
                return response.response("Ya existe una activdad con ese nombre").code(400);
            }
        });
    }
    actualizarActividad(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const exist = yield actividad_1.Actividad.findOne({ where: { fechaBaja: null, idActividad: request.params.id } });
            if (exist) {
                try {
                    const [cont, act] = yield actividad_1.Actividad.update({
                        direccion: request.payload.direccion,
                        idLocaliad: request.payload.idLocalidad,
                        nombre: request.payload.nombre,
                    }, { where: { idActividad: request.params.id } });
                    return act;
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
    eliminarActividad(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const exist = yield actividad_1.Actividad.findOne({ where: { fechaBaja: null, idActividad: request.params.id } });
            if (exist) {
                const [cont, act] = yield actividad_1.Actividad.update({
                    fechaBaja: new Date(),
                }, { where: { idActividad: request.params.id } });
                return act;
            }
            else {
                return response.response().code(400);
            }
        });
    }
}
exports.default = ActividadController;
//# sourceMappingURL=actividad-controller.js.map