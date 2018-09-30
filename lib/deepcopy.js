'use strict'

/**
 * Clone an object and its properties.
 * 
 * @since 0.1.0
 */
module.exports = function deepCopy(o) {

  let out;
  let key;
  let v;

  out = Array.isArray(o) ? [] : {};

  for (key in o) {

    v = o[key];

    out[key] = (typeof v === 'object' && v !== null) ? deepCopy(v) : v;

  }

  return out;

}