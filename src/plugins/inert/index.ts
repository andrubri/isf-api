import * as  Inert from '@hapi/inert';
import {IPlugin} from '../interfaces';
import * as Hapi from 'hapi';

const register = async (server: Hapi.Server): Promise<void> => {
    try {
        return server.register(Inert);
    } catch (err) {
        console.log(`Error registering Inert plugin: ${err}`);
        throw err;
    }
};

export default (): IPlugin => {
    return {
        register,
        info: () => {
            return {
                name: 'Inert',
                version: '1.0.0'
            };
        }
    };
};
