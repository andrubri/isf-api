import {IPlugin, IPluginOptions} from '../interfaces';
import * as Hapi from 'hapi';


const hapiSocketIo = require('hapi-socket.io');

const register = async (server: Hapi.Server, options: IPluginOptions): Promise<void> => {
    try {
        return await server.register({
            plugin: hapiSocketIo,
            options: {}
        });

    } catch (err) {
        console.log(`Error registering socket.io plugin: ${err}`);
        throw err;
    }
};


export default (): IPlugin => {
    return {
        register,
        info: () => {
            return {
                name: 'Socket.IO',
                version: '1.0.0'
            };
        }
    };
};
