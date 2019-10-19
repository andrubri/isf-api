import * as admin from "firebase-admin";
import * as Hapi from "hapi";
import * as socketio from "socket.io";
import {IServerConfigurations} from "../../configurations";
import {Usuario} from "../../database/usuario";
import {IReqEquipo, IRequest, IReqUser} from "../../interfaces/request";
import FirebaseAdmin from "../../lib/firebase";
import {Equipo} from "../../database/equipo";
import {EquipoPersona} from "../../database/equipo_persona";

export default class EquipoController {
    private configs: IServerConfigurations;
    private firebaseAdmin: any;

    constructor(configs: IServerConfigurations, io: socketio.Server) {
        this.configs = configs;

        this.firebaseAdmin = FirebaseAdmin.get();
    }

    public async obtenerEquipo(request: IRequest, response: Hapi.ResponseToolkit): Promise<Equipo[]> {
        const result: Equipo[] = await Equipo.findAll({
            where: {fechaBaja: null},
        });

        return result || [];
    }

    public async obtenerEquipoXId(request: IRequest, response: Hapi.ResponseToolkit): Promise<Equipo> {
        const result: Equipo = await Equipo.findOne({where: {fechaBaja: null, idEquipo: request.params.id}});
        return result;
    }

    public async crearEquipo(request: IReqEquipo, response: Hapi.ResponseToolkit) {
        const exist: Equipo = await Equipo.findOne({where: {nombre: request.payload.equipo.nombre}});
        if (!exist) {
            const act: Equipo = await Equipo.create({
                nombre: request.payload.equipo.nombre,
                direccion: request.payload.equipo.direccion,
                idLocalidad: request.payload.equipo.idLocalidad,
            });

            for( let item of request.payload.coordinadores){
                EquipoPersona.create({
                    idPersona: item.idPersona,
                    idEquipo: act.idEquipo,
                    idRol: 2
                });
            }
            return act;
        } else {
            return response.response("Ya existe una activdad con ese nombre").code(400);
        }
    }

    public async actualizarEquipo(request: IReqEquipo, response: Hapi.ResponseToolkit) {
        const exist: Equipo = await Equipo.findOne({where: {fechaBaja: null, idEquipo: request.params.id}});
        if (exist) {
            try {
                const [cont, act] = await Equipo.update({
                    direccion: request.payload.equipo.direccion,
                    idLocaliad: request.payload.equipo.idLocalidad,
                    nombre: request.payload.equipo.nombre,
                }, {where: {idEquipo: request.params.id}});

                for( let item of request.payload.coordinadores){
                    await EquipoPersona.create({
                        idPersona: item.idPersona,
                        idEquipo: exist.idEquipo,
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

    public async eliminarEquipo(request: IRequest, response: Hapi.ResponseToolkit) {
        const exist: Equipo = await Equipo.findOne({where: {fechaBaja: null, idEquipo: request.params.id}});
        if (exist) {
            const [cont, act] = await Equipo.update({
                fechaBaja: new Date(),
            }, {where: {idEquipo: request.params.id}});

            return act[0];
        } else {
            return response.response().code(400);
        }
    }

    public async obtenerCoordinadoresXId(request: IRequest, response: Hapi.ResponseToolkit) {
        const exist: Equipo = await Equipo.findOne({where: {fechaBaja: null, idEquipo: request.params.id}});
        if (exist) {
            const coordinadores = [];
            const asignados = await EquipoPersona.findAll({where: {fechaBaja: null, idRol: 2}});
            for (const asign of asignados) {
                const user: Usuario = await Usuario.findOne({
                    where: {
                        fechaBaja: null,
                        idPersona: asign.idPersona
                    }
                });
                const item: any = {};
                item.idEquipoPersona = asign.idEquipoPersona;
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
