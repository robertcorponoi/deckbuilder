'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deepCopy = deepCopy;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy91dGlscy50cyJdLCJuYW1lcyI6WyJkZWVwQ29weSIsIm8iLCJvdXQiLCJrZXkiLCJ2IiwiQXJyYXkiLCJpc0FycmF5Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FBSUE7Ozs7Ozs7QUFPTyxTQUFTQSxRQUFULENBQWtCQyxDQUFsQixFQUF1QztBQUU1QyxNQUFJQyxHQUFKO0FBQ0EsTUFBSUMsR0FBSjtBQUNBLE1BQUlDLENBQUo7QUFFQUYsRUFBQUEsR0FBRyxHQUFHRyxLQUFLLENBQUNDLE9BQU4sQ0FBY0wsQ0FBZCxJQUFtQixFQUFuQixHQUF3QixFQUE5Qjs7QUFFQSxPQUFLRSxHQUFMLElBQVlGLENBQVosRUFBZTtBQUViRyxJQUFBQSxDQUFDLEdBQUdILENBQUMsQ0FBQ0UsR0FBRCxDQUFMO0FBRUFELElBQUFBLEdBQUcsQ0FBQ0MsR0FBRCxDQUFILEdBQVksUUFBT0MsQ0FBUCxNQUFhLFFBQWIsSUFBeUJBLENBQUMsS0FBSyxJQUFoQyxHQUF3Q0osUUFBUSxDQUFDSSxDQUFELENBQWhELEdBQXNEQSxDQUFqRTtBQUVEOztBQUVELFNBQU9GLEdBQVA7QUFFRCIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgQ2FyZCBmcm9tICcuLi9pbnRlcmZhY2VzL0NhcmQnO1xuXG4vKipcbiAqIENsb25lIGFuIG9iamVjdCBhbmQgaXRzIHByb3BlcnRpZXMuXG4gKiBcbiAqIEBwYXJhbSB7T2JqZWN0fSBvIFRoZSBvYmplY3QgdG8gY2xvbmUuXG4gKiBcbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNsb25lZCBvYmplY3QuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWVwQ29weShvOiBhbnkpOiBBcnJheTxDYXJkPiB7XG5cbiAgbGV0IG91dDogYW55O1xuICBsZXQga2V5OiBzdHJpbmc7XG4gIGxldCB2OiBPYmplY3Q7XG5cbiAgb3V0ID0gQXJyYXkuaXNBcnJheShvKSA/IFtdIDoge307XG5cbiAgZm9yIChrZXkgaW4gbykge1xuXG4gICAgdiA9IG9ba2V5XTtcblxuICAgIG91dFtrZXldID0gKHR5cGVvZiB2ID09PSAnb2JqZWN0JyAmJiB2ICE9PSBudWxsKSA/IGRlZXBDb3B5KHYpIDogdjtcblxuICB9XG5cbiAgcmV0dXJuIG91dDtcblxufSJdfQ==