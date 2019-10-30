const schedule = require('node-schedule');

export class EmailService {

    constructor() {

    };

    public static sendEmailEveryDay(): void {

        const emailSchedule = schedule.scheduleJob('*/20 * * * * *', function () {
            console.log('Test email cron function!');
        });

    };
}