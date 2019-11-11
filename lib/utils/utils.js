'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deepCopy = deepCopy;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Clone an object and its properties.
 * 
 * @param {Object} o The object to clone.
 * 
 * @returns {Object} Returns the cloned object.
 */
function deepCopy(o) {
  var out;
  var key;
  var v;
  out = Array.isArray(o) ? [] : {};

  for (key in o) {
    v = o[key];
    out[key] = _typeof(v) === 'object' && v !== null ? deepCopy(v) : v;
  }

  return out;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy91dGlscy50cyJdLCJuYW1lcyI6WyJkZWVwQ29weSIsIm8iLCJvdXQiLCJrZXkiLCJ2IiwiQXJyYXkiLCJpc0FycmF5Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FBSUE7Ozs7Ozs7QUFPTyxTQUFTQSxRQUFULENBQWtCQyxDQUFsQixFQUF1QztBQUU1QyxNQUFJQyxHQUFKO0FBQ0EsTUFBSUMsR0FBSjtBQUNBLE1BQUlDLENBQUo7QUFFQUYsRUFBQUEsR0FBRyxHQUFHRyxLQUFLLENBQUNDLE9BQU4sQ0FBY0wsQ0FBZCxJQUFtQixFQUFuQixHQUF3QixFQUE5Qjs7QUFFQSxPQUFLRSxHQUFMLElBQVlGLENBQVosRUFBZTtBQUViRyxJQUFBQSxDQUFDLEdBQUdILENBQUMsQ0FBQ0UsR0FBRCxDQUFMO0FBRUFELElBQUFBLEdBQUcsQ0FBQ0MsR0FBRCxDQUFILEdBQVksUUFBT0MsQ0FBUCxNQUFhLFFBQWIsSUFBeUJBLENBQUMsS0FBSyxJQUFoQyxHQUF3Q0osUUFBUSxDQUFDSSxDQUFELENBQWhELEdBQXNEQSxDQUFqRTtBQUVEOztBQUVELFNBQU9GLEdBQVA7QUFFRCIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xyXG5cclxuaW1wb3J0IENhcmQgZnJvbSAnLi4vaW50ZXJmYWNlcy9DYXJkJztcclxuXHJcbi8qKlxyXG4gKiBDbG9uZSBhbiBvYmplY3QgYW5kIGl0cyBwcm9wZXJ0aWVzLlxyXG4gKiBcclxuICogQHBhcmFtIHtPYmplY3R9IG8gVGhlIG9iamVjdCB0byBjbG9uZS5cclxuICogXHJcbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNsb25lZCBvYmplY3QuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZGVlcENvcHkobzogYW55KTogQXJyYXk8Q2FyZD4ge1xyXG5cclxuICBsZXQgb3V0OiBhbnk7XHJcbiAgbGV0IGtleTogc3RyaW5nO1xyXG4gIGxldCB2OiBPYmplY3Q7XHJcblxyXG4gIG91dCA9IEFycmF5LmlzQXJyYXkobykgPyBbXSA6IHt9O1xyXG5cclxuICBmb3IgKGtleSBpbiBvKSB7XHJcblxyXG4gICAgdiA9IG9ba2V5XTtcclxuXHJcbiAgICBvdXRba2V5XSA9ICh0eXBlb2YgdiA9PT0gJ29iamVjdCcgJiYgdiAhPT0gbnVsbCkgPyBkZWVwQ29weSh2KSA6IHY7XHJcblxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG91dDtcclxuXHJcbn0iXX0=