"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schedule = require('node-schedule');
class EmailService {
    constructor() {
    }
    ;
    static sendEmailEveryDay() {
        const emailSchedule = schedule.scheduleJob('*/20 * * * * *', function () {
            console.log('Test email cron function!');
        });
    }
    ;
}
exports.EmailService = EmailService;
//# sourceMappingURL=email-service.js.map