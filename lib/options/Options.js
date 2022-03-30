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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcHRpb25zL09wdGlvbnMudHMiXSwibmFtZXMiOlsiT3B0aW9ucyIsIm9wdGlvbnMiLCJJbmZpbml0eSIsIk9iamVjdCIsImFzc2lnbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFFQTs7Ozs7Ozs7Ozs7Ozs7O0lBS3FCQSxPO0FBRW5COzs7Ozs7OztBQVNBOzs7QUFHQSxtQkFBa0M7QUFBQSxNQUF0QkMsT0FBc0IsdUVBQUosRUFBSTs7QUFBQTs7QUFBQSx3Q0FMWEMsUUFLVzs7QUFFaENDLEVBQUFBLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjLElBQWQsRUFBb0JILE9BQXBCO0FBRUQsQyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xuXG4vKipcbiAqIERlZmluZXMgdGhlIG9wdGlvbnMgYW5kIHRoZWlyIGRlZmF1bHQgdmFsdWVzIGZvciBEZWNrYnVpbGRlci5cbiAqIFxuICogQHZlcnNpb24gMS4wLjBcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3B0aW9ucyB7XG5cbiAgLyoqXG4gICAqIFRoZSBtYXhpbXVtIGFtb3VudCBvZiBjYXJkcyB0aGF0IHRoZSBkZWNrIGNhbiBjb250YWluLlxuICAgKiBcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9XG4gICAqIFxuICAgKiBAZGVmYXVsdCBJbmZpbml0eVxuICAgKi9cbiAgbWF4Q2FyZENvdW50OiBudW1iZXIgPSBJbmZpbml0eTtcblxuICAvKipcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgVGhlIGluaXRpYWxpYXRpb24gcGFyYW1ldGVycyBmcm9tIERlY2tidWlsZGVyLlxuICAgKi9cbiAgY29uc3RydWN0b3Iob3B0aW9uczogT2JqZWN0ID0ge30pIHtcblxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgb3B0aW9ucyk7XG5cbiAgfVxuXG59Il19