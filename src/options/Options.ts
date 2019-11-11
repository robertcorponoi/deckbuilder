'use strict'

/**
 * Defines the options and their default values for Deckbuilder.
 * 
 * @version 1.0.0
 */
export default class Options {

  /**
   * The maximum amount of cards that the deck can contain.
   * 
   * @property {number}
   * 
   * @default Infinity
   */
  maxCardCount: number = Infinity;

  /**
   * @param {Object} options The initialiation parameters from Deckbuilder.
   */
  constructor(options: Object = {}) {

    Object.assign(this, options);

  }

}