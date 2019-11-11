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
export declare function fisherYates(deck: Array<Card>, times?: number): (Array<any> | boolean);
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
export declare function strip(deck: Array<Card>, times?: number): Array<Card>;
