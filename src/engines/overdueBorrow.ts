import * as schedule from "node-schedule";
import {Borrow} from "../models/borrow";
export class OverdueBorrow {
    rule: schedule.RecurrenceRule;
    constructor() {
        this.rule = new schedule.RecurrenceRule();
        this.rule.hour = 6;
        this.rule.minute = 0;
    }

    public execute() {
        schedule.scheduleJob(this.rule, async function() {
            try {
                const borrows = await Borrow.find({
                    status: 'inProgress',
                    endDate: { $lt: new Date().setHours(0,0,0,0)}
                })

                for (const borrow of borrows) {
                    //sendBorrowExpiredNotificationEmail(borrow._id.toString()).then()
                    await Borrow.findByIdAndUpdate(borrow._id, {status: 'overdue'})
                }
            } catch (e) {
                console.log(e)
            }
        });


    }
}

export default new OverdueBorrow();