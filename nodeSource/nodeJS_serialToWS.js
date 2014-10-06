// Set the address and port of the Camera control computer server
//var HOST = '10.75.135.37';
//var PORT = 11999;

/*********************************************************
/ You should not have to edit below this point 
/*********************************************************/



/*******************************************
// For websockets, require 'ws'.Server
********************************************/


var WebSocketServer = require('ws').Server, wss = new WebSocketServer({port: 8080});

//Tell the wsServer what to do on connnection to a client; 

var webSock = null;
var sp = null;

wss.on('connection', function(ws) {
	
	webSock = ws;
       console.log("connected");
	
    ws.on('message', function(message) {
        /*switch(message.split("=")[0]){
			default:
				
				break;
		}*/
		if(sp) sp.write(message+"|");
		console.log(message);
    });
	
	ws.on('close',function(){
		webSock=null;
	});

	ws.on('error',function(error){
		webSock=null;
		console.log("Error: "+error);
	});
	
});

////////////////////////////////////////////////////////
// Use the cool library                               //
// git://github.com/voodootikigod/node-serialport.git //
// to read the serial port where arduino is sitting.  //
////////////////////////////////////////////////////////               
var com = require("serialport");
var bufSize = 512;

sp = new com.SerialPort("/dev/tty.usbserial-A900ceAX", {
    baudrate: 9600,
    parser: com.parsers.readline('\r\n'),
    buffersize:bufSize
  });

sp.on('open',function() {
  sp.on('data', function(data) {
    if(webSock) webSock.send(data);
  });

  /*function writeThenDrainThenWait(duration) {
    console.log('Calling write...');
    sp.write(message, function() {
      console.log('...Write callback returned...');
      // At this point, data may still be buffered and not sent out from the port yet (write function returns asynchrounously).
      console.log('...Calling drain...');
      sp.drain(function() {
        console.log('...Drain callback returned...');
        console.log('...Waiting', duration, 'milliseconds...');
        setInterval(writeThenDrainThenWait, duration);
      });
    });
  };



  // Stuff starts happening here
  writeThenDrainThenWait(1000);*/
  //writeThenWait(1000);

});