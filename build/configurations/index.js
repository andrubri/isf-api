"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nconf = require("nconf");
const path = require("path");
// Read Configurations
const configs = new nconf.Provider({
    argv: true,
    env: true,
    store: {
        file: getPath(),
        type: "file",
    },
});
function getPath() {
    return path.join(__dirname, `./config.${process.env.NODE_ENV || "dev"}.json`);
}
exports.getPath = getPath;
function getDatabaseConfig() {
    return configs.get("database");
}
exports.getDatabaseConfig = getDatabaseConfig;
function getEmailConfig() {
    return configs.get("email");
}
exports.getEmailConfig = getEmailConfig;
function getServerConfigs() {
    return configs.get("server");
}
exports.getServerConfigs = getServerConfigs;
//# sourceMappingURL=index.js.map