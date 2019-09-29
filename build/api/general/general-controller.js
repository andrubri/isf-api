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
const estadocivil_1 = require("../../database/estadocivil");
const tipodoc_1 = require("../../database/tipodoc");
const tiporelacion_1 = require("../../database/tiporelacion");
class GeneralController {
    constructor(configs, io) {
        this.configs = configs;
        this.firebaseAdmin = firebase_1.default.get();
    }
    obtenerTipoDoc(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield tipodoc_1.TipoDoc.findAll();
            return result;
        });
    }
    obtenerEstadoCivil(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield estadocivil_1.EstadoCivil.findAll();
            return result;
        });
    }
    obtenerTipoRelacion(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield tiporelacion_1.TipoRelacion.findAll({ where: { fechaBaja: null } });
            return result;
        });
    }
}
exports.default = GeneralController;
//# sourceMappingURL=general-controller.js.map