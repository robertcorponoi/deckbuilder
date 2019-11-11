'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fisherYates = fisherYates;
exports.strip = strip;

/**
 * Shuffle the deck using the Fisher-Yates method.
 * 
 * The Fisher-Yates method is one of the best array randomization techniques available which makes it a good method for
 * shuffling the deck.
 * 
 * @param {Array<Card>} deck The deck to shuffle.
 * @param {number} [times=1] The number of times to repeat the shuffle using this method.
 * 
 * @returns {Array<Card>|boolean} Returns the shuffled deck
 */
function fisherYates(deck) {
  var times = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  while (times > 0) {
    var i = deck.length;
    if (i === 0) return false;

    while (--i) {
      var j = Math.floor(Math.random() * (i + 1));
      var cardI = deck[i];
      var cardJ = deck[j];
      deck[i] = cardJ;
      deck[j] = cardI;
    }

    times--;
  }

  return deck;
}
/**
 * Shuffle the deck using the strip method.
 * 
 * The strip method involves cutting the deck at a random point and putting the cut part back in the deck at a random
 * position.
 * 
 * @param {Array<Card>} deck The deck to shuffle.
 * @param {number} [times=1] The number of times to repeat the shuffle using this method.
 * 
 * @returns {Array<Card>} Returns the shuffled deck
 */


function strip(deck) {
  var times = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var cutMax = Math.floor(deck.length * (1 / 4));
  var splitNum = randomInt(3, cutMax);

  while (times > -1) {
    var deckSplit = deck.splice(0, splitNum);
    var insertPos = randomInt(0, deck.length);
    var deck1 = deck.slice(0, insertPos);
    var deck2 = deck.slice(insertPos);
    deck = deck1.concat(deckSplit, deck2);
    times--;
  }

  return deck;
}
/**
 * Generates a random number between two values.
 * 
 * @param {number} min The minimum value that can be returned.
 * @param {number} max The maximum value that can be returned.
 * 
 * @returns {number} Returns a value between the minimum and maximum values.
 */


