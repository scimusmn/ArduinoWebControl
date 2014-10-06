function pointTrace(elem){
	var self = this;
	this.points = [];
	var maxPoints = 10;
	var trcWd =6;
	
	this.width;
	this.height;
	
	var canvas = elem;
	var ctx = canvas.getContext("2d");
	
	this.addPoint = function(pnt){
		//console.log(pnt);				//{x: 0.0046875, y: 0.004166666666666667} 1.5, 1
		if(self.points.length){
			if(pnt.x!==self.points.last().x||pnt.y!==self.points.last().y){
				self.points.push({x:pnt.x,y:pnt.y});
				if(self.points.length>=maxPoints) self.points.splice(0,1);
			}
		}
		else self.points.push({x:pnt.x,y:pnt.y});
	}
	
	this.color="#f00";
	
	this.resize = function(wid,hgt){
		width=canvas.width;
		height=canvas.height;
	}
	
	this.draw = function(x,y){
	
		if(self.points.length>2){
			ctx.beginPath();
			ctx.lineWidth=trcWd;
			ctx.strokeStyle=self.color;
			var xc = width*(self.points[0].x + self.points[1].x) / 2;
			var yc = height*(self.points[0].y + self.points[1].y) / 2;
			ctx.moveTo(xc, yc);
			for (i = 1; i < self.points.length - 1; i ++){
				xc = width*(self.points[i].x + self.points[i + 1].x) / 2;
				yc = height*(self.points[i].y + self.points[i + 1].y) / 2;
				ctx.quadraticCurveTo(self.points[i].x*width, self.points[i].y*height, xc, yc);
			}
			
			// curve through the last two points
			var i = self.points.length-2;
			//ctx.strokeStyle="rgba(255,0,0,0)";
			//ctx.quadraticCurveTo(self.points[i].x*width, self.points[i].y, self.points[i+1].x*width,self.points[i+1].y);
			ctx.stroke();
			ctx.fillStyle=this.color;
			ctx.beginPath();
			ctx.lineWidth=1;
			ctx.arc(xc,yc,trcWd/2,0,2*Math.PI);
			ctx.arc(width*(self.points[0].x + self.points[1].x) / 2,height*(self.points[0].y + self.points[1].y) / 2,trcWd/2,0,2*Math.PI);
			ctx.fill();
		}
	}
	
	this.clear = function(){
		self.points.length=0;
		ctx.clearRect(0,0,canvas.width,canvas.height);
	}
	
	this.jump = function(){
		self.points.length=0;
	}
	
}