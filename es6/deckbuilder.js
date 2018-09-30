'use strict'

import * as shuffle from './lib/shuffle.js';
import { deepCopy } from './lib/deepcopy.js';

/**
 * Deckbuilder is a card and deck management tool with the flexibility to
 * work with any type of cards.
 */
export class Deckbuilder {

  /**
   * @param {Object} options A set of options to customize this Deckbuilder instance.
   * @param {number} [maxCardCount=Infinity] The maximum number of cards that can be in this deck.
   */
  constructor(options = {}) {

    /**
     * Combine the user options with the defaults to create a single
     * options object.
     * 
     * @property {Object}
     * @readonly
     */
    this._options = Object.assign({

      // The maximum amount of cards that can be in this deck.
      maxCardCount: Infinity

    }, options);

    /**
     * The up-to-date deck.
     * 
     * @property {Array}
     * @readonly
     */
    this.deck = [];

    /**
     * The total number of cards in the deck.
     * 
     * @property {number}
     * @readonly
     */
    this.count = 0;

    /**
     * The cards that are currently drawn and not available in the deck.
     * 
     * @property {Array}
     * @readonly
     */
    this.drawn = [];

    /**
     * The cards that are currently discarded and not available in the deck.
     * 
     * @property {Array}
     * @readonly
     */
    this.discarded = [];

    /**
     * The available shuffling methods available for the shuffling the deck.
     * 
     * @property {Object}
     * @readonly
     */
    this.shuffleTechniques = {

      fisherYates: shuffle.fisherYates,

      strip: shuffle.strip

    };

  }

  /**
   * Add one or more cards to the deck.
   * 
   * A card must be an object and it can have any properties you wish but it
   * must have an id attribute that can be anything you wish.
   * 
   * The id attribute is what you and Deckbuilder will share in common when it
   * comes to the cards and it is what will be used when selecting, editing, and
   * removing cards from the deck.
   * 
   * @since 0.1.0
   * 
   * @param {Object|Array<Object>} cards The cards to add to the deck.
   * @param {boolean} [shuffleIn=false] Normally the card is added to the bottom of the deck. If this is set to true, the card is added in at a random location.
   * 
   * @returns {Deckbuilder} Returns this for chaining.
   */
  add(cards, shuffleIn = false) {

    if (!Array.isArray(cards)) cards = [cards];

    for (let card of cards) {

      if (card.id === undefined || card.id === null) {

        console.warn('Card missing `id` property, skipping...');
        continue;

      }

      if (this.count === this._options.maxCardCount) {

        console.warn('The maximum amount of cards for this deck has been reached.');
        return;

      }

      if (shuffleIn) {

        const rand = Math.floor(Math.random() * this.deck.length);

        this.deck.splice(rand, 0, card);

      }

      else this.deck.push(card);

      this.count++;

    }

    return this;

  }

  /**
   * Remove one or more cards from this deck.
   * 
   * The card to be removed needs to be referenced by its `id` property since that
   * is the one thing that Deckbuilder knows about the cards.
   * 
   * @since 0.1.0
   * 
   * @param {number|string|Array<number|string>} ids The id of the card to remove from this deck.
   * 
   * @returns {Deckbuilder} Returns this for chaining.
   */
  remove(ids) {

    if (!Array.isArray(ids)) ids = [ids];

    this.deck = this.deck.filter(card => !ids.includes(card.id));

    return this;

  }

  /**
   * Edit a single card from the deck.
   * 
   * To set a new property just define a new key and value. 
   * 
   * To edit a property, define the key to edit and then set the new value.
   * 
   * To remove a property, set the value of the property key to remove to null.
   * 
   * @since 0.1.0
   * 
   * @param {number|string} id The id of the card to edit.
   * @param {Object} editInfo The object containing the values to add, change, or remove.
   * 
   * @returns {Deckbuilder} Returns this for chaining.
   */
  edit(id, editInfo) {

    for (let card of this.deck) {

      if (card.id === id) {

        card = Object.assign(card, editInfo);

        for (let key in card) {

          if (card[key] === null) delete card[key];

        }

        break;

      }

    }

  }

  /**
   * Shuffle the deck using one of the available shuffling techniques any specified
   * number of times.
   * 
   * @since 0.1.0
   * 
   * @param {number} [times=1] The number of times to shuffle the deck.
   * @param {string} [technique='fisher-yates'] The method to use for shuffling the deck.
   * 
   * @returns {Deckbuilder} Returns this for chaining.
   */
  shuffle(times = 1, technique = this.shuffleTechniques.fisherYates) {

    this.deck = technique(this.deck, times);

  }

