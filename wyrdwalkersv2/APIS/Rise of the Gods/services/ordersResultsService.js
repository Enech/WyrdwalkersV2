var mongo = require("../../node_modules/mongodb");
var MongoClient = mongo.MongoClient;
var MONGO_CONNECT = "mongodb://localhost/riseofthegods";
var DB_NAME = "orders_results";

var OrdersResultsService = {
    GetResults: async function(query) {
        var obj = await new Promise(function(resolve, reject) {
            MongoClient.connect(MONGO_CONNECT, function(error, client) {
                var db = client.db("riseofthegods");
                try {
                    db.collection(DB_NAME).find(query).toArray(function(error, results) {
                        if (results) {
                            resolve(results);
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
    UpdateResults: async function(query, updateQuery) {
        var obj = await new Promise(function(resolve, reject) {
            MongoClient.connect(MONGO_CONNECT, function(error, client) {
                var db = client.db("riseofthegods");
                try {
                    db.collection(DB_NAME).updateMany(query, updateQuery, function(error, result) {
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
    AddResult: async function(data) {
        var obj = await new Promise(function(resolve, reject) {
            MongoClient.connect(MONGO_CONNECT, function(error, client) {
                var db = client.db("riseofthegods");
                try {
                    db.collection(DB_NAME).insertOne(data, function(error, records) {
                        var requestResult = null;
                        if (!records) {
                            requestResult = {
                                type: "red",
                                message: `An error occured while adding the result from player ${data.playerID} for turn ${data.turn}`
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
    DeleteResults: async function(query) {
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
};

module.exports = OrdersResultsService;