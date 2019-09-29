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
const firebase_1 = require("../../lib/firebase");
const HapiFirebaseAuth = require('hapi-firebase-auth');
const register = (server, options) => __awaiter(this, void 0, void 0, function* () {
    try {
        const serverConfig = options.serverConfigs;
        yield server.register({ plugin: HapiFirebaseAuth });
        return setAuthStrategy(server, serverConfig.firebase);
    }
    catch (err) {
        console.log(`Error registering firebase-auth plugin: ${err}`);
        throw err;
    }
});
const setAuthStrategy = (server, config) => __awaiter(this, void 0, void 0, function* () {
    server.auth.strategy('firebase', 'firebase', {
        instance: firebase_1.default.get()
    });
    return;
});
exports.default = () => {
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
//# sourceMappingURL=index.js.map