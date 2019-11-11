'use strict'

import Card from './interfaces/Card';
import Deal from './interfaces/Deal';

import Options from './options/Options';
import { deepCopy } from './utils/utils';
import { fisherYates, strip } from './utils/shuffle';

/**
 * Deckbuilder helps you create and manage car decks for any type of card game.
 */
export default class Deckbuilder {

  /**
   * A reference to the options for this instance.
   * 
   * @property {Options}
   */
  options: Options;

  /**
   * A reference to the current deck of cards.
   * 
   * @property {Array<Card>}
   */
  deck: Array<Card> = [];

  /**
   * The total number of cards in this deck.
   * 
   * @property {number}
   */
  count: number = 0;

  /**
   * A reference to the cards that are currently drawn out and not a part of the deck.
   * 
   * @property {Array<Card>}
   */
  drawn: Array<Card> = [];

  /**
   * A reference to the cards that are currently discarded and not part of the deck.
   * 
   * @property {Array<Card>}
   */
  discarded: Array<Card> = [];

  /**
   * The shuffle methods available for use.
   * 
   * @property {any}
   */
  SHUFFLE_METHODS: any = {
    STRIP: strip,
    FISHERYATES: fisherYates,
  };

  /**
   * @param {Object} [options]
   * @param {number} [options.maxCardCount=Infinity] The maximum number of cards that can be in this deck.
   */
  constructor(options?: Object) {

    this.options = new Options(options);

  }

  /**
   * Adds one or more cards to the deck.
   * 
   * A card must be an object and it can have any properties that suit your needs but at the very least it needs an id that Deckbuilder
   * can use to keep track of the card.
   * 
   * @param {Card | Array<Card>} cards One or more cards to add to the deck.
   * @param {boolean} [shuffleIn=false] If this is set to true, the card will be inserted into a random position in the deck instead of being added to the bottom.
   * 
   * @returns {Deckbuilder} Returns this for chaining.
   */
  add(cards: (Card | Array<Card>), shuffleIn: boolean = false): Deckbuilder {

    if (!Array.isArray(cards)) cards = [cards];

    for (const card of cards) {

      if (!card.id) {

        console.warn('Card is missing the id property, skipping...');
        continue;

      }

      if (this.count === this.options.maxCardCount) {

        console.warn('The maximum amount of cards for this deck has been reached');
        return this;

      }

      if (shuffleIn) {

        const randomPosition: number = Math.floor(Math.random() * this.deck.length);

        this.deck.splice(randomPosition, 0, card);

      } else this.deck.push(card);

      this.count++;

    }

    return this;

  }

  /**
   * Remove one or more cards from the deck.
   * 
   * The card or cards to be removed need to be referenced by their id property.
   * 
   * @param {string|Array<string>} ids The id or ids of the cards to remove from the deck.
   * 
   * @returns {Deckbuilder} Returns this for chaining.
   */
  remove(ids: (string | Array<string>)): Deckbuilder {

    if (!Array.isArray(ids)) ids = [ids];

    this.deck = this.deck.filter(card => !ids.includes(card.id));

    return this;

  }

  /**
   * Edits a card's properties from the deck.
   * 
   * To define a new property, just set a new key and value. To edit a property, define the key to edit and the new value to set for that key. To
   * remove a property, define the key to delete.
   * 
   * @param {string} id The id of the card to edit.
   * @param {string} key The name of the property to add, edit, or remove.
   * @param {any} [value=null] The value to add to the key. If removing a key just leave this blank.
   * 
   * @returns {Deckbuilder} Returns this for chaining.
   */
  edit(id: string, key: string, value: any = null): Deckbuilder {

    for (const card of this.deck) {

      if (card.id === id) {

        value ? card[key] = value : delete card[key];

        break;

      }

    }

    return this;

  }

  /**
   * Shuffles the deck using one of the available shuffle methods any number of times.
   * 
   * @param {number} [times=1] The number of times to shuffle the deck.
   * @param {string} [method='fisherYates'] The method to use for shuffling the deck.
   * 
   * @returns {Deckbuilder} Returns this for chaining.
   */
  shuffle(times: number = 1, method: Function = this.SHUFFLE_METHODS.FISHERYATES): Deckbuilder {

    this.deck = method(this.deck, times);

    return this;

  }

