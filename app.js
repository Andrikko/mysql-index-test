const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');
const app = express();
var moment = require('moment');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const {syncDb} = require('./services/sync');
const {job} = require('./jobs/delayed-email.job');

let models = require('./models');

require('./routes/index')(app);

app.get('*', (req, res) => {
    res.status(200).send({message: 'Welcome to the beginning of nothingness.'});
});

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);
console.log('Server listening on 8000 port');
const server = http.createServer(app);
server.listen(port);



// syncDb();

// recordOneBillionFields();

job();


module.exports = app;

async function recordOneBillionFields() {
    let events = [];

    for (let i = 0; i < 100000; i++) {
        let momentVar = moment('2019-09-24 16:40').add(random(1, 50), 'minutes')._d;
        events.push({
            templateId: 1,
            date: momentVar,
            hour: momentVar.getHours(),
            receivers: "loza.andriy7@gmail.com,dimon4uk.ds@gmail.com"
        });
    }

    await models.Event.bulkCreate(events);
}

function random(min, max) {
    return parseInt(Math.random() * (max - min)) + min;
}