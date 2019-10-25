import * as Hapi from "hapi";
import * as socketio from "socket.io";
import {IServerConfigurations} from "../../configurations";
import PersonaController from "./persona-controller";
import * as PersonaValidator from "./persona-validator";

export default function (server: Hapi.Server, io: socketio.Server, serverConfigs: IServerConfigurations) {

    const jornadaController = new PersonaController(serverConfigs, io);
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
        }]);
}
