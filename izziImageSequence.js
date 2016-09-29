/*!
 * VERSION: 2.0
 * DATE: 2016-06-02
 *
 * Copyright (c) 2016, Quentin Mangin. All rights reserved.
 *
 * @author: Quentin Mangin, quentin.mangin@gmail.com
 *
 * #Izzi-images-sequence
 * Izzi Image Sequence is the easiest way to use image sequence and to control it.
 *
 * Powered by Pixi JS
 * https://github.com/pixijs/pixi.js/
 *
 * @param {String} imgPath - Path to json file
 * @param {String} packPath - Path to pack file
 * @param {String} element - Canvas element container selector
 * @param {Int} numbreRepeat - How many time the sequence will repeat
 *
 * @param {Int} width - Width of the canvas element
 * @param {Int} height - Height of the canvas element
 *
 * @param {Int} delayInterval - Interval between each frame
 * @param {Int} delayIntervalReverse - Interval between each frame on reverse
 * @param {Int} indexActif - Starting frame
 *
 * @param {Bool} repeat - Repeat sequence
 * @param {Bool} reverse - Reverse sequence
 * @param {Int} pauseReverse - Pause in milliseconde before reverse
 * @param {Bool} autoplay - Autoplay after loading complete
 * @param {Bool} enableTouchMoove - Enable touchmoove and mousemoove (disable autoplay property)
 *
 *
 *
 * @function onComplete - Callback function, when sequence is fully over
 * @function onCompleteLoader - Callback function, when sequence is fully load
 * @function onCompleteBoucle - Callback function, when sequence loop is over
 * @function onUpdate - Callback function, when image change (e = indexImg)
 *
 *
 *
 * sequence.play() - run sequence
 * sequence.pause() - pause sequence
 * sequence.stop() - stop sequence
 * sequence.setRepeat(Boolean) - set repeat true/false
 * sequence.setReverse(Boolean) - set reverse true/false
 * sequence.reverseDirection() - change current direction
 * sequence.setDirection(0) - set current direction (0 = forward / 1 = backward)
 * sequence.isFinish() - return true if current direction animation is finished
 * sequence.setActifIndex() - set a new actif index
 * sequence.getParams() - get all params
 * sequence.getIndex() - get active index
 *
 **/

