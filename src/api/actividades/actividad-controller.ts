import * as admin from "firebase-admin";
import * as Hapi from "hapi";
import * as socketio from "socket.io";
import {IServerConfigurations} from "../../configurations";
import {Usuario} from "../../database/usuario";
import {IReqActividad, IRequest, IReqUser} from "../../interfaces/request";
import FirebaseAdmin from "../../lib/firebase";
import UpdateRequest = admin.auth.UpdateRequest;
import {Actividad} from "../../database/actividad";

export default class ActividadController {
    private configs: IServerConfigurations;
    private firebaseAdmin: any;

    constructor(configs: IServerConfigurations, io: socketio.Server) {
        this.configs = configs;

        this.firebaseAdmin = FirebaseAdmin.get();
    }

    public async obtenerActividad(request: IRequest, response: Hapi.ResponseToolkit): Promise<Actividad[]> {
        const result: Actividad[] = await Actividad.findAll({
            where: {fechaBaja: null},
        });

        return result || [];
    }

    public async obtenerActividadXId(request: IRequest, response: Hapi.ResponseToolkit): Promise<Actividad> {
        const result: Actividad = await Actividad.findOne({where: {fechaBaja: null, idActividad: request.params.id}});
        return result;
    }

    public async crearActividad(request: IReqActividad, response: Hapi.ResponseToolkit) {
        const exist: Actividad = await Actividad.findOne({where: {nombre: request.payload.nombre}});
        if (!exist) {
            const act: Actividad = await Actividad.create({
                nombre: request.payload.nombre,
                direccion: request.payload.direccion,
                idLocalidad: request.payload.idLocalidad,
            });

            return act;
        } else {
            return response.response("Ya existe una activdad con ese nombre").code(400);
        }
    }

    public async actualizarActividad(request: IReqActividad, response: Hapi.ResponseToolkit) {
        const exist: Actividad = await Actividad.findOne({where: {fechaBaja: null, idActividad: request.params.id}});
        if (exist) {
            try {
                const [cont, act] = await Actividad.update({
                    direccion: request.payload.direccion,
                    idLocaliad: request.payload.idLocalidad,
                    nombre: request.payload.nombre,
                }, {where: {idActividad: request.params.id}});

                return act;
            } catch (e) {
                return e;
            }
        } else {
            return response.response().code(400);
        }
    }

    public async eliminarActividad(request: IRequest, response: Hapi.ResponseToolkit) {
        const exist: Actividad = await Actividad.findOne({where: {fechaBaja: null, idActividad: request.params.id}});
        if (exist) {
            const [cont, act] = await Actividad.update({
                fechaBaja: new Date(),
            }, {where: {idActividad: request.params.id}});

            return act;
        } else {
            return response.response().code(400);
        }
    }
}
