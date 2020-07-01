var express = require('../../node_modules/express');
var router = express.Router();
var mongo = require("../../node_modules/mongodb");
var MongoClient = mongo.MongoClient;

router.get('/all', function(req, res) {
    MongoClient.connect("mongodb://localhost/wyrdbase", function(error, client) {
        var db = client.db("wyrdbase");
        db.collection("personalities").find().toArray(function(error, results) {
            if (!results) {
                res.json({
                    type: "red",
                    message: `An error occured while fetching all the personnalities`
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
        var personalityID = new mongo.ObjectID(req.params.id);
        var SearchQuery = {
            _id: personalityID
        };
        db.collection("personalities").findOne(SearchQuery, function(error, result) {
            if (!result) {
                const err = new Error(`Personality with ID ${req.params.id} does not exist`);
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
        res.status(404).send(`Data sent is empty`)
    }

    MongoClient.connect("mongodb://localhost/wyrdbase", function(error, client) {
        var db = client.db("wyrdbase");
        delete data._id;
        db.collection("personalities").insertOne(data, function(err, records) {
            if (records) {
                res.json(records);
            } else {
                res.json({
                    type: "red",
                    message: `La personnalité existe déjà`
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
            var personalityID = new mongo.ObjectID(req.params.id);
            var SearchQuery = {
                _id: personalityID
            };
            var updateQuery = {
                $set: {
                    nameVF: data.nameVF,
                    name: data.name,
                    logos: data.logos,
                    kosmos: data.kosmos,
                    eros: data.eros,
                    skillsWeights: data.skillsWeights,
                    legendaryWeights: data.legendaryWeights
                }
            };
            db.collection("personalities").updateOne(SearchQuery, updateQuery, function(error, result) {
                if (result.result.ok != 1 || result.result.nbModified == 0) {
                    res.json({
                        type: "red",
                        message: `Lpersonnalité n'a pas pu être mise à jour. Si le problème persiste, contactez un administrateur`
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
            var personalityID = new mongo.ObjectID(req.params.id);
            var SearchQuery = {
                _id: personalityID
            };
            db.collection("personalities").deleteOne(SearchQuery, function(error, result) {
                if (result.result.ok != 1 || result.result.nbModified == 0) {
                    res.json({
                        type: "red",
                        message: `La personnalité n'a pas pu être supprimée. Si le problème persiste, contactez un administrateur`
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