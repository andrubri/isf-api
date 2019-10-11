"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actividad_controller_1 = require("./actividad-controller");
function default_1(server, io, serverConfigs) {
    const userController = new actividad_controller_1.default(serverConfigs, io);
    server.bind(userController);
    server.route([{
            method: "GET",
            path: "/actividad",
            options: {
                auth: "firebase",
                description: "Trae todas las actividad",
                handler: userController.obtenerActividad,
                plugins: {
                    "hapi-swagger": {
                        responses: {
                            200: {
                                description: "Devuelve datos de las actividades",
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
                tags: ["api", "actividad"],
                validate: {},
            },
        },
        {
            method: "GET",
            path: "/actividad/{id}",
            options: {
                auth: "firebase",
                description: "Trae la informacion de una actividad determinada",
                handler: userController.obtenerActividadXId,
                plugins: {
                    "hapi-swagger": {
                        responses: {
                            200: {
                                description: "Trae los datos de la actividad",
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
                tags: ["api", "actividad"],
                validate: {},
            },
        },
        {
            method: "POST",
            path: "/actividad",
            options: {
                auth: "firebase",
                description: "Crear actividad",
                handler: userController.crearActividad,
                plugins: {
                    "hapi-swagger": {
                        responses: {
                            200: {
                                description: "Actividad creada.",
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
                tags: ["api", "actividad"],
                validate: {},
            },
        },
        {
            method: "PUT",
            path: "/actividad/{id}",
            options: {
                auth: "firebase",
                description: "Actualizar actividad",
                handler: userController.actualizarActividad,
                plugins: {
                    "hapi-swagger": {
                        responses: {
                            200: {
                                description: "Actividad actualizada.",
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
                tags: ["api", "actividad"],
                validate: {},
            },
        },
        {
            method: "DELETE",
            path: "/actividad/{id}",
            options: {
                auth: "firebase",
                description: "Eliminamos actividad",
                handler: userController.eliminarActividad,
                plugins: {
                    "hapi-swagger": {
                        responses: {
                            200: {
                                description: "Actividad eliminada.",
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
                tags: ["api", "actividad"],
                validate: {},
            },
        }]);
}
exports.default = default_1;
//# sourceMappingURL=routes.js.map