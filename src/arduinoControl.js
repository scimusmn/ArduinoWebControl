var arduino = new function(){
	var self= this;
	this.handlers =[];

	this.digitalWrite = function(pin,dir){
		webSockClient.send("r|digitalWrite("+pin+","+dir+")");
	}
	
	this.watchPin = function(pin,handler){
		webSockClient.send("r|watchPin("+pin+")");
		self.handlers[pin] = handler;
	}
	
	this.analogReport = function(pin,interval,handler){
		webSockClient.send("r|analogReport("+pin+","+interval+")");
		self.handlers[pin] = handler;
	}
	
	this.stopReport = function(pin){
		webSockClient.send("r|stopReport("+pin+")");
	}
	
	this.onMessage = function(data){
		var dataRay = data.split(/[\s,()=]+/);
		//console.log(evt.data);
		switch(dataRay[0]){
			case "pinChange":
				if(handlers[dataRay[1]]) handlers[dataRay[1]](dataRay[1],dataRay[2]);
				break;
			case "analogRead":
				if(handlers[dataRay[1]]) handlers[dataRay[1]](dataRay[1],dataRay[2]);
				break;
			default:
				//console.log(evt.data);
				break;
		}
	}
}