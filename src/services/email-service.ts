import { Equipo } from "../database/entidades/equipo";
import { Persona } from "../database/entidades/persona";
import { Jornada } from "../database/entidades/jornada";
import { PersonaJornada } from "../database/entidades/personas_jornada";
import {  v4 as uuid } from 'uuid'

const schedule = require('node-schedule');
const sgMail = require('@sendgrid/mail');

export class EmailService {

    constructor(apiKey: string) {
        sgMail.setApiKey(apiKey);
    };

    public static sendEmailEveryDay(): void {

        const emailSchedule = schedule.scheduleJob('* * * * * *', function () {
            console.log('Test email cron function!');
        });

    };

    public static async prepareDBforInscriptions(idJornada: number) {

        const foundJornada: Jornada = await Jornada.findOne({ where: { idJornadas: idJornada } });

        if (foundJornada) {
            const personas = await Persona.findAll({
                include: [{
                    model: Equipo,
                    through: { where: { idEquipo: foundJornada.idEquipo } },
                    required: true
                }],
            });

            for (const persona of personas) {

                const voluntario: PersonaJornada = new PersonaJornada({
                    idJornada: idJornada,
                    idPersona: persona.idPersona,
                    path: uuid()
                });
                await voluntario.save();
            }

        } else {
            throw new Error(`No se encontro la jornada de id: ${idJornada}`)
        }

    }

    public async prepareEmail(from: string,mensaje:string, to:string,mensajeExtra:string) {

        const msg = {
            to: to,
            from: from,
            subject: 'ISF llamdado',
            text: mensaje,
            html: mensajeExtra,
        };
        sgMail.send(msg);

    }

    public  async sendEmailWithLink(idJornada: number): Promise<any> {
       
        const personas: any[] = await Persona.findAll({
            limit:1,
            include: [{
                model: Jornada,
                through: { where: { idJornada: idJornada } },
                required: true,
            
            }]
        });

        for (const persona of personas) {
            
            this.prepareEmail("isf.voluntarios@gmail.com",
            "anotate",
            persona.email,
            `your path is isf/${persona.Jornadas[0].PersonaJornada.path}`)

        }
        return personas;
    }

    
}