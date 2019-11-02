import { IRequest, IReqEmail } from "../../interfaces/request";
import * as Hapi from "hapi";
import * as socketio from "socket.io";
import FirebaseAdmin from "../../lib/firebase";
import { IEmailConfiguration, IServerConfigurations, getEmailConfig } from "../../configurations";
import { Equipo } from "../../database/entidades/equipo";
import { Persona } from "../../database/entidades/persona";

const sgMail = require('@sendgrid/mail');

export class EmailController {

    private configs: IServerConfigurations;
    private firebaseAdmin: any;
    private configurations: IEmailConfiguration;

    constructor(configs: IServerConfigurations, io: socketio.Server) {
        this.configs = configs;
        this.firebaseAdmin = FirebaseAdmin.get();
        this.configurations = getEmailConfig();
        sgMail.setApiKey(this.configurations.api_key);

    }

    public async enviarEmail(request: IRequest, response: Hapi.ResponseToolkit) {

        this.prepareEmail('tom.manrey@gmail.com','Hola ISF','Cyber');

        return response.response("Mail enviado").code(200);

    }


    public async sendMailToEquipoMembers(request: IReqEmail, response: Hapi.ResponseToolkit) {
        const exist: Equipo = await Equipo.findOne({ where: { idEquipo: request.params.id } });

        if (exist) {

            const voluntariosFound = await Persona.findAll({
                include: [{
                    model: Equipo,
                    through: { where: { idEquipo: exist.idEquipo } },
                    required: true
                }],
            });

            voluntariosFound.forEach(voluntario => 
                this.prepareEmail(voluntario.email,
                    request.payload.mensaje,exist.nombre))

            return voluntariosFound;


        } else {
            return response.response("Equipo no encontrado").code(400);
        }

    }

    private async prepareEmail(email: string,mensaje:string,equipo: string) {

        const msg = {
            to: email,
            from: this.configurations.sender,
            subject: 'ISF llamdado',
            text: mensaje,
            html: `${mensaje}<br><br><strong>Recibis este mail
            por estar en el equipo ${equipo}</strong> `,
        };
        sgMail.send(msg);

    }
}
