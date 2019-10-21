"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
exports.jwtValidator = Joi.object({ authorization: Joi.string().required() }).unknown();
exports.personaSchema = Joi.object({
    persona: Joi.object().required()
});
//# sourceMappingURL=persona-validator.js.map