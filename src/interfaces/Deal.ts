'use strict'

import Card from './Card';

/**
 * Defines how cards can be dealt to players.
 */
export default interface Deal {

  [player: string]: Array<Card>;

}