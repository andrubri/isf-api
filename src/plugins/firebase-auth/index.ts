import { IPlugin, IPluginOptions } from '../interfaces';
import * as Hapi from 'hapi';
import * as firebase from 'firebase-admin';
import {ServiceAccount} from "firebase-admin";
import FirebaseAdmin from "../../lib/firebase";


const HapiFirebaseAuth = require('hapi-firebase-auth');

const register = async (server: Hapi.Server, options: IPluginOptions): Promise<void> => {
    try {
        const serverConfig = options.serverConfigs;

        await server.register({ plugin: HapiFirebaseAuth });

        return setAuthStrategy(server, serverConfig.firebase);

    } catch (err) {
        console.log(`Error registering firebase-auth plugin: ${err}`);
        throw err;
    }
};

const setAuthStrategy = async (server, config: ServiceAccount) => {

    server.auth.strategy('firebase', 'firebase', {
        instance: FirebaseAdmin.get()
    });

    return;
};

export default (): IPlugin => {
    return {
        register,
        info: () => {
            return {
                name: 'FireBase Authentication',
                version: '1.0.0'
            };
        }
    };
};
