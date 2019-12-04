import * as Hapi from "hapi";
import * as socketio from "socket.io";
import { IServerConfigurations } from "../../configurations";
import PersonaController from "./persona-controller";
import * as PersonaValidator from "./persona-validator";
import * as Joi from "joi";


export default function (server: Hapi.Server, io: socketio.Server, serverConfigs: IServerConfigurations) {

    const personaController = new PersonaController(serverConfigs, io);
    server.bind(personaController);

    server.route([
        {
            method: "GET",
            path: "/persona",
            options: {
                auth: "firebase",
                description: "Verificar token.",
                handler: personaController.obtenerPersonas,
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
                tags: ["api", "personas"],
                validate: {},
            },
        },
        {
            method: "GET",
            path: "/persona/{id}",
            options: {
                auth: "firebase",
                description: "Verificar token.",
                handler: personaController.obtenerPersonaXId,
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
                tags: ["api", "personas"],
                validate: {},
            },
        },
        {
            method: "POST",
            path: "/persona",
            options: {
                auth: "firebase",
                description: "Crear Persona",
                handler: personaController.crearPersona,
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
                tags: ["api", "personas"],
                validate: {},
            },
        },
        {
            method: "POST",
            path: "/persona/externo",
            options: {
                auth: false,
                description: "Crear Persona sin Auth",
                handler: personaController.crearPersonaExterno,
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
                tags: ["api", "personas"],
                validate: {},
            },
        },
        {
            method: "PUT",
            path: "/persona/{id}",
            options: {
                auth: "firebase",
                description: "Actualizar Persona",
                handler: personaController.actualizarPersona,
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
                tags: ["api", "personas"],
                validate: {},
            },
        },
        {
            method: "DELETE",
            path: "/persona/{id}",
            options: {
                auth: "firebase",
                description: "Eliminamos Persona",
                handler: personaController.eliminarPersona,
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
                tags: ["api", "personas"],
                validate: {},
            },
        },
        {
            method: "GET",
            path: "/persona/coordinador",
            options: {
                auth: "firebase",
                description: "Trae los coordinadores",
                handler: personaController.obtenerCoordinador,
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
                tags: ["api", "personas"],
                validate: {},
            },
        },
        {
            method: "GET",
            path: "/personas/origencontacto",
            options: {
                auth: false,
                description: "Trae los Origenes de contacto",
                handler: personaController.obtenerOrigenContacto,
                plugins: {
                    "hapi-swagger": {
                        responses: {
                            200: {
                                description: "Trae los Origenes de contacto",
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
                tags: ["api", "personas"],
                validate: {},
            },
        },
        {
            method: "GET",
            path: "/personas/obrasocial",
            options: {
                auth: "firebase",
                description: "Trae las obras sociales",
                handler: personaController.obtenerObraSocial,
                plugins: {
                    "hapi-swagger": {
                        responses: {
                            200: {
                                description: "Trae las obras sociales",
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
                tags: ["api", "personas"],
                validate: {},
            },
        }]);
}
