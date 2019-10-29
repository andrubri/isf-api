import { IRequest } from "../../interfaces/request";
import * as Hapi from "hapi";
import * as socketio from "socket.io";
import FirebaseAdmin from "../../lib/firebase";
import { IEmailConfiguration, IServerConfigurations, getEmailConfig } from "../../configurations";

const sgMail = require('@sendgrid/mail');

export class EmailController {

    private configs: IServerConfigurations;
    private firebaseAdmin: any;
    private configurations: IEmailConfiguration;

    constructor(configs: IServerConfigurations,io: socketio.Server) {
        this.configs = configs;
        this.firebaseAdmin = FirebaseAdmin.get();
        this.configurations = getEmailConfig();
        sgMail.setApiKey(this.configurations.api_key);

    }

    public async enviarEmail(request: IRequest, response: Hapi.ResponseToolkit) {

        const msg = {
            to: 'tom.manrey@gmail.com',
            from: this.configurations.sender,
            subject: 'First email with SendGrid',
            text: 'and easy to do anywhere, even with Node.js',
            html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        };
        sgMail.send(msg);

        return response.response("Mail enviado").code(200);

    }
}
