const models = require('../models/index');

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'routes works',
    }));

    app.get('/api/event', (req, res) => {
        getEvents(req, res);
    });
    app.post('/api/event', (req, res) => {
        setEvents(req, res);
    });
};

async function setEvents(req, res) {
    let emailReceivers = [], createdEmailReceivers = [], createdEvent;
    const receivers = req.body.receivers.split(',');

    if(receivers.length > 0) {
        createdEvent = await models.Event.create(req.body);
        receivers.forEach(rec => emailReceivers.push({eventId: createdEvent.dataValues.id, receiver: rec}));
        createdEmailReceivers = await models.emailReceiver.bulkCreate(emailReceivers);

        if(createdEvent.dataValues && createdEmailReceivers.length > 0) {
            res.status(200).send(createdEmailReceivers);
        } else res.status(404).send({message: 'Something went wrong'});
    } else {
        res.status(300).send({});
    }
}