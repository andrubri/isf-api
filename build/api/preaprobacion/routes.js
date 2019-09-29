"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const preaprobacion_controller_1 = require("./preaprobacion-controller");
function default_1(server, io, serverConfigs) {
    const preaprobacionController = new preaprobacion_controller_1.default(serverConfigs, io);
    server.bind(preaprobacionController);
    server.route([
        {
            method: 'GET',
            path: '/preaprobacion',
            options: {
                handler: preaprobacionController.obtenerAll,
                auth: false,
                tags: ['api', 'asistencia'],
                description: 'Obtengo todos las solicitudes de preaprobacion.',
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
            path: '/preaprobacion/me',
            options: {
                handler: preaprobacionController.obtenerMisPreaprobaciones,
                auth: 'firebase',
                tags: ['api', 'asistencia'],
                description: 'Obtengo todos los solicitudes de preaprobacion.',
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
            path: '/preaprobacion/{id}',
            options: {
                handler: preaprobacionController.obtenerPreaprobacionXId,
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
            path: '/preaprobacion',
            options: {
                handler: preaprobacionController.crear,
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
            path: '/preaprobacion/{id}',
            options: {
                handler: preaprobacionController.actualizar,
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
            path: '/preaprobacion/{id}',
            options: {
                handler: preaprobacionController.eliminar,
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
        },
        {
            method: 'PUT',
            path: '/preaprobacion/{id}/aprobar',
            options: {
                handler: preaprobacionController.aprobar,
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
        },
        {
            method: 'GET',
            path: '/preaprobacion/{id}/rechazar',
            options: {
                handler: preaprobacionController.rechazar,
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
        },
        {
            method: 'PUT',
            path: '/preaprobacion/{id}/DNI',
            options: {
                payload: {
                    output: "file",
                    parse: true
                },
                handler: preaprobacionController.uploadDNI,
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
        },
        {
            method: 'PUT',
            path: '/preaprobacion/{id}/CBU',
            options: {
                payload: {
                    output: "file",
                    parse: true
                },
                handler: preaprobacionController.uploadCBU,
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
        },
        {
            method: 'PUT',
            path: '/preaprobacion/{id}/Servicio',
            options: {
                payload: {
                    output: "file",
                    parse: true
                },
                handler: preaprobacionController.uploadServicio,
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
        },
        {
            method: 'PUT',
            path: '/preaprobacion/{id}/Sueldo',
            options: {
                payload: {
                    output: "file",
                    parse: true
                },
                handler: preaprobacionController.uploadSueldo,
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
        },
        {
            method: 'GET',
            path: '/preaprobacion/{id}/DNI',
            options: {
                handler: preaprobacionController.loadDNI,
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
        },
        {
            method: 'GET',
            path: '/preaprobacion/{id}/CBU',
            options: {
                handler: preaprobacionController.loadCBU,
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
        },
        {
            method: 'GET',
            path: '/preaprobacion/{id}/Servicio',
            options: {
                handler: preaprobacionController.loadServicio,
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
        },
        {
            method: 'GET',
            path: '/preaprobacion/{id}/Sueldo',
            options: {
                handler: preaprobacionController.loadSueldo,
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