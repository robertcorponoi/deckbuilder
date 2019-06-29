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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlscy50cyJdLCJuYW1lcyI6WyJkZWVwQ29weSIsIm8iLCJvdXQiLCJrZXkiLCJ2IiwiQXJyYXkiLCJpc0FycmF5Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7O0FBSUE7Ozs7Ozs7QUFPTyxTQUFTQSxRQUFULENBQWtCQyxDQUFsQixFQUF1QztBQUU1QyxNQUFJQyxHQUFKO0FBQ0EsTUFBSUMsR0FBSjtBQUNBLE1BQUlDLENBQUo7QUFFQUYsRUFBQUEsR0FBRyxHQUFHRyxLQUFLLENBQUNDLE9BQU4sQ0FBY0wsQ0FBZCxJQUFtQixFQUFuQixHQUF3QixFQUE5Qjs7QUFFQSxPQUFLRSxHQUFMLElBQVlGLENBQVosRUFBZTtBQUViRyxJQUFBQSxDQUFDLEdBQUdILENBQUMsQ0FBQ0UsR0FBRCxDQUFMO0FBRUFELElBQUFBLEdBQUcsQ0FBQ0MsR0FBRCxDQUFILEdBQVksUUFBT0MsQ0FBUCxNQUFhLFFBQWIsSUFBeUJBLENBQUMsS0FBSyxJQUFoQyxHQUF3Q0osUUFBUSxDQUFDSSxDQUFELENBQWhELEdBQXNEQSxDQUFqRTtBQUVEOztBQUVELFNBQU9GLEdBQVA7QUFFRCIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xyXG5cclxuaW1wb3J0IENhcmQgZnJvbSAnLi9pbnRlcmZhY2VzL0NhcmQnO1xyXG5cclxuLyoqXHJcbiAqIENsb25lIGFuIG9iamVjdCBhbmQgaXRzIHByb3BlcnRpZXMuXHJcbiAqIFxyXG4gKiBAcGFyYW0ge09iamVjdH0gbyBUaGUgb2JqZWN0IHRvIGNsb25lLlxyXG4gKiBcclxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY2xvbmVkIG9iamVjdC5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBkZWVwQ29weShvOiBhbnkpOiBBcnJheTxDYXJkPiB7XHJcblxyXG4gIGxldCBvdXQ6IGFueTtcclxuICBsZXQga2V5OiBzdHJpbmc7XHJcbiAgbGV0IHY6IE9iamVjdDtcclxuXHJcbiAgb3V0ID0gQXJyYXkuaXNBcnJheShvKSA/IFtdIDoge307XHJcblxyXG4gIGZvciAoa2V5IGluIG8pIHtcclxuXHJcbiAgICB2ID0gb1trZXldO1xyXG5cclxuICAgIG91dFtrZXldID0gKHR5cGVvZiB2ID09PSAnb2JqZWN0JyAmJiB2ICE9PSBudWxsKSA/IGRlZXBDb3B5KHYpIDogdjtcclxuXHJcbiAgfVxyXG5cclxuICByZXR1cm4gb3V0O1xyXG5cclxufSJdfQ==