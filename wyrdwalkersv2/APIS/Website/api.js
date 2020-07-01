var https = require('https');
var fs = require('fs');
var bodyParser = require('body-parser');
var campaigns = require('./controllers/campaigns.js');
var events = require('./controllers/events.js');
var timelines = require('./controllers/timelines.js');
var users = require('./controllers/users.js');
var wiki = require('./controllers/wiki.js');
var activities = require('./controllers/activities.js');
var workshops = require('./controllers/workshops.js');
var assoHistory = require('./controllers/assoHistory.js');
var approaches = require('./controllers/approaches.js');
var domains = require('./controllers/domains.js');
var personalities = require('./controllers/personalities.js');
var origins = require('./controllers/origins.js');
var wikiRedirections = require('./controllers/wiki-redirections.js');
var explorerEntities = require('./controllers/explorer.js');

const express = require("../node_modules/express");
const app = express();
var https_options = {
    key: fs.readFileSync("C:\\inetpub\\Sites\\www\\certificates\\private.key"),
    cert: fs.readFileSync("C:\\inetpub\\Sites\\www\\certificates\\certificate.crt"),
    ca: fs.readFileSync("C:\\inetpub\\Sites\\www\\certificates\\ca_bundle.crt")
};

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json({ limit: '50mb', extended: true })); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    limit: '50mb',
    extended: true
}));

app.use('/api/campaigns', campaigns);
app.use('/api/events', events);
app.use('/api/timelines', timelines);
app.use('/api/users', users);
app.use('/api/wiki', wiki);
app.use('/api/activities', activities);
app.use('/api/workshops', workshops);
app.use('/api/assoHistory', assoHistory);
app.use('/api/approaches', approaches);
app.use('/api/domains', domains);
app.use('/api/personalities', personalities);
app.use('/api/origins', origins);
app.use('/api/wiki-redirections', wikiRedirections);
app.use('/api/explorer', explorerEntities);

var server = https.createServer(https_options, app);

server.listen(3000, "::", function() {
    console.log("Server listening to port 3000");
});