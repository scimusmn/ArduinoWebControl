function wsClient(){
	var ws;
	var connectInterval;
	
	var self =this;
	
	var addr = "ws://localhost:8080/";
	
	var customCB = null;

	this.connect = function(){
		if ("WebSocket" in window) ws = new WebSocket(addr); //ws://echo.websocket.org is the default testing server
	}	
	
	this.connect();
		
    ws.onopen = function()
    {
       // Web Socket is connected, send data using send()
	   clearInterval(connectInterval);
	   if(customCB) ws.onmessage = customCB

	   else ws.onmessage = function (evt) { 
			console.log(evt.data);
		};
        ws.send("test");
        
    };
	
	ws.onerror = function ( error ) {
		if ("WebSocket" in window) connectInterval = setInterval(this.connect,2000);
	}
    
    this.send = function(msg){
    	ws.send(msg);
    }
	
	this.setMsgCallback = function(cb){
		customCB = cb;
		ws.onmessage = cb;
	}
	
    ws.onclose = function(){ 
       // websocket is closed.
       //alert("Connection is closed...");
	   connectInterval = setInterval(self.connect.bind(self),2000);
    };
	
}

var webSockClient = new wsClient();