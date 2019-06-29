'use strict'

import Card from './interfaces/Card';

/**
 * Clone an object and its properties.
 * 
 * @param {Object} o The object to clone.
 * 
 * @returns {Object} Returns the cloned object.
 */
export function deepCopy(o: any): Array<Card> {

  let out: any;
  let key: string;
  let v: Object;

  out = Array.isArray(o) ? [] : {};

  for (key in o) {

    v = o[key];

    out[key] = (typeof v === 'object' && v !== null) ? deepCopy(v) : v;

  }

  return out;

}