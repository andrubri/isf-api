"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const persona_controller_1 = require("./persona-controller");
const Joi = require("joi");
function default_1(server, io, serverConfigs) {
    const jornadaController = new persona_controller_1.default(serverConfigs, io);
    server.bind(jornadaController);
    server.route([
        {
            method: "GET",
            path: "/persona",
            options: {
                auth: "firebase",
                description: "Verificar token.",
                handler: jornadaController.obtenerPersonas,
                plugins: {
                    "hapi-swagger": {
                        responses: {
                            200: {
                                description: "Token Verificado.",
                                schema: Joi.array().items(Joi.object({
                                    nombre: "Pepe",
                                    apellido: Joi.string(),
                                }))
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
            path: "/persona/{id}",
            options: {
                auth: "firebase",
                description: "Verificar token.",
                handler: jornadaController.obtenerPersonas,
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
            path: "/persona",
            options: {
                auth: "firebase",
                description: "Crear Persona",
                handler: jornadaController.crearPersona,
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
            path: "/persona/{id}",
            options: {
                auth: "firebase",
                description: "Actualizar Persona",
                handler: jornadaController.actualizarPersona,
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
            path: "/persona/{id}",
            options: {
                auth: "firebase",
                description: "Eliminamos Persona",
                handler: jornadaController.eliminarPersona,
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
            path: "/persona/coordinador",
            options: {
                auth: "firebase",
                description: "Trae los coordinadores",
                handler: jornadaController.obtenerCoordinador,
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