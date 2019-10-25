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
const Hapi = require("hapi");
const firebase_1 = require("./lib/firebase");
//apis
const Users = require("./api/users");
const Equipos = require("./api/equipos");
const Jornadas = require("./api/jornadas");
const Personas = require("./api/personas");
const socketio = require("socket.io");
const PersonasJornadas = require("./api/personas-jornadas");
function init(configs) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const port = process.env.PORT || configs.port;
            const server = new Hapi.Server({
                port: port,
                routes: {
                    cors: {
                        origin: ['*'],
                        additionalHeaders: ['x-token-token']
                    }
                }
            });
            //Socket.IO
            const io = socketio(server.listener);
            io.on("connection", function (socket) {
                console.log('connected');
            });
            if (configs.routePrefix) {
                server.realm.modifiers.route.prefix = configs.routePrefix;
            }
            // Setup Libs
            new firebase_1.default(configs);
            //  Setup Hapi Plugins
            const plugins = configs.plugins;
            const pluginOptions = {
                serverConfigs: configs
            };
            let pluginPromises = [];
            plugins.forEach((pluginName) => {
                var plugin = require('./plugins/' + pluginName).default();
                console.log(`Register Plugin ${plugin.info().name} v${plugin.info().version}`);
                pluginPromises.push(plugin.register(server, pluginOptions));
            });
            yield Promise.all(pluginPromises);
            console.log('All plugins registered successfully.');
            console.log('Register Routes');
            Users.init(server, io, configs);
            Equipos.init(server, io, configs);
            Jornadas.init(server, io, configs);
            Personas.init(server, io, configs);
            PersonasJornadas.init(server, io, configs);
            console.log('Routes registered sucessfully.');
            return server;
        }
        catch (err) {
            console.log('Error starting server: ', err);
            throw err;
        }
    });
}
exports.init = init;
//# sourceMappingURL=server.js.map