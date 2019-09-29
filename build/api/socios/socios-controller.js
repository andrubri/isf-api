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
const socio_1 = require("../../database/socio");
const estado_1 = require("../../database/estado");
const integrantesgf_1 = require("../../database/integrantesgf");
const usuario_1 = require("../../database/usuario");
const XLSX = require("xlsx");
const tipodoc_1 = require("../../database/tipodoc");
const gm_pb_actualizarsocios_1 = require("../../database/gm_pb_actualizarsocios");
class SociosController {
    constructor(configs, io) {
        this.configs = configs;
        this.firebaseAdmin = firebase_1.default.get();
    }
    obtenerAll(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield socio_1.Socio.findAll({
                where: { fechaBaja: null },
                include: [{ model: estado_1.Estado, required: true }]
            });
            return result;
        });
    }
    ultimaActEstado(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield gm_pb_actualizarsocios_1.GM_PB_ActualizarSocios.findAll({
                limit: 1,
                order: [['idPBActualizarSocios', 'DESC']]
            });
            return result[0];
        });
    }
    obtenerEstados(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield estado_1.Estado.findAll({ where: { familiaEstado: 'SOC' } });
            return result;
        });
    }
    obtenerSocioXId(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield socio_1.Socio.findOne({
                where: { fechaBaja: null, idSocio: request.params.id },
                include: [
                    { model: estado_1.Estado, required: true },
                    { model: integrantesgf_1.IntegrantesGF, required: false, where: { fechaBaja: null } }
                ]
            });
            return result;
        });
    }
    crear(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = yield socio_1.Socio.findOne({
                where: {
                    fechaBaja: null,
                    documento: request.payload.documento,
                    idTipoDoc: request.payload.idTipoDoc
                }
            });
            if (!exists) {
                const estado = yield estado_1.Estado.findOne({ where: { codigo: 'SOCACT' } });
                const datos = Object.assign(request.payload, { idUsuarioCreador: 0, idEstado: estado.idEstado });
                const socioNew = yield socio_1.Socio.create(datos);
                const intNew = [];
                for (let integrante of request.payload.IntegrantesGFs) {
                    intNew.push({
                        idSocio: socioNew.idSocio,
                        idUsuarioCreador: (yield usuario_1.Usuario.findOne({ where: { token: request.auth.credentials.uid } })).idUsuario,
                        idTipoRelacion: integrante.idTipoRelacion,
                        nombre: integrante.nombre,
                        apellido: integrante.apellido,
                        edad: integrante.edad
                    });
                }
                yield integrantesgf_1.IntegrantesGF.bulkCreate(request.payload.IntegrantesGFs);
                return socioNew;
            }
            else {
                return response.response("Ya existe un socio con el DNI ingresado").code(400);
            }
        });
    }
    actualizar(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = yield socio_1.Socio.findOne({
                where: { fechaBaja: null, idSocio: request.params.id },
                include: [{ model: integrantesgf_1.IntegrantesGF, required: false, where: { fechaBaja: null } }]
            });
            if (exists) {
                const datos = {
                    idUsuarioUltModi: (yield usuario_1.Usuario.findOne({ where: { token: request.auth.credentials.uid } })).idUsuario,
                    idEstado: request.payload.idEstado,
                    nombre: request.payload.nombre,
                    apellido: request.payload.apellido,
                    salario: request.payload.salario,
                    idTipoDoc: request.payload.idTipoDoc,
                    documento: request.payload.documento,
                    idEstadoCivil: request.payload.idEstadoCivil,
                    fechaNacimiento: request.payload.fechaNacimiento,
                    direccion: request.payload.direccion,
                    codigoPostal: request.payload.codigoPostal,
                    localidad: request.payload.localidad,
                    provincia: request.payload.provincia,
                    telefono: request.payload.telefono,
                    celular: request.payload.celular,
                    email: request.payload.email,
                    cuentaFB: request.payload.cuentaFB,
                    numeroLegajo: request.payload.numeroLegajo,
                    reparticion: request.payload.reparticion
                };
                for (let integrante of exists.IntegrantesGFs) {
                    const find = this.buscarIntegrante(request.payload.IntegrantesGFs, integrante.idIntegranteGF);
                    if (!find) {
                        //Baja
                        yield integrantesgf_1.IntegrantesGF.update({
                            fechaBaja: new Date(),
                            idUsuarioUltModi: (yield usuario_1.Usuario.findOne({ where: { token: request.auth.credentials.uid } })).idUsuario
                        }, { where: { idIntegranteGF: integrante.idIntegranteGF } });
                    }
                    else {
                        //Actulizo
                        const intUpd = {
                            idTipoRelacion: find.idTipoRelacion,
                            apellido: find.apellido,
                            nombre: find.nombre,
                            edad: find.edad,
                            idUsuarioUltModi: (yield usuario_1.Usuario.findOne({ where: { token: request.auth.credentials.uid } })).idUsuario
                        };
                        yield integrantesgf_1.IntegrantesGF.update(intUpd, { where: { idIntegranteGF: integrante.idIntegranteGF } });
                    }
                }
                for (let integrante of request.payload.IntegrantesGFs) {
                    if (!integrante.idIntegranteGF) {
                        //Agrego
                        const intNew = {
                            idSocio: exists.idSocio,
                            idTipoRelacion: integrante.idTipoRelacion,
                            apellido: integrante.apellido,
                            nombre: integrante.nombre,
                            edad: integrante.edad,
                            idUsuarioCreador: (yield usuario_1.Usuario.findOne({ where: { token: request.auth.credentials.uid } })).idUsuario
                        };
                        yield integrantesgf_1.IntegrantesGF.create(intNew);
                    }
                }
                return yield socio_1.Socio.update(datos, { where: { idSocio: request.params.id } });
            }
            else {
                return response.response("El socio no existe").code(400);
            }
        });
    }
    buscarIntegrante(arrayIntegrante, idIntegranteGF) {
        let resultado = null;
        let x = 0;
        while (x < arrayIntegrante.length && !resultado) {
            if (arrayIntegrante[x].idIntegranteGF == idIntegranteGF) {
                resultado = arrayIntegrante[x];
            }
            else {
                x++;
            }
        }
        return resultado;
    }
    eliminar(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = yield socio_1.Socio.findOne({ where: { fechaBaja: null, idSocio: request.params.id } });
            if (exists) {
                const estado = yield estado_1.Estado.findOne({ where: { codigo: 'SOCBAJ' } });
                yield socio_1.Socio.update({
                    fechaBaja: new Date(),
                    idEstado: estado.idEstado,
                    idUsuarioUltModi: (yield usuario_1.Usuario.findOne({ where: { token: request.auth.credentials.uid } })).idUsuario
                }, { where: { idSocio: request.params.id } });
                yield integrantesgf_1.IntegrantesGF.update({
                    fechaBaja: new Date(),
                    idUsuarioUltModi: (yield usuario_1.Usuario.findOne({ where: { token: request.auth.credentials.uid } })).idUsuario
                }, { where: { idSocio: request.params.id, fechaBaja: null } });
                return yield socio_1.Socio.findOne({ where: { idSocio: request.params.id } });
            }
            else {
                return response.response("El socio no existe").code(400);
            }
        });
    }
    actualizarEstados(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const workbook = XLSX.readFile(request.payload.path);
            const rows = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
            const estadoAct = yield estado_1.Estado.findOne({ where: { codigo: 'SOCACT' } });
            const estadoMor = yield estado_1.Estado.findOne({ where: { codigo: 'SOCMOR' } });
            if (rows && rows.length > 0) {
                let Proceso = new Object();
                Proceso.usuario = (yield usuario_1.Usuario.findOne({ where: { token: request.auth.credentials.uid } })).idUsuario;
                Proceso.cantidadRegistros = rows.length;
                Proceso.cantidadRegProc = 0;
                Proceso.nombreArchivo = request.query.fileName;
                Proceso.fechaProceso = new Date();
                Proceso = yield gm_pb_actualizarsocios_1.GM_PB_ActualizarSocios.create(Proceso);
                for (let x of rows) {
                    const tDoc = yield tipodoc_1.TipoDoc.findOne({ where: { descripcion: String(x.Tipo).trim() } });
                    const datos = {
                        idEstado: (x.Moroso == 'Si') ? estadoMor.idEstado : estadoAct.idEstado,
                        idUsuarioUltModi: (yield usuario_1.Usuario.findOne({ where: { token: request.auth.credentials.uid } })).idUsuario
                    };
                    const update = yield socio_1.Socio.update(datos, {
                        where: {
                            idTipoDoc: tDoc.idTipoDoc,
                            documento: String(x.Documento).trim()
                        }
                    });
                    Proceso.cantidadRegProc = Proceso.cantidadRegProc + update[0];
                }
                gm_pb_actualizarsocios_1.GM_PB_ActualizarSocios.update(Proceso, { where: { idPBActualizarSocios: Proceso.idPBActualizarSocios } });
            }
            return "";
        });
    }
}
exports.default = SociosController;
//# sourceMappingURL=socios-controller.js.map