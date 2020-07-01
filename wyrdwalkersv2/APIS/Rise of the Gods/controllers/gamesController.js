var express = require('../../node_modules/express');
var router = express.Router();
var mongo = require("../../node_modules/mongodb");
var MongoClient = mongo.MongoClient;
var MONGO_CONNECT = "mongodb://localhost/riseofthegods";
var DB_NAME = "games";
var GameService = require("../services/gamesService");
var PlayerService = require("../services/playersService");
var TerritoryService = require("../services/territoryService");
var OrderService = require("../services/ordersService");
var PlayerHistoryService = require("../services/playerHistoryService");
var OrderResultService = require("../services/ordersResultsService");

router.get('/all', function(req, res) {
    try {
        var SearchQuery = {};
        GameService.GetGame(SearchQuery).then((response) => {
            res.json(response);
        });
    } catch (e) {
        console.log(e);
    }
});

router.get('/:id', function(req, res) {
    try {
        var SearchQuery = {
            _id: new mongo.ObjectID(req.params.id)
        };
        GameService.GetGame(SearchQuery).then((response) => {
            res.json(response);
        });
    } catch (e) {
        console.log(e);
    }
});

router.delete('/:id', function(req, res) {
    try {
        var SearchQuery = {
            _id: new mongo.ObjectID(req.params.id)
        };
        var promises = [
            GameService.DeleteGame(SearchQuery),
            TerritoryService.DeleteTerritories({ gameID: req.params.id }),
            OrderService.DeleteOrders({ gameID: req.params.id }),
            PlayerService.DeletePlayers({ gameID: req.params.id }),
            PlayerHistoryService.DeleteHistory({ gameID: req.params.id }),
            OrderResultService.DeleteResults({ gameID: req.params.id })
        ];
        Promise.all(promises).then(response => {
            res.json(response)
        });
    } catch (e) {
        console.log(e);
    }
});

router.get('/start/:id', function(req, res) {
    try {
        var start = new Date().toUTCString();
        var end = new Date();
        end.setDate(new Date().getDate() + 7);
        var SearchQuery = {
            _id: new mongo.ObjectID(req.params.id)
        };
        var updateQuery = {
            $set: {
                running: true,
                startDate: start,
                endDate: end.toUTCString(),
                turn: 1
            }
        };
        GameService.GetGame(SearchQuery).then(response => {
            var game = response[0];
            if (game) {
                var nbPlayers = game.playersIds.length;
                var promises = [
                    GameService.UpdateGame(SearchQuery, updateQuery),
                    TerritoryService.AddNewGameTerritories(req.params.id, nbPlayers),
                    PlayerService.UpdatePlayers({ gameID: req.params.id }, { $set: { turnReady: false } })
                ];
                Promise.all(promises).then(() => {
                    res.json(game);
                });
            }
        });

    } catch (e) {
        console.log(e);
    }
});

router.get('/informations/:id', function(req, res) {
    try {
        var gameId = req.params.id;
        var promises = [
            GameService.GetGame({ _id: new mongo.ObjectID(gameId) }),
            PlayerService.GetPlayers({ gameID: gameId }),
            TerritoryService.GetTerritory({ gameID: gameId }),
            OrderService.GetOrders({ gameID: gameId })
        ];
        Promise.all(promises).then(values => {
            var sendObject = {
                game: values[0],
                players: values[1],
                planes: values[2],
                orders: values[3]
            };
            res.json(sendObject);
        });

    } catch (e) {
        console.log(e);
    }
});

router.get('/fatebindings/:gameId/:playerId', function(req, res) {
    try {
        GameService.GetFateConsequence(req.params.playerId, req.params.gameId).then(response => {
            var promises = [
                PlayerService.ZeroNegativeResources(req.params.gameId),
                TerritoryService.ZeroNegativeTerritories(req.params.gameId)
            ];
            Promise.all(promises).then(() => {
                res.json(response);
            });
        });

    } catch (e) {
        console.log(e);
    }
});

router.get('/endturn/:id', function(req, res) {
    try {
        PlayerService.UpdatePlayers({ gameID: req.params.id }, { $set: { turnReady: false } }).then(() => {
            GameService.ProcessGames(true, req.params.id).then(response => {
                var game = response;
                res.json(response);
            });
        });


    } catch (e) {
        console.log(e);
    }
});

router.post('/', function(req, res) {
    var data = req.body;

    if (!data) {
        res.status(404).send(`Data sent is empty`)
    } else {
        GameService.AddGame(data).then((response) => {
            var insertedGameId = response.insertedId.toString();
            res.json(response);
        });
    }
});

router.put('/:id', function(req, res) {
    try {
        var data = req.body;
        var SearchQuery = {
            _id: new mongo.ObjectID(req.params.id)
        };
        var updateQuery = {
            $set: {
                name: data.name,
                playersIds: data.playersIds,
                startDate: data.startDate,
                endDate: data.endDate,
                closed: data.closed,
                running: data.running,
                locked: data.locked,
                readyRequired: data.readyRequired
            }
        };
        GameService.UpdateGame(SearchQuery, updateQuery).then(response => {
            res.json(response);
        });
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;