# Izzi-images-sequence

 Izzi Image Sequence is the easiest way to use image sequence and to control it.

### Version
2.1

Now powered by Pixi JS :  https://github.com/pixijs/pixi.js/

And Hammer JS : https://github.com/hammerjs/hammer.js

### What's new ?

`Version 2.1`

Add parameter `enableTouchMoove` for touchscreen and mouse control over the sequence. This parameter disable autoplay event if set at true.

### Basic Usage Example

```javascript
izziImageSequence({
    element       : "#canvas_container",
    imgPath       : "data/sequence.json",
    width         : 500,
    height        : 500,
    numbreImg     : 50,
    indexActif    : 0,
    autoplay      : true,
    reverse      : true,
    repeat        : true,
    delayInterval : 25,
    delayIntervalReverse : 25,
    pauseReverse : 1000
});
```

### Basic json file used

```
["link/to/image_01.extension","link/to/image_02.extension"]
```