import * as Hapi from "hapi";
import * as socketio from "socket.io";
import { IServerConfigurations } from "../../configurations";
import { EmailController } from "./email-controller";


export default function (server: Hapi.Server, io: socketio.Server, serverConfigs: IServerConfigurations) {

    const emailController = new EmailController(serverConfigs, io);
    server.bind(emailController);

    server.route([{
        method: "GET",
        path: "/testemail",
        options: {
            auth: "firebase",
            description: "envia email",
            handler: emailController.enviarEmail,
            plugins: {
                "hapi-swagger": {
                    responses: {
                        200: {
                            description: "Devuelve datos de las emailes",
                        },
                        304: {
                            description: "No autorizado.",
                        },
                        500: {
                            description: "Error",
                        },
                    },
                },
            },
            tags: ["api", "email"],
            validate: {},
        },
    },
    {
        method: "post",
        path: "/email/{id}",
        options: {
            auth: "firebase",
            description: "envia email",
            handler: emailController.sendMailToEquipoMembers,
            plugins: {
                "hapi-swagger": {
                    responses: {
                        200: {
                            description: "mails enviados",
                        },
                        304: {
                            description: "No autorizado.",
                        },
                        500: {
                            description: "Error",
                        },
                    },
                },
            },
            tags: ["api", "email"],
            validate: {},
        },
    }]);
}
