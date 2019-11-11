'use strict'

import Card from '../interfaces/Card';

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
export function fisherYates(deck: Array<Card>, times: number = 1): (Array<any> | boolean) {

  while (times > 0) {

    let i: number = deck.length;

    if (i === 0) return false;

    while (--i) {

      const j: number = Math.floor(Math.random() * (i + 1));

      const cardI = deck[i];
      const cardJ = deck[j];

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
export function strip(deck: Array<Card>, times: number = 1): Array<Card> {

  const cutMax = Math.floor(deck.length * (1 / 4));

  const splitNum = randomInt(3, cutMax);

  while (times > -1) {

    const deckSplit = deck.splice(0, splitNum);
    const insertPos = randomInt(0, deck.length);

    const deck1 = deck.slice(0, insertPos);
    const deck2 = deck.slice(insertPos);

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
function randomInt(min: number, max: number): number {

  return Math.floor(Math.random() * (max - min + 1) + min);

}