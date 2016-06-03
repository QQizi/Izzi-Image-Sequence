# Izzi-images-sequence
 Izzi Image Sequence is the easiest way to use image sequence and to control it.


 Now powered by Pixi JS

 https://github.com/pixijs/pixi.js/



 @param {String} imgPath - Path to json file

 @param {String} element - Canvas element container selector

 @param {Int} numbreRepeat - How many time the sequence will repeat

 @param {Int} width - Width of the canvas element

 @param {Int} height - Height of the canvas element

 @param {Int} delayInterval - Interval between each frame

 @param {Int} delayIntervalReverse - Interval between each frame on reverse

 @param {Int} indexActif - Starting frame

 @param {Bool} repeat - Repeat sequence

 @param {Bool} reverse - Reverse sequence

 @param {Int} pauseReverse - Pause in milliseconde before reverse

 @param {Bool} autoplay - Autoplay after loading complete




 @function onComplete - Callback function, when sequence is fully over

 @function onCompleteLoader - Callback function, when sequence is fully load

 @function onCompleteBoucle - Callback function, when sequence loop is over

 @function onUpdate - Callback function, when image change (e = indexImg)




 sequence.functionTriggerAnim() - run sequence

 sequence.functionPauseAnim() - pause sequence

 sequence.functionKillAnim() - stop sequence

 sequence.functionChangeRepeat(Boolean) - set repeat true/false

 sequence.functionChangeReverse(Boolean) - set reverse true/false

 sequence.functionReverseDirection() - change current direction

 sequence.functionSetDirection(0) - set current direction (0 = forward / 1 = backward)

 sequence.functionIsFinish() - return true if current direction animation is finished
 