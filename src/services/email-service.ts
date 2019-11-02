const schedule = require('node-schedule');

export class EmailService {

    constructor() {

    };

    public static sendEmailEveryDay(): void {

        const emailSchedule = schedule.scheduleJob('*/50 * * * * *', function () {
            console.log('Test email cron function!');
        });

    };
}