  /**
   * Deal a specified number of cards from the deck to a specified number of players.
   * 
   * The cards are dealt in a 'clockwise' fashion so each hand gets one and then it
   * repeats until the hands are full.
   * 
   * @since 0.1.0
   * 
   * @param {number} hands The number of hands to deal cards out to.
   * @param {number} cards The number of cards to deal to each hand.
   * 
   * @returns {Object} An object containing each hand and the cards that belong to them.
   */
  deal(hands, cards) {

    let deal = {};

    let _deck = deepCopy(this.deck);

    const totalCards = hands * cards;

    for (let i = 0, hand = 0; i < totalCards; ++i, ++hand) {

      if (hand >= hands) hand = 0;

      let currentHand = hand + 1;

      if (!deal[currentHand]) deal[currentHand] = [];

      deal[currentHand].push(this.deck[i]);

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
   * @since 0.1.0
   * 
   * @param {number} cards The number of cards to draw.
   * 
   * @returns {Array} An array of the cards that have been drawn.
   */
  draw(cards) {

    let drawn = [];

    let _deck = deepCopy(this.deck);

    for (let i = 0; i < cards; ++i) {

      this.drawn.push(this.deck[i]);

      _deck.filter(card => {

        if (card.id == this.deck[i].id) _deck.splice(_deck.indexOf(card), 1);

      });

    }

    this.deck = _deck;

    return drawn;

  }

  /**
   * Get one or more specific cards from the deck.
   * 
   * @since 0.1.0
   * 
   * @param {string|number|Array<string|number>} ids The ids of the card or cards to pick.
   * 
   * @returns {Deckbuilder} Returns this for chaining.
   */
  pick(ids) {

    if (!Array.isArray(ids)) ids = [ids];

    return this.deck.filter(card => ids.includes(card.id));

  }

  /**
   * Discard any number of cards from the drawn pile and optionally, from the deck.
   * 
   * @since 0.1.0
   * 
   * @param {string|number|Array<string|number>} ids The ids of the cards to discard.
   * @param {boolean} [deck] Indicates whether discard should check the deck for the cards to discard. By default discard only checks the drawn pile.
   * 
   * @returns {Deckbuilder} Returns this for chaining.
   */
  discard(ids, deck = false) {

    if (!Array.isArray(ids)) ids = [ids];

    this.discarded = this.drawn.filter(card => ids.includes(card.id));

    this.drawn = this.drawn.filter(card => !ids.includes(card.id));

    if (deck) {

      let deckDiscard = this.deck.filter(card => ids.includes(card.id));

      this.deck = this.deck.filter(card => !ids.includes(card.id));

      this.discarded = this.discarded.concat(deckDiscard);

    }

    return this;

  }

  /**
   * Return cards from the drawn, disacrd, or both piles back to the deck.
   * 
   * @since 0.1.0
   * 
   * @param {Object} options Options for determining what cards to return to the deck.
   * @param {string|number|Array<string|number} [ids] The ids of the cards to return.
   * @param {boolean} [drawn] Set to true to return all cards from the drawn pile to the deck.
   * @param {boolean} [discarded] Set to true to return all cards from the discard pile to the deck.
   * 
   * @returns {Deckbuilder} Returns this for chaining.
   */
  return(options = {}) {

    if (options.ids) {

      if (!Array.isArray(options.ids)) options.ids = [options.ids];

      let _drawn = deepCopy(this.drawn);
      let _discarded = deepCopy(this.discarded);

      for (let i = 0; i < options.ids.length; ++i) {

        let id = options.ids[i];

        for (let card of this.drawn) {

          if (card.id === id) {

            this.deck.push(card);

            _drawn.splice(_drawn.indexOf(card), 1);

          }

        }

        for (let card of this.discarded) {

          if (card.id === id) {

            this.deck.push(card);

            _discarded.splice(_discarded.indexOf(card), 1);

          }

        }

      }

      this.drawn = _drawn;

      this.discarded = _discarded;

    }

    if (options.drawn) {

      this.deck = this.deck.concat(this.drawn);

      this.drawn = [];

    }

    if (options.discarded) {

      this.deck = this.deck.concat(this.discarded);

      this.discarded = [];

    }

    return this;

  }

}