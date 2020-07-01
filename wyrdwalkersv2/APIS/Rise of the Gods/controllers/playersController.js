var express = require('../../node_modules/express');
var router = express.Router();
var mongo = require("../../node_modules/mongodb");
var GameService = require("../services/gamesService");
var PlayerService = require("../services/playersService");

router.get('/game/:id', function(req, res) {
    var SearchQuery = {
        gameID: req.params.id
    };
    PlayerService.GetPlayers(SearchQuery).then((response) => {
        res.json(response);
    });
});

router.get('/all', function(req, res) {
    try {
        var SearchQuery = {};
        PlayerService.GetPlayers(SearchQuery).then((response) => {
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
        PlayerService.GetPlayers(SearchQuery).then((response) => {
            res.json(response);
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
        PlayerService.AddPlayer(data).then((response) => {
            try {
                GameService.UpdateGame({ _id: new mongo.ObjectID(data.gameID) }, { $push: { playersIds: response.insertedId.toString() } })
                    .then((update) => {
                        res.json(update);
                    })
            } catch (e) {
                console.log(e);
            }
        });
    }
});

router.put('/:id', function(req, res) {
    var data = req.body;

    if (!data) {
        res.status(404).send(`Data sent is empty`)
    } else {
        try {
            var SearchQuery = {
                _id: new mongo.ObjectID(req.params.id)
            };
            var updateQuery = {
                $set: {
                    turnReady: data.turnReady
                }
            };
            PlayerService.UpdatePlayers(SearchQuery, updateQuery).then(response => {
                res.json(response);
            });
        } catch (e) {
            console.log(e);
        }
    }
});

router.put('/ready/:id', function(req, res) {
    var data = req.body;

    if (!data) {
        res.status(404).send(`Data sent is empty`)
    } else {
        try {
            var SearchQuery = {
                _id: new mongo.ObjectID(req.params.id)
            };
            var updateQuery = {
                $set: {
                    turnReady: data.turnReady
                }
            };
            if (data.turnReady) {
                PlayerService.UpdatePlayers(SearchQuery, updateQuery).then(response => {
                    PlayerService.GetPlayers({ gameID: data.gameID }).then(players => {
                        var allReady = players.every(e => e.turnReady);
                        if (allReady) {
                            GameService.UpdateGame({ _id: new mongo.ObjectID(data.gameID) }, { $set: { readyRequired: false } }).then(update => {
                                res.json(update);
                            });
                        } else {
                            res.json(response);
                        }
                    });
                });
            } else {
                PlayerService.UpdatePlayers(SearchQuery, updateQuery).then(response => {
                    GameService.UpdateGame({ _id: new mongo.ObjectID(data.gameID) }, { $set: { readyRequired: false } }).then(update => {
                        res.json(update);
                    });
                });
            }
        } catch (e) {
            console.log(e);
        }
    }
});

module.exports = router;