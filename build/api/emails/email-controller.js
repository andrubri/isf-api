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
            const msg = {
                to: 'tom.manrey@gmail.com',
                from: this.configurations.sender,
                subject: 'First email with SendGrid',
                text: 'and easy to do anywhere, even with Node.js',
                html: '<strong>and easy to do anywhere, even with Node.js</strong>',
            };
            sgMail.send(msg);
            return response.response("Mail enviado").code(200);
        });
    }
}
exports.EmailController = EmailController;
//# sourceMappingURL=email-controller.js.map