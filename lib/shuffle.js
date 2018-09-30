'use strict'

/**
 * Shuffle contains methods that are used to shuffle the deck in various fashions.
 * 
 * @since 0.1.0
 */
module.exports = {

  /**
   * The Fishey-Yates method is one of the best array randomization techniques
   * available which makes it a good way to shuffle the deck.
   * 
   * @since 0.1.0
   * 
   * @param {Array} deck The deck to shuffle.
   * @param {number} times The number of times to repeat the shuffle.
   * 
   * @returns {Array} The shuffled deck.
   */
  fisherYates(deck, times) {

    while (times > 0) {

      let i = deck.length;

      if (i == 0) return false;

      while (--i) {

        let j = Math.floor(Math.random() * (i + 1));

        let cardI = deck[i];
        let cardJ = deck[j];

        deck[i] = cardJ;
        deck[j] = cardI;

      }

      times--;

    }

    return deck;

  },

  /**
   * Shuffle the deck using the strip method which involves cutting the deck at a
   * random point and putting the cut part back in the deck at a random position.
   * 
   * @since 0.1.0
   * 
   * @param {Array} deck The deck to shuffle.
   * @param {number} times The number of times to repeat the shuffle.
   * 
   * @returns {Array} The shuffled deck.
   */
  strip(deck, times) {

    const cutMax = Math.floor(deck.length * (1 / 4));

    const splitNum = utils.random(3, cutMax);

    while (times > -1) {

      let deckSplit = deck.splice(0, splitNum);
      let insertPos = utils.random(0, deck.length);

      let deck1 = deck.slice(0, insertPos);
      let deck2 = deck.slice(insertPos);

      deck = deck1.concat(deckSplit, deck2);

      times--;
      
    }

    return deck;

  }

}