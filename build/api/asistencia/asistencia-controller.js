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
const asistencia_1 = require("../../database/asistencia");
const estado_1 = require("../../database/estado");
const socio_1 = require("../../database/socio");
const usuario_1 = require("../../database/usuario");
const tipoasistencia_1 = require("../../database/tipoasistencia");
class AsistenciaController {
    constructor(configs, io) {
        this.configs = configs;
        this.firebaseAdmin = firebase_1.default.get();
    }
    obtenerAll(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield asistencia_1.Asistencia.findAll({ where: { fechaBaja: null }, include: [{ model: estado_1.Estado, required: true }, { model: socio_1.Socio, required: true }] });
            return result;
        });
    }
    obtenerSocioXId(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield asistencia_1.Asistencia.findOne({ where: { idAsistencia: request.params.id, fechaBaja: null },
                include: [{ model: estado_1.Estado, required: true }, { model: socio_1.Socio, required: true }] });
            return result;
        });
    }
    obtenerEstados(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield estado_1.Estado.findAll({ where: { familiaEstado: 'ASI' } });
            return result;
        });
    }
    obtenerTipos(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield tipoasistencia_1.TipoAsistencia.findAll({ where: { fechaBaja: null } });
            return result;
        });
    }
    crear(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let idEstado = (request.payload.idEstado) ? request.payload.idEstado : (yield estado_1.Estado.findOne({ where: { codigo: 'ASIPEN' } })).idEstado;
            const datos = {
                idTipoAsistencia: request.payload.idTipoAsistencia,
                idSocio: request.payload.idSocio,
                idEstado: idEstado,
                importe: request.payload.importe,
                cantCuotas: request.payload.cantCuotas,
                impCuota: request.payload.impCuota,
                banco: request.payload.banco,
                sucursal: request.payload.sucursal,
                cuentaHaberes: request.payload.cuentaHaberes,
                CBU: request.payload.CBU,
                contacto: request.payload.contacto,
                telefono: request.payload.telefono,
                numeroSistema: request.payload.numeroSistema,
                idComercialAsignado: request.payload.idComercialAsignado,
                idPreAprobacion: request.payload.idPreAprobacion,
                idUsuarioCreador: (yield usuario_1.Usuario.findOne({ where: { token: request.auth.credentials.uid } })).idUsuario
            };
            return yield asistencia_1.Asistencia.create(datos);
        });
    }
    actualizar(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = yield asistencia_1.Asistencia.findOne({ where: { idAsistencia: request.params.id, fechaBaja: null } });
            if (exists) {
                const datos = {
                    idTipoAsistencia: request.payload.idTipoAsistencia,
                    idSocio: request.payload.idSocio,
                    idEstado: request.payload.idEstado,
                    importe: request.payload.importe,
                    cantCuotas: request.payload.cantCuotas,
                    impCuota: request.payload.impCuota,
                    banco: request.payload.banco,
                    sucursal: request.payload.sucursal,
                    cuentaHaberes: request.payload.cuentaHaberes,
                    CBU: request.payload.CBU,
                    contacto: request.payload.contacto,
                    telefono: request.payload.telefono,
                    numeroSistema: request.payload.numeroSistema,
                    idComercialAsignado: request.payload.idComercialAsignado,
                    idUsuarioUltModi: (yield usuario_1.Usuario.findOne({ where: { token: request.auth.credentials.uid } })).idUsuario
                };
                yield asistencia_1.Asistencia.update(datos, { where: { idAsistencia: request.params.id } });
                return yield asistencia_1.Asistencia.findOne({ where: { idAsistencia: request.params.id, fechaBaja: null } });
            }
            else {
                return response.response('No existe la asistencia').code(400);
            }
        });
    }
    eliminar(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = yield asistencia_1.Asistencia.findOne({ where: { idAsistencia: request.params.id, fechaBaja: null } });
            if (exists) {
                const datos = {
                    fechaBaja: new Date(),
                    idUsuarioUltModi: (yield usuario_1.Usuario.findOne({ where: { token: request.auth.credentials.uid } })).idUsuario
                };
                yield asistencia_1.Asistencia.update(datos, { where: { idAsistencia: request.params.id } });
                return yield asistencia_1.Asistencia.findOne({ where: { idAsistencia: request.params.id } });
            }
            else {
                return response.response('No existe la asistencia').code(400);
            }
        });
    }
}
exports.default = AsistenciaController;
//# sourceMappingURL=asistencia-controller.js.map