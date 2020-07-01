var express = require('../../node_modules/express');
var router = express.Router();
var mongo = require("../../node_modules/mongodb");
var MongoClient = mongo.MongoClient;

router.get('/all', function(req, res) {
    MongoClient.connect("mongodb://localhost/wyrdbase", function(error, client) {
        var db = client.db("wyrdbase");
        db.collection("events").find().toArray(function(error, results) {
            if (!results) {
                res.json({
                    type: "red",
                    message: `An error occured while fetching all the events`
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
            var eventID = new mongo.ObjectID(req.params.id);
            var SearchQuery = {
                _id: eventID
            };
            db.collection("events").findOne(SearchQuery, function(error, result) {
                if (!result) {
                    res.json({
                        type: "red",
                        message: `An error occured while fetching the event with ID ${activityID}`
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
        db.collection("events").insertOne(data, function(err, records) {
            if (records) {
                res.json(records);
            } else {
                res.json({
                    type: "red",
                    message: `L'évènement existe déjà`
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
            var eventID = new mongo.ObjectID(req.params.id);
            var SearchQuery = {
                _id: eventID
            };
            var updateQuery = {
                $set: {
                    nameVF: data.nameVF,
                    nameVO: data.nameVO,
                    captionVF: data.captionVF,
                    captionVO: data.captionVO,
                    descriptionVF: data.descriptionVF,
                    descriptionVO: data.descriptionVO,
                    characters: data.characters,
                    timeline: data.timeline,
                    picture: data.picture,
                    pictureAuthor: data.pictureAuthor,
                    pictureAuthorLink: data.pictureAuthorLink,
                    music: data.music,
                    year: data.year
                }
            };
            db.collection("events").updateOne(SearchQuery, updateQuery, function(error, result) {
                if (result.result.ok != 1 || result.result.nbModified == 0) {
                    res.json({
                        type: "red",
                        message: `L'évènement n'a pas pu être mis à jour. Si le problème persiste, contactez un administrateur`
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
            var eventID = new mongo.ObjectID(req.params.id);
            var SearchQuery = {
                _id: eventID
            };
            db.collection("events").deleteOne(SearchQuery, function(error, result) {
                if (result.result.ok != 1 || result.result.nbModified == 0) {
                    res.json({
                        type: "red",
                        message: `L'évènement n'a pas pu être supprimé. Si le problème persiste, contactez un administrateur`
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