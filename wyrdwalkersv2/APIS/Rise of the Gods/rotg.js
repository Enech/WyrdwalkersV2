var https = require('https');
var fs = require('fs');
var bodyParser = require('body-parser');
var games = require('./controllers/gamesController.js');
var players = require('./controllers/playersController.js');
var territories = require('./controllers/territoriesController.js');
var orders = require('./controllers/ordersController');
var results = require('./controllers/ordersResultsController');
var playerHistory = require('./controllers/playerHistoryController');
var GameService = require("./services/gamesService");

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

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

app.use('/rotg/games', games);
app.use('/rotg/players', players);
app.use('/rotg/territories', territories);
app.use('/rotg/orders', orders);
app.use('/rotg/results', results);
app.use('/rotg/history', playerHistory);

var server = https.createServer(https_options, app);

server.listen(2089, "::", function() {
    console.log("Server listening to port 2089");
    var todayMinutes = parseInt(new Date().getMinutes(), 10);
    var diff = 60 - todayMinutes;

    setTimeout(function() {
        setInterval(function() {
            GameService.ProcessGames(false);
        }, 3600 * 1000); // Toutes les heures
    }, diff * 60 * 1000);
});