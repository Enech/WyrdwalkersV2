var express = require('../../node_modules/express');
var router = express.Router();
var mongo = require("../../node_modules/mongodb");
const nodemailer = require('nodemailer');
var MongoClient = mongo.MongoClient;

var smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'wyrdwalkers.rpg@gmail.com',
        pass: 'MastersOfFate2018'
    }
});

router.get('/all', function(req, res) {
    MongoClient.connect("mongodb://localhost/wyrdbase", function(error, client) {
        var db = client.db("wyrdbase");
        db.collection("users").find().toArray(function(error, results) {
            if (!results) {
                res.status(404).send(`An error occured while fetching all the users`);
            } else {
                results.forEach(user => {
                    delete user.mdp;
                    delete user.fromUi;
                });
                res.json(results);
            }
            client.close();
        });
    });
});

router.get('/:id', function(req, res) {
    MongoClient.connect("mongodb://localhost/wyrdbase", function(error, client) {
        var db = client.db("wyrdbase");
        var userID = new mongo.ObjectID(req.params.id);
        var SearchQuery = {
            _id: userID
        };
        db.collection("users").findOne(SearchQuery, function(error, result) {
            if (!result) {
                res.status(404).send(`User with ID ${req.params.id} does not exist`);
            } else {
                delete result.mdp;
                delete result.fromUi;
                res.json(result);
            }
            client.close();
        });
    });
});

router.get('/activate/:id', function(req, res) {
    MongoClient.connect("mongodb://localhost/wyrdbase", function(error, client) {
        var db = client.db("wyrdbase");
        var userID = null;
        try {
            userID = new mongo.ObjectID(req.params.id);
            var SearchQuery = {
                _id: userID
            };
            var newValues = {
                $set: {
                    isActivated: true,
                    "rights.isUser": true
                }
            };
            db.collection("users").updateOne(SearchQuery, newValues, function(error, result) {
                if (!result) {
                    res.status(404).send(`User with ID ${req.params.id} does not exist`);
                } else {
                    res.json(result);
                }
                client.close();
            });
        } catch (error) {
            console.log(error);
        }
    });
});

router.post('/login', function(req, res) {
    var data = req.body;

    if (!data) {
        res.status(404).send(`Data sent is empty`);
    } else {
        MongoClient.connect("mongodb://localhost/wyrdbase", function(error, client) {
            var db = client.db("wyrdbase");
            var userLogin = req.body.login;
            var userPsw = req.body.mdp;
            var SearchQuery = {
                $and: [{
                        $or: [
                            { login: { $eq: userLogin } },
                            { email: { $eq: userLogin } }
                        ]
                    },
                    { mdp: { $eq: userPsw } },
                    { isActivated: { $eq: true } },
                    { "rights.isUser": { $eq: true } }
                ]
            };
            db.collection("users").findOne(SearchQuery, function(error, result) {
                if (!result || result.length == 0) {
                    res.json({
                        type: "error",
                        message: "Impossible de trouver votre compte. Vérifiez vos identifiants et que votre compte est bien activé. Si le problème persiste, contactez un administrateur"
                    });
                } else {
                    var publicUser = result;
                    delete publicUser.mdp;
                    delete publicUser.fromUi;
                    res.json(publicUser);
                }
            });
            client.close();
        });
    }
});

router.post('/', function(req, res) {
    var data = req.body;

    if (!data) {
        res.status(404).send(`Data sent is empty`);
    } else if (!data.fromUi) {
        res.status(404).send(`External registering is forbidden`);
    } else {
        var userEmail = data.email;
        delete data._id;
        delete data.fromUi;
        MongoClient.connect("mongodb://localhost/wyrdbase", function(error, client) {
            var db = client.db("wyrdbase");
            db.collection("users").insertOne(data, function(err, records) {
                if (records) {
                    /*var mailOptions = {
                        from: 'wyrdwalkers.rpg@gmail.com',
                        to: userEmail,
                        subject: "Création d'un compte sur Wyrdwalkers.com",
                        html: "<h3>Bienvenue sur Wyrdwalkers !</h3><br>" +
                            "<div>Afin de valider votre inscription, il vous suffit de cliquer sur le lien ci-dessous</div><br>" +
                            `<a href='https://wyrdwalkers.com/register/${records.insertedId}' target='_blank'>Activez votre compte en cliquant ici</a>` +
                            "<br>" +
                            "A bientôt sur le site," +
                            "<br>" +
                            "Les Masters of Fate",
                    };
                    smtpTransport.sendMail(mailOptions, function(error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });*/
                    res.json(records);
                } else {
                    res.json({
                        type: "red",
                        message: `L'utilisateur ${data.login} / ${userEmail} existe déjà`
                    });
                }
                client.close();
            });
        });
    }
});

router.put('/:id', function(req, res) {
    var data = req.body;
    if (data.fromUi) {
        MongoClient.connect("mongodb://localhost/wyrdbase", function(error, client) {
            var db = client.db("wyrdbase");
            var userID = new mongo.ObjectID(req.params.id);
            var SearchQuery = {
                _id: userID
            };
            var updateQuery = {
                $set: {
                    city: data.city,
                    email: data.email,
                    name: data.name
                }
            };
            db.collection("users").updateOne(SearchQuery, updateQuery, function(error, result) {
                if (!result) {
                    res.json({
                        type: "red",
                        message: `Vos informations n'ont pas pu être mises à jour. Si le problème persiste, contactez un administrateur`
                    });
                } else {
                    res.json(result);
                }
                client.close();
            });
        });
    }
});

router.put('/rights/:id', function(req, res) {
    var data = req.body;
    MongoClient.connect("mongodb://localhost/wyrdbase", function(error, client) {
        var db = client.db("wyrdbase");
        var userID = new mongo.ObjectID(req.params.id);
        var SearchQuery = {
            _id: userID
        };
        var updateQuery = {
            $set: {
                isActivated: data.isActivated,
                rights: data.rights
            }
        };
        db.collection("users").updateOne(SearchQuery, updateQuery, function(error, result) {
            if (!result) {
                res.json({
                    type: "red",
                    message: `Les informations n'ont pas pu être mises à jour. Si le problème persiste, contactez un administrateur`
                });
            } else {
                res.json(result);
            }
            client.close();
        });
    });
});

router.delete('/:id', function(req, res) {
    MongoClient.connect("mongodb://localhost/wyrdbase", function(error, client) {
        var db = client.db("wyrdbase");
        var userID = new mongo.ObjectID(req.params.id);
        var SearchQuery = {
            _id: userID
        };
        db.collection("users").deleteOne(SearchQuery, function(error, result) {
            if (result.result.ok != 1 || result.result.n == 0) {
                const err = new Error(`There was a problem while deleting user with ID ${req.params.id}`);
                err.status = 404;
                throw err;
            }
            res.json(result);
            client.close();
        });
    });
});

module.exports = router;