"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("./user-controller");
function default_1(server, io, serverConfigs) {
    const userController = new user_controller_1.default(serverConfigs, io);
    server.bind(userController);
    server.route([{
            method: "GET",
            path: "/user/me",
            options: {
                auth: "firebase",
                description: "Verificar token.",
                handler: userController.obtenerMiUsuario,
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
                tags: ["api", "users"],
                validate: {},
            },
        },
        {
            method: "GET",
            path: "/user",
            options: {
                auth: "firebase",
                description: "Verificar token.",
                handler: userController.obtenerUsuarios,
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
                tags: ["api", "users"],
                validate: {},
            },
        },
        {
            method: "GET",
            path: "/user/{id}",
            options: {
                auth: "firebase",
                description: "Verificar token.",
                handler: userController.obtenerUsuariosXToken,
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
                tags: ["api", "users"],
                validate: {},
            },
        },
        {
            method: "POST",
            path: "/user",
            options: {
                auth: "firebase",
                description: "Crear usuario",
                handler: userController.crearUsuario,
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
                tags: ["api", "users"],
                validate: {},
            },
        },
        {
            method: "PUT",
            path: "/user/{id}",
            options: {
                auth: "firebase",
                description: "Actualizar usuario",
                handler: userController.actualizarUsuario,
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
                tags: ["api", "users"],
                validate: {},
            },
        },
        {
            method: "DELETE",
            path: "/user/{id}",
            options: {
                auth: "firebase",
                description: "Eliminamos usuario",
                handler: userController.eliminarUsuario,
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
                tags: ["api", "users"],
                validate: {},
            },
        }]);
}
exports.default = default_1;
//# sourceMappingURL=routes.js.map