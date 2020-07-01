//var __dirname = "C:\\inetpub\\Sites\\www\\V2\\dist\\"
var publicdir = __dirname + '/dist';
var recettedir = __dirname + '/recette';
var history = require('connect-history-api-fallback');
var https = require('https');
var http = require('http');
var fs = require('fs');
var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
//var api = require("../../API")
var app = express();
var https_options = {
    key: fs.readFileSync("C:\\inetpub\\Sites\\www\\certificates\\private.key"),
    cert: fs.readFileSync("C:\\inetpub\\Sites\\www\\certificates\\certificate.crt"),
    ca: fs.readFileSync("C:\\inetpub\\Sites\\www\\certificates\\ca_bundle.crt")
};

/*app.use(history({
    verbose: true
}));*/
app.use(function(req, res, next) {
    if (req.secure) {
        next();
    } else {
        res.redirect("https://" + req.headers.host + req.url);
    }
});

//app.use("/api", api);
app.use(serveStatic(publicdir));
app.use(serveStatic(publicdir + "/wiki"));
app.use(serveStatic(publicdir + "/home"));

var server = https.createServer(https_options, app);
var serverHTTP = http.createServer(app);

app.get('*', function(req, res) {

    var file = publicdir + req.path + '/index.html';
    var appFile = publicdir + '/index.html';
    fs.exists(file, function(exists) {
        if (exists) {
            console.log("sending prerendered")
            res.setHeader('Content-Type', 'text/html');
            res.status(200);
            res.sendFile(file);
        } else {
            console.log("sending app.html")
            res.setHeader('Content-Type', 'text/html');
            res.status(200);
            res.sendFile(appFile);
        }
    });
});

/*var indexFile = __dirname + "app.html";
    res.setHeader('Content-Type', 'text/html');
    res.status(200);
    res.sendFile(indexFile);*/

server.listen(443, "::", function() {
    console.log("Server listening to port 443");
});

serverHTTP.listen(80, "::", function() {
    console.log("Server listening to port 80");
});