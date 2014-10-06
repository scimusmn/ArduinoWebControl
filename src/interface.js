(function (app){

	var blinkState = 0;
	var drawTimer;
	var refreshRate = 20; //fps
	
	/*var PING = itoa(5)
	var ACK  = itoa(6)
	var LF   = itoa(10)
	var START = itoa(2)
	var ANALOG_READ = 'a'
	var DIGITAL_READ = 'd'
	var DIGITAL_WRITE = 'D'
	var PIN_WATCH = 'p'*/
	
	var trace = new pointTrace($("trace"));
	
	$("trace").width = window.innerWidth;
	$("trace").height = window.innerHeight;
	
	trace.resize();
 
    $("button").onmousedown = function(e){
        e.preventDefault();
        arduino.digitalWrite(13,1);
        console.log("clicked");
    }
	
	$("button").onmouseup = function(){
        arduino.digitalWrite(13,0);
	}

	document.onkeydown = function(e) {
		switch (e.which) { 
			case charCode('S'):				//if the send button was pressed
				webSockClient.send("PING");
				break;
			case charCode('B'):				//if the send button was pressed
				blinkState = ((blinkState)?0:1);
				webSockClient.send("digitalWrite(13,"+blinkState+")");
				break;
			case 56:
				webSockClient.send("watchPin("+(e.which-48)+")");
				break;
			case 49:
				webSockClient.send("analogReport(0,20)");
				break;
			case 50:
				webSockClient.send("stopReport(0)");
				break;
			default:
				break;
		}
	}
	
	var inc =0;
	
	app.onMessage = function(evt){
		var received_msg = evt.data;
		var dataRay = evt.data.split(/[\s,()=]+/);
		//console.log(evt.data);
		switch(dataRay[0]){
			case "pinChange":
				$("titleLine").innerHTML = "Pin "+dataRay[1]+" is "+((extractNumber(dataRay[2]))?"HIGH":"LOW");
				trace.clear();
				break;
			case "analogRead":
				//$("analogLine").innerHTML = "Pin "+dataRay[1]+" is "+extractNumber(dataRay[2]);
				trace.addPoint({x:extractNumber(dataRay[2])/1024.,y:(Math.cos(inc)+1)/2});
				console.log("cos(inc)="+((Math.cos(inc)+1)/2)+"  inc="+inc);
				inc+=Math.PI/100.;
				if(inc>Math.PI*2) inc=0;
				break;
			default:
				//console.log(evt.data);
				break;
		}
	}
	
	app.draw = function(){
		trace.draw(0,0);
	}
	
	drawTimer = setInterval(app.draw, 1000/refreshRate);
	
	webSockClient.setMsgCallback(app.onMessage);
}(window.app = window.app || {}));