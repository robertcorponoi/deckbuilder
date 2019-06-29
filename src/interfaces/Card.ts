'use strict'

/**
 * Defines the properties that a card has.
 */
export default interface Card {

  // The id of the card.
  id: string;

  // Any other properties that suit your needs.
  [props: string]: any;

}