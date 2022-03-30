import Card from './interfaces/Card';
import Deal from './interfaces/Deal';
import Options from './options/Options';
declare type Criteria = ((card: Card) => boolean) | ((card: Card, index: number) => boolean) | ((card: Card, index: number, array: Array<Card>) => boolean);
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
    deck: Array<Card>;
    /**
     * The total number of cards in this deck.
     *
     * @property {number}
     */
    count: number;
    /**
     * A reference to the cards that are currently drawn out and not a part of the deck.
     *
     * @property {Array<Card>}
     */
    drawn: Array<Card>;
    /**
     * A reference to the cards that are currently discarded and not part of the deck.
     *
     * @property {Array<Card>}
     */
    discarded: Array<Card>;
    /**
     * The shuffle methods available for use.
     *
     * @property {any}
     */
    SHUFFLE_METHODS: any;
    /**
     * @param {Object} [options]
     * @param {number} [options.maxCardCount=Infinity] The maximum number of cards that can be in this deck.
     */
    constructor(options?: Object);
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
    add(cards: (Card | Array<Card>), shuffleIn?: boolean): Deckbuilder;
    /**
     * Remove one or more cards from the deck.
     *
     * The card or cards to be removed need to be referenced by their id property.
     *
     * @param {string|Array<string>} ids The id or ids of the cards to remove from the deck.
     *
     * @returns {Deckbuilder} Returns this for chaining.
     */
    remove(ids: (string | Array<string>)): Deckbuilder;
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
    edit(id: string, key: string, value?: any): Deckbuilder;
    /**
     * Shuffles the deck using one of the available shuffle methods any number of times.
     *
     * @param {number} [times=1] The number of times to shuffle the deck.
     * @param {string} [method='fisherYates'] The method to use for shuffling the deck.
     *
     * @returns {Deckbuilder} Returns this for chaining.
     */
    shuffle(times?: number, method?: Function): Deckbuilder;
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
    deal(players: number, cards: number, allAtOnce?: boolean): Deal;
    /**
     * Draw any number of cards from the top of the deck.
     *
     * @param {number} cards The number of cards to draw.
     *
     * @returns {Array<Card>} The cards that have been drawn.
     */
    draw(cards: number): Array<Card>;
    /**
     * Pick one or more cards from the deck by their id/ids.
     *
     * @param {string|Array<string>} ids The id or ids of the cards to pick.
     *
     * @returns {Array<Card>} Returns the picked cards.
     */
    pick(ids: (string | Array<string>)): Array<Card>;
    /**
     *
     * Searches and draws cards from the deck
     *
     * @param criteria search criteria
     * @param max maximum number of cards that must match the criteria. If specified and reached, further cards will not be considered
     * @param min minimum number of cards that must match the criteria. If not reached, no card will be drawn
     * @returns cards matching the criteria (if min is satisfied), up to max (if specified)
     */
    search(criteria: Criteria, max?: number, min?: number): Array<Card>;
    /**
     * Discards any number of cards from the draw pile and optionally from the deck.
     *
     * @param {string|Array<string>} ids The id or ids of the cards to discard.
     * @param {boolean} [checkDeck=false] If set to true, it will also check the deck for cards it can discard and not just the drawn pile.
     *
     * @returns {Deckbuilder} Returns this for chaining.
     */
    discard(ids: (string | Array<string>), checkDeck?: boolean): Deckbuilder;
    /**
     * Returns cards from the drawn pile back to the deck.
     *
     * @param {string|Array<string>} [cards] By default all cards from the draw pile will be returned, this option can be used to return only certain cards from the drawn pile.
     *
     * @returns {Deckbuilder} Returns this for chaining.
     */
    returnDrawn(cards?: (any | Array<string>)): Deckbuilder;
    /**
     * Returns cards from the discarded pile back to the deck.
     *
     * @param {string|Array<string>} [cards] By default all cards from the discarded pile will be returned, this option can be used to return only certain cards from the discarded pile.
     *
     * @returns {Deckbuilder} Returns this for chaining.
     */
    returnDiscarded(cards?: (any | Array<string>)): Deckbuilder;
}
export {};
