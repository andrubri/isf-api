import * as Hapi from 'hapi';
import {IPlugin, IPluginOptions} from './plugins/interfaces';
import { IServerConfigurations} from './configurations';
import FirebaseAdmin from "./lib/firebase";

//apis
import * as Users from './api/users';
import * as socketio from 'socket.io';

export async function init(
    configs: IServerConfigurations
): Promise<Hapi.Server> {
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
        new FirebaseAdmin(configs);

        //  Setup Hapi Plugins
        const plugins: Array<string> = configs.plugins;
        const pluginOptions: IPluginOptions = {
            serverConfigs: configs
        };
        let pluginPromises: Promise<any>[] = [];

        plugins.forEach((pluginName: string) => {
            var plugin: IPlugin = require('./plugins/' + pluginName).default();
            console.log(
                `Register Plugin ${plugin.info().name} v${plugin.info().version}`
            );
            pluginPromises.push(plugin.register(server, pluginOptions));
        });

        await Promise.all(pluginPromises);


        console.log('All plugins registered successfully.');

        console.log('Register Routes');

        Users.init(server, io, configs);

        console.log('Routes registered sucessfully.');
        return server;
    } catch (err) {
        console.log('Error starting server: ', err);
        throw err;
    }
}
