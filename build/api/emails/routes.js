"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const email_controller_1 = require("./email-controller");
function default_1(server, io, serverConfigs) {
    const emailController = new email_controller_1.EmailController(serverConfigs, io);
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
exports.default = default_1;
//# sourceMappingURL=routes.js.map