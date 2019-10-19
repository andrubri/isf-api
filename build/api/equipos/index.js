"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routes_1 = require("./routes");
function init(server, io, configs) {
    routes_1.default(server, io, configs);
}
exports.init = init;
//# sourceMappingURL=index.js.map