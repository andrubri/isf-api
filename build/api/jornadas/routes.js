"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jornada_controller_1 = require("./jornada-controller");
function default_1(server, io, serverConfigs) {
    const jornadaController = new jornada_controller_1.default(serverConfigs, io);
    server.bind(jornadaController);
    server.route([
        {
            method: "GET",
            path: "/jornada",
            options: {
                auth: "firebase",
                description: "Verificar token.",
                handler: jornadaController.obtenerJornadas,
                plugins: {
                    "hapi-swagger": {
                        responses: {
                            200: {
                                description: "Token Verificado.",
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
                tags: ["api", "jornadas"],
                validate: {},
            },
        },
        {
            method: "GET",
            path: "/jornada/{id}",
            options: {
                auth: "firebase",
                description: "Verificar token.",
                handler: jornadaController.obtenerJornadasXId,
                plugins: {
                    "hapi-swagger": {
                        responses: {
                            200: {
                                description: "Token Verificado.",
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
                tags: ["api", "jornadas"],
                validate: {},
            },
        },
        {
            method: "POST",
            path: "/jornada",
            options: {
                auth: "firebase",
                description: "Crear Jornada",
                handler: jornadaController.crearJornada,
                plugins: {
                    "hapi-swagger": {
                        responses: {
                            200: {
                                description: "Token Verificado.",
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
                tags: ["api", "jornadas"],
                validate: {},
            },
        },
        {
            method: "PUT",
            path: "/jornada/{id}",
            options: {
                auth: "firebase",
                description: "Actualizar Jornada",
                handler: jornadaController.actualizarJornada,
                plugins: {
                    "hapi-swagger": {
                        responses: {
                            200: {
                                description: "Token Verificado.",
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
                tags: ["api", "jornadas"],
                validate: {},
            },
        },
        {
            method: "DELETE",
            path: "/jornada/{id}",
            options: {
                auth: "firebase",
                description: "Eliminamos Jornada",
                handler: jornadaController.eliminarJornada,
                plugins: {
                    "hapi-swagger": {
                        responses: {
                            200: {
                                description: "Token Verificado.",
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
                tags: ["api", "jornadas"],
                validate: {},
            },
        },
        {
            method: "GET",
            path: "/jornada/{id}/persona",
            options: {
                auth: "firebase",
                description: "Obtengo las personas de una jornada",
                handler: jornadaController.obtenerPersonasXId,
                plugins: {
                    "hapi-swagger": {
                        responses: {
                            200: {
                                description: "Token Verificado.",
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
                tags: ["api", "jornadas"],
                validate: {},
            },
        },
        {
            method: "POST",
            path: "/jornada/{id}/persona",
            options: {
                auth: "firebase",
                description: "Agrego una persona a una jornada",
                handler: jornadaController.addPersonas,
                plugins: {
                    "hapi-swagger": {
                        responses: {
                            200: {
                                description: "Token Verificado.",
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
                tags: ["api", "jornadas"],
                validate: {},
            },
        },
        {
            method: "PUT",
            path: "/jornada/{id}/persona",
            options: {
                auth: "firebase",
                description: "Agrego una persona a una jornada",
                handler: jornadaController.editPersonas,
                plugins: {
                    "hapi-swagger": {
                        responses: {
                            200: {
                                description: "Token Verificado.",
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
                tags: ["api", "jornadas"],
                validate: {},
            },
        },
        {
            method: "GET",
            path: "/jornada/{id}/persona/{hash}",
            options: {
                auth: false,
                description: "URL libre para ok de usuario",
                handler: jornadaController.addPersonasHash,
                plugins: {
                    "hapi-swagger": {
                        responses: {
                            200: {
                                description: "Token Verificado.",
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
                tags: ["api", "jornadas"],
                validate: {},
            },
        }
    ]);
}
exports.default = default_1;
//# sourceMappingURL=routes.js.map