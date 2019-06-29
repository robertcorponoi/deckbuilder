'use strict';
/**
 * Defines the options and their default values for Deckbuilder.
 * 
 * @version 1.0.0
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Options =
/**
 * The maximum amount of cards that the deck can contain.
 * 
 * @since 0.1.0
 * 
 * @property {number}
 * 
 * @default Infinity
 */

/**
 * @param {Object} options The initialiation parameters from Deckbuilder.
 */
function Options() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  _classCallCheck(this, Options);

  _defineProperty(this, "maxCardCount", Infinity);

  Object.assign(this, options);
};

exports["default"] = Options;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9PcHRpb25zLnRzIl0sIm5hbWVzIjpbIk9wdGlvbnMiLCJvcHRpb25zIiwiSW5maW5pdHkiLCJPYmplY3QiLCJhc3NpZ24iXSwibWFwcGluZ3MiOiJBQUFBO0FBRUE7Ozs7Ozs7Ozs7Ozs7OztJQUtxQkEsTztBQUVuQjs7Ozs7Ozs7OztBQVdBOzs7QUFHQSxtQkFBa0M7QUFBQSxNQUF0QkMsT0FBc0IsdUVBQUosRUFBSTs7QUFBQTs7QUFBQSx3Q0FMWEMsUUFLVzs7QUFFaENDLEVBQUFBLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjLElBQWQsRUFBb0JILE9BQXBCO0FBRUQsQyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xyXG5cclxuLyoqXHJcbiAqIERlZmluZXMgdGhlIG9wdGlvbnMgYW5kIHRoZWlyIGRlZmF1bHQgdmFsdWVzIGZvciBEZWNrYnVpbGRlci5cclxuICogXHJcbiAqIEB2ZXJzaW9uIDEuMC4wXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPcHRpb25zIHtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIG1heGltdW0gYW1vdW50IG9mIGNhcmRzIHRoYXQgdGhlIGRlY2sgY2FuIGNvbnRhaW4uXHJcbiAgICogXHJcbiAgICogQHNpbmNlIDAuMS4wXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICogXHJcbiAgICogQGRlZmF1bHQgSW5maW5pdHlcclxuICAgKi9cclxuICBtYXhDYXJkQ291bnQ6IG51bWJlciA9IEluZmluaXR5O1xyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBUaGUgaW5pdGlhbGlhdGlvbiBwYXJhbWV0ZXJzIGZyb20gRGVja2J1aWxkZXIuXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3Iob3B0aW9uczogT2JqZWN0ID0ge30pIHtcclxuXHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIG9wdGlvbnMpO1xyXG5cclxuICB9XHJcblxyXG59Il19