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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zaHVmZmxlLnRzIl0sIm5hbWVzIjpbImZpc2hlcllhdGVzIiwiZGVjayIsInRpbWVzIiwiaSIsImxlbmd0aCIsImoiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJjYXJkSSIsImNhcmRKIiwic3RyaXAiLCJjdXRNYXgiLCJzcGxpdE51bSIsInJhbmRvbUludCIsImRlY2tTcGxpdCIsInNwbGljZSIsImluc2VydFBvcyIsImRlY2sxIiwic2xpY2UiLCJkZWNrMiIsImNvbmNhdCIsIm1pbiIsIm1heCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FBSUE7Ozs7Ozs7Ozs7O0FBV08sU0FBU0EsV0FBVCxDQUFxQkMsSUFBckIsRUFBbUY7QUFBQSxNQUEzQ0MsS0FBMkMsdUVBQTNCLENBQTJCOztBQUV4RixTQUFPQSxLQUFLLEdBQUcsQ0FBZixFQUFrQjtBQUVoQixRQUFJQyxDQUFTLEdBQUdGLElBQUksQ0FBQ0csTUFBckI7QUFFQSxRQUFJRCxDQUFDLEtBQUssQ0FBVixFQUFhLE9BQU8sS0FBUDs7QUFFYixXQUFPLEVBQUVBLENBQVQsRUFBWTtBQUVWLFVBQU1FLENBQVMsR0FBR0MsSUFBSSxDQUFDQyxLQUFMLENBQVdELElBQUksQ0FBQ0UsTUFBTCxNQUFpQkwsQ0FBQyxHQUFHLENBQXJCLENBQVgsQ0FBbEI7QUFFQSxVQUFNTSxLQUFLLEdBQUdSLElBQUksQ0FBQ0UsQ0FBRCxDQUFsQjtBQUNBLFVBQU1PLEtBQUssR0FBR1QsSUFBSSxDQUFDSSxDQUFELENBQWxCO0FBRUFKLE1BQUFBLElBQUksQ0FBQ0UsQ0FBRCxDQUFKLEdBQVVPLEtBQVY7QUFDQVQsTUFBQUEsSUFBSSxDQUFDSSxDQUFELENBQUosR0FBVUksS0FBVjtBQUVEOztBQUVEUCxJQUFBQSxLQUFLO0FBRU47O0FBRUQsU0FBT0QsSUFBUDtBQUVEO0FBRUQ7Ozs7Ozs7Ozs7Ozs7QUFXTyxTQUFTVSxLQUFULENBQWVWLElBQWYsRUFBa0U7QUFBQSxNQUFoQ0MsS0FBZ0MsdUVBQWhCLENBQWdCO0FBRXZFLE1BQU1VLE1BQU0sR0FBR04sSUFBSSxDQUFDQyxLQUFMLENBQVdOLElBQUksQ0FBQ0csTUFBTCxJQUFlLElBQUksQ0FBbkIsQ0FBWCxDQUFmO0FBRUEsTUFBTVMsUUFBUSxHQUFHQyxTQUFTLENBQUMsQ0FBRCxFQUFJRixNQUFKLENBQTFCOztBQUVBLFNBQU9WLEtBQUssR0FBRyxDQUFDLENBQWhCLEVBQW1CO0FBRWpCLFFBQU1hLFNBQVMsR0FBR2QsSUFBSSxDQUFDZSxNQUFMLENBQVksQ0FBWixFQUFlSCxRQUFmLENBQWxCO0FBQ0EsUUFBTUksU0FBUyxHQUFHSCxTQUFTLENBQUMsQ0FBRCxFQUFJYixJQUFJLENBQUNHLE1BQVQsQ0FBM0I7QUFFQSxRQUFNYyxLQUFLLEdBQUdqQixJQUFJLENBQUNrQixLQUFMLENBQVcsQ0FBWCxFQUFjRixTQUFkLENBQWQ7QUFDQSxRQUFNRyxLQUFLLEdBQUduQixJQUFJLENBQUNrQixLQUFMLENBQVdGLFNBQVgsQ0FBZDtBQUVBaEIsSUFBQUEsSUFBSSxHQUFHaUIsS0FBSyxDQUFDRyxNQUFOLENBQWFOLFNBQWIsRUFBd0JLLEtBQXhCLENBQVA7QUFFQWxCLElBQUFBLEtBQUs7QUFFTjs7QUFFRCxTQUFPRCxJQUFQO0FBRUQ7QUFFRDs7Ozs7Ozs7OztBQVFBLFNBQVNhLFNBQVQsQ0FBbUJRLEdBQW5CLEVBQWdDQyxHQUFoQyxFQUFxRDtBQUVuRCxTQUFPakIsSUFBSSxDQUFDQyxLQUFMLENBQVdELElBQUksQ0FBQ0UsTUFBTCxNQUFpQmUsR0FBRyxHQUFHRCxHQUFOLEdBQVksQ0FBN0IsSUFBa0NBLEdBQTdDLENBQVA7QUFFRCIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xyXG5cclxuaW1wb3J0IENhcmQgZnJvbSAnLi9pbnRlcmZhY2VzL0NhcmQnO1xyXG5cclxuLyoqXHJcbiAqIFNodWZmbGUgdGhlIGRlY2sgdXNpbmcgdGhlIEZpc2hlci1ZYXRlcyBtZXRob2QuXHJcbiAqIFxyXG4gKiBUaGUgRmlzaGVyLVlhdGVzIG1ldGhvZCBpcyBvbmUgb2YgdGhlIGJlc3QgYXJyYXkgcmFuZG9taXphdGlvbiB0ZWNobmlxdWVzIGF2YWlsYWJsZSB3aGljaCBtYWtlcyBpdCBhIGdvb2QgbWV0aG9kIGZvclxyXG4gKiBzaHVmZmxpbmcgdGhlIGRlY2suXHJcbiAqIFxyXG4gKiBAcGFyYW0ge0FycmF5PENhcmQ+fSBkZWNrIFRoZSBkZWNrIHRvIHNodWZmbGUuXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBbdGltZXM9MV0gVGhlIG51bWJlciBvZiB0aW1lcyB0byByZXBlYXQgdGhlIHNodWZmbGUgdXNpbmcgdGhpcyBtZXRob2QuXHJcbiAqIFxyXG4gKiBAcmV0dXJucyB7QXJyYXk8Q2FyZD58Ym9vbGVhbn0gUmV0dXJucyB0aGUgc2h1ZmZsZWQgZGVja1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGZpc2hlcllhdGVzKGRlY2s6IEFycmF5PENhcmQ+LCB0aW1lczogbnVtYmVyID0gMSk6IChBcnJheTxhbnk+IHwgYm9vbGVhbikge1xyXG5cclxuICB3aGlsZSAodGltZXMgPiAwKSB7XHJcblxyXG4gICAgbGV0IGk6IG51bWJlciA9IGRlY2subGVuZ3RoO1xyXG5cclxuICAgIGlmIChpID09PSAwKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgd2hpbGUgKC0taSkge1xyXG5cclxuICAgICAgY29uc3QgajogbnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGkgKyAxKSk7XHJcblxyXG4gICAgICBjb25zdCBjYXJkSSA9IGRlY2tbaV07XHJcbiAgICAgIGNvbnN0IGNhcmRKID0gZGVja1tqXTtcclxuXHJcbiAgICAgIGRlY2tbaV0gPSBjYXJkSjtcclxuICAgICAgZGVja1tqXSA9IGNhcmRJO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICB0aW1lcy0tO1xyXG5cclxuICB9XHJcblxyXG4gIHJldHVybiBkZWNrO1xyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIFNodWZmbGUgdGhlIGRlY2sgdXNpbmcgdGhlIHN0cmlwIG1ldGhvZC5cclxuICogXHJcbiAqIFRoZSBzdHJpcCBtZXRob2QgaW52b2x2ZXMgY3V0dGluZyB0aGUgZGVjayBhdCBhIHJhbmRvbSBwb2ludCBhbmQgcHV0dGluZyB0aGUgY3V0IHBhcnQgYmFjayBpbiB0aGUgZGVjayBhdCBhIHJhbmRvbVxyXG4gKiBwb3NpdGlvbi5cclxuICogXHJcbiAqIEBwYXJhbSB7QXJyYXk8Q2FyZD59IGRlY2sgVGhlIGRlY2sgdG8gc2h1ZmZsZS5cclxuICogQHBhcmFtIHtudW1iZXJ9IFt0aW1lcz0xXSBUaGUgbnVtYmVyIG9mIHRpbWVzIHRvIHJlcGVhdCB0aGUgc2h1ZmZsZSB1c2luZyB0aGlzIG1ldGhvZC5cclxuICogXHJcbiAqIEByZXR1cm5zIHtBcnJheTxDYXJkPn0gUmV0dXJucyB0aGUgc2h1ZmZsZWQgZGVja1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHN0cmlwKGRlY2s6IEFycmF5PENhcmQ+LCB0aW1lczogbnVtYmVyID0gMSk6IEFycmF5PENhcmQ+IHtcclxuXHJcbiAgY29uc3QgY3V0TWF4ID0gTWF0aC5mbG9vcihkZWNrLmxlbmd0aCAqICgxIC8gNCkpO1xyXG5cclxuICBjb25zdCBzcGxpdE51bSA9IHJhbmRvbUludCgzLCBjdXRNYXgpO1xyXG5cclxuICB3aGlsZSAodGltZXMgPiAtMSkge1xyXG5cclxuICAgIGNvbnN0IGRlY2tTcGxpdCA9IGRlY2suc3BsaWNlKDAsIHNwbGl0TnVtKTtcclxuICAgIGNvbnN0IGluc2VydFBvcyA9IHJhbmRvbUludCgwLCBkZWNrLmxlbmd0aCk7XHJcblxyXG4gICAgY29uc3QgZGVjazEgPSBkZWNrLnNsaWNlKDAsIGluc2VydFBvcyk7XHJcbiAgICBjb25zdCBkZWNrMiA9IGRlY2suc2xpY2UoaW5zZXJ0UG9zKTtcclxuXHJcbiAgICBkZWNrID0gZGVjazEuY29uY2F0KGRlY2tTcGxpdCwgZGVjazIpO1xyXG5cclxuICAgIHRpbWVzLS07XHJcblxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGRlY2s7XHJcblxyXG59XHJcblxyXG4vKipcclxuICogR2VuZXJhdGVzIGEgcmFuZG9tIG51bWJlciBiZXR3ZWVuIHR3byB2YWx1ZXMuXHJcbiAqIFxyXG4gKiBAcGFyYW0ge251bWJlcn0gbWluIFRoZSBtaW5pbXVtIHZhbHVlIHRoYXQgY2FuIGJlIHJldHVybmVkLlxyXG4gKiBAcGFyYW0ge251bWJlcn0gbWF4IFRoZSBtYXhpbXVtIHZhbHVlIHRoYXQgY2FuIGJlIHJldHVybmVkLlxyXG4gKiBcclxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyBhIHZhbHVlIGJldHdlZW4gdGhlIG1pbmltdW0gYW5kIG1heGltdW0gdmFsdWVzLlxyXG4gKi9cclxuZnVuY3Rpb24gcmFuZG9tSW50KG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcik6IG51bWJlciB7XHJcblxyXG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkgKyBtaW4pO1xyXG5cclxufSJdfQ==