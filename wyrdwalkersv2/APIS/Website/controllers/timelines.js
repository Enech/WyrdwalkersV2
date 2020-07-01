var express = require('../../node_modules/express');
var router = express.Router();
var mongo = require("../../node_modules/mongodb");
var MongoClient = mongo.MongoClient;

router.get('/all', function(req, res) {
    MongoClient.connect("mongodb://localhost/wyrdbase", function(error, client) {
        var db = client.db("wyrdbase");
        db.collection("timelines").find().toArray(function(error, results) {
            if (!results) {
                res.json({
                    type: "red",
                    message: `An error occured while fetching all the timelines`
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
        var db = client.db("wyrdbase");
        try {
            var timelineID = new mongo.ObjectID(req.params.id);
            var SearchQuery = {
                _id: timelineID
            };
            db.collection("timelines").findOne(SearchQuery, function(error, result) {
                if (!result) {
                    res.json({
                        type: "red",
                        message: `An error occured while fetching the timeline with ID ${timelineID}`
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
        db.collection("timelines").insertOne(data, function(err, records) {
            if (records) {
                res.json(records);
            } else {
                res.json({
                    type: "red",
                    message: `La timeline ${data.name} existe déjà`
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
            var timelineID = new mongo.ObjectID(req.params.id);
            var SearchQuery = {
                _id: timelineID
            };
            var updateQuery = {
                $set: {
                    name: data.name,
                    description: data.description,
                    descriptionVO: data.descriptionVO,
                    firstEvent: data.firstEvent,
                    events: data.events,
                    availableTeams: data.availableTeams
                }
            };
            db.collection("timelines").updateOne(SearchQuery, updateQuery, function(error, result) {
                if (!result) {
                    res.json({
                        type: "red",
                        message: `La timeline n'a pas pu être mise à jour. Si le problème persiste, contactez un administrateur`
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
            var timelineID = new mongo.ObjectID(req.params.id);
            var SearchQuery = {
                _id: timelineID
            };
            db.collection("timelines").deleteOne(SearchQuery, function(error, result) {
                if (result.result.ok != 1 || result.result.n == 0) {
                    res.status(404).send(`There was a problem while deleting timeline with ID ${req.params.id}`);
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