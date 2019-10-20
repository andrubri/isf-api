"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const equipo_controller_1 = require("./equipo-controller");
function default_1(server, io, serverConfigs) {
    const equipoController = new equipo_controller_1.default(serverConfigs, io);
    server.bind(equipoController);
    server.route([{
            method: "GET",
            path: "/equipo",
            options: {
                auth: "firebase",
                description: "Trae todas las equipo",
                handler: equipoController.obtenerEquipo,
                plugins: {
                    "hapi-swagger": {
                        responses: {
                            200: {
                                description: "Devuelve datos de las equipoes",
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
                tags: ["api", "equipo"],
                validate: {},
            },
        },
        {
            method: "POST",
            path: "/equipo",
            options: {
                auth: "firebase",
                description: "Crear equipo",
                handler: equipoController.crearEquipo,
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
                tags: ["api", "equipo"],
                validate: {},
            },
        },
        {
            method: "GET",
            path: "/equipo/{id}",
            options: {
                auth: "firebase",
                description: "Trae la informacion de una equipo determinada",
                handler: equipoController.obtenerEquipoXId,
                plugins: {
                    "hapi-swagger": {
                        responses: {
                            200: {
                                description: "Trae los datos de la equipo",
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
                tags: ["api", "equipo"],
                validate: {},
            },
        },
        {
            method: "GET",
            path: "/equipo/{id}/coordinador",
            options: {
                auth: "firebase",
                description: "Trae los coordinadores de una equipo",
                handler: equipoController.obtenerCoordinadoresXId,
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
                tags: ["api", "equipo", "coordinador"],
                validate: {},
            },
        },
        {
            method: "PUT",
            path: "/equipo/{id}",
            options: {
                auth: "firebase",
                description: "Actualizar equipo",
                handler: equipoController.actualizarEquipo,
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
                tags: ["api", "equipo"],
                validate: {},
            },
        },
        {
            method: "DELETE",
            path: "/equipo/{id}",
            options: {
                auth: "firebase",
                description: "Eliminamos equipo",
                handler: equipoController.eliminarEquipo,
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
                tags: ["api", "equipo"],
                validate: {},
            },
        }]);
}
exports.default = default_1;
//# sourceMappingURL=routes.js.map