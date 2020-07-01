var Dice = require("../utils/dice");
var Time = require("../utils/time");
var mongo = require("../../node_modules/mongodb");
var TerritoryService = require("./territoryService");
var PlayersService = require("./playersService");
var ResultService = require("../services/ordersResultsService");
var MongoClient = mongo.MongoClient;
var MONGO_CONNECT = "mongodb://localhost/riseofthegods";
var DB_NAME = "orders";

var OrderService = {
    AddOrder: async function(data) {
        delete data._id;
        var obj = await new Promise(function(resolve, reject) {
            MongoClient.connect(MONGO_CONNECT, function(error, client) {
                var db = client.db("riseofthegods");
                try {
                    db.collection(DB_NAME).insertOne(data, function(error, inserted) {
                        resolve(inserted);
                        client.close();
                    });
                } catch (e) {
                    console.log(e);
                }
            });
        });
        return obj;
    },
    UpdateOrders: async function(search, update) {
        var obj = await new Promise(function(resolve, reject) {
            MongoClient.connect(MONGO_CONNECT, function(error, client) {
                var db = client.db("riseofthegods");
                try {
                    db.collection(DB_NAME).updateMany(search, update, function(error, results) {
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
    GetOrders: async function(query) {
        var obj = await new Promise(function(resolve, reject) {
            var orders = [];
            MongoClient.connect(MONGO_CONNECT, function(error, client) {
                var db = client.db("riseofthegods");
                try {
                    db.collection(DB_NAME).find(query).toArray(function(error, results) {
                        if (results) {
                            Object.assign(orders, results);
                        }
                        resolve(orders);
                        client.close();
                    });
                } catch (e) {
                    console.log(e);
                }
            });
        });
        return obj;
    },
    DeleteOrders: async function(query) {
        var obj = await new Promise(function(resolve, reject) {
            var orders = [];
            MongoClient.connect(MONGO_CONNECT, function(error, client) {
                var db = client.db("riseofthegods");
                try {
                    db.collection(DB_NAME).deleteMany(query, function(error, results) {
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
    GetTodayGameOrders: async function(gameID, gameTurn) {
        var obj = await new Promise(function(resolve, reject) {
            var resultOrders = [];
            MongoClient.connect(MONGO_CONNECT, function(error, client) {
                var db = client.db("riseofthegods");
                try {
                    var SearchQuery = {
                        gameID: gameID,
                        turn: gameTurn
                    };
                    db.collection(DB_NAME).find(SearchQuery).toArray(function(error, results) {
                        if (results) {
                            Object.assign(resultOrders, results);
                        }
                        resolve(resultOrders);
                        client.close();
                    });
                } catch (e) {
                    console.log(e);
                }
            });
        });
        return obj;
    },
    GetAttackOrders: function(ordersList) {
        var attackOrders = [];
        ordersList.forEach(element => {
            if (element.ordersSent.indexOf(ResourceOrders.ARMY_ATTACK) > -1 ||
                element.ordersSent.indexOf(ResourceOrders.PROPH_INFILT) > -1) {
                attackOrders.push(element);
            }
        });
        return attackOrders;
    },
    GetFateHandOrders: function(ordersList) {
        var hands = [];
        ordersList.forEach(element => {
            if (element.ordersSent.indexOf(ResourceOrders.HAND_FATE) > -1) {
                hands.push(element);
            }
        });
        return hands;
    },
    GetGambleOrders: function(ordersList) {
        var gambleOrders = [];
        ordersList.forEach(element => {
            if (element.ordersSent.indexOf(ResourceOrders.ORI_GAMBLE) > -1) {
                gambleOrders.push(element);
            }
        });
        return gambleOrders;
    },
    ProcessFateHandOrders: async function(hands) {
        var obj = await new Promise(function(resolve, reject) {
            if (hands.length > 0) {
                hands.forEach(hand => {
                    try {
                        var bonusIds = hand.parameters.handBonusPlanes.map(e => {
                            return new mongo.ObjectID(e);
                        });
                        var malusId = new mongo.ObjectID(hand.parameters.handMalusPlane);
                        TerritoryService.GetTerritory({ _id: { $in: bonusIds } }).then(bonusPlanes => {
                            var promises = [];
                            if (bonusPlanes && bonusPlanes.length > 0) {
                                bonusPlanes.forEach(plane => {
                                    var currentForces = plane.titanForces;
                                    var update = {};
                                    if (currentForces - 1 <= 0) {
                                        update = {
                                            $set: {
                                                titanForces: 0
                                            }
                                        };
                                    } else {
                                        update = {
                                            $inc: {
                                                titanForces: -1
                                            }
                                        };
                                    }
                                    promises.push(TerritoryService.UpdateTerritory({ _id: new mongo.ObjectID(plane._id) }, update));
                                });
                                promises.push(TerritoryService.UpdateTerritory({ _id: malusId }, { $inc: { titanForces: 3 } }));
                                Promise.all(promises).then(() => {
                                    resolve(true);
                                });
                            }
                        });
                    } catch (e) {
                        console.log(e);
                    }
                });
            } else {
                resolve(true);
            }
        });
        return obj;
    },
    ProcessAttackOrders: async function(attacks) {
        var obj = await new Promise(function(resolve, reject) {
            var attackedTerritories = attacks.map(e => {
                return e.parameters.attackTarget;
            });
            var attacksUnemptied = attackedTerritories.filter(e => e != "");
            var promises = [];
            attacks.forEach(attack => {
                var ordersSentList = attack.ordersSent;
                ordersSentList.forEach(order => {
                    if (order == ResourceOrders.ARMY_ATTACK) {
                        promises.push(OrderService.ArmyAttack(attack));
                    } else if (order == ResourceOrders.PROPH_INFILT) {
                        promises.push(OrderService.ProphetInfiltrate(attack, attacksUnemptied));
                    }
                });
            });
            Promise.all(promises).then(() => {
                resolve(promises.every(e => e));
            });
        });
        return obj;
    },
    ProcessOtherOrders: async function(orders) {
        var obj = await new Promise(function(resolve, reject) {
            var promises = [];
            orders.forEach(order => {
                var ordersSent = order.ordersSent;
                ordersSent.forEach(element => {
                    if (element != ResourceOrders.ARMY_ATTACK && element != ResourceOrders.PROPH_INFILT &&
                        element != ResourceOrders.ORI_GAMBLE && element != ResourceOrders.HAND_FATE) {
                        promises.push(OrderService.ExecuteOrders(element, order.parameters, order.gameID, order.turn));
                    }
                });
            });
            Promise.all(promises).then(() => {
                resolve(promises.every(e => e));
            });
        });
        return obj;
    },
    ProcessConquests: async function(attacks) {
        var obj = await new Promise(function(resolve, reject) {
            var attackedTerritories = attacks.map(e => {
                return e.parameters.attackTarget;
            });
            // Résoudre les conflits
            TerritoryService.ComputeConquests(attackedTerritories).then((response) => {
                // Une fois les conflits résolus on récupère le tableau trié des armées envoyées pour constituer l'attaque
                var rankings = [];
                Object.assign(rankings, response);
                var promises = [];
                if (rankings.length > 0) {
                    rankings.forEach(ranking => {
                        // Attribuer les points de victoire
                        ranking.sort((a, b) => {
                            return b.armies - a.armies;
                        }).splice(3);
                        for (var i = 0; i < ranking.length; i++) {
                            var score = ranking[i];
                            var update = {}
                            if (i == 0) {
                                update = { $inc: { victoryPoints: 5, fatebindings: 2 } };
                            } else {
                                update = { $inc: { victoryPoints: 5 - i - 1 } };
                            }
                            promises.push(
                                PlayersService.UpdateResources(score.playerID, update)
                            );
                            promises.push(
                                ResultService.UpdateResults({ playerID: score.playerID, gameID: attacks[0].gameID, turn: attacks[0].turn, order: ResourceOrders.ARMY_ATTACK }, { $set: { resourceGain: [ResourcesKeys.VIC, ResourcesKeys.FATE], gains: [update.$inc.victoryPoints, (update.$inc.fatebindings ? update.$inc.fatebindings : 0)], planeConquered: true } })
                            )
                        }
                    });
                    Promise.all(promises).then(values => {
                        resolve(response && values.every(e => e));
                    });
                } else {
                    resolve(response);
                }
            });
        });
        return obj;
    },
    ProcessGambles: async function(orders) {
        var obj = await new Promise(function(resolve, reject) {
            var promises = [];
            orders.forEach(order => {
                promises.push(OrderService.OriGamble(order));
            });
            Promise.all(promises).then(() => {
                resolve(promises.every(e => e));
            });
        });
        return obj;
    },
    ExecuteOrders: async function(numOrder, parameters, gameID, gameTurn) {
        var obj = await new Promise(function(resolve, reject) {
            switch (numOrder) {
                case ResourceOrders.ORI_PROSP:
                    OrderService.OriProsperity(parameters, gameID, gameTurn).then(response => {
                        resolve(response);
                    });
                    break;
                case ResourceOrders.ORI_INVEST:
                    OrderService.OriInvestment(parameters, gameID, gameTurn).then(response => {
                        resolve(response);
                    });
                    break;
                case ResourceOrders.FATE_ALEA:
                    OrderService.FateAleaJactaEst(parameters, gameID, gameTurn).then(response => {
                        resolve(response);
                    });
                    break;
                case ResourceOrders.ARMY_STABI:
                    OrderService.ArmyStabilize(parameters, gameID, gameTurn).then(response => {
                        resolve(response);
                    });
                    break;
                case ResourceOrders.HERO_GODBORN:
                    OrderService.HeroMakeGodborn(parameters, gameID, gameTurn).then(response => {
                        resolve(response);
                    });
                    break;
                case ResourceOrders.HERO_EXPLO:
                    OrderService.HeroRiskyExploration(parameters, gameID, gameTurn).then(response => {
                        resolve(response);
                    });
                    break;
                case ResourceOrders.HERO_TEAM:
                    OrderService.HeroEpicTeam(parameters, gameID, gameTurn).then(response => {
                        resolve(response);
                    });
                    break;
                case ResourceOrders.POP_PLAN:
                    OrderService.PopulationInhabit(parameters, gameID, gameTurn).then(response => {
                        resolve(response);
                    });
                    break;
                case ResourceOrders.POP_RECRUIT:
                    OrderService.PopulationRecruit(parameters, gameID, gameTurn).then(response => {
                        resolve(response);
                    });
                    break;
                case ResourceOrders.POP_CIVI:
                    OrderService.PopulationCivilization(parameters, gameID, gameTurn).then(response => {
                        resolve(response);
                    });
                    break;
                case ResourceOrders.POP_INFO:
                    OrderService.PopulationInformants(parameters, gameID, gameTurn).then(response => {
                        resolve(response);
                    });
                    break;
                case ResourceOrders.FATE_CELEB:
                    OrderService.FateCelebration(parameters, gameID, gameTurn).then(response => {
                        resolve(response);
                    });
                    break;
                case ResourceOrders.FATE_RITUAL:
                    OrderService.FatePowerRitual(parameters, gameID, gameTurn).then(response => {
                        resolve(response);
                    });
                    break;
                case ResourceOrders.FATE_GOSSIP:
                    OrderService.FateGossips(parameters, gameID, gameTurn).then(response => {
                        resolve(response);
                    });
                    break;
                case ResourceOrders.PROPH_SPY:
                    OrderService.ProphetSpy(parameters, gameID, gameTurn).then(response => {
                        resolve(response);
                    });
                    break;
                case ResourceOrders.PROPH_FORESEE:
                    OrderService.ProphetProphecy(parameters, gameID, gameTurn).then(response => {
                        resolve(response);
                    });
                    break;
                case ResourceOrders.ORI_OPU:
                    OrderService.OriOpulence(parameters, gameID, gameTurn).then(response => {
                        resolve(response);
                    });
                    break;
                case ResourceOrders.PROPH_ORA:
                    OrderService.ProphetOracles(parameters, gameID, gameTurn).then(response => {
                        resolve(response);
                    });
                    break;
                case ResourceOrders.PROPH_AUG:
                    OrderService.ProphetAugures(parameters, gameID, gameTurn).then(response => {
                        resolve(response);
                    });
                    break;
                case ResourceOrders.PROPH_FUTUR:
                    OrderService.ProphetFuture(parameters, gameID, gameTurn).then(response => {
                        resolve(response);
                    });
                    break;
                case ResourceOrders.PROPH_LEGEND:
                    OrderService.ProphetLegendScatter(parameters, gameID, gameTurn).then(response => {
                        resolve(response);
                    });
                    break;
                case ResourceOrders.HERO_APO:
                    OrderService.HeroApotheose(parameters, gameID, gameTurn).then(response => {
                        resolve(response);
                    });
                    break;
            }
        });
        return obj;
    },
    OriProsperity: async function(parameters, gameID, turn) {
        var id = parameters.playerID;
        var resourceUpdate = {
            $inc: {
                orichalcum: -2,
                prophets: 1,
                population: 1
            }
        };
        var obj = await new Promise(function(resolve, reject) {
            var promises = [
                PlayersService.UpdateResources(id, resourceUpdate),
                ResultService.UpdateResults({ playerID: id, gameID: gameID, turn: turn, order: ResourceOrders.ORI_PROSP }, { $set: { resourceCost: ResourcesKeys.ORI, cost: 2, resourceGain: [ResourcesKeys.PROPH, ResourcesKeys.POP], gains: [1, 1] } })
            ];
            Promise.all(promises).then(response => {
                resolve(response.every(e => e));
            });
        });
        return obj;
    },
    OriOpulence: async function(parameters, gameID, turn) {
        var id = parameters.playerID;
        var resourceUpdate = {
            $inc: {
                orichalcum: -4,
                prophets: 3,
                population: 3
            }
        };
        var obj = await new Promise(function(resolve, reject) {
            var promises = [
                PlayersService.UpdateResources(id, resourceUpdate),
                ResultService.UpdateResults({ playerID: id, gameID: gameID, turn: turn, order: ResourceOrders.ORI_OPU }, { $set: { resourceCost: ResourcesKeys.ORI, cost: 4, resourceGain: [ResourcesKeys.PROPH, ResourcesKeys.POP], gains: [3, 3] } })
            ];
            Promise.all(promises).then(response => {
                resolve(response.every(e => e));
            });
        });
        return obj;
    },
    OriInvestment: async function(parameters, gameID, turn) {
        var obj = await new Promise(function(resolve, reject) {
            PlayersService.GetNumberOfTerritories(parameters.playerID).then(nbTerritories => {
                var updateQuery = {
                    $inc: {
                        orichalcum: 3 + nbTerritories - 2
                    }
                };
                var promises = [
                    PlayersService.UpdateResources(parameters.playerID, updateQuery),
                    ResultService.UpdateResults({ playerID: parameters.playerID, gameID: gameID, turn: turn, order: ResourceOrders.ORI_INVEST }, { $set: { resourceCost: ResourcesKeys.ORI, cost: 2, resourceGain: [ResourcesKeys.ORI], gains: [3 + nbTerritories] } })
                ];
                Promise.all(promises).then(response => {
                    resolve(response.every(e => e));
                });
            });
        });
        return obj;
    },
    OriGamble: async function(order) {
        var obj = await new Promise(function(resolve, reject) {
            TerritoryService.GetTerritoryById(order.parameters.gambleTarget).then((response) => {
                var territory = response;
                var gamble = parseInt(order.parameters.gambleSent);
                // Si le territoire vient de subir une attaque (la liste des players forces n'a pas encore été vidée)
                var promises = [];
                if (territory.playersForces.length > 0) {
                    var updateQuery = {};
                    var searchQuery = { playerID: order.parameters.playerID, gameID: order.gameID, turn: order.turn, order: ResourceOrders.ORI_GAMBLE };
                    if (territory.owner.length > 0) { // Si l'attaque a réussi
                        updateQuery = {
                            $inc: {
                                orichalcum: -1 * gamble,
                                victoryPoints: Math.ceil(gamble / 2)
                            }
                        };
                        promises.push(ResultService.UpdateResults(searchQuery, { $set: { resourceCost: ResourcesKeys.ORI, cost: gamble, resourceGain: [ResourcesKeys.VIC], gains: [Math.ceil(gamble / 2)], gambleTarget: order.parameters.gambleTarget } }));
                    } else { // Si l'attaque a échoué
                        updateQuery = {
                            $inc: {
                                orichalcum: -1 * gamble,
                                fatebindings: gamble
                            }
                        };
                        promises.push(ResultService.UpdateResults(searchQuery, { $set: { resourceCost: ResourcesKeys.ORI, cost: gamble, resourceGain: [ResourcesKeys.FATE], gains: [-1 * gamble] } }));
                    }
                    promises.push(PlayersService.UpdateResources(order.parameters.playerID, updateQuery));
                    Promise.all(promises).then(response => {
                        resolve(response.every(e => e));
                    });
                } else {
                    resolve(true);
                } // Sinon on ne fait rien et le joueur n'est pas débité
            });
        });
        return obj;
    },
    FateAleaJactaEst: async function(parameters, gameID, turn) {
        var id = parameters.playerID;
        var resourceUpdate = {
            $inc: {
                orichalcum: Dice.D3(2),
                army: Dice.D3(2),
                heroism: Dice.D3(2),
                population: Dice.D3(2),
                fatebindings: 4,
                prophets: Dice.D3(2)
            }
        };
        var obj = await new Promise(function(resolve, reject) {
            var promises = [
                PlayersService.UpdateResources(id, resourceUpdate),
                ResultService.UpdateResults({ playerID: id, gameID: gameID, turn: turn, order: ResourceOrders.FATE_ALEA }, {
                    $set: {
                        resourceCost: ResourcesKeys.FATE,
                        cost: -4,
                        resourceGain: [ResourcesKeys.ORI, ResourcesKeys.ARMY, ResourcesKeys.HERO, ResourcesKeys.PROPH, ResourcesKeys.POP],
                        gains: [resourceUpdate.$inc.orichalcum, resourceUpdate.$inc.army, resourceUpdate.$inc.heroism, resourceUpdate.$inc.prophets, resourceUpdate.$inc.population]
                    }
                })
            ];
            Promise.all(promises).then(response => {
                resolve(response.every(e => e));
            });
        });
        return obj;
    },
    ArmyAttack: async function(attack) {
        var territoryID = attack.parameters.attackTarget;
        var armies = attack.parameters.armySent;
        var whoSent = attack.parameters.playerID;
        var playerForcesObject = {
            playerID: whoSent,
            playerName: attack.parameters.playerName,
            armies: parseInt(armies),
            gameID: attack.gameID,
            turn: attack.turn
        };
        var obj = await new Promise(function(resolve, reject) {
            var promises = [
                TerritoryService.AttackTerritory(territoryID, playerForcesObject),
                PlayersService.UpdateResources(whoSent, { $inc: { army: -1 * armies } }),
                ResultService.UpdateResults({ playerID: whoSent, gameID: attack.gameID, turn: attack.turn, order: ResourceOrders.ARMY_ATTACK }, { $set: { resourceCost: ResourcesKeys.ARMY, cost: armies, attackedPlaneID: territoryID } })
            ]
            Promise.all(promises).then(values => {
                resolve(values.every(e => e));
            })
        });
        return obj;
    },
    ArmyStabilize: async function(parameters, gameID, turn) {
        var id = parameters.playerID;
        var resourceUpdate = {
            $inc: {
                army: -4,
                fatebindings: -2
            }
        };
        var obj = await new Promise(function(resolve, reject) {
            var promises = [
                PlayersService.UpdateResources(id, resourceUpdate),
                ResultService.UpdateResults({ playerID: id, gameID: gameID, turn: turn, order: ResourceOrders.ARMY_STABI }, { $set: { resourceCost: ResourcesKeys.ARMY, cost: 4, resourceGain: [ResourcesKeys.FATE], gains: [-2] } })
            ];
            Promise.all(promises).then(response => {
                resolve(response.every(e => e));
            });
        });
        return obj;
    },
    HeroMakeGodborn: async function(parameters, gameID, turn) {
        var id = parameters.playerID;
        var resourceUpdate = {
            $inc: {
                army: 2,
                heroism: -2
            }
        };
        var obj = await new Promise(function(resolve, reject) {
            var promises = [
                PlayersService.UpdateResources(id, resourceUpdate),
                ResultService.UpdateResults({ playerID: id, gameID: gameID, turn: turn, order: ResourceOrders.HERO_GODBORN }, { $set: { resourceCost: ResourcesKeys.HERO, cost: 2, resourceGain: [ResourcesKeys.ARMY], gains: [2] } })
            ];
            Promise.all(promises).then(response => {
                resolve(response.every(e => e));
            });
        });
        return obj;
    },
    HeroRiskyExploration: async function(parameters, gameID, turn) {
        var id = parameters.playerID;
        var resourceUpdate = {
            $inc: {
                heroism: -3
            },
            $set: {
                titanForcesVisible: true
            }
        };
        var obj = await new Promise(function(resolve, reject) {
            var promises = [
                PlayersService.UpdateResources(id, resourceUpdate),
                ResultService.UpdateResults({ playerID: id, gameID: gameID, turn: turn, order: ResourceOrders.HERO_EXPLO }, { $set: { resourceCost: ResourcesKeys.HERO, cost: 3 } })
            ];
            Promise.all(promises).then(response => {
                resolve(response.every(e => e));
            });
        });
        return obj;
    },
    HeroEpicTeam: async function(parameters, gameID, turn) {
        var id = parameters.playerID;
        var resourceUpdate = {
            $inc: {
                heroism: Dice.D3(2) - 3
            }
        };
        var obj = await new Promise(function(resolve, reject) {
            var promises = [
                PlayersService.UpdateResources(id, resourceUpdate),
                ResultService.UpdateResults({ playerID: id, gameID: gameID, turn: turn, order: ResourceOrders.HERO_TEAM }, { $set: { resourceCost: ResourcesKeys.HERO, cost: 3, resourceGain: [ResourcesKeys.HERO], gains: [resourceUpdate.$inc.heroism + 3] } })
            ];
            Promise.all(promises).then(response => {
                resolve(response.every(e => e));
            });
        });
        return obj;
    },
    PopulationInhabit: async function(parameters, gameID, turn) {
        var obj = await new Promise(function(resolve, reject) {

            TerritoryService.GetTerritoryById(parameters.populateTarget).then((response) => {
                var territory = response;
                var INHABIT_GAIN_PLAYER = parseInt(parameters.populationSent, 10);
                var INHABIT_GAIN_OWNER = Math.ceil(parseInt(parameters.populationSent, 10) / 2);
                var updateFromTerritoryForPlayer = TerritoryService.GetUpdateQueryFromKey(territory.key, INHABIT_GAIN_PLAYER);
                var updateFromTerritoryForOwner = TerritoryService.GetUpdateQueryFromKey(territory.key, INHABIT_GAIN_OWNER);
                var searchQueryResultPlayer = { playerID: parameters.playerID, gameID: gameID, turn: turn, order: ResourceOrders.POP_PLAN };
                var resourceGainForPlayer = updateFromTerritoryForPlayer.resource;
                var resourceGainForOwner = updateFromTerritoryForOwner.resource;
                delete updateFromTerritoryForPlayer.resource;
                delete updateFromTerritoryForOwner.resource;
                var part1 = PlayersService.UpdateResources(parameters.playerID, updateFromTerritoryForPlayer);
                var part3 = PlayersService.UpdateResources(parameters.playerID, { $inc: { population: -1 * INHABIT_GAIN_PLAYER } });
                var part2 = PlayersService.UpdateResources(territory.owner, updateFromTerritoryForOwner);
                var part4 = ResultService.AddResult({
                    playerID: territory.owner,
                    gameID: gameID,
                    turn: turn,
                    order: ResourceOrders.POP_PLAN,
                    resourceCost: ResourcesKeys.POP,
                    cost: 0,
                    resourceGain: [resourceGainForOwner],
                    gains: [INHABIT_GAIN_OWNER],
                    settleTarget: parameters.populateTarget
                });
                var part5 = ResultService.UpdateResults(searchQueryResultPlayer, { $set: { resourceCost: ResourcesKeys.POP, cost: INHABIT_GAIN_PLAYER, resourceGain: [resourceGainForPlayer], gains: [INHABIT_GAIN_PLAYER], settleTarget: parameters.populateTarget } })
                Promise.all([part1, part2, part3, part4, part5]).then(values => {
                    resolve(values[0] && values[1] && values[2]);
                });
            });
        });
        return obj;
    },
    PopulationRecruit: async function(parameters, gameID, turn) {
        var obj = await new Promise(function(resolve, reject) {
            var id = parameters.playerID;
            PlayersService.GetNumberOfTerritories(id).then(nbTerritories => {
                var resourceUpdate = {
                    $inc: {
                        population: -2,
                        army: 1 + nbTerritories
                    }
                };
                var promises = [
                    PlayersService.UpdateResources(id, resourceUpdate),
                    ResultService.UpdateResults({ playerID: id, gameID: gameID, turn: turn, order: ResourceOrders.POP_RECRUIT }, { $set: { resourceCost: ResourcesKeys.POP, cost: 2, resourceGain: [ResourcesKeys.ARMY], gains: [nbTerritories + 1] } })
                ];
                Promise.all(promises).then(response => {
                    resolve(response.every(e => e));
                });
            });
        });
        return obj;
    },
    PopulationCivilization: async function(parameters, gameID, turn) {
        var obj = await new Promise(function(resolve, reject) {
            var id = parameters.playerID;
            var resourceUpdate = {
                $inc: {
                    population: Dice.D3(1) - 4,
                    orichalcum: Dice.D3(1),
                    army: 3
                }
            };
            var promises = [
                PlayersService.UpdateResources(id, resourceUpdate),
                ResultService.UpdateResults({ playerID: id, gameID: gameID, turn: turn, order: ResourceOrders.POP_CIVI }, { $set: { resourceCost: ResourcesKeys.POP, cost: 4, resourceGain: [ResourcesKeys.POP, ResourcesKeys.ORI, ResourcesKeys.ARMY], gains: [resourceUpdate.$inc.population + 4, resourceUpdate.$inc.orichalcum, 3] } })
            ];
            Promise.all(promises).then(response => {
                resolve(response.every(e => e));
            });
        });
        return obj;
    },
    PopulationInformants: async function(parameters, gameID, turn) {
        var id = parameters.playerID;
        var resourceUpdate = {
            $inc: {
                population: -2,
                prophets: Dice.D4(1)
            }
        };
        var obj = await new Promise(function(resolve, reject) {
            var promises = [
                PlayersService.UpdateResources(id, resourceUpdate),
                ResultService.UpdateResults({ playerID: id, gameID: gameID, turn: turn, order: ResourceOrders.POP_INFO }, { $set: { resourceCost: ResourcesKeys.POP, cost: 2, resourceGain: [ResourcesKeys.PROPH], gains: [resourceUpdate.$inc.prophets] } })
            ];
            Promise.all(promises).then(response => {
                resolve(response.every(e => e));
            });
        });
        return obj;
    },
    FateCelebration: async function(parameters, gameID, turn) {
        var id = parameters.playerID;
        var resourceUpdate = {};
        var obj = await new Promise(function(resolve, reject) {
            PlayersService.GetPlayer({ _id: new mongo.ObjectID(id) }).then(player => {
                var loss = Dice.D6(1) - Dice.D10(1);
                if (player.fatebindings + loss < 0) {
                    resourceUpdate = {
                        $set: {
                            fatebindings: 0
                        }
                    };
                } else {
                    resourceUpdate = {
                        $inc: {
                            fatebindings: loss,
                        }
                    };
                }
                var promises = [
                    PlayersService.UpdateResources(id, resourceUpdate),
                    ResultService.UpdateResults({ playerID: id, gameID: gameID, turn: turn, order: ResourceOrders.FATE_CELEB }, { $set: { resourceCost: ResourcesKeys.FATE, cost: 0, resourceGain: [ResourcesKeys.FATE], gains: [loss] } })
                ];
                Promise.all(promises).then(response => {
                    resolve(response.every(e => e));
                });
            });
        });
        return obj;
    },
    FatePowerRitual: async function(parameters, gameID, turn) {
        var id = parameters.playerID;
        var resourceUpdate = {
            $inc: {
                fatebindings: 1,
                heroism: 2
            }
        };
        var obj = await new Promise(function(resolve, reject) {
            var promises = [
                PlayersService.UpdateResources(id, resourceUpdate),
                ResultService.UpdateResults({ playerID: id, gameID: gameID, turn: turn, order: ResourceOrders.FATE_RITUAL }, { $set: { resourceCost: ResourcesKeys.FATE, cost: -1, resourceGain: [ResourcesKeys.HERO], gains: [2] } })
            ];
            Promise.all(promises).then(response => {
                resolve(response.every(e => e));
            });
        });
        return obj;
    },
    FateGossips: async function(parameters, gameID, turn) {
        var id = parameters.playerID;
        var resourceUpdate = {
            $inc: {
                fatebindings: 1,
                prophets: Dice.D3(1)
            }
        };
        var obj = await new Promise(function(resolve, reject) {
            var promises = [
                PlayersService.UpdateResources(id, resourceUpdate),
                ResultService.UpdateResults({ playerID: id, gameID: gameID, turn: turn, order: ResourceOrders.FATE_GOSSIP }, { $set: { resourceCost: ResourcesKeys.FATE, cost: -1, resourceGain: [ResourcesKeys.PROPH], gains: [resourceUpdate.$inc.prophets] } })
            ];
            Promise.all(promises).then(response => {
                resolve(response.every(e => e));
            });
        });
        return obj;
    },
    ProphetSpy: async function(parameters, gameID, turn) {
        var obj = await new Promise(function(resolve, reject) {

            try {
                OrderService.GetOrders({
                    gameID: gameID,
                    turn: turn,
                    "parameters.playerID": {
                        $in: parameters.foreseeTargets
                    }
                }).then((response) => {
                    var todayOrders = response;
                    var sheetsAvailable = todayOrders.map(e => {
                        return e._id.toString();
                    });
                    var updateQuery = {
                        $set: {
                            sheetsVisible: sheetsAvailable
                        },
                        $inc: {
                            prophets: -2
                        }
                    };
                    var promises = [
                        PlayersService.UpdateResources(parameters.playerID, updateQuery),
                        ResultService.UpdateResults({ playerID: parameters.playerID, gameID: gameID, turn: turn, order: ResourceOrders.PROPH_SPY }, { $set: { resourceCost: ResourcesKeys.PROPH, cost: 2, sheetsSpied: sheetsAvailable } })
                    ];
                    Promise.all(promises).then(response => {
                        resolve(response.every(e => e));
                    });
                });
            } catch (e) {
                console.log(e);
            }
        });
        return obj;
    },
    ProphetInfiltrate: async function(attack, infiltrationTerritoriesIDs) {
        var territoryPlayerForcesObject = {
            playerID: attack.parameters.playerID,
            playerName: attack.parameters.playerName,
            armies: 1,
            gameID: attack.gameID,
            turn: attack.turn
        };
        var obj = await new Promise(function(resolve, reject) {
            var promises = [
                TerritoryService.InfiltrateTerritories(territoryPlayerForcesObject, infiltrationTerritoriesIDs),
                PlayersService.UpdateResources(attack.parameters.playerID, { $inc: { prophets: -4 } }),
                ResultService.UpdateResults({ playerID: attack.parameters.playerID, gameID: attack.gameID, turn: attack.turn, order: ResourceOrders.PROPH_INFILT }, { $set: { resourceCost: ResourcesKeys.PROPH, cost: 4 } })
            ];
            Promise.all(promises).then(response => {
                resolve(response[0]);
            });
        });
        return obj;
    },
    ProphetProphecy: async function(parameters, gameID, turn) {
        var id = parameters.playerID;
        var resourceUpdate = {
            $inc: {
                prophets: -3
            },
            $set: {
                titanForcesVisible: true
            }
        };
        var obj = await new Promise(function(resolve, reject) {
            var promises = [
                PlayersService.UpdateResources(id, resourceUpdate),
                ResultService.UpdateResults({ playerID: id, gameID: gameID, turn: turn, order: ResourceOrders.PROPH_FORESEE }, { $set: { resourceCost: ResourcesKeys.PROPH, cost: 3 } })
            ];
            Promise.all(promises).then(response => {
                resolve(response.every(e => e));
            });
        });
        return obj;
    },
    ProphetOracles: async function(parameters, gameID, turn) {
        var id = parameters.playerID;
        var resourceUpdate = {
            $inc: {
                prophets: -2,
                orichalcum: 2
            }
        };
        var obj = await new Promise(function(resolve, reject) {
            var promises = [
                PlayersService.UpdateResources(id, resourceUpdate),
                ResultService.UpdateResults({ playerID: id, gameID: gameID, turn: turn, order: ResourceOrders.PROPH_ORA }, { $set: { resourceCost: ResourcesKeys.PROPH, cost: 2, resourceGain: [ResourcesKeys.ORI], gains: [2] } })
            ];
            Promise.all(promises).then(response => {
                resolve(response.every(e => e));
            });
        });
        return obj;
    },
    ProphetAugures: async function(parameters, gameID, turn) {
        var id = parameters.playerID;
        var resourceUpdate = {
            $inc: {
                prophets: -1,
                orichalcum: Dice.D3(1) - 1
            }
        };
        var obj = await new Promise(function(resolve, reject) {
            var promises = [
                PlayersService.UpdateResources(id, resourceUpdate),
                ResultService.UpdateResults({ playerID: id, gameID: gameID, turn: turn, order: ResourceOrders.PROPH_AUG }, { $set: { resourceCost: ResourcesKeys.PROPH, cost: 1, resourceGain: [ResourcesKeys.ORI], gains: [resourceUpdate.$inc.orichalcum] } })
            ];
            Promise.all(promises).then(response => {
                resolve(response.every(e => e));
            });
        });
        return obj;
    },
    ProphetFuture: async function(parameters, gameID, turn) {
        var id = parameters.playerID;
        var lose = (Math.floor(Math.random() * 2) == 0);
        var resourceUpdate = {};
        if (lose) {
            resourceUpdate = {
                $inc: {
                    prophets: -1,
                    fatebindings: -1
                }
            };
        } else {
            resourceUpdate = {
                $inc: {
                    prophets: -1,
                    fatebindings: 1
                }
            };
        }

        var obj = await new Promise(function(resolve, reject) {
            var promises = [
                PlayersService.UpdateResources(id, resourceUpdate),
                ResultService.UpdateResults({ playerID: id, gameID: gameID, turn: turn, order: ResourceOrders.PROPH_FUTUR }, { $set: { resourceCost: ResourcesKeys.PROPH, cost: 1, resourceGain: [ResourcesKeys.FATE], gains: [resourceUpdate.$inc.fatebindings] } })
            ];
            Promise.all(promises).then(response => {
                resolve(response.every(e => e));
            });
        });
        return obj;
    },
    ProphetLegendScatter: async function(parameters, gameID, turn) {
        var id = parameters.playerID;
        var lose = (Math.floor(Math.random() * 2) == 0);
        var resourceUpdate = {
            $inc: {
                prophets: -4,
                fatebindings: -1,
                population: 2
            }
        };

        var obj = await new Promise(function(resolve, reject) {
            var promises = [
                PlayersService.UpdateResources(id, resourceUpdate),
                ResultService.UpdateResults({ playerID: id, gameID: gameID, turn: turn, order: ResourceOrders.PROPH_LEGEND }, { $set: { resourceCost: ResourcesKeys.PROPH, cost: 4, resourceGain: [ResourcesKeys.POP, ResourcesKeys.FATE], gains: [2, -1] } })
            ];
            Promise.all(promises).then(response => {
                resolve(response.every(e => e));
            });
        });
        return obj;
    },
    HeroApotheose: async function(parameters, gameID, turn) {
        var id = parameters.playerID;
        var resourceUpdate = {
            $inc: {
                heroism: -6,
                victoryPoints: Dice.D4(1)
            }
        };
        var obj = await new Promise(function(resolve, reject) {
            var promises = [
                PlayersService.UpdateResources(id, resourceUpdate),
                ResultService.UpdateResults({ playerID: id, gameID: gameID, turn: turn, order: ResourceOrders.HERO_APO }, { $set: { resourceCost: ResourcesKeys.HERO, cost: 6, resourceGain: [ResourcesKeys.VIC], gains: [resourceUpdate.$inc.victoryPoints] } })
            ];
            Promise.all(promises).then(response => {
                resolve(response.every(e => e));
            });
        });
        return obj;
    }
};

var ResourceOrders = {
    ORI_PROSP: 0,
    ORI_INVEST: 1,
    FATE_ALEA: 2,
    ARMY_ATTACK: 3,
    ARMY_STABI: 4,
    HERO_GODBORN: 5,
    HERO_EXPLO: 6,
    HERO_TEAM: 7,
    POP_PLAN: 8,
    POP_RECRUIT: 9,
    POP_INFO: 10,
    FATE_CELEB: 11,
    FATE_RITUAL: 12,
    FATE_GOSSIP: 13,
    PROPH_FORESEE: 14,
    PROPH_INFILT: 15,
    PROPH_SPY: 16,
    ORI_GAMBLE: 17,
    ORI_OPU: 18,
    HAND_FATE: 19,
    POP_CIVI: 20,
    PROPH_ORA: 21,
    PROPH_AUG: 22,
    PROPH_FUTUR: 23,
    PROPH_LEGEND: 24,
    HERO_APO: 25
};

var ResourcesKeys = {
    ORI: 0,
    ARMY: 1,
    HERO: 2,
    PROPH: 3,
    POP: 4,
    FATE: 5,
    VIC: 6
}

module.exports = OrderService;