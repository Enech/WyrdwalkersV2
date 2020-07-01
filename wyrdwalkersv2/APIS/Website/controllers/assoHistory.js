var express = require('../../node_modules/express');
var router = express.Router();
var mongo = require("../../node_modules/mongodb");
var MongoClient = mongo.MongoClient;

router.get('/all', function(req, res) {
    MongoClient.connect("mongodb://localhost/wyrdbase", function(error, client) {
        var db = client.db("wyrdbase");
        db.collection("assoHistory").find().toArray(function(error, results) {
            if (!results) {
                res.json({
                    type: "red",
                    message: `An error occured while fetching all the history entries`
                });
            } else {
                res.json(results);
            }
            client.close();
        });
    });
});

router.get('/:id', function(req, res) {
    MongoClient.connect("mongodb://localhost/wyrdbase", function(error, client) {

        try {
            var db = client.db("wyrdbase");
            var assoHistoryID = new mongo.ObjectID(req.params.id);
            var SearchQuery = {
                _id: assoHistoryID
            };
            db.collection("assoHistory").findOne(SearchQuery, function(error, result) {
                if (!result) {
                    res.json({
                        type: "red",
                        message: `An error occured while fetching the history with ID ${activityID}`
                    });
                } else {
                    res.json(result);
                }
                client.close();
            });
        } catch (e) {
            console.log(e);
        }
    });
});

router.post('/', function(req, res) {
    var data = req.body;

    if (!data) {
        res.status(404).send(`Data sent is empty`)
    }

    MongoClient.connect("mongodb://localhost/wyrdbase", function(error, client) {
        var db = client.db("wyrdbase");
        delete data._id;
        db.collection("assoHistory").insertOne(data, function(err, records) {
            if (records) {
                res.json(records);
            } else {
                res.json({
                    type: "red",
                    message: `L'historique existe déjà`
                });
            }
            client.close();
        });
    });
});

router.put('/:id', function(req, res) {
    var data = req.body;
    MongoClient.connect("mongodb://localhost/wyrdbase", function(error, client) {
        var db = client.db("wyrdbase");

        try {
            var assoHistoryID = new mongo.ObjectID(req.params.id);
            var SearchQuery = {
                _id: assoHistoryID
            };
            var updateQuery = {
                $set: {
                    title: data.title,
                    date: data.date
                }
            };
            db.collection("assoHistory").updateOne(SearchQuery, updateQuery, function(error, result) {
                if (result.result.ok != 1 || result.result.nbModified == 0) {
                    res.json({
                        type: "red",
                        message: `L'historique n'a pas pu être mis à jour. Si le problème persiste, contactez un administrateur`
                    });
                } else {
                    res.json(result);
                }
                client.close();
            });
        } catch (e) {
            console.log(e);
        }
    });
});

router.delete('/:id', function(req, res) {
    MongoClient.connect("mongodb://localhost/wyrdbase", function(error, client) {
        var db = client.db("wyrdbase");

        try {
            var assoHistoryID = new mongo.ObjectID(req.params.id);
            var SearchQuery = {
                _id: assoHistoryID
            };
            db.collection("assoHistory").deleteOne(SearchQuery, function(error, result) {
                if (result.result.ok != 1 || result.result.nbModified == 0) {
                    res.json({
                        type: "red",
                        message: `L'historique n'a pas pu être supprimé. Si le problème persiste, contactez un administrateur`
                    });
                } else {
                    res.json(result);
                }
                client.close();
            });
        } catch (e) {
            console.log(e);
        }
    });
});

module.exports = router;