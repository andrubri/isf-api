import * as Hapi from "hapi";
import * as socketio from "socket.io";
import {IServerConfigurations} from "../../configurations";
import UserController from "./user-controller";
import * as UserValidator from "./user-validator";

export default function (server: Hapi.Server, io: socketio.Server, serverConfigs: IServerConfigurations) {

    const userController = new UserController(serverConfigs, io);
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
        },
        {
            method: "GET",
            path: "/user/perfiles",
            options: {
                auth: "firebase",
                description: "Devuelve los perfiles de los usuarios",
                handler: userController.obtenerPerfiles,
                plugins: {
                    "hapi-swagger": {
                        responses: {
                            200: {
                                description: "Devuelve los perfiles de los usuarios",
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
