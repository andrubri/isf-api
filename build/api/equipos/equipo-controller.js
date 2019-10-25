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
const usuario_1 = require("../../database/entidades/usuario");
const firebase_1 = require("../../lib/firebase");
const equipo_1 = require("../../database/entidades/equipo");
const equipo_persona_1 = require("../../database/entidades/equipo_persona");
const jornada_1 = require("../../database/entidades/jornada");
class EquipoController {
    constructor(configs, io) {
        this.configs = configs;
        this.firebaseAdmin = firebase_1.default.get();
    }
    obtenerEquipo(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield equipo_1.Equipo.findAll();
            return result || [];
        });
    }
    obtenerEquipoXId(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield equipo_1.Equipo.findOne({ where: { idEquipo: request.params.id } });
            return result;
        });
    }
    crearEquipo(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const exist = yield equipo_1.Equipo.findOne({ where: { nombre: request.payload.equipo.nombre } });
            if (!exist) {
                const act = yield equipo_1.Equipo.create({
                    nombre: request.payload.equipo.nombre,
                    descripcion: request.payload.equipo.descripcion,
                    categoria: request.payload.equipo.categoria,
                    estado: request.payload.equipo.estado,
                    provincia: request.payload.equipo.provincia,
                    ciudad: request.payload.equipo.ciudad,
                    fechaInicio: request.payload.equipo.fechaInicio,
                    fechaFin: request.payload.equipo.fechaFin
                });
                for (let item of request.payload.coordinadores) {
                    equipo_persona_1.EquipoPersona.create({
                        idPersona: item.idPersona,
                        idEquipo: act.idEquipo,
                        idRol: 2
                    });
                }
                return act;
            }
            else {
                return response.response("Ya existe una activdad con ese nombre").code(400);
            }
        });
    }
    actualizarEquipo(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const exist = yield equipo_1.Equipo.findOne({ where: { idEquipo: request.params.id } });
            if (exist) {
                try {
                    const [cont, act] = yield equipo_1.Equipo.update({
                        nombre: request.payload.equipo.nombre,
                        descripcion: request.payload.equipo.descripcion,
                        categoria: request.payload.equipo.categoria,
                        estado: request.payload.equipo.estado,
                        provincia: request.payload.equipo.provincia,
                        ciudad: request.payload.equipo.ciudad,
                        fechaInicio: request.payload.equipo.fechaInicio,
                        fechaFin: request.payload.equipo.fechaFin
                    }, { where: { idEquipo: request.params.id } });
                    for (let item of request.payload.coordinadores) {
                        yield equipo_persona_1.EquipoPersona.create({
                            idPersona: item.idPersona,
                            idEquipo: exist.idEquipo,
                            idRol: 2
                        });
                    }
                    const changedRow = yield equipo_1.Equipo.findOne({ where: { idEquipo: request.params.id } });
                    return changedRow;
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
    eliminarEquipo(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const exist = yield equipo_1.Equipo.findOne({ where: { idEquipo: request.params.id } });
            if (exist) {
                const [cont, act] = yield equipo_1.Equipo.update({
                    fechaFin: new Date(),
                }, { where: { idEquipo: request.params.id } });
                const changedRow = yield equipo_1.Equipo.findOne({ where: { idEquipo: request.params.id } });
                return changedRow;
            }
            else {
                return response.response().code(400);
            }
        });
    }
    obtenerCoordinadoresXId(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const exist = yield equipo_1.Equipo.findOne({ where: { idEquipo: request.params.id } });
            if (exist) {
                const coordinadores = [];
                const asignados = yield equipo_persona_1.EquipoPersona.findAll({ where: { idRol: 2, idEquipo: exist.idEquipo } });
                for (const asign of asignados) {
                    const user = yield usuario_1.Usuario.findOne({
                        where: {
                            fechaBaja: null,
                            idPersona: asign.idPersona
                        }
                    });
                    const item = {};
                    item.idEquipoPersona = asign.idEquipoPersona;
                    coordinadores.push(item);
                }
                return yield coordinadores;
            }
            else {
                return response.response().code(400);
            }
        });
    }
    obtenerVoluntariosXId(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const exist = yield equipo_1.Equipo.findOne({ where: { idEquipo: request.params.id } });
            if (exist) {
                const asignados = yield equipo_persona_1.EquipoPersona.findAll({ where: { idRol: 1, idEquipo: exist.idEquipo } });
                return asignados;
            }
            else {
                return response.response().code(400);
            }
        });
    }
    obtenerJornadasXId(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const exist = yield equipo_1.Equipo.findOne({ where: { idEquipo: request.params.id } });
            if (exist) {
                const jornadas = yield jornada_1.Jornada.findAll({ where: { idEquipo: exist.idEquipo } });
                return jornadas;
            }
            else {
                return response.response().code(400);
            }
        });
    }
}
exports.default = EquipoController;
//# sourceMappingURL=equipo-controller.js.map