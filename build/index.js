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
const Server = require("./server");
const Configs = require("./configurations");
const database_1 = require("./database");
console.log(`Running enviroment ${process.env.NODE_ENV || 'dev'}`);
// Catch unhandling unexpected exceptions
process.on('uncaughtException', (error) => {
    console.error(`uncaughtException ${error.message}`);
});
// Catch unhandling rejected promises
process.on('unhandledRejection', (reason) => {
    console.error(`unhandledRejection ${reason}`);
});
// Define async start function
// Init Database
const dbConfigs = Configs.getDatabaseConfig();
new database_1.DBSquelize(dbConfigs);
// Starting Application Server
const serverConfigs = Configs.getServerConfigs();
console.log("configPath: " + Configs.getPath());
// Start the server
const start = ({ config }) => __awaiter(this, void 0, void 0, function* () {
    try {
        const server = yield Server.init(config);
        yield server.start();
        console.log('Server running at: ' + server.info.uri);
    }
    catch (err) {
        console.error('Error starting server: ', err.message);
        throw err;
    }
});
start({
    config: serverConfigs
});
//# sourceMappingURL=index.js.map