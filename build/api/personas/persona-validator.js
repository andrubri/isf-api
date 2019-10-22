"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
exports.jwtValidator = Joi.object({ authorization: Joi.string().required() }).unknown();
exports.personaSchema = Joi.object({
    persona: Joi.object().required(),
    origenContacto: Joi.object().required(),
    contactoEmergencia: Joi.object().required(),
    datosSeguro: Joi.object().required(),
    obraSocial: Joi.object().required()
});
//# sourceMappingURL=persona-validator.js.map