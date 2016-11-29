var express = require('express');
var routerHome = express.Router();
var routerAPI = express.Router();
var serialHelper = null;
var receivedMessages = null;

module.exports = function (app, serialHelperPar, receivedMessagesPar) {
    app.use('/', routerHome);
    app.use('/api', routerAPI);
    serialHelper = serialHelperPar;
    receivedMessages = receivedMessagesPar;
};

routerHome.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Demo',
        articles: null
    });
});

routerAPI.post("/messages", function(req, res, next) {
    var json = JSON.stringify(req.body);
    var serialBuffer = "";
    var hex = new Buffer(json, 'ascii').toString('hex');
    serialHelper.write("AT+MAC=SNDBIN," + hex + ",0,2,1");
    req.body.status = "SENT";
    res.json(req.body);
});

routerAPI.get("/messages", function(req, res, next) {
	console.log("retrieving messages: " + receivedMessages.length);
    res.json(receivedMessages);
});