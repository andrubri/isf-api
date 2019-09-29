"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const general_controller_1 = require("./general-controller");
function default_1(server, io, serverConfigs) {
    const generalController = new general_controller_1.default(serverConfigs, io);
    server.bind(generalController);
    server.route([
        {
            method: 'GET',
            path: '/tipodoc',
            options: {
                handler: generalController.obtenerTipoDoc,
                auth: 'firebase',
                tags: ['api', 'tipodocs'],
                description: 'Obtengo todos los tipos de documento.',
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
            path: '/estadocivil',
            options: {
                handler: generalController.obtenerEstadoCivil,
                auth: 'firebase',
                tags: ['api', 'estadosciviles'],
                description: 'Obtengo todos los estados civiles.',
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
            path: '/tiporelacion',
            options: {
                handler: generalController.obtenerTipoRelacion,
                auth: 'firebase',
                tags: ['api', 'estadosciviles'],
                description: 'Obtengo todos los TipoRelacion.',
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