import * as admin from "firebase-admin";
import * as Hapi from "hapi";
import * as socketio from "socket.io";
import {IServerConfigurations} from "../../configurations";
import {Usuario} from "../../database/entidades/usuario";
import {IReqEquipo, IReqJornada, IRequest, IReqUser, IReqVoluntario, IReqJornadas} from "../../interfaces/request";
import FirebaseAdmin from "../../lib/firebase";
import {Equipo} from "../../database/entidades/equipo";
import {EquipoPersona} from "../../database/entidades/equipo_persona";
import {Jornada} from "../../database/entidades/jornada";
import {Persona} from "../../database/entidades/persona";
import {PersonaJornada} from "../../database/entidades/personas_jornada";
import {DBSquelize} from "../../database";

export default class EquipoController {
    private configs: IServerConfigurations;
    private firebaseAdmin: any;

    constructor(configs: IServerConfigurations, io: socketio.Server) {
        this.configs = configs;

        this.firebaseAdmin = FirebaseAdmin.get();
    }

    public async obtenerEquipo(request: IRequest, response: Hapi.ResponseToolkit): Promise<Equipo[]> {
        const result: Equipo[] = await Equipo.findAll();

        return result || [];
    }

    public async obtenerEquipoXId(request: IRequest, response: Hapi.ResponseToolkit): Promise<Equipo> {
        const result: Equipo = await Equipo.findOne({where: {idEquipo: request.params.id}});
        return result;
    }

