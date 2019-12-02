import {IRequest, IReqEmail} from "../../interfaces/request";
import * as Hapi from "hapi";
import * as socketio from "socket.io";
import FirebaseAdmin from "../../lib/firebase";
import {IEmailConfiguration, IServerConfigurations, getEmailConfig} from "../../configurations";
import {Equipo} from "../../database/entidades/equipo";
import {Persona} from "../../database/entidades/persona";
import * as fs from 'fs';
import * as path from "path";
import mail = require("@sendgrid/mail/src/mail");
import {Jornada} from "../../database/entidades/jornada";
import {escapeRegExp} from "tslint/lib/utils";
import {encodeBase64} from "bcryptjs";

const sgMail = require('@sendgrid/mail');

export class EmailController {

    private configs: IServerConfigurations;
    private firebaseAdmin: any;
    private configurations: IEmailConfiguration;
    private meses: string[] = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];


    constructor(configs: IServerConfigurations, io: socketio.Server) {
        this.configs = configs;
        this.firebaseAdmin = FirebaseAdmin.get();
        this.configurations = getEmailConfig();
        sgMail.setApiKey(this.configurations.api_key);

    }

    public async enviarEmail(request: IRequest, response: Hapi.ResponseToolkit) {
        //this.prepareEmail('tom.manrey@gmail.com', 'Hola ISF', 'Cyber');
        return response.response("Mail enviado").code(200);
    }


    public async sendMailToEquipoMembers(request: IReqEmail, response: Hapi.ResponseToolkit) {
        const exist: Equipo = await Equipo.findOne({
            where: {idEquipo: request.params.id},
            include: [{model: Persona, required: false}]
        });
        if (exist) {
            if (exist.Personas.length > 0) {
                exist.Personas.forEach(voluntario => {
                    this.prepareEmail(voluntario.email, request.payload.asunto, request.payload.mensaje, 'mail_equipo.html', {
                        '{{EQUIPO}}': exist.nombre,
                        '{{NOMBRE}}': voluntario.nombre
                    });
                });
            }

            return response.response().code(200);
        } else {
            return response.response("Equipo no encontrado").code(400);
        }

    }

    public async sendMailToEquipoJornada(request: IReqEmail, response: Hapi.ResponseToolkit) {
        const exist: Jornada = await Jornada.findOne({
            where: {idJornadas: request.params.id},
            include: [{model: Equipo, required: true, include: [{model: Persona, required: false}]}]
        });
        if (exist) {
            if (exist.Equipo.Personas.length > 0) {
                exist.Equipo.Personas.forEach(voluntario => {
                    const hash: Buffer = new Buffer(exist.idJornadas + ":" + voluntario.idPersona + ":" + voluntario.nombre);

                    this.prepareEmail(voluntario.email, request.payload.asunto, request.payload.mensaje, 'mail_jornada.html', {
                        '{{EQUIPO}}': exist.Equipo.nombre,
                        '{{DAY}}': exist.fecha.getDate(),
                        '{{MONTH}}': this.meses[exist.fecha.getMonth()],
                        '{{LINK}}': this.configurations.urlConfirmar + encodeURI(hash.toString('base64').replace(/=/g, '%3D'))
                    });
                });
            }

            return response.response().code(200);
        } else {
            return response.response("Equipo no encontrado").code(400);
        }

    }

    private async prepareEmail(email: string, asunto: string, mensaje: string, template: string, replace: any) {

        let mailHTML = fs.readFileSync(path.join(__dirname, '../../template/' + template)).toString()
            .replace(/{{MENSAJE}}/g, mensaje)
            .replace(/{{SRC}}/g, this.configurations.dirIMG);

        for (let key in replace) {
            mailHTML = mailHTML.replace(new RegExp(key, "g"), replace[key]);
        }

        const msg = {
            to: email,
            from: this.configurations.sender,
            subject: asunto,
            text: mensaje,
            html: mailHTML,
        };

        sgMail.send(msg);

    }
}
