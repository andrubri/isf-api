import * as Hapi from "hapi";
import * as socketio from "socket.io";
import {IServerConfigurations} from "../../configurations";
import EquipoController from "./equipo-controller";
import * as UserValidator from "./equipo-validator";

export default function (server: Hapi.Server, io: socketio.Server, serverConfigs: IServerConfigurations) {

    const equipoController = new EquipoController(serverConfigs, io);
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
                validate: {

                },
            },
        },
        {
            method: "POST",
            path: "/equipo/{id}/coordinador",
            options: {
                auth: "firebase",
                description: "Agregamos un coordinador al equipo",
                handler: equipoController.addCoordinadoresEquipo,
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
                tags: ["api", "equipo", "coordinador"],
                validate: {

                },
            },
        },
        {
            method: "GET",
            path: "/equipo/{id}/voluntario",
            options: {
                auth: "firebase",
                description: "Trae los voluntarios de una equipo",
                handler: equipoController.obtenerVoluntariosXId,
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
                tags: ["api", "equipo", "coordinador"],
                validate: {

                },
            },
        },
        {
            method: "POST",
            path: "/equipo/{id}/voluntario",
            options: {
                auth: "firebase",
                description: "Agregamos un voluntario al equipo",
                handler: equipoController.addVoluntariosEquipo,
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
                tags: ["api", "equipo", "coordinador"],
                validate: {

                },
            },
        },
        {
            method: "GET",
            path: "/equipo/{id}/jornada",
            options: {
                auth: "firebase",
                description: "Trae las jornadas de una equipo",
                handler: equipoController.obtenerJornadasXId,
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
                tags: ["api", "equipo", "coordinador"],
                validate: {

                },
            },
        },
        {
            method: "POST",
            path: "/equipo/{id}/jornada",
            options: {
                auth: "firebase",
                description: "Agrego una jornada al equipo",
                handler: equipoController.addJornadasEquipo,
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
                tags: ["api", "equipo", "coordinador"],
                validate: {

                },
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
