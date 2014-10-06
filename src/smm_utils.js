var $ = function( id ) { 

	switch(id.charAt(0)){
		case '#':
			return document.getElementById( id.substr(1) );
			break;
		case '.':
			return document.getElementsByClassName( id.substr(1) );
			break;
		case '$': 
			return document.getElementsByTagName( id.substr(1) );
			break;
		default:
			return document.getElementById( id );
			break;
	}

};

function b64toBlobURL(b64Data, contentType, sliceSize) {
	var parts = b64Data.match(/data:([^;]*)(;base64)?,([0-9A-Za-z+/]+)/);
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(parts[3]);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }
    var blob = new Blob(byteArrays, {type: contentType});
    return URL.createObjectURL(blob);
}

var revokeBlobURL = function(URL){
	window.URL.revokeObjectURL(URL);
}

var charCode = function(string){
	return string.charCodeAt(0);
}

function sign(x) {
    return (x > 0) - (x < 0);
}

function constrain(num, a, b){
	return num = Math.min(Math.max(num, a), b);
}

function degToRad(d) {
    // Converts degrees to radians
    return d * 0.0174532925199432957;
}

function itoa(i)
{ 
   return String.fromCharCode(i);
}

function extractNumber(value)
{
    var n = parseInt(value);
	
    return n == null || isNaN(n) ? 0 : n;
}

function distance(p1,p2){
	return Math.sqrt(Math.pow((p2.x-p1.x),2)+Math.pow((p2.y-p1.y),2));
}

Array.prototype.min = function(){
	return Math.min.apply({},this);
}

Array.prototype.max = function(){
	return Math.max.apply({},this);
}

Array.prototype.last = function(){
	return this[this.length-1];
}

function getPos(el) {
    // yay readability
    for (var lx=0, ly=0;
         el != null;
         lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
    return {x: lx,y: ly};
}

/*Number.prototype.oldValue = null;

Number.prototype.hasChanged = function(){
	if(this.oldValue!=this){
		this.oldValue=this;
		return true;
	}
	else return false;
}*/

function trackChange(init){
	var oldVal = init;
	this.check = function(val){
		if(val!==oldVal) return true, oldVal=val;
		else return false;
	}
}