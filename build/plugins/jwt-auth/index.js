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
const register = (server, options) => __awaiter(this, void 0, void 0, function* () {
    try {
        const serverConfig = options.serverConfigs;
        const validateUser = (decoded, request, h) => __awaiter(this, void 0, void 0, function* () {
            /*const user = await database.userModel.findById(decoded.id).lean(true);
            if (!user) {
                return { isValid: false };
            }
*/
            return { isValid: true };
        });
        yield server.register(require('hapi-auth-jwt2'));
        return setAuthStrategy(server, {
            config: serverConfig,
            validate: validateUser
        });
    }
    catch (err) {
        console.log(`Error registering jwt plugin: ${err}`);
        throw err;
    }
});
const setAuthStrategy = (server, { config, validate }) => __awaiter(this, void 0, void 0, function* () {
    server.auth.strategy('jwt', 'jwt', {
        key: config.jwtSecret,
        validate,
        verifyOptions: { algorithms: ['HS256'] }
    });
    server.auth.default('jwt');
    return;
});
exports.default = () => {
    return {
        register,
        info: () => {
            return {
                name: 'JWT Authentication',
                version: '1.0.0'
            };
        }
    };
};
//# sourceMappingURL=index.js.map