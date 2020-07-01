var Dice = require("../utils/dice");
var mongo = require("../../node_modules/mongodb");
var MongoClient = mongo.MongoClient;
var MONGO_CONNECT = "mongodb://localhost/riseofthegods";
var DB_NAME = "territories";
var PlayerService = require("../services/playersService");

var TerritoryService = {
    AddNewGameTerritories: async function(gameId, nbPlayers) {
        var obj = await new Promise(function(resolve, reject) {
            MongoClient.connect(MONGO_CONNECT, function(error, client) {
                var db = client.db("riseofthegods");
                var filledNewGameTerritories = NewGameTerritories.map(e => {
                    e.titanForces = Dice.D3(1) + 2;
                    e.gameID = gameId;
                    return e;
                });
                filledNewGameTerritories.forEach(territory => {
                    if (territory._id) {
                        delete territory._id;
                    }
                });
                try {
                    db.collection(DB_NAME).insertMany(filledNewGameTerritories, function(error, inserted) {
                        var requestResult = null;
                        if (!inserted) {
                            requestResult = {
                                type: "red",
                                message: `An error occured while adding territories at game launch`
                            };
                        } else {
                            requestResult = inserted;
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
    UpdateTerritory: async function(searchQuery, updateQuery) {
        var obj = await new Promise(function(resolve, reject) {
            MongoClient.connect(MONGO_CONNECT, function(error, client) {
                var db = client.db("riseofthegods");
                try {
                    db.collection(DB_NAME).updateMany(searchQuery, updateQuery, function(error, result) {
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
    DeleteTerritories: async function(searchQuery) {
        var obj = await new Promise(function(resolve, reject) {
            MongoClient.connect(MONGO_CONNECT, function(error, client) {
                var db = client.db("riseofthegods");
                try {
                    db.collection(DB_NAME).deleteMany(searchQuery, function(error, result) {
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
    AttackTerritory: async function(id, forces) {
        var obj = await new Promise(function(resolve, reject) {
            MongoClient.connect(MONGO_CONNECT, function(error, client) {
                var db = client.db("riseofthegods");
                try {
                    var territoryID = new mongo.ObjectID(id);
                    var SearchQuery = {
                        _id: territoryID
                    };
                    var updateQuery = {
                        $push: {
                            playersForces: forces
                        }
                    };
                    db.collection(DB_NAME).updateOne(SearchQuery, updateQuery, function(error, result) {
                        if (result.modifiedCount == 1) {
                            resolve(true);
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
    InfiltrateTerritories: async function(playerForces, territoriesIDs) {
        var obj = await new Promise(function(resolve, reject) {
            MongoClient.connect(MONGO_CONNECT, function(error, client) {
                var db = client.db("riseofthegods");
                if (territoriesIDs.length == 1 && territoriesIDs[0] == "") {
                    resolve(true);
                } else {
                    try {
                        var territoriesArray = territoriesIDs.map(element => {
                            return new mongo.ObjectID(element);
                        });
                        var SearchQuery = {
                            _id: { $in: territoriesArray }
                        };
                        var updateQuery = {
                            $push: {
                                playersForces: playerForces
                            }
                        };
                        db.collection(DB_NAME).updateMany(SearchQuery, updateQuery, function(error, result) {
                            resolve(result.modifiedCount == 1);
                            client.close();
                        });
                    } catch (e) {
                        console.log(e);
                    }
                }
            });
        });
        return obj;
    },
    ComputeConquests: async function(territoriesIDs) {
        var obj = await new Promise(function(resolve, reject) {
            MongoClient.connect(MONGO_CONNECT, function(error, client) {
                var db = client.db("riseofthegods");
                var rankings = [];
                territoriesIDs = territoriesIDs.filter(e => e != "");
                if (territoriesIDs.length > 0) {
                    try {
                        var territoriesArray = territoriesIDs.map(element => {
                            return new mongo.ObjectID(element);
                        });
                        var SearchQuery = {
                            _id: { $in: territoriesArray }
                        };
                        db.collection(DB_NAME).find(SearchQuery).toArray(function(error, results) {
                            if (results) {
                                results.forEach(territory => {
                                    // On aggrège les forces attaquantes appartenant à un même joueur (cas attaque + infiltration)
                                    for (var i = 0; i < territory.playersForces.length; i++) {
                                        var force = territory.playersForces[i];
                                        var id = force.playerID;
                                        // On cherche les autres attaques du même joueur sur ce territoire et on marque les doublons en vidant les ids cibles
                                        for (var j = 0; j < territory.playersForces.length; j++) {
                                            if (territory.playersForces[j].playerID == id && i != j && id != "") {
                                                territory.playersForces[i].armies += territory.playersForces[j].armies;
                                                territory.playersForces[j].playerID = "";
                                            }
                                        }
                                    }
                                    // On supprime les attaques avec id vide (doublons repérés)
                                    var noDuplicateArray = territory.playersForces.filter(element => {
                                        return element.playerID.length > 0;
                                    });
                                    territory.playersForces = noDuplicateArray;
                                    //On compare les forces présentes
                                    var titanForces = territory.titanForces;
                                    var godForces = 0;
                                    var highestPlayerID = "";
                                    var highestPlayerName = "";
                                    var highestRankings = [];
                                    Object.assign(highestRankings, noDuplicateArray);
                                    highestRankings.sort((a, b) => {
                                        return b.armies - a.armies;
                                    });
                                    highestPlayerID = highestRankings[0].playerID;
                                    highestPlayerName = highestRankings[0].playerName;
                                    territory.playersForces.forEach(force => {
                                        godForces += force.armies;
                                    });
                                    // On assigne le nouveau propriétaire uniquement si les forces des dieux sont supérieures aux forces des titans. Le panthéon ayant envoyé le plus d'armée devient le propriétaire
                                    if (godForces > titanForces) {
                                        territory.owner = highestPlayerID;
                                        territory.ownerName = highestPlayerName;
                                        territory.titanForces = 0;
                                        rankings.push(highestRankings);
                                        // On ajoute l'ID du territoire au joueur ayant apporté le plus d'armées
                                        PlayerService.UpdateResources(highestPlayerID, { $push: { territories: territory._id.toString() } });
                                        var updateQuery = {
                                            $set: {
                                                owner: territory.owner,
                                                ownerName: territory.ownerName,
                                                titanForces: territory.titanForces
                                            }
                                        };
                                        db.collection(DB_NAME).updateOne({ _id: territory._id }, updateQuery, function(error, result) {
                                            // On renvoie le tableau des armées envoyées pendant l'attaque
                                            client.close();
                                        });
                                    } else {
                                        highestRankings = [];
                                    }
                                });
                                resolve(rankings);
                            } else {
                                resolve(rankings);
                            }
                        });
                    } catch (e) {
                        console.log(e);
                    }
                } else {
                    resolve([]);
                }
            });
        });
        return obj;
    },
    GetTerritoryById: async function(territoryID) {
        var obj = await new Promise(function(resolve, reject) {
            MongoClient.connect(MONGO_CONNECT, function(error, client) {
                var db = client.db("riseofthegods");
                if (territoryID != "") {
                    try {
                        var SearchQuery = {
                            _id: new mongo.ObjectID(territoryID)
                        };
                        db.collection(DB_NAME).findOne(SearchQuery, function(error, result) {
                            resolve(result);
                            client.close();
                        });
                    } catch (e) {
                        console.log(e);
                    }
                }
            });
        });
        return obj;
    },
    GetTerritory: async function(query) {
        var obj = await new Promise(function(resolve, reject) {
            MongoClient.connect(MONGO_CONNECT, function(error, client) {
                try {
                    var db = client.db("riseofthegods");

                    db.collection(DB_NAME).find(query).toArray(function(error, results) {
                        resolve(results);
                        client.close();
                    });
                } catch (e) {
                    console.log(e);
                }
            });
        });
        return obj;
    },
    GetUpdateQueryFromKey: function(key, ressources) {
        var result = {};
        switch (key) {
            case TerritoriesKey.WORLD:
                result = {
                    $inc: {
                        fatebindings: -1 * ressources
                    },
                    resource: 5
                };
                break;
            case TerritoriesKey.FAIRIE:
                result = {
                    $inc: {
                        orichalcum: ressources
                    },
                    resource: 0
                };
                break;
            case TerritoriesKey.SHAMBHALA:
                result = {
                    $inc: {
                        orichalcum: ressources
                    },
                    resource: 0
                };
                break;
            case TerritoriesKey.AUNU:
                result = {
                    $inc: {
                        army: ressources
                    },
                    resource: 1
                };
                break;
            case TerritoriesKey.OLYMPUS:
                result = {
                    $inc: {
                        heroism: ressources
                    },
                    resource: 2
                };
                break;
            case TerritoriesKey.DEVALOKA:
                result = {
                    $inc: {
                        prophets: ressources
                    },
                    resource: 3
                };
                break;
            case TerritoriesKey.AETHER:
                result = {
                    $inc: {
                        army: ressources
                    },
                    resource: 1
                };
                break;
            case TerritoriesKey.NYX:
                result = {
                    $inc: {
                        prophets: ressources
                    },
                    resource: 3
                };
                break;
            case TerritoriesKey.KOSMOS:
                result = {
                    $inc: {
                        heroism: ressources
                    },
                    resource: 2
                };
                break;
            case TerritoriesKey.SHEOL:
                result = {
                    $inc: {
                        prophets: ressources
                    },
                    resource: 3
                };
                break;
        }

        return result;
    },
    ZeroNegativeTerritories: async function(gameId) {
        var obj = await new Promise(function(resolve, reject) {
            var search = { gameID: gameId };
            TerritoryService.GetTerritory(search).then(planes => {
                var promises = [];
                planes.forEach(plane => {
                    if (plane.owner == "" && plane.titanForces < 0) {
                        promises.push(TerritoryService.UpdateTerritory({ _id: plane._id }, { $set: { titanForces: 0 } }));
                    }
                });
                Promise.all(promises).then(() => {
                    resolve(true);
                });
            });
        });
        return obj;
    }
};

var TerritoriesKey = {
    WORLD: 0,
    FAIRIE: 1,
    SHAMBHALA: 2,
    AUNU: 3,
    OLYMPUS: 4,
    DEVALOKA: 5,
    AETHER: 6,
    NYX: 7,
    KOSMOS: 8,
    SHEOL: 9
};

var NewGameTerritories = [{
        name: "<i class='fa fa-spider'></i>&nbsp;Le Monde",
        nameVO: "<i class='fa fa-spider'></i>&nbsp;The World",
        key: TerritoriesKey.WORLD,
        owner: "",
        ownerName: "",
        titanForces: 0,
        playersForces: [],
        gameID: ""
    },
    {
        name: "<i class='fa fa-gem'></i>&nbsp;Fairie",
        nameVO: "<i class='fa fa-gem'></i>&nbsp;Fairie",
        key: TerritoriesKey.FAIRIE,
        owner: "",
        ownerName: "",
        titanForces: 0,
        playersForces: [],
        gameID: ""
    },
    {
        name: "<i class='fa fa-gem'></i>&nbsp;Shambhala",
        nameVO: "<i class='fa fa-gem'></i>&nbsp;Shambhala",
        key: TerritoriesKey.SHAMBHALA,
        owner: "",
        ownerName: "",
        titanForces: 0,
        playersForces: [],
        gameID: ""
    },
    {
        name: "<i class='fa fa-fist-raised'></i>&nbsp;Aunu",
        nameVO: "<i class='fa fa-fist-raised'></i>&nbsp;Aunu",
        key: TerritoriesKey.AUNU,
        owner: "",
        ownerName: "",
        titanForces: 0,
        playersForces: [],
        gameID: ""
    },
    {
        name: "<i class='fa fa-fist-raised'></i>&nbsp;Aether",
        nameVO: "<i class='fa fa-fist-raised'></i>&nbsp;Aether",
        key: TerritoriesKey.AETHER,
        owner: "",
        ownerName: "",
        ownerName: "",
        titanForces: 0,
        playersForces: [],
        gameID: ""
    },
    {
        name: "<i class='fa fa-jedi'></i>&nbsp;Mont Olympe",
        nameVO: "<i class='fa fa-jedi'></i>&nbsp;Mount Olympus",
        key: TerritoriesKey.OLYMPUS,
        owner: "",
        ownerName: "",
        titanForces: 0,
        playersForces: [],
        gameID: ""
    },
    {
        name: "<i class='fa fa-jedi'></i>&nbsp;Kosmos",
        nameVO: "<i class='fa fa-jedi'></i>&nbsp;Kosmos",
        key: TerritoriesKey.KOSMOS,
        owner: "",
        ownerName: "",
        titanForces: 0,
        playersForces: [],
        gameID: ""
    },
    {
        name: "<i class='fa fa-eye'></i>&nbsp;Devaloka",
        nameVO: "<i class='fa fa-eye'></i>&nbsp;Devaloka",
        key: TerritoriesKey.DEVALOKA,
        owner: "",
        ownerName: "",
        titanForces: 0,
        playersForces: [],
        gameID: ""
    },
    {
        name: "<i class='fa fa-eye'></i>&nbsp;Nyx",
        nameVO: "<i class='fa fa-eye'></i>&nbsp;Nyx",
        key: TerritoriesKey.NYX,
        owner: "",
        ownerName: "",
        titanForces: 0,
        playersForces: [],
        gameID: ""
    },
    {
        name: "<i class='fa fa-eye'></i>&nbsp;Sheol",
        nameVO: "<i class='fa fa-eye'></i>&nbsp;Sheol",
        key: TerritoriesKey.SHEOL,
        owner: "",
        ownerName: "",
        titanForces: 0,
        playersForces: [],
        gameID: ""
    }
];

module.exports = TerritoryService;