import * as Hapi from "hapi";
import * as socketio from "socket.io";
import { IServerConfigurations } from "../../configurations";
import JornadaController from "./jornada-controller";
import * as JornadaValidator from "./jornada-validator";

export default function(server: Hapi.Server, io: socketio.Server, serverConfigs: IServerConfigurations) {

    const jornadaController = new JornadaController(serverConfigs, io);
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
            validate: {

            },
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
            validate: {

            },
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
            validate: {

            },
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
            validate: {

            },
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
            validate: {

            },
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
                validate: {

                },
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
                validate: {

                },
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
                validate: {

                },
            },
        },
        {
            method: "GET",
            path: "/jornada/persona/{id}",
            options: {
                auth: false,
                description: "Trae informacion de confirmacion para un hash",
                handler: jornadaController.getPersonasHash,
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
                validate: {

                },
            },
        },
        {
            method: "PUT",
            path: "/jornada/persona/{id}",
            options: {
                auth: false,
                description: "Guarda informacion de confirmacion para un hash",
                handler: jornadaController.setPersonasHash,
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
                validate: {

                },
            },
        }]);
}
