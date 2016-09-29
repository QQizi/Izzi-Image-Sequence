$(document).ready(function () {
	var app = {
		WW: window.innerWidth,
		WH: window.innerHeight,

		/*ELEMS*/
		container : $("#site-wrap"),
		canvasContainer : $("#canvas"),

		canvasElem : null,

		siteInited : false,
		preload : null,
		_siteLoaderDuration : 1250,
		_siteLoaderDelay : 500,
		easing : [0.710, 0.100, 0.3, 1.000],
		init: function () {
			$(window).on("load", app.windowLoaded);
			$(window).on('resize', app.resize);
			$(window).trigger('resize');

			app.binds();
		},
		initWebsite : function(){
			if(app.siteInited == false){
				app.siteInited = true;
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
					"initSequence" : function(){
						$("#canvas canvas").css("opacity","1");
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
		},
		binds : function(){
			// Create a new queue.
			//preload = new createjs.LoadQueue(false, "../_assets/art/");
		},
		windowLoaded : function(){
			app.initWebsite();
		},
		resize: function () {
			app.WW = (window.innerWidth > 0) ? window.innerWidth : screen.width;
			app.WH = (window.innerHeight > 0) ? window.innerHeight : screen.height;
		}
	};

	app.init();
});