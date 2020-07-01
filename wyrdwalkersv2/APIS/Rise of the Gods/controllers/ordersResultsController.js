var express = require('../../node_modules/express');
var router = express.Router();
var mongo = require("../../node_modules/mongodb");
var ResultsService = require("../services/ordersResultsService");

router.get('/all', function(req, res) {
    var SearchQuery = {};
    ResultsService.GetResults(SearchQuery).then((response) => {
        res.json(response);
    });
});

router.get('/player/:id', function(req, res) {
    var SearchQuery = {
        playerID: req.params.id
    };
    ResultsService.GetResults(SearchQuery).then((response) => {
        res.json(response);
    });
});

router.get('/game/:id', function(req, res) {
    var SearchQuery = {
        gameID: req.params.id
    };
    ResultsService.GetResults(SearchQuery).then((response) => {
        res.json(response);
    });
});

router.put('/:id', function(req, res) {
    var filter = req.body;

    if (!filter) {
        res.status(404).send(`Filter sent is empty`)
    } else {
        try {
            var SearchQuery = {
                playerID: filter.playerID,
                turn: filter.turn
            };
            var updateQuery = {
                $set: {
                    fate: data.fate
                }
            };
            ResultsService.UpdatePlayers(SearchQuery, updateQuery).then(response => {
                res.json(response);
            });
        } catch (e) {
            console.log(e);
        }
    }
});

module.exports = router;