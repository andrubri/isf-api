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
const fs = require("fs");
const firebase_1 = require("../../lib/firebase");
const estado_1 = require("../../database/estado");
const preaprobacion_1 = require("../../database/preaprobacion");
const usuario_1 = require("../../database/usuario");
const uuid = require("uuid");
const path_1 = require("path");
const fileType = require("file-type");
class PreaprobacionController {
    constructor(configs, io) {
        this.configs = configs;
        this.io = io;
        this.firebaseAdmin = firebase_1.default.get();
    }
    obtenerAll(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield preaprobacion_1.PreAprobacion.findAll({
                where: { fechaBaja: null },
                include: [{ model: estado_1.Estado, required: true }, { model: usuario_1.Usuario, required: true }]
            });
            return result;
        });
    }
    obtenerMisPreaprobaciones(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield preaprobacion_1.PreAprobacion.findAll({
                where: { fechaBaja: null },
                include: [{ model: estado_1.Estado, required: true }, {
                        model: usuario_1.Usuario,
                        required: true,
                        where: { token: request.auth.credentials.uid }
                    }]
            });
            return result;
        });
    }
    obtenerPreaprobacionXId(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield preaprobacion_1.PreAprobacion.findOne({
                where: { idPreAprobacion: request.params.id, fechaBaja: null },
                include: [{ model: estado_1.Estado, required: true }, { model: usuario_1.Usuario, required: true }]
            });
            return result;
        });
    }
    crear(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const estado = yield estado_1.Estado.findOne({ where: { codigo: 'PAPPEN' } });
            console.log(estado);
            const datos = {
                idComercialAsignado: request.payload.idComercialAsignado,
                idEstado: estado.idEstado,
                salario: request.payload.salario,
                asistencia: request.payload.asistencia,
                idTipoDoc: request.payload.idTipoDoc,
                documento: request.payload.documento,
                numeroLegajo: request.payload.numeroLegajo,
                reparticion: request.payload.reparticion,
                nombre: request.payload.nombre,
                apellido: request.payload.apellido,
                idSocio: request.payload.idSocio,
                idUsuarioCreador: (yield usuario_1.Usuario.findOne({ where: { token: request.auth.credentials.uid } })).idUsuario
            };
            this.emitPreAprobacion();
            return yield preaprobacion_1.PreAprobacion.create(datos);
        });
    }
    actualizar(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = yield preaprobacion_1.PreAprobacion.findOne({
                where: {
                    idPreAprobacion: request.params.id,
                    fechaBaja: null
                }
            });
            if (exists) {
                const datos = {
                    idComercialAsignado: request.payload.idComercialAsignado,
                    idEstado: request.payload.idEstado,
                    salario: request.payload.salario,
                    asistencia: request.payload.asistencia,
                    idTipoDoc: request.payload.idTipoDoc,
                    documento: request.payload.documento,
                    numeroLegajo: request.payload.numeroLegajo,
                    reparticion: request.payload.reparticion,
                    nombre: request.payload.nombre,
                    apellido: request.payload.apellido,
                    idSocio: request.payload.idSocio,
                    idUsuarioUltModi: (yield usuario_1.Usuario.findOne({ where: { token: request.auth.credentials.uid } })).idUsuario
                };
                yield preaprobacion_1.PreAprobacion.update(datos, { where: { idPreAprobacion: request.params.id } });
                return yield preaprobacion_1.PreAprobacion.findOne({ where: { idPreAprobacion: request.params.id, fechaBaja: null } });
            }
            else {
                return response.response('No existe la asistencia').code(400);
            }
        });
    }
    eliminar(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = yield preaprobacion_1.PreAprobacion.findOne({
                where: {
                    idPreAprobacion: request.params.id,
                    fechaBaja: null
                }
            });
            if (exists) {
                const datos = {
                    fechaBaja: new Date(),
                    idEstado: (yield estado_1.Estado.findOne({ where: { codigo: 'PAPBAJ' } })).idEstado,
                    idUsuarioUltModi: (yield usuario_1.Usuario.findOne({ where: { token: request.auth.credentials.uid } })).idUsuario
                };
                yield preaprobacion_1.PreAprobacion.update(datos, { where: { idPreAprobacion: request.params.id } });
                this.emitCambioPreAprobacion(0);
                return yield preaprobacion_1.PreAprobacion.findOne({ where: { idPreAprobacion: request.params.id } });
            }
            else {
                return response.response('No existe la asistencia').code(400);
            }
        });
    }
    aprobar(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = yield preaprobacion_1.PreAprobacion.findOne({
                where: {
                    idPreAprobacion: request.params.id,
                    fechaBaja: null
                }
            });
            if (exists) {
                const datos = {
                    importeAprobado: request.payload.importeAprobado,
                    importeCuota: request.payload.importeCuota,
                    cantidadCuotas: request.payload.cantidadCuotas,
                    comentarios: request.payload.comentarios,
                    idEstado: (yield estado_1.Estado.findOne({ where: { codigo: 'PAPAPR' } })).idEstado,
                    idUsuarioUltModi: (yield usuario_1.Usuario.findOne({ where: { token: request.auth.credentials.uid } })).idUsuario
                };
                yield preaprobacion_1.PreAprobacion.update(datos, { where: { idPreAprobacion: request.params.id } });
                const solicitud = yield preaprobacion_1.PreAprobacion.findOne({ where: { idPreAprobacion: request.params.id } });
                this.emitCambioPreAprobacion(solicitud.idComercialAsignado);
                return solicitud;
            }
            else {
                return response.response('No existe la asistencia').code(400);
            }
        });
    }
    rechazar(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = yield preaprobacion_1.PreAprobacion.findOne({
                where: {
                    idPreAprobacion: request.params.id,
                    fechaBaja: null
                }
            });
            if (exists) {
                const datos = {
                    idEstado: (yield estado_1.Estado.findOne({ where: { codigo: 'PAPREC' } })).idEstado,
                    idUsuarioUltModi: (yield usuario_1.Usuario.findOne({ where: { token: request.auth.credentials.uid } })).idUsuario
                };
                yield preaprobacion_1.PreAprobacion.update(datos, { where: { idPreAprobacion: request.params.id } });
                const solicitud = yield preaprobacion_1.PreAprobacion.findOne({ where: { idPreAprobacion: request.params.id } });
                this.emitCambioPreAprobacion(solicitud.idComercialAsignado);
                return solicitud;
            }
            else {
                return response.response('No existe la asistencia').code(400);
            }
        });
    }
    uploadDNI(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const destFile = this.uploadFile(request.payload.path, request.query.fileName);
            yield preaprobacion_1.PreAprobacion.update({ dniFile: destFile }, { where: { idPreAprobacion: request.params.id } });
            return { status: 'OK' };
        });
    }
    uploadSueldo(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const destFile = this.uploadFile(request.payload.path, request.query.fileName);
            yield preaprobacion_1.PreAprobacion.update({ sueldoFile: destFile }, { where: { idPreAprobacion: request.params.id } });
            return { status: 'OK' };
        });
    }
    uploadCBU(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const destFile = this.uploadFile(request.payload.path, request.query.fileName);
            yield preaprobacion_1.PreAprobacion.update({ cbuFile: destFile }, { where: { idPreAprobacion: request.params.id } });
            return { status: 'OK' };
        });
    }
    uploadServicio(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const destFile = this.uploadFile(request.payload.path, request.query.fileName);
            yield preaprobacion_1.PreAprobacion.update({ servicioFile: destFile }, { where: { idPreAprobacion: request.params.id } });
            return { status: 'OK' };
        });
    }
    loadDNI(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const row = yield preaprobacion_1.PreAprobacion.findOne({ where: { idPreAprobacion: request.params.id } });
            let file = null;
            const resp = {};
            if (row.dniFile) {
                file = fs.readFileSync(row.dniFile);
                resp.file = file;
                resp.mime = fileType(file).mime;
            }
            return resp;
        });
    }
    loadSueldo(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const row = yield preaprobacion_1.PreAprobacion.findOne({ where: { idPreAprobacion: request.params.id } });
            let file = null;
            if (row.sueldoFile) {
                file = fs.readFileSync(row.sueldoFile);
                response.response().type(fileType(file).mime);
            }
            return file;
        });
    }
    loadCBU(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const row = yield preaprobacion_1.PreAprobacion.findOne({ where: { idPreAprobacion: request.params.id } });
            let file = null;
            if (row.cbuFile) {
                file = fs.readFileSync(row.cbuFile);
                response.response(file).type(fileType(file).mime);
            }
            return response;
        });
    }
    loadServicio(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const row = yield preaprobacion_1.PreAprobacion.findOne({ where: { idPreAprobacion: request.params.id } });
            let file = null;
            if (row.servicioFile) {
                file = fs.readFileSync(row.servicioFile);
                response.response(file).type(fileType(file).mime);
            }
            return response;
        });
    }
    uploadFile(pathFile, nameFile) {
        //
        const pathDest = path_1.resolve(this.configs.pathFiles);
        if (!fs.existsSync(pathDest))
            fs.mkdirSync(pathDest);
        const nameOrigin = nameFile.split('.');
        const ext = nameOrigin[nameOrigin.length - 1];
        const dest = pathDest + "/" + uuid.v1() + "." + ext;
        fs.copyFileSync(pathFile, dest);
        return dest;
    }
    //socket.io
    emitPreAprobacion() {
        return __awaiter(this, void 0, void 0, function* () {
            const sockets = this.io.sockets;
            console.log("Emitiendo Socket");
            sockets.emit('newPreAprobacion', {});
        });
    }
    emitCambioPreAprobacion(idComercialAsignado) {
        return __awaiter(this, void 0, void 0, function* () {
            const sockets = this.io.sockets;
            console.log("Emitiendo Socket");
            sockets.emit('changePreAprobacion', { idComercialAsignado });
        });
    }
}
exports.default = PreaprobacionController;
//# sourceMappingURL=preaprobacion-controller.js.map