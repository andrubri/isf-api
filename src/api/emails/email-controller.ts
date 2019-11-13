import { IRequest, IReqEmail } from "../../interfaces/request";
import * as Hapi from "hapi";
import * as socketio from "socket.io";
import FirebaseAdmin from "../../lib/firebase";
import { IEmailConfiguration, IServerConfigurations, getEmailConfig } from "../../configurations";
import { Equipo } from "../../database/entidades/equipo";
import { Persona } from "../../database/entidades/persona";
import { EmailService } from "../../services/email-service";


export class EmailController {

    private configs: IServerConfigurations;
    private firebaseAdmin: any;
    private configurations: IEmailConfiguration;
    private emailService: EmailService;

    constructor(configs: IServerConfigurations, io: socketio.Server) {
        this.configs = configs;
        this.firebaseAdmin = FirebaseAdmin.get();
        this.configurations = getEmailConfig();
        this.emailService = new EmailService(this.configurations.api_key);

    }

    public async enviarEmail(request: IRequest, response: Hapi.ResponseToolkit) {

        this.emailService.prepareEmail('tom.manrey@gmail.com','Hola ISF','Cyber',this.configurations.sender);

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
                this.emailService.prepareEmail(voluntario.email,
                    request.payload.mensaje,exist.nombre,this.configurations.sender))

            return voluntariosFound;


        } else {
            return response.response("Equipo no encontrado").code(400);
        }

    }

}
