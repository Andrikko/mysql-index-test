const CronJob = require('cron').CronJob;
var moment = require('moment');
const models = require('../models/index');
const Op = require('sequelize').Op;

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'loza.andriy7@gmail.com',
        pass: 'andriko1997'
    }
});

// module.exports.runEventsJob = function () {
//     return new CronJob({
//         cronTime: '*/1 * * * *',
//         onTick: job,
//         start: false,
//         timeZone: 'America/Los_Angeles'
//     });
// };


module.exports.job = async function () {
    const currentDate = moment('2019-09-24 17:15')._d;
    const fiveMinutesAgo = moment('2019-09-24 17:00')._d;

    const startDate = new Date();

    let events = await models.Event.findAll({
        where: {
            hour: 17,
            date: {[Op.between]: [fiveMinutesAgo, currentDate]},
            isDeleted: false
        },
        // include: [
        //     {
        //         model: models.emailReceiver,
        //         required: false,
        //         as: 'events_receivers',
        //         attributes: ['receiver']
        //     },
        //     {
        //         model: models.emailTemplate,
        //         required: false,
        //         as: 'emailTemplate',
        //         attributes: ['template']
        //     }
        // ]
    });

    const endDate = new Date();

    const timeDiff = endDate.getTime() - startDate.getTime();
    console.log(timeDiff, events.length);


    // if (events.length > 0) {
    //     let sendMailsPromises = [], ids = [];
    //
    //     events.forEach(event => {
    //         ids.push(event.id);
    //         sendMailsPromises.push(sendEmails(getUniqueReceivers(event), event.emailTemplate.dataValues.template));
    //     });
    //
    //     Promise.all(sendMailsPromises).then(async res => {
    //         await models.Event.update({isDeleted: true}, {where: {id: {[Op.or]: ids}}});
    //     });
    // }
};


async function sendEmails(receivers, templateHtml) {
    const mailOptions = {
        from: 'loza.andriy7@gmail.com',
        to: [receivers],
        subject: 'Delay Email',
        html: templateHtml
    };
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) reject(console.log(err));
            console.log('email Sent', info);
            resolve(info);
        });
    });
}

function getUniqueReceivers(event) {
    let receivers = [];
    event.dataValues.events_receivers.forEach(receiverModel => {
        if (!receivers.includes(receiverModel.dataValues.receiver)) receivers.push(receiverModel.dataValues.receiver);
    });
    return receivers;
}