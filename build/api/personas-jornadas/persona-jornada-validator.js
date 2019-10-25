"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
exports.jwtValidator = Joi.object({ authorization: Joi.string().required() }).unknown();
//# sourceMappingURL=persona-jornada-validator.js.map