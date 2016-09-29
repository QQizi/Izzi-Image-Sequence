# Izzi-images-sequence

 Izzi Image Sequence is the easiest way to use image sequence and to control it.

### Version
3.0

Now powered by : 
Pixi JS :  https://github.com/pixijs/pixi.js/

Hammer JS : https://github.com/hammerjs/hammer.js

MagiPack : https://github.com/keitakun/Magipack.js

### What's new ?

`Version 3.0`

Generation of the json files is now handled by MagiPack.

`Version 2.1`

Add parameter `enableTouchMoove` for touchscreen and mouse control over the sequence. This parameter disable autoplay event if set at true.

### Generating JSON & pack files

Set permissions to Python script : 
```
chmod 0755 packImages.py
```

Run the script by passing the -p argument for the directory :
```
./packImages.py -p img_folder
```


### Basic Usage Example

```javascript
izziImageSequence({
    element       : "#canvas_container",
    imgPath       : "images.json",
    packPath      : "images.pack",
    width         : 500,
    height        : 500,
    numbreImg     : 50,
    indexActif    : 0,
    autoplay      : true,
    reverse       : true,
    repeat        : true,
    delayInterval : 25,
    delayIntervalReverse : 25,
    pauseReverse : 1000
});
```

 Returns the object with couple of useful functions and methods: 
 
 ```javascript
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

 ```
 
### Options

Izzi Image Sequence support the following list of parameters on initialization: 

 ```javascript 
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

 ```
 
### Callbacks
 
 ```javascript 
 * @function onComplete - Callback function, when sequence is fully over
 * @function onCompleteLoader - Callback function, when sequence is fully load
 * @function onCompleteBoucle - Callback function, when sequence loop is over
 * @function onUpdate - Callback function, when image change (e = indexImg)
 ```