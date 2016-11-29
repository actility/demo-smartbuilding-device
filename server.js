var express = require('express'),
config = require('./config/config');

var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

var PORT = 8080;

//var SERIAL_PORT = "/dev/tty.usbserial-1d11B";
var SERIAL_PORT = "/dev/serial/by-id/usb-FTDI_Dual_RS232-HS-if01-port0";
//var SERIAL_PORT = "COM5";

var receivedMessages = new Array();

var serialHelper = require('./app/serialPort/serialPortHelper')(SERIAL_PORT);

require('./config/express')(app, io, config, serialHelper, receivedMessages);

server.listen(PORT, function () {
	console.log('Express server listening on port ' + PORT);
});