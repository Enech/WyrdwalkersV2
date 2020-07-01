var Dice = require("../utils/dice");
var mongo = require("../../node_modules/mongodb");
var MongoClient = mongo.MongoClient;
var MONGO_CONNECT = "mongodb://localhost/riseofthegods";
var DB_NAME = "players";

var PlayersService = {
    GetPlayer: async function(query) {
        var obj = await new Promise(function(resolve, reject) {
            MongoClient.connect(MONGO_CONNECT, function(error, client) {
                var db = client.db("riseofthegods");
                try {
                    db.collection(DB_NAME).findOne(query, function(error, result) {
                        resolve(result);
                        client.close();
                    });
                } catch (e) {
                    console.log(e);
                }
            });
        });
        return obj;
    },
    GetPlayers: async function(query) {
        var obj = await new Promise(function(resolve, reject) {
            MongoClient.connect(MONGO_CONNECT, function(error, client) {
                var db = client.db("riseofthegods");
                db.collection(DB_NAME).find(query).toArray(function(error, results) {
                    resolve(results);
                    client.close();
                });
            });
        });
        return obj;
    },
    AddPlayer: async function(data) {
        delete data._id;
        var obj = await new Promise(function(resolve, reject) {
            MongoClient.connect(MONGO_CONNECT, function(error, client) {
                var db = client.db("riseofthegods");
                try {
                    db.collection(DB_NAME).insertOne(data, function(error, records) {
                        var requestResult = null;
                        if (!records) {
                            requestResult = {
                                type: "red",
                                message: `An error occured while the player`
                            };
                        } else {
                            requestResult = records;
                        }
                        resolve(requestResult);
                        client.close();
                    });
                } catch (e) {
                    console.log(e);
                }
            });
        });
        return obj;
    },
    UpdateResources: async function(id, query) {
        var obj = await new Promise(function(resolve, reject) {
            MongoClient.connect(MONGO_CONNECT, function(error, client) {
                var db = client.db("riseofthegods");
                try {
                    var playerID = new mongo.ObjectID(id);
                    var SearchQuery = {
                        _id: playerID
                    };
                    db.collection(DB_NAME).updateOne(SearchQuery, query, function(error, result) {
                        if (result) {
                            resolve(result.modifiedCount == 1);
                        } else {
                            resolve(false);
                        }
                        client.close();
                    });
                } catch (e) {
                    console.log(e);
                }
            });
        });
        return obj;
    },
    UpdatePlayers: async function(search, query) {
        var obj = await new Promise(function(resolve, reject) {
            MongoClient.connect(MONGO_CONNECT, function(error, client) {
                var db = client.db("riseofthegods");
                try {
                    db.collection(DB_NAME).updateMany(search, query, function(error, result) {
                        if (result) {
                            resolve(result.modifiedCount > 0);
                        } else {
                            resolve(false);
                        }
                        client.close();
                    });
                } catch (e) {
                    console.log(e);
                }
            });
        });
        return obj;
    },
    DeletePlayers: async function(search) {
        var obj = await new Promise(function(resolve, reject) {
            MongoClient.connect(MONGO_CONNECT, function(error, client) {
                var db = client.db("riseofthegods");
                try {
                    db.collection(DB_NAME).deleteMany(search, function(error, result) {
                        resolve(true);
                        client.close();
                    });
                } catch (e) {
                    console.log(e);
                }
            });
        });
        return obj;
    },
    GetNumberOfTerritories: async function(id) {
        var obj = await new Promise(function(resolve, reject) {
            MongoClient.connect(MONGO_CONNECT, function(error, client) {
                var db = client.db("riseofthegods");
                try {
                    var playerID = new mongo.ObjectID(id);
                    var SearchQuery = {
                        _id: playerID
                    };
                    var nbTerritories = 0;
                    db.collection(DB_NAME).findOne(SearchQuery, function(error, result) {
                        if (result) {
                            nbTerritories = result.territories.length;
                        }
                        resolve(nbTerritories);
                        client.close();
                    });
                } catch (e) {
                    console.log(e);
                }
            });
        });
        return obj;
    },
    ResetBonuses: async function(playerId) {
        var obj = await new Promise(function(resolve, reject) {
            var search = { _id: new mongo.ObjectID(playerId) };
            PlayersService.GetPlayers(search).then(players => {
                var player = players[0];
                var update = {
                    $set: {
                        sheetsVisible: [],
                        titanForcesVisible: false,
                        sheetSent: true
                    }
                };
                PlayersService.UpdatePlayers(search, update).then(() => {
                    resolve(true);
                });
            });
        });
        return obj;
    },
    ZeroNegativeResources: async function(gameId) {
        var obj = await new Promise(function(resolve, reject) {
            var search = { gameID: gameId };
            PlayersService.GetPlayers(search).then(players => {
                var promises = [];
                players.forEach(player => {
                    var update = {
                        $set: {
                            orichalcum: player.orichalcum < 0 ? 0 : player.orichalcum,
                            army: player.army < 0 ? 0 : player.army,
                            heroism: player.heroism < 0 ? 0 : player.heroism,
                            prophets: player.prophets < 0 ? 0 : player.prophets,
                            population: player.population < 0 ? 0 : player.population,
                            fatebindings: player.fatebindings < 0 ? 0 : player.fatebindings,
                        }
                    };
                    promises.push(PlayersService.UpdatePlayers({ _id: player._id }, update));
                });
                Promise.all(promises).then(() => {
                    resolve(true);
                })
            });
        });
        return obj;
    }
};

module.exports = PlayersService;