window.izziImageSequence = function( options ) {
	var izziImageSequence = {
		global : {
			'imgPath'               : options.imgPath,
			'packPath'              : options.packPath,
			'element'               : document.querySelector(options.element),
			'numbreRepeat'          : options.numbreRepeat,
			'numberDoneDirection'   : 0,

			'width'                 : options.width == undefined ?document.querySelector(options.element).offsetWidth : options.width,
			'height'                 : options.height == undefined ?document.querySelector(options.element).offsetHeight : options.height,

			'delayInterval'         : options.delayInterval == undefined ?50 : options.delayInterval,
			'delayIntervalReverse'  : options.delayIntervalReverse == undefined ?50 : options.delayIntervalReverse,
			'indexActif'            : options.indexActif == undefined ?0 : options.indexActif,
			'repeat'                : options.repeat == undefined ? false : options.repeat,
			'reverse'               : options.reverse == undefined ? false : options.reverse,
			'pauseReverse'          : options.pauseReverse == undefined ? 0 : options.pauseReverse,
			'autoplay'              : options.autoplay == undefined ? true : options.autoplay,
			'enableTouchMoove'      : options.enableTouchMoove == undefined ? false : options.enableTouchMoove,
			'_interval'             : null,

			isFinish                : false
		}
	};

	function loadBlob(blob, id){
		return new Promise( function(resolve, reject) {
			var xhr = new XMLHttpRequest();
			xhr.open('GET', blob, true);

			xhr.responseType = 'arraybuffer';

			xhr.onload = function(e) {
				if (this.status == 200) {
					var uInt8Array = new Uint8Array(this.response);
					var i = uInt8Array.length;
					var binaryString = new Array(i);
					while (i--)
					{
						binaryString[i] = String.fromCharCode(uInt8Array[i]);
					}
					var data = binaryString.join('');

					var base64 = window.btoa(data);

					var obj = {
						'data' : "data:image/png;base64,"+base64,
						'id' : id
					};
					resolve(obj);
				}
			};

			xhr.send();
		});
	}

	var _indexActifLoad = izziImageSequence.global.indexActif;
	var sens = 0;

	izziImageSequence.global.renderer = new PIXI.WebGLRenderer(izziImageSequence.global.width, izziImageSequence.global.height);
	izziImageSequence.global.element.appendChild(izziImageSequence.global.renderer.view);
	izziImageSequence.global.stage = new PIXI.Container();

	var queue = new createjs.LoadQueue();
	queue.on("complete", handleComplete, this);
	queue.loadManifest([
		{id: "binary", src:izziImageSequence.global.packPath, type: 'binary'},
		{id: "images", src:izziImageSequence.global.imgPath},
	]);


	function handleComplete() {
		izziImageSequence.global.magikPack = new Magipack(queue.getResult('binary'), queue.getResult('images'));
		izziImageSequence.global.jsonBase = queue.getResult('images');
		izziImageSequence.global.numbreImg = queue.getResult('images').length;

		var loaderTexture = new PIXI.loaders.Loader();
		var imageCreated = 0;

		for(var i = 0; i < izziImageSequence.global.numbreImg; i++){

			loadBlob(izziImageSequence.global.magikPack.getURI(izziImageSequence.global.jsonBase[i][0]), 'sequence_'+i)
				.then(function(obj) {
					loaderTexture.add(obj.id,obj.data);
					imageCreated++

					if(imageCreated == izziImageSequence.global.numbreImg){
						loaderTexture.load();
					}
				}).catch(function(error) {

			});
		}

		loaderTexture.once('complete',function(ressource){
			izziImageSequence.global.texturePackage = ressource.resources;

			izziImageSequence.global.canvasElem = new PIXI.Sprite(izziImageSequence.global.texturePackage['sequence_' + _indexActifLoad].texture);

			izziImageSequence.global.canvasElem.position.x = 0;
			izziImageSequence.global.canvasElem.position.y = 0;

			izziImageSequence.global.canvasElem.width = izziImageSequence.global.width;
			izziImageSequence.global.canvasElem.height = izziImageSequence.global.height;

			izziImageSequence.global.stage.addChild(izziImageSequence.global.canvasElem);

			if(izziImageSequence.global.autoplay == true && izziImageSequence.global.enableTouchMoove == false){
				izziImageSequence.global._interval    = setInterval(triggerAnim, izziImageSequence.global.delayInterval);
			}

			options.initSequence(izziImageSequence.global.element);

			if(izziImageSequence.global.enableTouchMoove == true){
				var hammertime = new Hammer(izziImageSequence.global.element, {});
				var panDirection = null;

				hammertime.on( "panstart", function( e ) {
					izziImageSequence.global.newActifIndex = _indexActifLoad;
					izziImageSequence.global.indexMooved = 0;
				});

				hammertime.on( "pan", function( e ){
					if(e.direction == 4){
						panDirection = 'LeftToRight';
					}else{
						panDirection = 'RightToLeft';
					}

					izziImageSequence.global.sequenceDivivedWidth = izziImageSequence.global.width / izziImageSequence.global.numbreImg;

					if(isNaN(izziImageSequence.global.indexMoove)){
						izziImageSequence.global.indexMoove = 0;
					}
					var prevIndexMoove = izziImageSequence.global.indexMoove;
					izziImageSequence.global.indexMoove = Math.ceil(e.deltaX / izziImageSequence.global.sequenceDivivedWidth);
					var actualIndexMoove = izziImageSequence.global.indexMoove - prevIndexMoove;


					if(actualIndexMoove > 0){
						if(izziImageSequence.global.newActifIndex + 1 >= izziImageSequence.global.numbreImg){
							izziImageSequence.global.newActifIndex = 0;
						}else{
							izziImageSequence.global.newActifIndex++;
						}
					}else if(actualIndexMoove < 0){
						if(izziImageSequence.global.newActifIndex - 1 < 0){
							izziImageSequence.global.newActifIndex = izziImageSequence.global.numbreImg-1;
						}else{
							izziImageSequence.global.newActifIndex--;
						}
					}

					setActifIndex(izziImageSequence.global.newActifIndex);
				});
			}

			if(options.onCompleteLoader != undefined){
				options.onCompleteLoader(izziImageSequence.global.element);
			}

			animateSequence();
		});

		loaderTexture.load();
	}

	function animateSequence(){
		requestAnimationFrame(animateSequence);
		if(izziImageSequence.global.renderer){
			izziImageSequence.global.renderer.render(izziImageSequence.global.stage);
		}
	}

	animateSequence();

	function triggerAnim(){
		izziImageSequence.global.isFinish = false;

		if(options.onUpdate != undefined){
			options.onUpdate(_indexActifLoad);
		}

		//GO
		if(sens == 0){
			if(_indexActifLoad+1 < izziImageSequence.global.numbreImg){
				_indexActifLoad++;
			}else{
				if(izziImageSequence.global.repeat == true && izziImageSequence.global.reverse == false){
					_indexActifLoad = izziImageSequence.global.indexActif;
				}else if(izziImageSequence.global.repeat == false && izziImageSequence.global.reverse == true){
					if(options.onCompleteBoucle != undefined){
						izziImageSequence.global.isFinish = true;
						options.onCompleteBoucle();
					}
					sens = 1;

					if(izziImageSequence.global.pauseReverse != 0){
						clearInterval(izziImageSequence.global._interval);

						setTimeout(function(){
							izziImageSequence.global._interval    = setInterval(triggerAnim, izziImageSequence.global.delayIntervalReverse);
						}, izziImageSequence.global.pauseReverse);
					}

				}else if(izziImageSequence.global.repeat == true && izziImageSequence.global.reverse == true){
					if(izziImageSequence.global.delayInterval != izziImageSequence.global.delayIntervalReverse){
						clearInterval(izziImageSequence.global._interval);
						izziImageSequence.global._interval    = setInterval(triggerAnim, izziImageSequence.global.delayIntervalReverse);
					}

					if(options.onCompleteBoucle != undefined){
						izziImageSequence.global.isFinish = true;
						options.onCompleteBoucle();
					}

					if(izziImageSequence.global.pauseReverse != 0){

						clearInterval(izziImageSequence.global._interval);

						setTimeout(function(){
							izziImageSequence.global._interval    = setInterval(triggerAnim, izziImageSequence.global.delayIntervalReverse);
						}, izziImageSequence.global.pauseReverse);
					}

					sens = 1;
				}else if(izziImageSequence.global.repeat == false && izziImageSequence.global.reverse == false){
					clearInterval(izziImageSequence.global._interval);
					if(options.onComplete != undefined){
						izziImageSequence.global.isFinish = true;
						izziImageSequence.global.numberDoneDirection++;
						if(izziImageSequence.global.numberDoneDirection == izziImageSequence.global.numbreRepeat){
							clearInterval(izziImageSequence.global._interval);
						}
						options.onComplete(izziImageSequence.global.element);
					}
				}
			}
			//BACK
		}else{
			if(_indexActifLoad > 0){
				_indexActifLoad--;
			}else{
				if(izziImageSequence.global.repeat == true && izziImageSequence.global.reverse == false){
					_indexActifLoad = izziImageSequence.global.indexActif
				}else if(izziImageSequence.global.repeat == true && izziImageSequence.global.reverse == true){
					if(options.onCompleteBoucle != undefined){
						izziImageSequence.global.isFinish = true;
						options.onCompleteBoucle();
					}

					izziImageSequence.global.numberDoneDirection++;
					if(izziImageSequence.global.numberDoneDirection == izziImageSequence.global.numbreRepeat){
						clearInterval(izziImageSequence.global._interval);

						if(options.onComplete != undefined){
							options.onComplete(izziImageSequence.global.element);
						}
					}

					sens = 0;
				}else if(izziImageSequence.global.repeat == false && izziImageSequence.global.reverse == true){
					clearInterval(izziImageSequence.global._interval);
					if(options.onComplete != undefined){
						izziImageSequence.global.isFinish = true;
						izziImageSequence.global.numberDoneDirection++;
						if(izziImageSequence.global.numberDoneDirection == izziImageSequence.global.numbreRepeat){
							clearInterval(izziImageSequence.global._interval);
						}
						options.onComplete(izziImageSequence.global.element);
					}
				}
			}
		}


		//izziImageSequence.global.canvasElem.texture = new PIXI.Texture(new PIXI.BaseTexture(izziImageSequence.global.magikPack.getURI(izziImageSequence.global.jsonBase[_indexActifLoad][0])));
		izziImageSequence.global.canvasElem.texture = izziImageSequence.global.texturePackage['sequence_' + _indexActifLoad].texture;
	}

	function setActifIndex(index){
		_indexActifLoad = index;
		//izziImageSequence.global.canvasElem.texture = new PIXI.Texture(new PIXI.BaseTexture(izziImageSequence.global.magikPack.getURI(izziImageSequence.global.jsonBase[_indexActifLoad][0])));
		izziImageSequence.global.canvasElem.texture = izziImageSequence.global.texturePackage['sequence_' + _indexActifLoad].texture;
	}

	return {
		setActifIndex : function(index){
			_indexActifLoad = index;
			//izziImageSequence.global.canvasElem.texture = new PIXI.Texture(new PIXI.BaseTexture(izziImageSequence.global.magikPack.getURI(izziImageSequence.global.jsonBase[_indexActifLoad][0])));
			izziImageSequence.global.canvasElem.texture = izziImageSequence.global.texturePackage['sequence_' + _indexActifLoad].texture;
		},
		getParams : function(){
			return izziImageSequence.global;
		},
		getIndex : function(){
			return _indexActifLoad;
		},
		play: function() {
			clearInterval(izziImageSequence.global._interval);

			sens = 0;
			izziImageSequence.global.numberDoneDirection = 0

			izziImageSequence.global._interval    = setInterval(triggerAnim, izziImageSequence.global.delayInterval);
		},stop: function() {
			_indexActifLoad = izziImageSequence.global.indexActif;

			clearInterval(izziImageSequence.global._interval);
		},pause: function(){
			clearInterval(izziImageSequence.global._interval);
		},setRepeat: function(e){
			if(e == true){
				izziImageSequence.global.repeat = true;
				this.play();
			}else{
				izziImageSequence.global.repeat = false;
				sens = 0;
				this.play();
			}
		},setReverse: function(e){
			if(e == true){
				izziImageSequence.global.reverse = true;
			}else{
				izziImageSequence.global.reverse = false;
				sens = 0;
			}
		},reverseDirection: function(e){
			if(this.isFinish() == false){
				if(sens == 0){
					sens = 1;
				}else{
					sens = 0;
				}
			}
		},setDirection: function(e){
			sens = e;
		},isFinish: function(e){
			return izziImageSequence.global.isFinish;
		}
	}
};
