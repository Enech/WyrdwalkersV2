var express = require('../../node_modules/express');
var router = express.Router();
var mongo = require("../../node_modules/mongodb");
var MongoClient = mongo.MongoClient;

router.get('/all', function(req, res) {
    MongoClient.connect("mongodb://localhost/wyrdbase", function(error, client) {
        var db = client.db("wyrdbase");
        db.collection("campaigns").find().toArray(function(error, results) {
            if (!results) {
                const err = new Error(`An error occured while fetching all the campaigns`);
                err.status = 404;
                throw err;
            }
            res.json(results);
            client.close();
        });
    });
});

router.get('/:id', function(req, res) {
    MongoClient.connect("mongodb://localhost/wyrdbase", function(error, client) {
        var db = client.db("wyrdbase");
        var campaignID = new mongo.ObjectID(req.params.id);
        var SearchQuery = {
            _id: campaignID
        };
        db.collection("campaigns").findOne(SearchQuery, function(error, result) {
            if (!result) {
                const err = new Error(`Campaign with ID ${req.params.id} does not exist`);
                err.status = 404;
                throw err;
            }
            res.json(result);
            client.close();
        });
    });
});

router.post('/', function(req, res) {
    var data = req.body;

    if (!data) {
        const err = new Error(`Data sent is empty`);
        err.status = 404;
        throw err;
    }

    MongoClient.connect("mongodb://localhost/wyrdbase", function(error, client) {
        var db = client.db("wyrdbase");
        db.collection("campaigns").insert(data);
        res.json(result);
        client.close();
    });
});

router.put('/:id', function(req, res) {
    var data = req.body;
    MongoClient.connect("mongodb://localhost/wyrdbase", function(error, client) {
        var db = client.db("wyrdbase");
        var campaignID = new mongo.ObjectID(req.params.id);
        var SearchQuery = {
            _id: campaignID
        };
        db.collection("campaigns").updateOne(SearchQuery, data, function(error, result) {
            if (result.result.ok != 1 || result.result.nbModified == 0) {
                const err = new Error(`There was a problem while updating campaign with ID ${req.params.id}`);
                err.status = 404;
                throw err;
            }
            res.json(result);
            client.close();
        });
    });
});

router.delete('/:id', function(req, res) {
    MongoClient.connect("mongodb://localhost/wyrdbase", function(error, client) {
        var db = client.db("wyrdbase");
        var campaignID = new mongo.ObjectID(req.params.id);
        var SearchQuery = {
            _id: campaignID
        };
        db.collection("campaigns").deleteOne(SearchQuery, function(error, result) {
            if (result.result.ok != 1 || result.result.n == 0) {
                const err = new Error(`There was a problem while deleting campaign with ID ${req.params.id}`);
                err.status = 404;
                throw err;
            }
            res.json(result);
            client.close();
        });
    });
});

module.exports = router;