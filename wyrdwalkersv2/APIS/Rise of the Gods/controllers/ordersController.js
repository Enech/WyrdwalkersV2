var express = require('../../node_modules/express');
var router = express.Router();
var mongo = require("../../node_modules/mongodb");
var MongoClient = mongo.MongoClient;
var MONGO_CONNECT = "mongodb://localhost/riseofthegods";
var DB_NAME = "players";
var GameService = require("../services/gamesService");
var PlayerService = require("../services/playersService");
var OrderService = require("../services/ordersService");

router.get('/game/:id', function(req, res) {
    var SearchQuery = {
        gameID: req.params.id
    };
    OrderService.GetOrders(SearchQuery).then((response) => {
        res.json(response);
    });
});

router.get('/player/:id', function(req, res) {
    var SearchQuery = {
        "parameters.playerID": req.params.id
    };
    OrderService.GetOrders(SearchQuery).then((response) => {
        res.json(response);
    });
});

router.get('/all', function(req, res) {
    var SearchQuery = {};
    OrderService.GetOrders(SearchQuery).then((response) => {
        res.json(response);
    });
});

router.get('/:id', function(req, res) {
    var SearchQuery = {
        _id: new mongo.ObjectID(req.params.id)
    };
    OrderService.GetOrders(SearchQuery).then((response) => {
        res.json(response);
    });
});

router.post('/', function(req, res) {
    var data = req.body;

    if (!data) {
        res.status(404).send(`Data sent is empty`)
    } else {
        OrderService.AddOrder(data).then(() => {
            PlayerService.ResetBonuses(data.parameters.playerID).then(() => {
                OrderService.GetOrders({ gameID: data.gameID }).then(response => {
                    res.json(response);
                });
            });
        });
    }
});

module.exports = router;