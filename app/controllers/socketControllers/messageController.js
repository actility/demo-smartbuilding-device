module.exports = function(io, serialHelperPar, receivedMessagesPar) {

    io.sockets.on('connection', function (socket) {

        console.log('socket connection established');
        var bigbuffer = '';
        var mybuffer = '';
        var i = 0;
        var debut = 0;

       serialHelperPar.addListener(function(data){

    	   var data2 = new String(data).replace("ERROR", "");
           bigbuffer = bigbuffer+data2;
    	   
           mybuffer = mybuffer+data;
           socket.emit('message', { "type": "LOG", "value": bigbuffer });
           
           var regex  = /(MAC: RCVBIN,2,false,)[0-9A-Z]+(,)[-0-9.]+(,)[-0-9.]+/g;
           //console.log('--'+i+' --'+mybuffer);
           //i++;
           var result = null;
           result = mybuffer.toString().match(regex);
           if(result !== null){
               console.log("payload: " + mybuffer);
               mybuffer ='';
               i =0;
               var tab =  result[0].split(',');
               var decodedPayload = hex2StringA(tab[3]);
               var obj = JSON.parse(decodedPayload); 
               
               console.log("decodedPayload: " + obj);
               receivedMessagesPar.push(obj);
               socket.emit('message', obj);
           }

        });
    });

};

function hex2StringA(hexValue) {
    var hex = hexValue.toString();
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}