    public async crearEquipo(request: IReqEquipo, response: Hapi.ResponseToolkit) {
        const exist: Equipo = await Equipo.findOne({where: {nombre: request.payload.equipo.nombre}});
        if (!exist) {
            const act: Equipo = await Equipo.create({
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
        const exist: Equipo = await Equipo.findOne({where: {idEquipo: request.params.id}});
        if (exist) {
            try {
                const [cont, act] = await Equipo.update({
                    nombre: request.payload.equipo.nombre,
                    descripcion: request.payload.equipo.descripcion,
                    categoria: request.payload.equipo.categoria,
                    estado: request.payload.equipo.estado,
                    provincia: request.payload.equipo.provincia,
                    ciudad: request.payload.equipo.ciudad,
                    fechaInicio: request.payload.equipo.fechaInicio,
                    fechaFin: request.payload.equipo.fechaFin
                }, {where: {idEquipo: request.params.id}});

                for (let item of request.payload.coordinadores) {
                    await EquipoPersona.create({
                        idPersona: item.idPersona,
                        idEquipo: exist.idEquipo,
                        idRol: 2
                    });
                }

                const changedRow: Equipo = await Equipo.findOne({where: {idEquipo: request.params.id}});
                return changedRow;
            } catch (e) {
                return e;
            }
        } else {
            return response.response().code(400);
        }
    }

    public async eliminarEquipo(request: IRequest, response: Hapi.ResponseToolkit) {
        const exist: Equipo = await Equipo.findOne({where: {idEquipo: request.params.id}});
        if (exist) {
            const [cont, act] = await Equipo.update({
                fechaFin: new Date(),
            }, {where: {idEquipo: request.params.id}});

            const changedRow: Equipo = await Equipo.findOne({where: {idEquipo: request.params.id}});
            return changedRow;
        } else {
            return response.response().code(400);
        }
    }

    public async obtenerCoordinadoresXId(request: IRequest, response: Hapi.ResponseToolkit) {
        const exist: Equipo = await Equipo.findOne({where: {idEquipo: request.params.id}});
        if (exist) {

            const coordinadores = await Persona.findAll({
                include: [{
                    model: Equipo,
                    through: {where: {idRol: '2', idEquipo: exist.idEquipo}},
                    required: true
                }],
            });


            return coordinadores;
        } else {
            return response.response().code(400);
        }
    }

    public async obtenerVoluntariosXId(request: IRequest, response: Hapi.ResponseToolkit) {
        const exist: Equipo = await Equipo.findOne({where: {idEquipo: request.params.id}});
        if (exist) {

            const asignados = await Persona.findAll({
                include: [{
                    model: Equipo,
                    through: {where: {idRol: '1', idEquipo: exist.idEquipo}},
                    required: true
                }],
            });
            return asignados;
        } else {
            return response.response().code(400);
        }
    }

    public async obtenerJornadasXId(request: IRequest, response: Hapi.ResponseToolkit) {
        const exist: Equipo = await Equipo.findOne({where: {idEquipo: request.params.id}});
        if (exist) {
            const jornadas = await Jornada.findAll({where: {idEquipo: exist.idEquipo}});
            return jornadas;
        } else {
            return response.response().code(400);
        }
    }

    public async addCoordinadoresEquipo(request: IReqVoluntario, response: Hapi.ResponseToolkit) {
        const exist: Equipo = await Equipo.findOne({where: {idEquipo: request.params.id}});
        if (exist) {
            const coordinador: EquipoPersona = new EquipoPersona({
                idEquipo: exist.idEquipo,
                idPersona: request.payload.idPersona,
                idRol: 2
            });
            await coordinador.save();

            return coordinador;
        } else {
            return response.response().code(400);
        }
    }

    public async addVoluntariosEquipo(request: IReqVoluntario, response: Hapi.ResponseToolkit) {
        const exist: Equipo = await Equipo.findOne({where: {idEquipo: request.params.id}});
        if (exist) {
            const voluntario: EquipoPersona = new EquipoPersona({
                idEquipo: exist.idEquipo,
                idPersona: request.payload.idPersona,
                idRol: 1
            });
            await voluntario.save();

            return voluntario;
        } else {
            return response.response().code(400);
        }
    }

    public async addJornadasEquipo(request: IReqJornadas, response: Hapi.ResponseToolkit) {
        const exist: Equipo = await Equipo.findOne({where: {idEquipo: request.params.id}});
        if (exist) {
            const jornada: Jornada = new Jornada({
                idEquipo: exist.idEquipo,
                descripcion: '',
                direccion: '',
                fecha: request.payload.fecha
            });
            await jornada.save();

            return jornada;
        } else {
            return response.response().code(400);
        }
    }

    public async obtenerEstadisticas(request: IReqJornadas, response: Hapi.ResponseToolkit) {
        const exist: Equipo = await Equipo.findOne({where: {idEquipo: request.params.id}});
        if (exist) {
            const DB = new DBSquelize(null);
            const estadistica: any = await DB.execute(`
            SELECT j.idJornadas, j.fecha, count(pj.idJornada) as confirmados, count(pj.confirmacion) as asistencia FROM jornadas j
            INNER JOIN personas_jornadas pj on j.idJornadas = pj.idJornada
            WHERE j.idEquipo = :equipo
            GROUP BY j.idJornadas, j.fecha
            `, {replacements: {equipo: request.params.id}});

            return estadistica[0];
        } else {
            return response.response().code(400);
        }
    }

    public async obtenerEstadisticasGeneral(request: IReqJornadas, response: Hapi.ResponseToolkit) {
        const DB = new DBSquelize(null);
        const estadistica: any = await DB.execute(`
            SELECT e.idEquipo,
                   e.nombre,
                   CONCAT(MONTH(j.fecha), '/', YEAR(j.fecha)) as fecha,
                   count(pj.idJornada)                        as confirmados,
                   count(pj.confirmacion)                     as asistencia
            FROM equipos e
                     INNER JOIN jornadas j on e.idEquipo = j.idEquipo
                     LEFT JOIN personas_jornadas pj on j.idJornadas = pj.idJornada
            GROUP BY e.idEquipo, e.nombre, CONCAT(MONTH(j.fecha), '/', YEAR(j.fecha))
        `);

        return estadistica[0];
    }



}
