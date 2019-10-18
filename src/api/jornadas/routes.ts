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
    }]);
}