  /**
   * Deals a specified number of cards from the deck to a specified number of players.
   * 
   * The cards can be dealt one at a time or all at once for each player.
   * 
   * @param {number} players The number of players to deal cards to.
   * @param {number} cards The amount of cards to deal to each player.
   * @param {boolean} [allAtOnce=false] If set to true, all the cards will be dealt to each player instead of just one at a time.
   * 
   * @returns {Deal} Returns a Deal object containing the players and the cards they have been dealt.
   */
  deal(players: number, cards: number, allAtOnce: boolean = false): Deal {

    const deal: Deal = {};

    let _deck: Array<Card> = deepCopy(this.deck);

    const totalCards: number = players * cards;

    for (let i: number = 0, player: number = 0; i < totalCards; ++i, ++player) {

      if (player >= players) player = 0;

      const currentPlayer: number = player + 1;

      if (!deal[currentPlayer]) deal[currentPlayer] = [];

      deal[currentPlayer].push(this.deck[i]);

      this.drawn.push(this.deck[i]);

      _deck.filter(card => {

        if (card.id == this.deck[i].id) _deck.splice(_deck.indexOf(card), 1);

      });

    }

    this.deck = _deck;

    return deal;

  }

  /**
   * Draw any number of cards from the top of the deck.
   * 
   * @param {number} cards The number of cards to draw.
   * 
   * @returns {Array<Card>} The cards that have been drawn.
   */
  draw(cards: number): Array<Card> {

    const drawn: Array<Card> = [];

    const _deck: Array<Card> = deepCopy(this.deck);

    for (let i: number = 0; i < cards; ++i) {

      this.drawn.push(this.deck[i]);

      _deck.filter(card => { if (card.id == this.deck[i].id) _deck.splice(_deck.indexOf(card), 1); });

    }

    this.deck = _deck;

    return drawn;

  }

  /**
   * Pick one or more cards from the deck by their id/ids.
   * 
   * @param {string|Array<string>} ids The id or ids of the cards to pick.
   * 
   * @returns {Array<Card>} Returns the picked cards.
   */
  pick(ids: (string | Array<string>)): Array<Card> {

    if (!Array.isArray(ids)) ids = [ids];

    return this.deck.filter(card => ids.includes(card.id));

  }

  /**
   * Discards any number of cards from the draw pile and optionally from the deck.
   * 
   * @param {string|Array<string>} ids The id or ids of the cards to discard.
   * @param {boolean} [checkDeck=false] If set to true, it will also check the deck for cards it can discard and not just the drawn pile.
   * 
   * @returns {Deckbuilder} Returns this for chaining.
   */
  discard(ids: (string | Array<string>), checkDeck: boolean = false): Deckbuilder {

    if (!Array.isArray(ids)) ids = [ids];

    this.discarded = this.drawn.filter(card => ids.includes(card.id));

    this.drawn = this.drawn.filter(card => !ids.includes(card.id));

    if (checkDeck) {

      this.discarded = this.discarded.concat(this.deck.filter(card => ids.includes(card.id)));

      this.deck = this.deck.filter(card => !ids.includes(card.id));

    }

    return this;

  }

  /**
   * Returns cards from the drawn pile back to the deck.
   *
   * @param {string|Array<string>} [cards] By default all cards from the draw pile will be returned, this option can be used to return only certain cards from the drawn pile.
   *  
   * @returns {Deckbuilder} Returns this for chaining.
   */
  returnDrawn(cards: (any | Array<string>) = []): Deckbuilder {

    if (!Array.isArray(cards)) cards = [cards];

    if (cards.length === 0) {

      this.deck = this.deck.concat(this.drawn);

      this.drawn = [];

      return this;

    }

    const cardsToReturn = this.drawn.filter(card => cards.includes(card.id));

    this.deck = this.deck.concat(cardsToReturn);

    this.drawn = this.drawn.filter(card => !cards.includes(card.id));

    return this;

  }

  /**
   * Returns cards from the discarded pile back to the deck.
   *
   * @param {string|Array<string>} [cards] By default all cards from the discarded pile will be returned, this option can be used to return only certain cards from the discarded pile.
   *  
   * @returns {Deckbuilder} Returns this for chaining.
   */
  returnDiscarded(cards: (any | Array<string>) = []): Deckbuilder {

    if (!Array.isArray(cards)) cards = [cards];

    if (cards.length === 0) {

      this.deck = this.deck.concat(this.discarded);

      this.discarded = [];

      return this;

    }

    const cardsToReturn = this.discarded.filter(card => cards.includes(card.id));

    this.deck = this.deck.concat(cardsToReturn);

    this.discarded = this.discarded.filter(card => !cards.includes(card.id));

    return this;

  }

}