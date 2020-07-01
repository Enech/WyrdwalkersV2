var express = require('../../node_modules/express');
var router = express.Router();
var mongo = require("../../node_modules/mongodb");
var GameService = require("../services/gamesService");
var PlayerService = require("../services/playersService");
var TerritoryService = require("../services/territoryService");

router.get('/all', function(req, res) {
    try {
        var SearchQuery = {};
        TerritoryService.GetTerritory(SearchQuery).then((response) => {
            res.json(response);
        });
    } catch (e) {
        console.log(e);
    }
});

router.get('/:gameId', function(req, res) {
    try {
        var SearchQuery = {
            gameID: req.params.gameId
        };
        TerritoryService.GetTerritory(SearchQuery).then((response) => {
            res.json(response);
        });
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;