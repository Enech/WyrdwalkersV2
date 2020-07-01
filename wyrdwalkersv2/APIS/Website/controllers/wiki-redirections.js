var express = require('../../node_modules/express');
var router = express.Router();
var mongo = require("../../node_modules/mongodb");
var MongoClient = mongo.MongoClient;

router.get('/all', function(req, res) {
    MongoClient.connect("mongodb://localhost/wyrdbase", function(error, client) {
        var db = client.db("wyrdbase");
        db.collection("wiki_redirections").find().toArray(function(error, results) {
            if (!results) {
                res.json({
                    type: "error",
                    message: "Une erreur s'est produite en tentant de récupérer les redirections. Veuillez contacter le webmaster si le problème persiste"
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
            var redirectionID = new mongo.ObjectID(req.params.id);
            var SearchQuery = {
                _id: redirectionID
            };
            db.collection("wiki_redirections").findOne(SearchQuery, function(error, result) {
                if (!result) {
                    const err = new Error(`Redirection with ID ${req.params.id} does not exist`);
                    err.status = 404;
                    throw err;
                }
                res.json(result);
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
        res.status(404).send(`Data sent is empty`);
    } else {
        delete data._id;
        MongoClient.connect("mongodb://localhost/wyrdbase", function(error, client) {
            var db = client.db("wyrdbase");
            db.collection("wiki_redirections").insertOne(data, function(err, records) {
                if (records) {
                    res.json(records);
                } else {
                    res.json({
                        type: "red",
                        message: `La redirection n'a pas été ajoutée`
                    });
                }
                client.close();
            });
        });
    }
});

router.put('/:id', function(req, res) {
    var data = req.body;
    MongoClient.connect("mongodb://localhost/wyrdbase", function(error, client) {
        var db = client.db("wyrdbase");
        try {
            var redirectionID = new mongo.ObjectID(req.params.id);
            var SearchQuery = {
                _id: redirectionID
            };
            var updateQuery = {
                $set: {
                    originVF: data.originVF,
                    originVO: data.originVO,
                    destinationVF: data.destinationVF,
                    destinationVO: data.destinationVO
                }
            };
            db.collection("wiki_redirections").updateOne(SearchQuery, updateQuery, function(error, result) {
                if (!result) {
                    res.json({
                        type: "red",
                        message: `La redirection n'a pas pu être mise à jour. Si le problème persiste, contactez un administrateur`
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
            var redirectionID = new mongo.ObjectID(req.params.id);
            var SearchQuery = {
                _id: redirectionID
            };
            db.collection("wiki_redirections").deleteOne(SearchQuery, function(error, result) {
                if (result.result.ok != 1 || result.result.n == 0) {
                    res.json({
                        type: "red",
                        message: `La redirection n'a pas pu être supprimée. Si le problème persiste, contactez un administrateur`
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