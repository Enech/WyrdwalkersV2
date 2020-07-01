var mongo = require("../../node_modules/mongodb");
var MongoClient = mongo.MongoClient;
var MONGO_CONNECT = "mongodb://localhost/riseofthegods";
var DB_NAME = "games";
var OrderService = require("./ordersService");
var TerritoryService = require("./territoryService");
var PlayerService = require("./playersService");
var ResultService = require("../services/ordersResultsService");
var PlayerHistoryService = require("../services/playerHistoryService");
var Dice = require("../utils/dice");

var GameService = {
    ProcessGames: async function(manual, idGame) {
        var obj = await new Promise(function(resolve, reject) {
            MongoClient.connect(MONGO_CONNECT, function(error, client) {
                var db = client.db("riseofthegods");
                try {
                    var SearchQuery = manual ? {
                        _id: new mongo.ObjectID(idGame)
                    } : {
                        running: true,
                        timerMode: true
                    };
                    db.collection(DB_NAME).find(SearchQuery).toArray(function(error, results) {
                        if (results) {
                            results.forEach(game => {
                                var today = new Date();
                                var start = game.startDate;
                                var end = game.endDate;
                                var gameID = new mongo.ObjectID(game._id);
                                var gameTurn = game.turn;
                                if (gameTurn <= 7 && !game.locked) {
                                    // Mise en pause de la partie
                                    if (manual || (today.getUTCHours() >= 22 && today.getUTCHours() < 23)) {
                                        var today = new Date();
                                        // On bloque la partie
                                        GameService.UpdateGame({ _id: gameID }, { $set: { locked: true } }).then(() => {
                                            // On enregistre l'état des joueurs avant la résolution du tour
                                            PlayerService.GetPlayers({ gameID: gameID.toString() }).then(players => {
                                                var historyPromises = [];
                                                players.forEach(player => {
                                                    var history = {
                                                        orichalcum: player.orichalcum,
                                                        army: player.army,
                                                        heroism: player.heroism,
                                                        prophets: player.prophets,
                                                        population: player.population,
                                                        fatebindings: player.fatebindings,
                                                        victoryPoints: player.victoryPoints,
                                                        controlledPlanes: player.territories.length,
                                                        playerID: player._id.toString(),
                                                        gameID: player.gameID,
                                                        turn: gameTurn
                                                    };
                                                    historyPromises.push(PlayerHistoryService.AddHistory(history));
                                                });
                                                Promise.all(historyPromises).then(() => {
                                                    // On va chercher toutes les feuilles d'ordre de la partie correspondant à ce tour
                                                    OrderService.GetTodayGameOrders(gameID.toString(), gameTurn).then((response) => {
                                                        var orders = response;
                                                        //On créé les objets de résultats du tour qu'on mettra à jour au fur et à mesure du process
                                                        var resultsPromises = [];
                                                        orders.forEach(order => {
                                                            var ordersSent = order.ordersSent;
                                                            ordersSent.forEach(sent => {
                                                                var result = {
                                                                    playerID: order.parameters.playerID,
                                                                    gameID: order.gameID,
                                                                    turn: gameTurn,
                                                                    order: sent,
                                                                    resourceCost: -1,
                                                                    cost: -1,
                                                                    resourceGain: [],
                                                                    gains: [],
                                                                    attackedPlaneID: "",
                                                                    gambleTarget: "",
                                                                    settleTarget: "",
                                                                    planeConquered: false,
                                                                    sheetsSpied: []
                                                                };
                                                                // On n'enregsitre pas de résultat d'ordre pour la main du destin
                                                                if (sent != 19) {
                                                                    resultsPromises.push(ResultService.AddResult(result));
                                                                }
                                                            });
                                                        });
                                                        Promise.all(resultsPromises).then(() => {
                                                            // On récupère toutes les feuilles d'ordre qui comportent des ordres d'attaque pour les résoudre en premier (les attaques, le reste des ordres sont executés à la file)
                                                            var attackOrders = OrderService.GetAttackOrders(orders);
                                                            //On récupère les feuilles d'ordre contenant un pari sur les attaques en cours
                                                            var gambles = OrderService.GetGambleOrders(orders);
                                                            // On récupère les feuilles d'ordre contenant des Mains du Destin
                                                            var hands = OrderService.GetFateHandOrders(orders);
                                                            // On process les Mains du Destin
                                                            OrderService.ProcessFateHandOrders(hands).then(() => {
                                                                // On process les ordres d'attaques
                                                                OrderService.ProcessAttackOrders(attackOrders).then(() => {
                                                                    // On process les autres ordres ensuite
                                                                    OrderService.ProcessOtherOrders(orders).then(() => {
                                                                        var searchTerritories = {
                                                                            gameID: gameID.toString(),
                                                                            owner: ""
                                                                        };
                                                                        TerritoryService.GetTerritory(searchTerritories).then(response => {
                                                                            var previousTitanPlanes = response.length;
                                                                            // On résout les prises de plans
                                                                            OrderService.ProcessConquests(attackOrders).then(() => {
                                                                                // On résout les paris sur les attaques
                                                                                OrderService.ProcessGambles(gambles).then(() => {
                                                                                    // On vide les players forces présentes sur chaque territoire titanique (on laisse sur les territoires des dieux, au cas où)
                                                                                    var nbPlayers = game.playersIds.length;
                                                                                    // On récupère le nouveau nmbre de territoires titaniques
                                                                                    TerritoryService.GetTerritory(searchTerritories).then(response => {

                                                                                        var p5 = PlayerService.ZeroNegativeResources(gameID.toString());
                                                                                        var p6 = TerritoryService.ZeroNegativeTerritories(gameID.toString());
                                                                                        Promise.all([p5, p6]).then(() => {
                                                                                            // On flag les fiches d'ordres de ce tour comme traitées
                                                                                            var ordersIds = orders.map(e => {
                                                                                                return new mongo.ObjectID(e._id);
                                                                                            });
                                                                                            var searchQuery = {
                                                                                                _id: {
                                                                                                    $in: ordersIds
                                                                                                }
                                                                                            };
                                                                                            var updateQuery = {
                                                                                                $set: {
                                                                                                    processed: true,
                                                                                                    processTime: new Date().toUTCString()
                                                                                                }
                                                                                            };
                                                                                            var p1 = OrderService.UpdateOrders(searchQuery, updateQuery);
                                                                                            var newTitanicPlanes = response.length;
                                                                                            var incrementPlanes = 0;
                                                                                            var nbConquests = previousTitanPlanes - newTitanicPlanes;
                                                                                            if (nbConquests > 0) {
                                                                                                incrementPlanes = Math.floor(nbPlayers / 2) + nbConquests;
                                                                                            }
                                                                                            /* else {
                                                                                                incrementPlanes = -1 * (10 - newTitanicPlanes);
                                                                                            }*/
                                                                                            var updateTerritories = {
                                                                                                $inc: {
                                                                                                    titanForces: incrementPlanes
                                                                                                }
                                                                                            };
                                                                                            // On incrémente les forces sur les territoires titaniques restants
                                                                                            var p2 = TerritoryService.UpdateTerritory(searchTerritories, updateTerritories);
                                                                                            // On vide les forces envoyées par les joueurs sur tous les territoires de la partie
                                                                                            var p3 = TerritoryService.UpdateTerritory({ gameID: gameID.toString() }, { $set: { playersForces: [] } });
                                                                                            // On incrémente le revenu des joueurs par un set de valeurs de base
                                                                                            var baseIncome = {
                                                                                                $inc: {
                                                                                                    orichalcum: 2,
                                                                                                    heroism: 1,
                                                                                                    prophets: 2,
                                                                                                    population: 2
                                                                                                },
                                                                                                $set: {
                                                                                                    sheetSent: false
                                                                                                }
                                                                                            };
                                                                                            var p4 = PlayerService.UpdatePlayers({ gameID: gameID.toString() }, baseIncome);
                                                                                            Promise.all([p1, p2, p3, p4]).then(() => {
                                                                                                if (game.turn == 7) {
                                                                                                    // On enregistre l'état des joueurs avant la résolution du tour
                                                                                                    PlayerService.GetPlayers({ gameID: gameID.toString() }).then(players => {
                                                                                                        var historyPromises = [];
                                                                                                        players.forEach(player => {
                                                                                                            var history = {
                                                                                                                orichalcum: player.orichalcum,
                                                                                                                army: player.army,
                                                                                                                heroism: player.heroism,
                                                                                                                prophets: player.prophets,
                                                                                                                population: player.population,
                                                                                                                fatebindings: player.fatebindings,
                                                                                                                victoryPoints: player.victoryPoints,
                                                                                                                controlledPlanes: player.territories.length,
                                                                                                                playerID: player._id.toString(),
                                                                                                                gameID: player.gameID,
                                                                                                                turn: gameTurn + 1
                                                                                                            };
                                                                                                            historyPromises.push(PlayerHistoryService.AddHistory(history));
                                                                                                        });
                                                                                                    });
                                                                                                    TerritoryService.GetTerritory({ gameID: gameID.toString(), owner: { $not: { $eq: "" } } }).then(godPlanes => {
                                                                                                        var winCondition = GameService.GetWinningCondition(game.playersIds.length);
                                                                                                        var update = {};
                                                                                                        if (godPlanes.length >= winCondition) {
                                                                                                            update = { $set: { closed: true, running: false, locked: true, won: true, turn: 8 } };
                                                                                                        } else {
                                                                                                            update = { $set: { closed: true, running: false, locked: true, won: false, turn: 8 } }
                                                                                                        }

                                                                                                        GameService.UpdateGame({ _id: gameID }, update).then(() => {
                                                                                                            resolve(game);
                                                                                                        });
                                                                                                    });
                                                                                                } else {
                                                                                                    // On débloque la partie et on incrémente le nombre de tours déroulés
                                                                                                    GameService.UpdateGame({ _id: gameID }, {
                                                                                                        $set: { locked: false },
                                                                                                        $inc: {
                                                                                                            turn: 1
                                                                                                        }
                                                                                                    }).then(() => {
                                                                                                        resolve(game);
                                                                                                    });
                                                                                                }
                                                                                            });
                                                                                        });
                                                                                    });
                                                                                });
                                                                            });
                                                                        });
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    } else { // Reprise de la partie
                                        GameService.UpdateGame({ _id: gameID }, { $set: { locked: false } }).then(() => {
                                            resolve(game);
                                        });
                                    }
                                }
                            });
                        }
                    });
                } catch (e) {
                    console.log(e);
                }
            });
        });
        return obj;
    },
    UpdateGame: async function(searchQuery, updateQuery) {
        var obj = await new Promise(function(resolve, reject) {
            MongoClient.connect(MONGO_CONNECT, function(error, client) {
                var db = client.db("riseofthegods");
                try {
                    db.collection(DB_NAME).updateOne(searchQuery, updateQuery, function(error, result) {
                        var updateResult = null;
                        if (result.result.ok != 1 || result.result.nbModified == 0) {
                            updateResult = {
                                type: "red",
                                message: `The game couldn't be updated. If the problem persists, please contact an administrator`
                            };
                        } else {
                            updateResult = result;
                        }
                        resolve(updateResult);
                        client.close();
                    });
                } catch (e) {
                    console.log(e);
                }
            });
        });
        return obj;
    },
    AddGame: async function(data) {
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
                                message: `An error occured while adding the game with ID ${gameID}`
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
    GetGame: async function(searchQuery) {
        var obj = await new Promise(function(resolve, reject) {
            MongoClient.connect(MONGO_CONNECT, function(error, client) {
                var db = client.db("riseofthegods");
                db.collection(DB_NAME).find(searchQuery).toArray(function(error, records) {
                    resolve(records);
                    client.close();
                });
            });
        });
        return obj;
    },
    DeleteGame: async function(searchQuery) {
        var obj = await new Promise(function(resolve, reject) {
            MongoClient.connect(MONGO_CONNECT, function(error, client) {
                var db = client.db("riseofthegods");
                db.collection(DB_NAME).deleteMany(searchQuery, function(error, records) {
                    resolve(true);
                    client.close();
                });
            });
        });
        return obj;
    },
    GetFateConsequence: async function(playerId, gameId) {
        var obj = await new Promise(function(resolve, reject) {
            try {
                PlayerService.GetPlayer({ _id: new mongo.ObjectID(playerId) }).then(response => {
                    var resources = {
                        orichalcum: response.orichalcum,
                        heroism: response.heroism,
                        army: response.army,
                        prophets: response.prophets,
                        fatebindings: response.fatebindings,
                        population: response.population,
                        territories: response.territories
                    };
                    var consequence = null;
                    if (resources.fatebindings > 0) {
                        var consequenceIndex = Math.floor(Math.random() * (FateConsequences.length - 1));
                        consequence = FateConsequences[consequenceIndex];
                        consequence.text = consequence.text.replace("%L", resources.fatebindings);
                        consequence.textVO = consequence.textVO.replace("%L", resources.fatebindings);
                    } else {
                        consequence = FateConsequences[0];
                    }
                    consequence.action(resources, playerId, gameId).then(() => {
                        resolve(consequence);
                    });
                });
            } catch (e) {
                console.log(e);
            }
        });
        return obj;
    },
    GetWinningCondition: function(nbPlayers) {
        if (nbPlayers < 6) {
            return nbPlayers + 2;
        } else if (nbPlayers < 8) {
            return nbPlayers + 1;
        } else if (nbPlayers < 10) {
            return nbPlayers;
        } else if (nbPlayers < 12) {
            return nbPlayers - 1;
        } else {
            return 10;
        }
    }
};

var FateConsequences = [
    /*{
            name: "Tout est calme",
            text: "Vous échappez au <a href='/wiki/lore/destin' target='_blank'>Destin</a> pour le moment...",
            action: async function(fate) {
                var obj = await new Promise(function(resolve, reject) {
                    // DO NOTHING
                    resolve(true);
                });
                return obj;
            }
        },*/
    {
        name: "Soleil Bienveillant",
        nameVO: "Benevolent Sun",
        text: "<a href='/wiki/lore/hélios' target='_blank'>Hélios</a> vous garde et vous protège du Destin pour l'instant",
        textVO: "<a href='/wiki/lore/hélios' target='_blank'>Hélios</a> guards you and protects you from Fate for now",
        action: async function(fate) {
            var obj = await new Promise(function(resolve, reject) {
                // DO NOTHING
                resolve(true);
            });
            return obj;
        }
    },
    {
        name: "Lune Souriante",
        nameVO: "Smiling Moon",
        text: "<a href='/wiki/lore/séléné' target='_blank'>Séléné</a> vous garde et vous protège du Destin pour l'instant",
        textVO: "<a href='/wiki/lore/séléné' target='_blank'>Selene</a> guards you and protects you from Fate for now",
        action: async function(fate) {
            var obj = await new Promise(function(resolve, reject) {
                // DO NOTHING
                resolve(true);
            });
            return obj;
        }
    },
    {
        name: "Légende Eternelle",
        nameVO: "Eternal Legend",
        text: "Vous perdez 1&nbsp;<i class='fa fa-spider'></i>&nbsp; Lien du Destin, votre <a href='/wiki/lore/légende' target='_blank'>Légende</a> n'est pas encore écrite",
        textVO: "You lose 1&nbsp;<i class='fa fa-spider'></i>&nbsp; Fate Binding, your <a href='/wiki/lore/légende' target='_blank'>Legend</a> is not written yet",
        action: async function(resources, playerId) {
            var obj = await new Promise(function(resolve, reject) {
                PlayerService.UpdateResources(playerId, { $inc: { fatebindings: -1 } }).then(() => {
                    resolve(true);
                });
            });
            return obj;
        }
    },
    {
        name: "Fête Divine",
        nameVO: "Divine Party",
        text: "Une petite <a href='/wiki/music-library' target='_blank'>musique</a> semble guider votre histoire, vous protégeant temporairement du Destin",
        textVO: "A slight <a href='/wiki/music-library' target='_blank'>music</a> seems to guide your story, protecting you temporarily from Fate",
        action: async function(resources, playerId) {
            var obj = await new Promise(function(resolve, reject) {
                // DO NOTHING
                resolve(true);
            });
            return obj;
        }
    },
    {
        name: "Prophétie Terrible",
        nameVO: "Horrendous Prophecy",
        text: "Vous perdez %L d'<i class='fa fa-jedi'></i>&nbsp;Héroïsme et de <i class='fa fa-eye'></i>&nbsp;Prophètes",
        textVO: "You lose %L <i class='fa fa-jedi'></i>&nbsp;Heroism and <i class='fa fa-eye'></i>&nbsp;Prophets",
        action: async function(resources, playerId) {
            var obj = await new Promise(function(resolve, reject) {
                try {
                    var hero = resources.heroism - resources.fatebindings;
                    var proph = resources.prophets - resources.fatebindings;
                    var update = {};
                    if (hero <= 0 && proph <= 0) {
                        update = { $set: { heroism: 0, prophets: 0 } };
                    } else if (hero > 0 && proph <= 0) {
                        update = { $inc: { heroism: -1 * resources.fatebindings }, $set: { prophets: 0 } }
                    } else if (hero <= 0 && proph > 0) {
                        update = { $inc: { prophets: -1 * resources.fatebindings }, $set: { heroism: 0 } }
                    } else if (hero > 0 && proph > 0) {
                        update = { $inc: { heroism: -1 * resources.fatebindings, prophets: -1 * resources.fatebindings } };
                    }

                    PlayerService.UpdateResources(playerId, update).then(() => {
                        resolve(true);
                    });
                } catch (e) {
                    console.log(e);
                }
            });
            return obj;
        }
    },
    {
        name: "Migration de réfugiés",
        nameVO: "Refugees Migration",
        text: "%L de votre <i class='fa fa-user-friends'></i>&nbsp;Population sont transférés au(x) joueur(s) avec le moins de <i class='fa fa-trophy'></i>&nbsp;Points de Victoire.",
        textVO: "%L of your <i class='fa fa-user-friends'></i>&nbsp;Population are transfered to the player(s) with the lowest <i class='fa fa-trophy'></i>&nbsp;Victory Points.",
        action: async function(resources, playerId, gameId) {
            var obj = await new Promise(function(resolve, reject) {
                try {
                    PlayerService.GetPlayers({ gameID: gameId }).then(response => {
                        var playersList = response;
                        var pv = -1;
                        var scoreGroups = [];
                        playersList.sort((a, b) => {
                            return a.victoryPoints - b.victoryPoints;
                        });
                        for (var i = 0; i < playersList.length; i++) {
                            var player = playersList[i];
                            if (player.victoryPoints != pv) {
                                pv = player.victoryPoints;
                                scoreGroups.push([player]);
                            } else {
                                scoreGroups[scoreGroups.length - 1].push(player);
                            }
                        }
                        var idsToUpdate = scoreGroups[0].map(e => {
                            return new mongo.ObjectID(e._id.toString());
                        });
                        var updateOriginPlayer = {};

                        if (resources.population - resources.fatebindings < 0) {
                            updateOriginPlayer = { $set: { population: 0 } };
                        } else {
                            updateOriginPlayer = { $inc: { population: -1 * resources.fatebindings } };
                        }
                        var promises = [
                            PlayerService.UpdatePlayers({ _id: { $in: idsToUpdate } }, { $inc: { population: resources.fatebindings } }),
                            PlayerService.UpdateResources(playerId, updateOriginPlayer)
                        ];
                        Promise.all(promises).then(() => {
                            resolve(true);
                        });
                    });
                } catch (e) {
                    console.log(e);
                }
            });
            return obj;
        }
    },
    {
        name: "Survol d'un Dragon",
        nameVO: "Dragon Flyby",
        text: "Vous perdez %L d'<i class='fa fa-gem'></i>&nbsp;Orichalque et de <i class='fa fa-user-friends'></i>&nbsp;Population",
        textVO: "You lose %L <i class='fa fa-gem'></i>&nbsp;Orichalcum and <i class='fa fa-user-friends'></i>&nbsp;Population",
        action: async function(resources, playerId) {
            var obj = await new Promise(function(resolve, reject) {
                try {
                    var ori = resources.orichalcum - resources.fatebindings;
                    var pop = resources.population - resources.fatebindings;
                    var update = {};
                    if (ori <= 0 && pop <= 0) {
                        update = { $set: { orichalcum: 0, population: 0 } };
                    } else if (ori > 0 && pop <= 0) {
                        update = { $inc: { orichalcum: -1 * resources.fatebindings }, $set: { population: 0 } }
                    } else if (ori <= 0 && pop > 0) {
                        update = { $inc: { population: -1 * resources.fatebindings }, $set: { orichalcum: 0 } }
                    } else if (ori > 0 && pop > 0) {
                        update = { $inc: { orichalcum: -1 * resources.fatebindings, population: -1 * resources.fatebindings } };
                    }

                    PlayerService.UpdateResources(playerId, update).then(() => {
                        resolve(true);
                    });
                } catch (e) {
                    console.log(e);
                }
            });
            return obj;
        }
    }
    /*,
        {
            name: "Invasion de Titans",
            text: "Si vous contrôlez au moins un Plan Cosmique, un d'entre eux redevient aléatoirement sous le joug des Titans (vous ne perdez pas vos <i class='fa fa-trophy'></i>&nbsp;Points de Victoire)",
            action: async function(resources, playerId, gameId) {
                var obj = await new Promise(function(resolve, reject) {
                    try {
                        if (resources.territories.length > 0) {
                            var randomIndex = Math.floor(Math.random() * resources.territories.length);
                            var lostTerritory = resources.territories.splice(randomIndex, 1);
                            GameService.GetGame({ _id: new mongo.ObjectID(gameId) }).then(game => {
                                var update = {
                                    $set: {
                                        owner: "",
                                        ownerName: "",
                                        titanForces: game.playersIds.length * (Dice.D6(2) - Dice.D8(1)) + game.turn + 1 //T + NJ
                                    }
                                };
                                var promises = [
                                    TerritoryService.UpdateTerritory({ _id: new mongo.ObjectID(lostTerritory._id) }, update),
                                    PlayerService.UpdatePlayers({ _id: new mongo.ObjectID(playerId) }, { $set: { territories: resources.territories } })
                                ];
                                Promise.all(promises).then(() => {
                                    resolve(true);
                                })
                            })
                        } else {
                            resolve(true);
                        }
                    } catch (e) {
                        console.log(e);
                    }
                });
                return obj;
            }
        }*/
    ,
    {
        name: "Perturbation de la Légende",
        nameVO: "Legend Perturbation",
        text: "Tous les joueurs gagnent mystérieusement 1&nbsp;<i class='fa fa-spider'></i>&nbsp;Lien du Destin par votre faute. A vous de leur avouer...ou pas !",
        textVO: "Every players mysteriously gain 1&nbsp;<i class='fa fa-spider'></i>&nbsp;Fate Binding because of you. It's up to you to tell them...or not !",
        action: async function(resources, playerId, gameId) {
            var obj = await new Promise(function(resolve, reject) {
                try {
                    PlayerService.UpdatePlayers({ gameID: gameId }, { $inc: { fatebindings: 1 } }).then(() => {
                        resolve(true);
                    })
                } catch (e) {
                    console.log(e);
                }
            });
            return obj;
        }
    }
];

module.exports = GameService;