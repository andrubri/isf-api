import * as admin from "firebase-admin";
import * as Hapi from "hapi";
import * as socketio from "socket.io";
import {IServerConfigurations} from "../../configurations";
import {Usuario} from "../../database/usuario";
import {IReqActividad, IRequest, IReqUser} from "../../interfaces/request";
import FirebaseAdmin from "../../lib/firebase";
import {Actividad} from "../../database/actividad";
import {ActividadesVoluntarios} from "../../database/actividades_voluntarios";

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
        const exist: Actividad = await Actividad.findOne({where: {nombre: request.payload.actividad.nombre}});
        if (!exist) {
            const act: Actividad = await Actividad.create({
                nombre: request.payload.actividad.nombre,
                direccion: request.payload.actividad.direccion,
                idLocalidad: request.payload.actividad.idLocalidad,
            });

            for( let item of request.payload.coordinadores){
                ActividadesVoluntarios.create({
                    idVoluntario: item.idvoluntario,
                    idActividad: act.idActividad,
                    idRol: 2
                });
            }
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
                    direccion: request.payload.actividad.direccion,
                    idLocaliad: request.payload.actividad.idLocalidad,
                    nombre: request.payload.actividad.nombre,
                }, {where: {idActividad: request.params.id}});

                for( let item of request.payload.coordinadores){
                    await ActividadesVoluntarios.create({
                        idVoluntario: item.idvoluntario,
                        idActividad: exist.idActividad,
                        idRol: 2
                    });
                }

                return "ok";
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

            return act[0];
        } else {
            return response.response().code(400);
        }
    }

    public async obtenerCoordinadoresXId(request: IRequest, response: Hapi.ResponseToolkit) {
        const exist: Actividad = await Actividad.findOne({where: {fechaBaja: null, idActividad: request.params.id}});
        if (exist) {
            const coordinadores = [];
            const asignados = await ActividadesVoluntarios.findAll({where: {fechaBaja: null, idRol: 2}});
            for (const asign of asignados) {
                const user: Usuario = await Usuario.findOne({
                    where: {
                        fechaBaja: null,
                        idVoluntario: asign.idVoluntario
                    }
                });
                const item: any = {};
                item.idActividadVoluntario = asign.idActividadVoluntario;
                item.nombre = user.nombre;
                item.apellido = user.apellido;

                coordinadores.push(item);
            }
            return await coordinadores;
        } else {
            return response.response().code(400);
        }
    }

}
