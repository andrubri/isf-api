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
const usuario_1 = require("../../database/usuario");
const firebase_1 = require("../../lib/firebase");
class UserController {
    constructor(configs, io) {
        this.configs = configs;
        this.firebaseAdmin = firebase_1.default.get();
    }
    obtenerUsuarios(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield usuario_1.Usuario.findAll({
                where: { fechaBAja: null },
            });
            return result;
        });
    }
    obtenerUsuariosXToken(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield usuario_1.Usuario.findOne({ where: { fechaBaja: null, token: request.params.id } });
            return result;
        });
    }
    crearUsuario(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const exist = yield usuario_1.Usuario.findOne({ where: { email: request.payload.email } });
            if (!exist) {
                const userFireBase = yield this.firebaseAdmin.auth().createUser({
                    displayName: request.payload.nombre,
                    email: request.payload.email,
                    emailVerified: false,
                    password: request.payload.clave,
                });
                const User = yield usuario_1.Usuario.create({
                    apellido: request.payload.apellido,
                    email: request.payload.email,
                    idPerfil: request.payload.idPerfil,
                    nombre: request.payload.nombre,
                    token: userFireBase.uid,
                });
                return User;
            }
            else {
                if (exist.fechaBaja != null) {
                    request.params.id = exist.token;
                    return yield this.reactivarUsuario(request, response);
                }
                else {
                    return response.response("El usuario ya existe").code(400);
                }
            }
        });
    }
    actualizarUsuario(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const exist = yield usuario_1.Usuario.findOne({ where: { fechaBaja: null, token: request.params.id } });
            if (exist) {
                try {
                    const [cont, User] = yield usuario_1.Usuario.update({
                        apellido: request.payload.apellido,
                        email: request.payload.email,
                        idPerfil: request.payload.idPerfil,
                        nombre: request.payload.nombre,
                    }, { where: { token: request.params.id } });
                    const fireData = {
                        displayName: request.payload.nombre,
                        email: request.payload.email,
                        emailVerified: false,
                    };
                    if (request.payload.clave !== "*******") {
                        fireData.password = request.payload.clave;
                    }
                    yield this.firebaseAdmin.auth().updateUser(request.params.id, fireData);
                    return yield usuario_1.Usuario.findOne({ where: { fechaBaja: null, token: request.params.id } });
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
    eliminarUsuario(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const exist = yield usuario_1.Usuario.findOne({ where: { fechaBaja: null, token: request.params.id } });
            if (exist) {
                const [cont, User] = yield usuario_1.Usuario.update({
                    fechaBaja: new Date()
                }, { where: { token: request.params.id } });
                const fireData = {
                    disabled: true,
                };
                yield this.firebaseAdmin.auth().updateUser(request.params.id, fireData);
                return yield usuario_1.Usuario.findOne({ where: { token: request.params.id } });
            }
            else {
                return response.response().code(400);
            }
        });
    }
    reactivarUsuario(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const exist = yield usuario_1.Usuario.findOne({ where: { token: request.params.id } });
            if (exist && exist.fechaBaja !== null) {
                const [cont, User] = yield usuario_1.Usuario.update({
                    apellido: request.payload.apellido,
                    email: request.payload.email,
                    fechaBaja: null,
                    idPerfil: request.payload.idPerfil,
                    nombre: request.payload.nombre,
                }, { where: { token: request.params.id } });
                const fireData = {
                    disabled: false,
                    displayName: request.payload.nombre,
                    email: request.payload.email,
                    emailVerified: false,
                };
                if (request.payload.clave !== "*******") {
                    fireData.password = request.payload.clave;
                }
                yield this.firebaseAdmin.auth().updateUser(request.params.id, fireData);
                return yield usuario_1.Usuario.findOne({ where: { token: request.params.id } });
            }
            else {
                return response.response().code(400);
            }
        });
    }
    obtenerMiUsuario(request, h) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield usuario_1.Usuario.findOne({ where: { fechaBaja: null, token: request.auth.credentials.uid } });
            return h.response(result).code(200);
        });
    }
}
exports.default = UserController;
//# sourceMappingURL=user-controller.js.map