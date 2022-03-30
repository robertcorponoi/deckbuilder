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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9zaHVmZmxlLnRzIl0sIm5hbWVzIjpbImZpc2hlcllhdGVzIiwiZGVjayIsInRpbWVzIiwiaSIsImxlbmd0aCIsImoiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJjYXJkSSIsImNhcmRKIiwic3RyaXAiLCJjdXRNYXgiLCJzcGxpdE51bSIsInJhbmRvbUludCIsImRlY2tTcGxpdCIsInNwbGljZSIsImluc2VydFBvcyIsImRlY2sxIiwic2xpY2UiLCJkZWNrMiIsImNvbmNhdCIsIm1pbiIsIm1heCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FBSUE7Ozs7Ozs7Ozs7O0FBV08sU0FBU0EsV0FBVCxDQUFxQkMsSUFBckIsRUFBbUY7QUFBQSxNQUEzQ0MsS0FBMkMsdUVBQTNCLENBQTJCOztBQUV4RixTQUFPQSxLQUFLLEdBQUcsQ0FBZixFQUFrQjtBQUVoQixRQUFJQyxDQUFTLEdBQUdGLElBQUksQ0FBQ0csTUFBckI7QUFFQSxRQUFJRCxDQUFDLEtBQUssQ0FBVixFQUFhLE9BQU8sS0FBUDs7QUFFYixXQUFPLEVBQUVBLENBQVQsRUFBWTtBQUVWLFVBQU1FLENBQVMsR0FBR0MsSUFBSSxDQUFDQyxLQUFMLENBQVdELElBQUksQ0FBQ0UsTUFBTCxNQUFpQkwsQ0FBQyxHQUFHLENBQXJCLENBQVgsQ0FBbEI7QUFFQSxVQUFNTSxLQUFLLEdBQUdSLElBQUksQ0FBQ0UsQ0FBRCxDQUFsQjtBQUNBLFVBQU1PLEtBQUssR0FBR1QsSUFBSSxDQUFDSSxDQUFELENBQWxCO0FBRUFKLE1BQUFBLElBQUksQ0FBQ0UsQ0FBRCxDQUFKLEdBQVVPLEtBQVY7QUFDQVQsTUFBQUEsSUFBSSxDQUFDSSxDQUFELENBQUosR0FBVUksS0FBVjtBQUVEOztBQUVEUCxJQUFBQSxLQUFLO0FBRU47O0FBRUQsU0FBT0QsSUFBUDtBQUVEO0FBRUQ7Ozs7Ozs7Ozs7Ozs7QUFXTyxTQUFTVSxLQUFULENBQWVWLElBQWYsRUFBa0U7QUFBQSxNQUFoQ0MsS0FBZ0MsdUVBQWhCLENBQWdCO0FBRXZFLE1BQU1VLE1BQU0sR0FBR04sSUFBSSxDQUFDQyxLQUFMLENBQVdOLElBQUksQ0FBQ0csTUFBTCxJQUFlLElBQUksQ0FBbkIsQ0FBWCxDQUFmO0FBRUEsTUFBTVMsUUFBUSxHQUFHQyxTQUFTLENBQUMsQ0FBRCxFQUFJRixNQUFKLENBQTFCOztBQUVBLFNBQU9WLEtBQUssR0FBRyxDQUFDLENBQWhCLEVBQW1CO0FBRWpCLFFBQU1hLFNBQVMsR0FBR2QsSUFBSSxDQUFDZSxNQUFMLENBQVksQ0FBWixFQUFlSCxRQUFmLENBQWxCO0FBQ0EsUUFBTUksU0FBUyxHQUFHSCxTQUFTLENBQUMsQ0FBRCxFQUFJYixJQUFJLENBQUNHLE1BQVQsQ0FBM0I7QUFFQSxRQUFNYyxLQUFLLEdBQUdqQixJQUFJLENBQUNrQixLQUFMLENBQVcsQ0FBWCxFQUFjRixTQUFkLENBQWQ7QUFDQSxRQUFNRyxLQUFLLEdBQUduQixJQUFJLENBQUNrQixLQUFMLENBQVdGLFNBQVgsQ0FBZDtBQUVBaEIsSUFBQUEsSUFBSSxHQUFHaUIsS0FBSyxDQUFDRyxNQUFOLENBQWFOLFNBQWIsRUFBd0JLLEtBQXhCLENBQVA7QUFFQWxCLElBQUFBLEtBQUs7QUFFTjs7QUFFRCxTQUFPRCxJQUFQO0FBRUQ7QUFFRDs7Ozs7Ozs7OztBQVFBLFNBQVNhLFNBQVQsQ0FBbUJRLEdBQW5CLEVBQWdDQyxHQUFoQyxFQUFxRDtBQUVuRCxTQUFPakIsSUFBSSxDQUFDQyxLQUFMLENBQVdELElBQUksQ0FBQ0UsTUFBTCxNQUFpQmUsR0FBRyxHQUFHRCxHQUFOLEdBQVksQ0FBN0IsSUFBa0NBLEdBQTdDLENBQVA7QUFFRCIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgQ2FyZCBmcm9tICcuLi9pbnRlcmZhY2VzL0NhcmQnO1xuXG4vKipcbiAqIFNodWZmbGUgdGhlIGRlY2sgdXNpbmcgdGhlIEZpc2hlci1ZYXRlcyBtZXRob2QuXG4gKiBcbiAqIFRoZSBGaXNoZXItWWF0ZXMgbWV0aG9kIGlzIG9uZSBvZiB0aGUgYmVzdCBhcnJheSByYW5kb21pemF0aW9uIHRlY2huaXF1ZXMgYXZhaWxhYmxlIHdoaWNoIG1ha2VzIGl0IGEgZ29vZCBtZXRob2QgZm9yXG4gKiBzaHVmZmxpbmcgdGhlIGRlY2suXG4gKiBcbiAqIEBwYXJhbSB7QXJyYXk8Q2FyZD59IGRlY2sgVGhlIGRlY2sgdG8gc2h1ZmZsZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbdGltZXM9MV0gVGhlIG51bWJlciBvZiB0aW1lcyB0byByZXBlYXQgdGhlIHNodWZmbGUgdXNpbmcgdGhpcyBtZXRob2QuXG4gKiBcbiAqIEByZXR1cm5zIHtBcnJheTxDYXJkPnxib29sZWFufSBSZXR1cm5zIHRoZSBzaHVmZmxlZCBkZWNrXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmaXNoZXJZYXRlcyhkZWNrOiBBcnJheTxDYXJkPiwgdGltZXM6IG51bWJlciA9IDEpOiAoQXJyYXk8YW55PiB8IGJvb2xlYW4pIHtcblxuICB3aGlsZSAodGltZXMgPiAwKSB7XG5cbiAgICBsZXQgaTogbnVtYmVyID0gZGVjay5sZW5ndGg7XG5cbiAgICBpZiAoaSA9PT0gMCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgd2hpbGUgKC0taSkge1xuXG4gICAgICBjb25zdCBqOiBudW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoaSArIDEpKTtcblxuICAgICAgY29uc3QgY2FyZEkgPSBkZWNrW2ldO1xuICAgICAgY29uc3QgY2FyZEogPSBkZWNrW2pdO1xuXG4gICAgICBkZWNrW2ldID0gY2FyZEo7XG4gICAgICBkZWNrW2pdID0gY2FyZEk7XG5cbiAgICB9XG5cbiAgICB0aW1lcy0tO1xuXG4gIH1cblxuICByZXR1cm4gZGVjaztcblxufVxuXG4vKipcbiAqIFNodWZmbGUgdGhlIGRlY2sgdXNpbmcgdGhlIHN0cmlwIG1ldGhvZC5cbiAqIFxuICogVGhlIHN0cmlwIG1ldGhvZCBpbnZvbHZlcyBjdXR0aW5nIHRoZSBkZWNrIGF0IGEgcmFuZG9tIHBvaW50IGFuZCBwdXR0aW5nIHRoZSBjdXQgcGFydCBiYWNrIGluIHRoZSBkZWNrIGF0IGEgcmFuZG9tXG4gKiBwb3NpdGlvbi5cbiAqIFxuICogQHBhcmFtIHtBcnJheTxDYXJkPn0gZGVjayBUaGUgZGVjayB0byBzaHVmZmxlLlxuICogQHBhcmFtIHtudW1iZXJ9IFt0aW1lcz0xXSBUaGUgbnVtYmVyIG9mIHRpbWVzIHRvIHJlcGVhdCB0aGUgc2h1ZmZsZSB1c2luZyB0aGlzIG1ldGhvZC5cbiAqIFxuICogQHJldHVybnMge0FycmF5PENhcmQ+fSBSZXR1cm5zIHRoZSBzaHVmZmxlZCBkZWNrXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdHJpcChkZWNrOiBBcnJheTxDYXJkPiwgdGltZXM6IG51bWJlciA9IDEpOiBBcnJheTxDYXJkPiB7XG5cbiAgY29uc3QgY3V0TWF4ID0gTWF0aC5mbG9vcihkZWNrLmxlbmd0aCAqICgxIC8gNCkpO1xuXG4gIGNvbnN0IHNwbGl0TnVtID0gcmFuZG9tSW50KDMsIGN1dE1heCk7XG5cbiAgd2hpbGUgKHRpbWVzID4gLTEpIHtcblxuICAgIGNvbnN0IGRlY2tTcGxpdCA9IGRlY2suc3BsaWNlKDAsIHNwbGl0TnVtKTtcbiAgICBjb25zdCBpbnNlcnRQb3MgPSByYW5kb21JbnQoMCwgZGVjay5sZW5ndGgpO1xuXG4gICAgY29uc3QgZGVjazEgPSBkZWNrLnNsaWNlKDAsIGluc2VydFBvcyk7XG4gICAgY29uc3QgZGVjazIgPSBkZWNrLnNsaWNlKGluc2VydFBvcyk7XG5cbiAgICBkZWNrID0gZGVjazEuY29uY2F0KGRlY2tTcGxpdCwgZGVjazIpO1xuXG4gICAgdGltZXMtLTtcblxuICB9XG5cbiAgcmV0dXJuIGRlY2s7XG5cbn1cblxuLyoqXG4gKiBHZW5lcmF0ZXMgYSByYW5kb20gbnVtYmVyIGJldHdlZW4gdHdvIHZhbHVlcy5cbiAqIFxuICogQHBhcmFtIHtudW1iZXJ9IG1pbiBUaGUgbWluaW11bSB2YWx1ZSB0aGF0IGNhbiBiZSByZXR1cm5lZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBtYXggVGhlIG1heGltdW0gdmFsdWUgdGhhdCBjYW4gYmUgcmV0dXJuZWQuXG4gKiBcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgYSB2YWx1ZSBiZXR3ZWVuIHRoZSBtaW5pbXVtIGFuZCBtYXhpbXVtIHZhbHVlcy5cbiAqL1xuZnVuY3Rpb24gcmFuZG9tSW50KG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcik6IG51bWJlciB7XG5cbiAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSArIG1pbik7XG5cbn0iXX0=