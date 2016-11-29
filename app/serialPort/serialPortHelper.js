var serialport = require("serialport");
var BAUD_RATE = 38400;
var CMD_END = "\n";
var serialConn = null;
var logger = null;

module.exports = SerialCom;

function SerialCom(serialPortName){

    if (!(this instanceof SerialCom)) {
        return new SerialCom(serialPortName);
    }

    // SERIAL PORT INIT
    serialConn = new serialport(serialPortName, {
        autoOpen: false,
        baudRate: BAUD_RATE,
        parity: "none",
        xon: false,
        xoff: false,
        xany: false,
        rtscts: false,
        hupcl: true,
        dataBits: 8,
        stopBits: 1,
        bufferSize: 64 * 1024,
        lock: true
    });

    serialConn.open(function (err) {

        var Delimiter = serialport.parsers.Delimiter;
        var parser = new Delimiter({delimiter: [13,10]});
        serialConn.pipe(parser);

        if (err) return console.log("Serial open error: ", err.message);
        else console.log("Serial opened");
        serialConn.on("error", function(err) {
            console.log("Serial port error: ", err.message);
        });

        serialConn.on("data",function(data){
            console.log("< " + data);
        });

        // nemeus init commands
        writeIntern("AT+MAC=ON,,C,1");
        writeIntern("AT+MAC=DEVADDR");
        writeIntern("AT+MAC=?");
    });

};

SerialCom.prototype.write = function write(cmd) {
    console.log('we send : '+cmd);
    serialConn.write(cmd + CMD_END, function(err) {
        if (err) return console.log("Serial write error: ", err.message);
        console.log("> " + cmd);
        logger(cmd);
    });
};

SerialCom.prototype.addListener = function addListener(callback) {
	logger = callback;
    serialConn.on("data",function(data){
        callback(data);
    });

};

function writeIntern(cmd) {
    serialConn.write(cmd + CMD_END, function(err) {
        if (err) return console.log("Serial write error: ", err.message);
        console.log("> " + cmd);
    });
};