function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9zaHVmZmxlLnRzIl0sIm5hbWVzIjpbImZpc2hlcllhdGVzIiwiZGVjayIsInRpbWVzIiwiaSIsImxlbmd0aCIsImoiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJjYXJkSSIsImNhcmRKIiwic3RyaXAiLCJjdXRNYXgiLCJzcGxpdE51bSIsInJhbmRvbUludCIsImRlY2tTcGxpdCIsInNwbGljZSIsImluc2VydFBvcyIsImRlY2sxIiwic2xpY2UiLCJkZWNrMiIsImNvbmNhdCIsIm1pbiIsIm1heCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FBSUE7Ozs7Ozs7Ozs7O0FBV08sU0FBU0EsV0FBVCxDQUFxQkMsSUFBckIsRUFBbUY7QUFBQSxNQUEzQ0MsS0FBMkMsdUVBQTNCLENBQTJCOztBQUV4RixTQUFPQSxLQUFLLEdBQUcsQ0FBZixFQUFrQjtBQUVoQixRQUFJQyxDQUFTLEdBQUdGLElBQUksQ0FBQ0csTUFBckI7QUFFQSxRQUFJRCxDQUFDLEtBQUssQ0FBVixFQUFhLE9BQU8sS0FBUDs7QUFFYixXQUFPLEVBQUVBLENBQVQsRUFBWTtBQUVWLFVBQU1FLENBQVMsR0FBR0MsSUFBSSxDQUFDQyxLQUFMLENBQVdELElBQUksQ0FBQ0UsTUFBTCxNQUFpQkwsQ0FBQyxHQUFHLENBQXJCLENBQVgsQ0FBbEI7QUFFQSxVQUFNTSxLQUFLLEdBQUdSLElBQUksQ0FBQ0UsQ0FBRCxDQUFsQjtBQUNBLFVBQU1PLEtBQUssR0FBR1QsSUFBSSxDQUFDSSxDQUFELENBQWxCO0FBRUFKLE1BQUFBLElBQUksQ0FBQ0UsQ0FBRCxDQUFKLEdBQVVPLEtBQVY7QUFDQVQsTUFBQUEsSUFBSSxDQUFDSSxDQUFELENBQUosR0FBVUksS0FBVjtBQUVEOztBQUVEUCxJQUFBQSxLQUFLO0FBRU47O0FBRUQsU0FBT0QsSUFBUDtBQUVEO0FBRUQ7Ozs7Ozs7Ozs7Ozs7QUFXTyxTQUFTVSxLQUFULENBQWVWLElBQWYsRUFBa0U7QUFBQSxNQUFoQ0MsS0FBZ0MsdUVBQWhCLENBQWdCO0FBRXZFLE1BQU1VLE1BQU0sR0FBR04sSUFBSSxDQUFDQyxLQUFMLENBQVdOLElBQUksQ0FBQ0csTUFBTCxJQUFlLElBQUksQ0FBbkIsQ0FBWCxDQUFmO0FBRUEsTUFBTVMsUUFBUSxHQUFHQyxTQUFTLENBQUMsQ0FBRCxFQUFJRixNQUFKLENBQTFCOztBQUVBLFNBQU9WLEtBQUssR0FBRyxDQUFDLENBQWhCLEVBQW1CO0FBRWpCLFFBQU1hLFNBQVMsR0FBR2QsSUFBSSxDQUFDZSxNQUFMLENBQVksQ0FBWixFQUFlSCxRQUFmLENBQWxCO0FBQ0EsUUFBTUksU0FBUyxHQUFHSCxTQUFTLENBQUMsQ0FBRCxFQUFJYixJQUFJLENBQUNHLE1BQVQsQ0FBM0I7QUFFQSxRQUFNYyxLQUFLLEdBQUdqQixJQUFJLENBQUNrQixLQUFMLENBQVcsQ0FBWCxFQUFjRixTQUFkLENBQWQ7QUFDQSxRQUFNRyxLQUFLLEdBQUduQixJQUFJLENBQUNrQixLQUFMLENBQVdGLFNBQVgsQ0FBZDtBQUVBaEIsSUFBQUEsSUFBSSxHQUFHaUIsS0FBSyxDQUFDRyxNQUFOLENBQWFOLFNBQWIsRUFBd0JLLEtBQXhCLENBQVA7QUFFQWxCLElBQUFBLEtBQUs7QUFFTjs7QUFFRCxTQUFPRCxJQUFQO0FBRUQ7QUFFRDs7Ozs7Ozs7OztBQVFBLFNBQVNhLFNBQVQsQ0FBbUJRLEdBQW5CLEVBQWdDQyxHQUFoQyxFQUFxRDtBQUVuRCxTQUFPakIsSUFBSSxDQUFDQyxLQUFMLENBQVdELElBQUksQ0FBQ0UsTUFBTCxNQUFpQmUsR0FBRyxHQUFHRCxHQUFOLEdBQVksQ0FBN0IsSUFBa0NBLEdBQTdDLENBQVA7QUFFRCIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xyXG5cclxuaW1wb3J0IENhcmQgZnJvbSAnLi4vaW50ZXJmYWNlcy9DYXJkJztcclxuXHJcbi8qKlxyXG4gKiBTaHVmZmxlIHRoZSBkZWNrIHVzaW5nIHRoZSBGaXNoZXItWWF0ZXMgbWV0aG9kLlxyXG4gKiBcclxuICogVGhlIEZpc2hlci1ZYXRlcyBtZXRob2QgaXMgb25lIG9mIHRoZSBiZXN0IGFycmF5IHJhbmRvbWl6YXRpb24gdGVjaG5pcXVlcyBhdmFpbGFibGUgd2hpY2ggbWFrZXMgaXQgYSBnb29kIG1ldGhvZCBmb3JcclxuICogc2h1ZmZsaW5nIHRoZSBkZWNrLlxyXG4gKiBcclxuICogQHBhcmFtIHtBcnJheTxDYXJkPn0gZGVjayBUaGUgZGVjayB0byBzaHVmZmxlLlxyXG4gKiBAcGFyYW0ge251bWJlcn0gW3RpbWVzPTFdIFRoZSBudW1iZXIgb2YgdGltZXMgdG8gcmVwZWF0IHRoZSBzaHVmZmxlIHVzaW5nIHRoaXMgbWV0aG9kLlxyXG4gKiBcclxuICogQHJldHVybnMge0FycmF5PENhcmQ+fGJvb2xlYW59IFJldHVybnMgdGhlIHNodWZmbGVkIGRlY2tcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBmaXNoZXJZYXRlcyhkZWNrOiBBcnJheTxDYXJkPiwgdGltZXM6IG51bWJlciA9IDEpOiAoQXJyYXk8YW55PiB8IGJvb2xlYW4pIHtcclxuXHJcbiAgd2hpbGUgKHRpbWVzID4gMCkge1xyXG5cclxuICAgIGxldCBpOiBudW1iZXIgPSBkZWNrLmxlbmd0aDtcclxuXHJcbiAgICBpZiAoaSA9PT0gMCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgIHdoaWxlICgtLWkpIHtcclxuXHJcbiAgICAgIGNvbnN0IGo6IG51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChpICsgMSkpO1xyXG5cclxuICAgICAgY29uc3QgY2FyZEkgPSBkZWNrW2ldO1xyXG4gICAgICBjb25zdCBjYXJkSiA9IGRlY2tbal07XHJcblxyXG4gICAgICBkZWNrW2ldID0gY2FyZEo7XHJcbiAgICAgIGRlY2tbal0gPSBjYXJkSTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgdGltZXMtLTtcclxuXHJcbiAgfVxyXG5cclxuICByZXR1cm4gZGVjaztcclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTaHVmZmxlIHRoZSBkZWNrIHVzaW5nIHRoZSBzdHJpcCBtZXRob2QuXHJcbiAqIFxyXG4gKiBUaGUgc3RyaXAgbWV0aG9kIGludm9sdmVzIGN1dHRpbmcgdGhlIGRlY2sgYXQgYSByYW5kb20gcG9pbnQgYW5kIHB1dHRpbmcgdGhlIGN1dCBwYXJ0IGJhY2sgaW4gdGhlIGRlY2sgYXQgYSByYW5kb21cclxuICogcG9zaXRpb24uXHJcbiAqIFxyXG4gKiBAcGFyYW0ge0FycmF5PENhcmQ+fSBkZWNrIFRoZSBkZWNrIHRvIHNodWZmbGUuXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBbdGltZXM9MV0gVGhlIG51bWJlciBvZiB0aW1lcyB0byByZXBlYXQgdGhlIHNodWZmbGUgdXNpbmcgdGhpcyBtZXRob2QuXHJcbiAqIFxyXG4gKiBAcmV0dXJucyB7QXJyYXk8Q2FyZD59IFJldHVybnMgdGhlIHNodWZmbGVkIGRlY2tcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzdHJpcChkZWNrOiBBcnJheTxDYXJkPiwgdGltZXM6IG51bWJlciA9IDEpOiBBcnJheTxDYXJkPiB7XHJcblxyXG4gIGNvbnN0IGN1dE1heCA9IE1hdGguZmxvb3IoZGVjay5sZW5ndGggKiAoMSAvIDQpKTtcclxuXHJcbiAgY29uc3Qgc3BsaXROdW0gPSByYW5kb21JbnQoMywgY3V0TWF4KTtcclxuXHJcbiAgd2hpbGUgKHRpbWVzID4gLTEpIHtcclxuXHJcbiAgICBjb25zdCBkZWNrU3BsaXQgPSBkZWNrLnNwbGljZSgwLCBzcGxpdE51bSk7XHJcbiAgICBjb25zdCBpbnNlcnRQb3MgPSByYW5kb21JbnQoMCwgZGVjay5sZW5ndGgpO1xyXG5cclxuICAgIGNvbnN0IGRlY2sxID0gZGVjay5zbGljZSgwLCBpbnNlcnRQb3MpO1xyXG4gICAgY29uc3QgZGVjazIgPSBkZWNrLnNsaWNlKGluc2VydFBvcyk7XHJcblxyXG4gICAgZGVjayA9IGRlY2sxLmNvbmNhdChkZWNrU3BsaXQsIGRlY2syKTtcclxuXHJcbiAgICB0aW1lcy0tO1xyXG5cclxuICB9XHJcblxyXG4gIHJldHVybiBkZWNrO1xyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIEdlbmVyYXRlcyBhIHJhbmRvbSBudW1iZXIgYmV0d2VlbiB0d28gdmFsdWVzLlxyXG4gKiBcclxuICogQHBhcmFtIHtudW1iZXJ9IG1pbiBUaGUgbWluaW11bSB2YWx1ZSB0aGF0IGNhbiBiZSByZXR1cm5lZC5cclxuICogQHBhcmFtIHtudW1iZXJ9IG1heCBUaGUgbWF4aW11bSB2YWx1ZSB0aGF0IGNhbiBiZSByZXR1cm5lZC5cclxuICogXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgYSB2YWx1ZSBiZXR3ZWVuIHRoZSBtaW5pbXVtIGFuZCBtYXhpbXVtIHZhbHVlcy5cclxuICovXHJcbmZ1bmN0aW9uIHJhbmRvbUludChtaW46IG51bWJlciwgbWF4OiBudW1iZXIpOiBudW1iZXIge1xyXG5cclxuICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpICsgbWluKTtcclxuXHJcbn0iXX0=