var express = require('../../node_modules/express');
var router = express.Router();
var mongo = require("../../node_modules/mongodb");
var MongoClient = mongo.MongoClient;

router.get('/fromid/:id', function(req, res) {
    MongoClient.connect("mongodb://localhost/wyrdbase", function(error, client) {
        var db = client.db("wyrdbase");

        try {
            var pageID = new mongo.ObjectID(req.params.id);
            var SearchQuery = {
                _id: pageID
            };
            db.collection("wiki").findOne(SearchQuery, function(error, result) {
                if (!result) {
                    res.json({
                        type: "red",
                        message: `La page ID ${pageID} n'existe pas`
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

router.get('/all', function(req, res) {
    MongoClient.connect("mongodb://localhost/wyrdbase", function(error, client) {
        var db = client.db("wyrdbase");
        db.collection("wiki").find({}).toArray(function(error, results) {
            if (!results) {
                res.json({
                    type: "red",
                    message: `Erreur interne. Impossible de récupérer les pages du wiki`
                });
            } else {
                res.json(results);
            }
            client.close();
        });
    });
});

router.get('/random', function(req, res) {
    MongoClient.connect("mongodb://localhost/wyrdbase", function(error, client) {
        var db = client.db("wyrdbase");
        db.collection("wiki").find({}).toArray(function(error, results) {
            var toSend = []
            if (!results) {
                res.status(404).send(`An error occured while randomizing wiki pages`)
            } else {
                for (var i = 0; i < 6; i++) {
                    var rand = results[Math.floor(Math.random() * results.length)];
                    toSend.push(rand);
                }
                res.json(toSend);
            }
            client.close();
        });
    });
});

/*router.get('/rewritelinks', function(req, res) {
    MongoClient.connect("mongodb://localhost/wyrdbase", function(error, client) {
        var db = client.db("wyrdbase");
        db.collection("wiki").find({}).toArray(function(erros, results) {
            results.forEach(function(e, i) {
                var contents = e.content;
                contents.forEach(content => {
                    content.textVF = content.textVF.replace(/http:\/\/wyrdwalkers.wikidot.com\//g, "/wiki/lore/");
                    content.textVO = content.textVO.replace(/http:\/\/wyrdwalkers.wikidot.com\//g, "/wiki/lore/");
                });
                e.content = contents;
                if (e.generalInfos != undefined) {
                    e.generalInfos.vf = e.generalInfos.vf.replace(/http:\/\/wyrdwalkers.wikidot.com\//g, "/wiki/lore/");
                    e.generalInfos.vo = e.generalInfos.vo.replace(/http:\/\/wyrdwalkers.wikidot.com\//g, "/wiki/lore/");
                }
                if (e.myth != undefined) {
                    e.myth.vf = e.myth.vf.replace(/http:\/\/wyrdwalkers.wikidot.com\//g, "/wiki/lore/");
                    e.myth.vo = e.myth.vo.replace(/http:\/\/wyrdwalkers.wikidot.com\//g, "/wiki/lore/");
                }
                db.collection("wiki").save(e);
            });
            client.close();
        })

    });
});*/

router.get('/:pagename', function(req, res) {
    MongoClient.connect("mongodb://localhost/wyrdbase", function(error, client) {
        var db = client.db("wyrdbase");
        var pageName = req.params.pagename;

        db.collection("wiki_redirections").find({}).toArray(function(errorRedir, resultsRedir) {
            resultsRedir.forEach(redir => {
                var nameToCompare = pageName.replace(/-/g, " ").normalize('NFD').toLowerCase();
                var refVF = redir.originVF.replace(/-/g, " ").normalize('NFD').toLowerCase();
                var refVO = redir.originVO.replace(/-/g, " ").normalize('NFD').toLowerCase();

                if (nameToCompare == refVF) {
                    pageName = redir.destinationVF;
                } else if (nameToCompare == refVO) {
                    pageName = redir.destinationVO;
                }
            });
            db.collection("wiki").find({}).toArray(function(error, results) {
                var toSend = null;
                results.forEach(page => {
                    var nameToCompare = pageName.replace(/-/g, " ").normalize('NFD').toLowerCase();
                    var refVF = page.title.titleVF.replace(/-/g, " ").normalize('NFD').toLowerCase();
                    var refVO = page.title.titleVO.replace(/-/g, " ").normalize('NFD').toLowerCase();

                    if ((nameToCompare == refVF || nameToCompare == refVO) && toSend == null) {
                        toSend = page;
                    }
                });

                if (toSend == null || !results) {
                    res.status(404);
                    res.send(`Wiki page with name ${pageName} does not exist`);
                } else {
                    res.json(toSend);
                }

                res.end();

                client.close();
            });
        });
    });
});

router.get('/search/:searchQuery', function(req, res) {
    var SearchQuery = {};
    var searchText = req.params.searchQuery.replace(/\+/g, " ");
    var keySearch = false;
    if (searchText.indexOf("tags:") > -1 || searchText.indexOf("title:") > -1) {
        SearchQuery = {};
        keySearch = true;
    } else {
        SearchQuery = {
            "$text": {
                "$search": req.params.searchQuery
            }
        };
    }
    MongoClient.connect("mongodb://localhost/wyrdbase", function(error, client) {
        var db = client.db("wyrdbase");
        db.collection("wiki").find(SearchQuery).toArray(function(error, results) {
            if (!results) {
                res.status(404).send(`An error occured while searching for ${req.params.searchQuery}`)
            } else {
                if (keySearch) {
                    var toSend = results;
                    if (searchText.indexOf("tags:") > -1) {
                        toSend = toSend.filter(page => page.tags.includes(searchText.replace(/tags:/g, "")));
                    }
                    if (searchText.indexOf("title:") > -1) {
                        toSend = toSend.filter(page => page.title.titleVF.includes(searchText.replace(/title:/g, "")) || page.title.titleVO.includes(searchText.replace(/title:/g, "")));
                    }
                    res.json(toSend);
                } else {
                    res.json(results);
                }
            }
            client.close();
        });
    });
});

router.get('/all/:attributes', function(req, res) {
    var attributesTab = req.params.attributes.split(".");
    console.log(attributesTab);
    MongoClient.connect("mongodb://localhost/wyrdbase", function(error, client) {
        var db = client.db("wyrdbase");
        var pageID = new mongo.ObjectID(req.params.id);
        db.collection("wiki").find({}).toArray(function(error, results) {
            var attribute = attributesTab[0];
            var response = results.map(element => {
                if (attributesTab.length > 1) {
                    var subAttribute = attributesTab[1];
                    if (Array.isArray(element[attribute])) {
                        var tempTab = element[attribute];
                        var tempResult = [];
                        tempTab.forEach(e => {
                            if (element[attribute] !== undefined && element[attribute] !== null) {
                                if (tempResult.indexOf(e[subAttribute]) < 0 && e[subAttribute].length > 0) {
                                    tempResult.push(e[subAttribute]);
                                }
                            }
                        });
                        return tempResult;
                    } else {
                        if (element[attribute] !== undefined && element[attribute] !== null) {
                            var toReturn = element[attribute][subAttribute];
                            return toReturn;
                        }
                    }
                } else {
                    return element[attribute];
                }
            });
            var final = [];
            for (var i = 0; i < response.length; i++) {
                if (response[i] !== undefined) {
                    if (response[i].length > 0) {
                        final = final.concat(response[i]);
                    }
                }
            }
            res.json(final);
            client.close();
        });
    });
});

router.post('/', function(req, res) {
    var data = req.body;
    delete data._id;
    if (!data) {
        res.status(404).send(`Data sent is empty`)
    }

    MongoClient.connect("mongodb://localhost/wyrdbase", function(error, client) {
        var db = client.db("wyrdbase");
        db.collection("wiki").insertOne(data, function(err, records) {
            if (records) {
                res.json(records);
            } else {
                res.json({
                    type: "red",
                    message: `La page ${data.title.titleVF} existe déjà`
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
            var pageID = new mongo.ObjectID(req.params.id);
            var SearchQuery = {
                _id: pageID
            };
            var updateQuery = {
                $set: {
                    title: data.title,
                    author: data.author,
                    searchable: data.searchable,
                    content: data.content,
                    generalInfos: data.generalInfos,
                    myth: data.myth,
                    isEditionLocked: false,
                    tags: data.tags
                }
            };
            db.collection("wiki").updateOne(SearchQuery, updateQuery, function(error, result) {
                if (result.result.ok != 1 || result.result.nbModified == 0) {
                    res.json({
                        type: "red",
                        message: `There was a problem while updating Wiki page with ID ${req.params.id}`
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

router.put('/lock/:id', function(req, res) {
    var lock = req.body.lock;
    MongoClient.connect("mongodb://localhost/wyrdbase", function(error, client) {
        var db = client.db("wyrdbase");
        try {
            var pageID = new mongo.ObjectID(req.params.id);
            var SearchQuery = {
                _id: pageID
            };
            var updateQuery = {
                $set: {
                    isEditionLocked: lock
                }
            };
            db.collection("wiki").updateOne(SearchQuery, updateQuery, function(error, result) {
                if (result.result.ok != 1 || result.result.nbModified == 0) {
                    res.json({
                        type: "red",
                        message: `There was a problem while updating Wiki page with ID ${req.params.id}`
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
            var pageID = new mongo.ObjectID(req.params.id);
            var SearchQuery = {
                _id: pageID
            };
            db.collection("wiki").deleteOne(SearchQuery, function(error, result) {
                if (result.result.ok != 1 || result.result.nbModified == 0) {
                    res.json({
                        type: "red",
                        message: `There was a problem while deleting Wiki page with ID ${req.params.id}`
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