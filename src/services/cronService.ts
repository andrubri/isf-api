import * as Hapi from "hapi";
import * as socketio from "socket.io";
import {IServerConfigurations} from "../configurations";
import {DBSquelize} from "../database";
import {Persona} from "../database/entidades/persona";

const schedule = require('node-schedule');

export class CronService {

    constructor() {

    };

    public static sendEmailEveryDay(server: Hapi.Server, io: socketio.Server, configs: IServerConfigurations): void {

        const emailSchedule = schedule.scheduleJob('*/50 * * * * *', function () {
            //console.log('Test email cron function!');
        });

    };

    public static checkVoluntariosActivos(server: Hapi.Server, io: socketio.Server, configs: IServerConfigurations): void {
        const checkCron = schedule.scheduleJob('*/50 * * * * *', async () => {
            const DB = new DBSquelize(null);
            const checkPersonas = [];
            const inactPersonas = [];
            const activPersonas = [];

            let data = await DB.execute(`
                SELECT p.idPersona, count(j.idJornadas) as cantidad
                FROM personas p
                LEFT JOIN personas_jornadas pj ON (pj.idPersona = p.idPersona)
                LEFT JOIN jornadas j ON (j.idJornadas = pj.idJornada AND
                                        j.fecha BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW())
                GROUP BY p.idPersona`);

            for (const pers of data[0]) {
                if (pers.cantidad < 2) {
                    checkPersonas.push(pers.idPersona);
                } else {
                    activPersonas.push(pers.idPersona);
                }
            }

            if (checkPersonas.length > 0) {
                data = await DB.execute(`
                select p.idPersona, count(j.idJornadas) as cantidad
                from personas p
                LEFT JOIN personas_jornadas pj ON (pj.idPersona = p.idPersona)
                LEFT JOIN jornadas j ON (j.idJornadas = pj.idJornada AND
                                        j.fecha BETWEEN DATE_SUB(NOW(), INTERVAL 2 MONTH) AND NOW())
                WHERE p.idPersona IN (:inactivas)
                GROUP BY p.idPersona`, {replacements: {inactivas: checkPersonas}});

                for (const pers of data[0]) {
                    if (pers.cantidad < 3) {
                        inactPersonas.push(pers.idPersona);
                    } else {
                        activPersonas.push(pers.idPersona);
                    }
                }
            }

            const QueryUpdate = `UPDATE Personas SET estado = :estado
                                 WHERE idPersona IN (:personas)`;

            if (inactPersonas.length > 0)
                DB.execute(QueryUpdate, {replacements: {estado: 'Inactivo', personas: inactPersonas}});

            if (activPersonas.length > 0)
                DB.execute(QueryUpdate, {replacements: {estado: 'Activo', personas: activPersonas}});

        });

    };
}