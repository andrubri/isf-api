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
const configurations_1 = require("../../configurations");
const equipo_1 = require("../../database/entidades/equipo");
const persona_1 = require("../../database/entidades/persona");
const sgMail = require('@sendgrid/mail');
class EmailController {
    constructor(configs, io) {
        this.configs = configs;
        this.firebaseAdmin = firebase_1.default.get();
        this.configurations = configurations_1.getEmailConfig();
        sgMail.setApiKey(this.configurations.api_key);
    }
    enviarEmail(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            this.prepareEmail('tom.manrey@gmail.com', 'Hola ISF', 'Cyber');
            return response.response("Mail enviado").code(200);
        });
    }
    sendMailToEquipoMembers(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const exist = yield equipo_1.Equipo.findOne({ where: { idEquipo: request.params.id } });
            if (exist) {
                const voluntariosFound = yield persona_1.Persona.findAll({
                    include: [{
                            model: equipo_1.Equipo,
                            through: { where: { idEquipo: exist.idEquipo } },
                            required: true
                        }],
                });
                voluntariosFound.forEach(voluntario => this.prepareEmail(voluntario.email, request.payload.mensaje, exist.nombre));
                return voluntariosFound;
            }
            else {
                return response.response("Equipo no encontrado").code(400);
            }
        });
    }
    prepareEmail(email, mensaje, equipo) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = {
                to: email,
                from: this.configurations.sender,
                subject: 'ISF llamdado',
                text: mensaje,
                html: `<strong>${mensaje}</strong><br><strong>Recibis este mail
            por estar en el equipo ${equipo}</strong> `,
            };
            sgMail.send(msg);
        });
    }
}
exports.EmailController = EmailController;
//# sourceMappingURL=email-controller.js.map