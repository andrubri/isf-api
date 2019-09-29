"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const register = (server) => __awaiter(this, void 0, void 0, function* () {
    try {
        return server.register([
            require('inert'),
            require('vision'),
            {
                plugin: require('hapi-swagger'),
                options: {
                    info: {
                        title: 'Task Api',
                        description: 'Task Api Documentation',
                        version: '1.0'
                    },
                    tags: [
                        {
                            name: 'tasks',
                            description: 'Api tasks interface.'
                        },
                        {
                            name: 'users',
                            description: 'Api users interface.'
                        }
                    ],
                    swaggerUI: true,
                    documentationPage: true,
                    documentationPath: '/docs'
                }
            }
        ]);
    }
    catch (err) {
        console.log(`Error registering swagger plugin: ${err}`);
    }
});
exports.default = () => {
    return {
        register,
        info: () => {
            return {
                name: 'Swagger Documentation',
                version: '1.0.0'
            };
        }
    };
};
//# sourceMappingURL=index.js.map