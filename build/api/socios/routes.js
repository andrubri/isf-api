"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socios_controller_1 = require("./socios-controller");
function default_1(server, io, serverConfigs) {
    const sociosController = new socios_controller_1.default(serverConfigs, io);
    server.bind(sociosController);
    server.route([
        {
            method: 'GET',
            path: '/socio',
            options: {
                handler: sociosController.obtenerAll,
                auth: 'firebase',
                tags: ['api', 'socios'],
                description: 'Obtengo todos los socios.',
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
            path: '/socio/estado',
            options: {
                handler: sociosController.obtenerEstados,
                auth: 'firebase',
                tags: ['api', 'socios'],
                description: 'Obtengo todos los estados de socios.',
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
            path: '/socio/{id}',
            options: {
                handler: sociosController.obtenerSocioXId,
                auth: 'firebase',
                tags: ['api', 'socio'],
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
            path: '/socio',
            options: {
                handler: sociosController.crear,
                auth: 'firebase',
                tags: ['api', 'socio'],
                description: 'Crear socio',
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
            path: '/socio/{id}',
            options: {
                handler: sociosController.actualizar,
                auth: 'firebase',
                tags: ['api', 'socio'],
                description: 'Actualizar socio',
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
            path: '/socio/{id}',
            options: {
                handler: sociosController.eliminar,
                auth: 'firebase',
                tags: ['api', 'socio'],
                description: 'socio usuario',
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
            path: '/socios/estados',
            options: {
                handler: sociosController.ultimaActEstado,
                auth: 'firebase',
                tags: ['api', 'socio'],
                description: 'socio usuario',
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
            path: '/socios/estados',
            options: {
                payload: {
                    output: "file",
                    parse: true
                },
                handler: sociosController.actualizarEstados,
                auth: 'firebase',
                tags: ['api', 'socio'],
                description: 'socio usuario',
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