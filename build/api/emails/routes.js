"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const email_controller_1 = require("./email-controller");
function default_1(server, io, serverConfigs) {
    const emailController = new email_controller_1.EmailController(serverConfigs, io);
    server.bind(emailController);
    server.route([{
            method: "GET",
            path: "/email",
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
        } /* ,
            {
                method: "POST",
                path: "/email",
                options: {
                    auth: "firebase",
                    description: "Crear email",
                    handler: emailController.crearEquipo,
                    plugins: {
                        "hapi-swagger": {
                            responses: {
                                200: {
                                    description: "Equipo creada.",
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
                method: "GET",
                path: "/email/{id}",
                options: {
                    auth: "firebase",
                    description: "Trae la informacion de una email determinada",
                    handler: emailController.obtenerEquipoXId,
                    plugins: {
                        "hapi-swagger": {
                            responses: {
                                200: {
                                    description: "Trae los datos de la email",
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
                method: "GET",
                path: "/email/{id}/coordinador",
                options: {
                    auth: "firebase",
                    description: "Trae los coordinadores de una email",
                    handler: emailController.obtenerCoordinadoresXId,
                    plugins: {
                        "hapi-swagger": {
                            responses: {
                                200: {
                                    description: "Trae los datos de los coordinadores",
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
                    tags: ["api", "email", "coordinador"],
                    validate: {
    
                    },
                },
            },
            {
                method: "POST",
                path: "/email/{id}/coordinador",
                options: {
                    auth: "firebase",
                    description: "Agregamos un coordinador al email",
                    handler: emailController.addCoordinadoresEquipo,
                    plugins: {
                        "hapi-swagger": {
                            responses: {
                                200: {
                                    description: "Agregado",
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
                    tags: ["api", "email", "coordinador"],
                    validate: {
    
                    },
                },
            },
            {
                method: "GET",
                path: "/email/{id}/voluntario",
                options: {
                    auth: "firebase",
                    description: "Trae los voluntarios de una email",
                    handler: emailController.obtenerVoluntariosXId,
                    plugins: {
                        "hapi-swagger": {
                            responses: {
                                200: {
                                    description: "Trae los datos de los voluntarios",
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
                    tags: ["api", "email", "coordinador"],
                    validate: {
    
                    },
                },
            },
            {
                method: "POST",
                path: "/email/{id}/voluntario",
                options: {
                    auth: "firebase",
                    description: "Agregamos un voluntario al email",
                    handler: emailController.addVoluntariosEquipo,
                    plugins: {
                        "hapi-swagger": {
                            responses: {
                                200: {
                                    description: "Agregado",
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
                    tags: ["api", "email", "coordinador"],
                    validate: {
    
                    },
                },
            },
            {
                method: "GET",
                path: "/email/{id}/jornada",
                options: {
                    auth: "firebase",
                    description: "Trae las jornadas de una email",
                    handler: emailController.obtenerJornadasXId,
                    plugins: {
                        "hapi-swagger": {
                            responses: {
                                200: {
                                    description: "Trae los datos de las jornadas",
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
                    tags: ["api", "email", "coordinador"],
                    validate: {
    
                    },
                },
            },
            {
                method: "POST",
                path: "/email/{id}/jornada",
                options: {
                    auth: "firebase",
                    description: "Agrego una jornada al email",
                    handler: emailController.addJornadasEquipo,
                    plugins: {
                        "hapi-swagger": {
                            responses: {
                                200: {
                                    description: "Agregado",
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
                    tags: ["api", "email", "coordinador"],
                    validate: {
    
                    },
                },
            },
            {
                method: "PUT",
                path: "/email/{id}",
                options: {
                    auth: "firebase",
                    description: "Actualizar email",
                    handler: emailController.actualizarEquipo,
                    plugins: {
                        "hapi-swagger": {
                            responses: {
                                200: {
                                    description: "Equipo actualizada.",
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
                method: "DELETE",
                path: "/email/{id}",
                options: {
                    auth: "firebase",
                    description: "Eliminamos email",
                    handler: emailController.eliminarEquipo,
                    plugins: {
                        "hapi-swagger": {
                            responses: {
                                200: {
                                    description: "Equipo eliminada.",
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
            } */
    ]);
}
exports.default = default_1;
//# sourceMappingURL=routes.js.map