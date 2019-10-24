"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const persona_jornada_controller_1 = require("./persona-jornada-controller");
function default_1(server, io, serverConfigs) {
    const personaJornadaController = new persona_jornada_controller_1.default(serverConfigs, io);
    server.bind(personaJornadaController);
    server.route([
        /* {
            method: "GET",
            path: "/personaJornada",
            options: {
                auth: "firebase",
                description: "Verificar token.",
                handler: personaJornadaController.obtenerPersonaJornadas,
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
                tags: ["api", "personaJornadas"],
                validate: {
    
                },
            },
        }, */
        /* {
            method: "GET",
            path: "/personaJornada/{id}",
            options: {
                auth: "firebase",
                description: "Verificar token.",
                handler: personaJornadaController.obtenerPersonaJornadas,
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
                tags: ["api", "personaJornadas"],
                validate: {
    
                },
            },
        } */
        {
            method: "POST",
            path: "/personaJornada",
            options: {
                auth: "firebase",
                description: "Crear PersonaJornada",
                handler: personaJornadaController.crearPersonaJornada,
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
                tags: ["api", "personaJornadas"],
                validate: {},
            },
        },
        /* {
            method: "PUT",
            path: "/personaJornada/{id}",
            options: {
                auth: "firebase",
                description: "Actualizar PersonaJornada",
                handler: personaJornadaController.actualizarPersonaJornada,
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
                tags: ["api", "personaJornadas"],
                validate: {
    
                },
            },
        }, */
        {
            method: "DELETE",
            path: "/personaJornada/{id}",
            options: {
                auth: "firebase",
                description: "Eliminamos PersonaJornada",
                handler: personaJornadaController.eliminarPersonaJornada,
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
                tags: ["api", "personaJornadas"],
                validate: {},
            },
        }
    ]);
}
exports.default = default_1;
//# sourceMappingURL=routes.js.map