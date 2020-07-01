var express = require('../../node_modules/express');
var router = express.Router();
var mongo = require("../../node_modules/mongodb");
var PlayerHistoryService = require("../services/playerHistoryService");

router.get('/all', function(req, res) {
    var SearchQuery = {};
    PlayerHistoryService.GetHistory(SearchQuery).then((response) => {
        res.json(response);
    });
});

router.get('/player/:id', function(req, res) {
    var SearchQuery = {
        playerID: req.params.id
    };
    PlayerHistoryService.GetHistory(SearchQuery).then((response) => {
        res.json(response);
    });
});

router.get('/game/:id', function(req, res) {
    var SearchQuery = {
        gameID: req.params.id
    };
    PlayerHistoryService.GetHistory(SearchQuery).then((response) => {
        res.json(response);
    });
});

module.exports = router;