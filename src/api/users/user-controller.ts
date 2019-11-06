import * as admin from "firebase-admin";
import * as Hapi from "hapi";
import * as socketio from "socket.io";
import {IServerConfigurations} from "../../configurations";
import {Usuario} from "../../database/entidades/usuario";
import {IRequest, IReqUser} from "../../interfaces/request";
import FirebaseAdmin from "../../lib/firebase";
import UpdateRequest = admin.auth.UpdateRequest;

export default class UserController {
    private configs: IServerConfigurations;
    private firebaseAdmin: any;

    constructor(configs: IServerConfigurations, io: socketio.Server) {
        this.configs = configs;

        this.firebaseAdmin = FirebaseAdmin.get();
    }

    public async obtenerUsuarios(request: IRequest, response: Hapi.ResponseToolkit): Promise<Usuario[]> {
        const result: Usuario[] = await Usuario.findAll({
            where: {fechaBAja: null},
        });
        return result;
    }

    public async obtenerUsuariosXToken(request: IRequest, response: Hapi.ResponseToolkit) {
        const result: Usuario = await Usuario.findOne({where: {fechaBaja: null, token: request.params.id}});
        return result;
    }

    public async crearUsuario(request: IReqUser, response: Hapi.ResponseToolkit) {
        const exist: Usuario = await Usuario.findOne({where: {email: request.payload.email}});
        if (!exist) {
            const userFireBase: any = await this.firebaseAdmin.auth().createUser({
                displayName: request.payload.nombre,
                email: request.payload.email,
                emailVerified: false,
                password: request.payload.clave,
            });

            const User: Usuario = await Usuario.create({
                apellido: request.payload.apellido,
                email: request.payload.email,
                idPerfil: request.payload.idPerfil,
                nombre: request.payload.nombre,
                idPersona:request.payload.idPersona,
                token: userFireBase.uid,
            });

            return User;
        } else {
            if (exist.fechaBaja != null) {
                request.params.id = exist.token;
                return await this.reactivarUsuario(request, response);
            } else {
                return response.response("El usuario ya existe").code(400);
            }
        }
    }

    public async actualizarUsuario(request: IReqUser, response: Hapi.ResponseToolkit) {
        const exist: Usuario = await Usuario.findOne({where: {fechaBaja: null, token: request.params.id}});
        if (exist) {
            try {
                const [cont, User] = await Usuario.update({
                    apellido: request.payload.apellido,
                    email: request.payload.email,
                    idPerfil: request.payload.idPerfil,
                    nombre: request.payload.nombre,
                }, {where: {token: request.params.id}});

                const fireData: UpdateRequest = {
                    displayName: request.payload.nombre,
                    email: request.payload.email,
                    emailVerified: false,
                };
                if (request.payload.clave !== "*******") {
                    fireData.password = request.payload.clave;
                }

                await this.firebaseAdmin.auth().updateUser(request.params.id, fireData);

                return await Usuario.findOne({where: {fechaBaja: null, token: request.params.id}});
            } catch (e) {
                return e;
            }
        } else {
            return response.response().code(400);
        }
    }

    public async eliminarUsuario(request: IRequest, response: Hapi.ResponseToolkit) {
        const exist: Usuario = await Usuario.findOne({where: {fechaBaja: null, token: request.params.id}});
        if (exist) {
            const [cont, User] = await Usuario.update({
                fechaBaja: new Date()
            }, {where: {token: request.params.id}});

            const fireData: UpdateRequest = {
                disabled: true,
            };

            await this.firebaseAdmin.auth().updateUser(request.params.id, fireData);

            return await Usuario.findOne({where: {token: request.params.id}});
        } else {
            return response.response().code(400);
        }
    }

    public async reactivarUsuario(request: IReqUser, response: Hapi.ResponseToolkit) {
        const exist: Usuario = await Usuario.findOne({where: {token: request.params.id}});
        if (exist && exist.fechaBaja !== null) {
            const [cont, User] = await Usuario.update({
                apellido: request.payload.apellido,
                email: request.payload.email,
                fechaBaja: null,
                idPerfil: request.payload.idPerfil,
                nombre: request.payload.nombre,
            }, {where: {token: request.params.id}});

            const fireData: UpdateRequest = {
                disabled: false,
                displayName: request.payload.nombre,
                email: request.payload.email,
                emailVerified: false,
            };
            if (request.payload.clave !== "*******") {
                fireData.password = request.payload.clave;
            }

            await this.firebaseAdmin.auth().updateUser(request.params.id, fireData);

            return await Usuario.findOne({where: {token: request.params.id}});
        } else {
            return response.response().code(400);
        }
    }

    public async obtenerMiUsuario(request: IRequest, h: Hapi.ResponseToolkit) {
        const result: Usuario = await Usuario.findOne({where: {fechaBaja: null, token: request.auth.credentials.uid}});
        return h.response(result).code(200);
    }
}
