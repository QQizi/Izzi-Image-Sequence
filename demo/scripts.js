var app = {
	init: function () {
		var sequence =   izziImageSequence({
			'element'       : "#canvas",
			"imgPath"       : "images.json",
			"packPath"      : "images.pack",
			"width"         : "500",
			"height"        : "500",
			"numbreImg"     : 75,
			"indexActif"    : 0,
			"autoplay"      : true,
			"reverse"       : true,
			"repeat"        : true,
			"delayInterval" : 25,
			"delayIntervalReverse" : 25,
			"pauseReverse" : 10,
			"initSequence" : function(element){
				element.style.opacity = "1";
			},
			"onComplete" : function(){
			},
			"onCompleteLoader" : function(){
			},
			"onCompleteBoucle" : function(){
			},
			"onUpdate" : function(){

			}
		});
	}
};

addListener(window, "load", app.init);

function addListener(obj, eventName, listener) {
	if(obj.addEventListener) {
		obj.addEventListener(eventName, listener, false);
	} else {
		obj.attachEvent("on" + eventName, listener);
	}
}