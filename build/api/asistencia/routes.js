"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asistencia_controller_1 = require("./asistencia-controller");
function default_1(server, io, serverConfigs) {
    const asistenciaController = new asistencia_controller_1.default(serverConfigs, io);
    server.bind(asistenciaController);
    server.route([
        {
            method: 'GET',
            path: '/asistencia',
            options: {
                handler: asistenciaController.obtenerAll,
                auth: false,
                tags: ['api', 'asistencia'],
                description: 'Obtengo todos los asistencia.',
                validate: {},
                plugins: {
                    'hapi-swagger': {
                        responses: {
                            '200': {
                                'description': 'Token Verificado.'
                            },
                            '304': {
                                'description': 'No autorizado.'
                            },
                            '500': {
                                'description': 'Error'
                            }
                        }
                    }
                }
            }
        },
        {
            method: 'GET',
            path: '/asistencia/tipos',
            options: {
                handler: asistenciaController.obtenerTipos,
                auth: 'firebase',
                tags: ['api', 'asistencia'],
                description: 'Obtengo todos los asistencia.',
                validate: {},
                plugins: {
                    'hapi-swagger': {
                        responses: {
                            '200': {
                                'description': 'Token Verificado.'
                            },
                            '304': {
                                'description': 'No autorizado.'
                            },
                            '500': {
                                'description': 'Error'
                            }
                        }
                    }
                }
            }
        },
        {
            method: 'GET',
            path: '/asistencia/estado',
            options: {
                handler: asistenciaController.obtenerEstados,
                auth: 'firebase',
                tags: ['api', 'asistencia'],
                description: 'Obtengo todos los asistencia.',
                validate: {},
                plugins: {
                    'hapi-swagger': {
                        responses: {
                            '200': {
                                'description': 'Token Verificado.'
                            },
                            '304': {
                                'description': 'No autorizado.'
                            },
                            '500': {
                                'description': 'Error'
                            }
                        }
                    }
                }
            }
        },
        {
            method: 'GET',
            path: '/asistencia/{id}',
            options: {
                handler: asistenciaController.obtenerSocioXId,
                auth: 'firebase',
                tags: ['api', 'asistencia'],
                description: 'Verificar token.',
                validate: {},
                plugins: {
                    'hapi-swagger': {
                        responses: {
                            '200': {
                                'description': 'Token Verificado.'
                            },
                            '304': {
                                'description': 'No autorizado.'
                            },
                            '500': {
                                'description': 'Error'
                            }
                        }
                    }
                }
            }
        },
        {
            method: 'POST',
            path: '/asistencia',
            options: {
                handler: asistenciaController.crear,
                auth: 'firebase',
                tags: ['api', 'asistencia'],
                description: 'Crear asistencia',
                validate: {},
                plugins: {
                    'hapi-swagger': {
                        responses: {
                            '200': {
                                'description': 'Token Verificado.'
                            },
                            '304': {
                                'description': 'No autorizado.'
                            },
                            '500': {
                                'description': 'Error'
                            }
                        }
                    }
                }
            }
        },
        {
            method: 'PUT',
            path: '/asistencia/{id}',
            options: {
                handler: asistenciaController.actualizar,
                auth: 'firebase',
                tags: ['api', 'asistencia'],
                description: 'Actualizar asistencia',
                validate: {},
                plugins: {
                    'hapi-swagger': {
                        responses: {
                            '200': {
                                'description': 'Token Verificado.'
                            },
                            '304': {
                                'description': 'No autorizado.'
                            },
                            '500': {
                                'description': 'Error'
                            }
                        }
                    }
                }
            }
        },
        {
            method: 'DELETE',
            path: '/asistencia/{id}',
            options: {
                handler: asistenciaController.eliminar,
                auth: 'firebase',
                tags: ['api', 'asistencia'],
                description: 'socio asistencia',
                validate: {},
                plugins: {
                    'hapi-swagger': {
                        responses: {
                            '200': {
                                'description': 'Token Verificado.'
                            },
                            '304': {
                                'description': 'No autorizado.'
                            },
                            '500': {
                                'description': 'Error'
                            }
                        }
                    }
                }
            }
        }
    ]);
}
exports.default = default_1;
//# sourceMappingURL=routes.js.map