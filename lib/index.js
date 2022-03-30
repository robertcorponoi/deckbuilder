'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Options = _interopRequireDefault(require("./options/Options"));

var _utils = require("./utils/utils");

var _shuffle = require("./utils/shuffle");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Deckbuilder helps you create and manage car decks for any type of card game.
 */
var Deckbuilder = /*#__PURE__*/function () {
  /**
   * A reference to the options for this instance.
   * 
   * @property {Options}
   */

  /**
   * A reference to the current deck of cards.
   * 
   * @property {Array<Card>}
   */

  /**
   * The total number of cards in this deck.
   * 
   * @property {number}
   */

  /**
   * A reference to the cards that are currently drawn out and not a part of the deck.
   * 
   * @property {Array<Card>}
   */

  /**
   * A reference to the cards that are currently discarded and not part of the deck.
   * 
   * @property {Array<Card>}
   */

  /**
   * The shuffle methods available for use.
   * 
   * @property {any}
   */

  /**
   * @param {Object} [options]
   * @param {number} [options.maxCardCount=Infinity] The maximum number of cards that can be in this deck.
   */
  function Deckbuilder(options) {
    _classCallCheck(this, Deckbuilder);

    _defineProperty(this, "options", void 0);

    _defineProperty(this, "deck", []);

    _defineProperty(this, "count", 0);

    _defineProperty(this, "drawn", []);

    _defineProperty(this, "discarded", []);

    _defineProperty(this, "SHUFFLE_METHODS", {
      STRIP: _shuffle.strip,
      FISHERYATES: _shuffle.fisherYates
    });

    this.options = new _Options["default"](options);
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


  _createClass(Deckbuilder, [{
    key: "add",
    value: function add(cards) {
      var shuffleIn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (!Array.isArray(cards)) cards = [cards];

      var _iterator = _createForOfIteratorHelper(cards),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _card = _step.value;

          if (!_card.id) {
            console.warn('Card is missing the id property, skipping...');
            continue;
          }

          if (this.count === this.options.maxCardCount) {
            console.warn('The maximum amount of cards for this deck has been reached');
            return this;
          }

          if (shuffleIn) {
            var randomPosition = Math.floor(Math.random() * this.deck.length);
            this.deck.splice(randomPosition, 0, _card);
          } else this.deck.push(_card);

          this.count++;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
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

  }, {
    key: "remove",
    value: function remove(ids) {
      if (!Array.isArray(ids)) ids = [ids];
      this.deck = this.deck.filter(function (card) {
        return !ids.includes(card.id);
      });
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

  }, {
    key: "edit",
    value: function edit(id, key) {
      var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      var _iterator2 = _createForOfIteratorHelper(this.deck),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _card2 = _step2.value;

          if (_card2.id === id) {
            value ? _card2[key] = value : delete _card2[key];
            break;
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
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

  }, {
    key: "shuffle",
    value: function shuffle() {
      var times = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.SHUFFLE_METHODS.FISHERYATES;
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

  }, {
    key: "deal",
    value: function deal(players, cards) {
      var _this = this;

      var allAtOnce = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var deal = {};

      var _deck = (0, _utils.deepCopy)(this.deck);

      var totalCards = players * cards;

      var _loop = function _loop(i, _player) {
        if (_player >= players) _player = 0;
        var currentPlayer = _player + 1;
        if (!deal[currentPlayer]) deal[currentPlayer] = [];
        deal[currentPlayer].push(_this.deck[i]);

        _this.drawn.push(_this.deck[i]);

        _deck.filter(function (card) {
          if (card.id == _this.deck[i].id) _deck.splice(_deck.indexOf(card), 1);
        });

        player = _player;
      };

      for (var i = 0, player = 0; i < totalCards; ++i, ++player) {
        _loop(i, player);
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

  }, {
    key: "draw",
    value: function draw(cards) {
      var _this2 = this;

      var drawn = [];

      var _deck = (0, _utils.deepCopy)(this.deck);

      var _loop2 = function _loop2(i) {
        _this2.drawn.push(_this2.deck[i]);

        _deck.filter(function (card) {
          if (card.id == _this2.deck[i].id) _deck.splice(_deck.indexOf(card), 1);
        });
      };

      for (var i = 0; i < cards; ++i) {
        _loop2(i);
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

  }, {
    key: "pick",
    value: function pick(ids) {
      if (!Array.isArray(ids)) ids = [ids];
      return this.deck.filter(function (card) {
        return ids.includes(card.id);
      });
    }
    /**
     * 
     * Searches and draws cards from the deck
     * 
     * @param criteria search criteria
     * @param max maximum number of cards that must match the criteria. If specified and reached, further cards will not be considered
     * @param min minimum number of cards that must match the criteria. If not reached, no card will be drawn
     * @returns cards matching the criteria (if min is satisfied), up to max (if specified)
     */

  }, {
    key: "search",
    value: function search(criteria, max, min) {
      if (!min) min = 1;
      if (!max) max = Infinity;
      var matches = [];

      for (var i = 0; i < this.deck.length; ++i) {
        if (matches.length >= max) continue;

        if (criteria(this.deck[i], i, this.deck)) {
          matches.push(this.deck[i]);
        }
      }

      if (matches.length >= min) {
        this.drawn = [].concat(_toConsumableArray(this.drawn), matches);
        this.deck = this.deck.filter(function (card) {
          return !matches.map(function (card) {
            return card.id;
          }).includes(card.id);
        });
        return matches;
      }

      return [];
    }
    /**
     * Discards any number of cards from the draw pile and optionally from the deck.
     * 
     * @param {string|Array<string>} ids The id or ids of the cards to discard.
     * @param {boolean} [checkDeck=false] If set to true, it will also check the deck for cards it can discard and not just the drawn pile.
     * 
     * @returns {Deckbuilder} Returns this for chaining.
     */

  }, {
    key: "discard",
    value: function discard(ids) {
      var checkDeck = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (!Array.isArray(ids)) ids = [ids];
      this.discarded = this.drawn.filter(function (card) {
        return ids.includes(card.id);
      });
      this.drawn = this.drawn.filter(function (card) {
        return !ids.includes(card.id);
      });

      if (checkDeck) {
        this.discarded = this.discarded.concat(this.deck.filter(function (card) {
          return ids.includes(card.id);
        }));
        this.deck = this.deck.filter(function (card) {
          return !ids.includes(card.id);
        });
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

  }, {
    key: "returnDrawn",
    value: function returnDrawn() {
      var cards = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      if (!Array.isArray(cards)) cards = [cards];

      if (cards.length === 0) {
        this.deck = this.deck.concat(this.drawn);
        this.drawn = [];
        return this;
      }

      var cardsToReturn = this.drawn.filter(function (card) {
        return cards.includes(card.id);
      });
      this.deck = this.deck.concat(cardsToReturn);
      this.drawn = this.drawn.filter(function (card) {
        return !cards.includes(card.id);
      });
      return this;
    }
    /**
     * Returns cards from the discarded pile back to the deck.
     *
     * @param {string|Array<string>} [cards] By default all cards from the discarded pile will be returned, this option can be used to return only certain cards from the discarded pile.
     *  
     * @returns {Deckbuilder} Returns this for chaining.
     */

  }, {
    key: "returnDiscarded",
    value: function returnDiscarded() {
      var cards = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      if (!Array.isArray(cards)) cards = [cards];

      if (cards.length === 0) {
        this.deck = this.deck.concat(this.discarded);
        this.discarded = [];
        return this;
      }

      var cardsToReturn = this.discarded.filter(function (card) {
        return cards.includes(card.id);
      });
      this.deck = this.deck.concat(cardsToReturn);
      this.discarded = this.discarded.filter(function (card) {
        return !cards.includes(card.id);
      });
      return this;
    }
  }]);

  return Deckbuilder;
}();

exports["default"] = Deckbuilder;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJEZWNrYnVpbGRlciIsIm9wdGlvbnMiLCJTVFJJUCIsInN0cmlwIiwiRklTSEVSWUFURVMiLCJmaXNoZXJZYXRlcyIsIk9wdGlvbnMiLCJjYXJkcyIsInNodWZmbGVJbiIsIkFycmF5IiwiaXNBcnJheSIsImNhcmQiLCJpZCIsImNvbnNvbGUiLCJ3YXJuIiwiY291bnQiLCJtYXhDYXJkQ291bnQiLCJyYW5kb21Qb3NpdGlvbiIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImRlY2siLCJsZW5ndGgiLCJzcGxpY2UiLCJwdXNoIiwiaWRzIiwiZmlsdGVyIiwiaW5jbHVkZXMiLCJrZXkiLCJ2YWx1ZSIsInRpbWVzIiwibWV0aG9kIiwiU0hVRkZMRV9NRVRIT0RTIiwicGxheWVycyIsImFsbEF0T25jZSIsImRlYWwiLCJfZGVjayIsInRvdGFsQ2FyZHMiLCJpIiwicGxheWVyIiwiY3VycmVudFBsYXllciIsImRyYXduIiwiaW5kZXhPZiIsImNyaXRlcmlhIiwibWF4IiwibWluIiwiSW5maW5pdHkiLCJtYXRjaGVzIiwibWFwIiwiY2hlY2tEZWNrIiwiZGlzY2FyZGVkIiwiY29uY2F0IiwiY2FyZHNUb1JldHVybiJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUFLQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFPQTs7O0lBR3FCQSxXO0FBRW5COzs7Ozs7QUFPQTs7Ozs7O0FBT0E7Ozs7OztBQU9BOzs7Ozs7QUFPQTs7Ozs7O0FBT0E7Ozs7OztBQVVBOzs7O0FBSUEsdUJBQVlDLE9BQVosRUFBOEI7QUFBQTs7QUFBQTs7QUFBQSxrQ0FyQ1YsRUFxQ1U7O0FBQUEsbUNBOUJkLENBOEJjOztBQUFBLG1DQXZCVCxFQXVCUzs7QUFBQSx1Q0FoQkwsRUFnQks7O0FBQUEsNkNBVFA7QUFDckJDLE1BQUFBLEtBQUssRUFBRUMsY0FEYztBQUVyQkMsTUFBQUEsV0FBVyxFQUFFQztBQUZRLEtBU087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RCIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgQ2FyZCBmcm9tICcuL2ludGVyZmFjZXMvQ2FyZCc7XG5pbXBvcnQgRGVhbCBmcm9tICcuL2ludGVyZmFjZXMvRGVhbCc7XG5cbmltcG9ydCBPcHRpb25zIGZyb20gJy4vb3B0aW9ucy9PcHRpb25zJztcbmltcG9ydCB7IGRlZXBDb3B5IH0gZnJvbSAnLi91dGlscy91dGlscyc7XG5pbXBvcnQgeyBmaXNoZXJZYXRlcywgc3RyaXAgfSBmcm9tICcuL3V0aWxzL3NodWZmbGUnO1xuXG50eXBlIENyaXRlcmlhID0gXG4gIHwgKChjYXJkOiBDYXJkKSA9PiBib29sZWFuKVxuICB8ICgoY2FyZDogQ2FyZCwgaW5kZXg6IG51bWJlcikgPT4gYm9vbGVhbilcbiAgfCAoKGNhcmQ6IENhcmQsIGluZGV4OiBudW1iZXIsIGFycmF5OiBBcnJheTxDYXJkPikgPT4gYm9vbGVhbik7XG5cbi8qKlxuICogRGVja2J1aWxkZXIgaGVscHMgeW91IGNyZWF0ZSBhbmQgbWFuYWdlIGNhciBkZWNrcyBmb3IgYW55IHR5cGUgb2YgY2FyZCBnYW1lLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZWNrYnVpbGRlciB7XG5cbiAgLyoqXG4gICAqIEEgcmVmZXJlbmNlIHRvIHRoZSBvcHRpb25zIGZvciB0aGlzIGluc3RhbmNlLlxuICAgKiBcbiAgICogQHByb3BlcnR5IHtPcHRpb25zfVxuICAgKi9cbiAgb3B0aW9uczogT3B0aW9ucztcblxuICAvKipcbiAgICogQSByZWZlcmVuY2UgdG8gdGhlIGN1cnJlbnQgZGVjayBvZiBjYXJkcy5cbiAgICogXG4gICAqIEBwcm9wZXJ0eSB7QXJyYXk8Q2FyZD59XG4gICAqL1xuICBkZWNrOiBBcnJheTxDYXJkPiA9IFtdO1xuXG4gIC8qKlxuICAgKiBUaGUgdG90YWwgbnVtYmVyIG9mIGNhcmRzIGluIHRoaXMgZGVjay5cbiAgICogXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxuICAgKi9cbiAgY291bnQ6IG51bWJlciA9IDA7XG5cbiAgLyoqXG4gICAqIEEgcmVmZXJlbmNlIHRvIHRoZSBjYXJkcyB0aGF0IGFyZSBjdXJyZW50bHkgZHJhd24gb3V0IGFuZCBub3QgYSBwYXJ0IG9mIHRoZSBkZWNrLlxuICAgKiBcbiAgICogQHByb3BlcnR5IHtBcnJheTxDYXJkPn1cbiAgICovXG4gIGRyYXduOiBBcnJheTxDYXJkPiA9IFtdO1xuXG4gIC8qKlxuICAgKiBBIHJlZmVyZW5jZSB0byB0aGUgY2FyZHMgdGhhdCBhcmUgY3VycmVudGx5IGRpc2NhcmRlZCBhbmQgbm90IHBhcnQgb2YgdGhlIGRlY2suXG4gICAqIFxuICAgKiBAcHJvcGVydHkge0FycmF5PENhcmQ+fVxuICAgKi9cbiAgZGlzY2FyZGVkOiBBcnJheTxDYXJkPiA9IFtdO1xuXG4gIC8qKlxuICAgKiBUaGUgc2h1ZmZsZSBtZXRob2RzIGF2YWlsYWJsZSBmb3IgdXNlLlxuICAgKiBcbiAgICogQHByb3BlcnR5IHthbnl9XG4gICAqL1xuICBTSFVGRkxFX01FVEhPRFM6IGFueSA9IHtcbiAgICBTVFJJUDogc3RyaXAsXG4gICAgRklTSEVSWUFURVM6IGZpc2hlcllhdGVzLFxuICB9O1xuXG4gIC8qKlxuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5tYXhDYXJkQ291bnQ9SW5maW5pdHldIFRoZSBtYXhpbXVtIG51bWJlciBvZiBjYXJkcyB0aGF0IGNhbiBiZSBpbiB0aGlzIGRlY2suXG4gICAqL1xuICBjb25zdHJ1Y3RvcihvcHRpb25zPzogT2JqZWN0KSB7XG5cbiAgICB0aGlzLm9wdGlvbnMgPSBuZXcgT3B0aW9ucyhvcHRpb25zKTtcblxuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgb25lIG9yIG1vcmUgY2FyZHMgdG8gdGhlIGRlY2suXG4gICAqIFxuICAgKiBBIGNhcmQgbXVzdCBiZSBhbiBvYmplY3QgYW5kIGl0IGNhbiBoYXZlIGFueSBwcm9wZXJ0aWVzIHRoYXQgc3VpdCB5b3VyIG5lZWRzIGJ1dCBhdCB0aGUgdmVyeSBsZWFzdCBpdCBuZWVkcyBhbiBpZCB0aGF0IERlY2tidWlsZGVyXG4gICAqIGNhbiB1c2UgdG8ga2VlcCB0cmFjayBvZiB0aGUgY2FyZC5cbiAgICogXG4gICAqIEBwYXJhbSB7Q2FyZCB8IEFycmF5PENhcmQ+fSBjYXJkcyBPbmUgb3IgbW9yZSBjYXJkcyB0byBhZGQgdG8gdGhlIGRlY2suXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW3NodWZmbGVJbj1mYWxzZV0gSWYgdGhpcyBpcyBzZXQgdG8gdHJ1ZSwgdGhlIGNhcmQgd2lsbCBiZSBpbnNlcnRlZCBpbnRvIGEgcmFuZG9tIHBvc2l0aW9uIGluIHRoZSBkZWNrIGluc3RlYWQgb2YgYmVpbmcgYWRkZWQgdG8gdGhlIGJvdHRvbS5cbiAgICogXG4gICAqIEByZXR1cm5zIHtEZWNrYnVpbGRlcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cbiAgICovXG4gIGFkZChjYXJkczogKENhcmQgfCBBcnJheTxDYXJkPiksIHNodWZmbGVJbjogYm9vbGVhbiA9IGZhbHNlKTogRGVja2J1aWxkZXIge1xuXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGNhcmRzKSkgY2FyZHMgPSBbY2FyZHNdO1xuXG4gICAgZm9yIChjb25zdCBjYXJkIG9mIGNhcmRzKSB7XG5cbiAgICAgIGlmICghY2FyZC5pZCkge1xuXG4gICAgICAgIGNvbnNvbGUud2FybignQ2FyZCBpcyBtaXNzaW5nIHRoZSBpZCBwcm9wZXJ0eSwgc2tpcHBpbmcuLi4nKTtcbiAgICAgICAgY29udGludWU7XG5cbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuY291bnQgPT09IHRoaXMub3B0aW9ucy5tYXhDYXJkQ291bnQpIHtcblxuICAgICAgICBjb25zb2xlLndhcm4oJ1RoZSBtYXhpbXVtIGFtb3VudCBvZiBjYXJkcyBmb3IgdGhpcyBkZWNrIGhhcyBiZWVuIHJlYWNoZWQnKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIH1cblxuICAgICAgaWYgKHNodWZmbGVJbikge1xuXG4gICAgICAgIGNvbnN0IHJhbmRvbVBvc2l0aW9uOiBudW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLmRlY2subGVuZ3RoKTtcblxuICAgICAgICB0aGlzLmRlY2suc3BsaWNlKHJhbmRvbVBvc2l0aW9uLCAwLCBjYXJkKTtcblxuICAgICAgfSBlbHNlIHRoaXMuZGVjay5wdXNoKGNhcmQpO1xuXG4gICAgICB0aGlzLmNvdW50Kys7XG5cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcblxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBvbmUgb3IgbW9yZSBjYXJkcyBmcm9tIHRoZSBkZWNrLlxuICAgKiBcbiAgICogVGhlIGNhcmQgb3IgY2FyZHMgdG8gYmUgcmVtb3ZlZCBuZWVkIHRvIGJlIHJlZmVyZW5jZWQgYnkgdGhlaXIgaWQgcHJvcGVydHkuXG4gICAqIFxuICAgKiBAcGFyYW0ge3N0cmluZ3xBcnJheTxzdHJpbmc+fSBpZHMgVGhlIGlkIG9yIGlkcyBvZiB0aGUgY2FyZHMgdG8gcmVtb3ZlIGZyb20gdGhlIGRlY2suXG4gICAqIFxuICAgKiBAcmV0dXJucyB7RGVja2J1aWxkZXJ9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXG4gICAqL1xuICByZW1vdmUoaWRzOiAoc3RyaW5nIHwgQXJyYXk8c3RyaW5nPikpOiBEZWNrYnVpbGRlciB7XG5cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoaWRzKSkgaWRzID0gW2lkc107XG5cbiAgICB0aGlzLmRlY2sgPSB0aGlzLmRlY2suZmlsdGVyKGNhcmQgPT4gIWlkcy5pbmNsdWRlcyhjYXJkLmlkKSk7XG5cbiAgICByZXR1cm4gdGhpcztcblxuICB9XG5cbiAgLyoqXG4gICAqIEVkaXRzIGEgY2FyZCdzIHByb3BlcnRpZXMgZnJvbSB0aGUgZGVjay5cbiAgICogXG4gICAqIFRvIGRlZmluZSBhIG5ldyBwcm9wZXJ0eSwganVzdCBzZXQgYSBuZXcga2V5IGFuZCB2YWx1ZS4gVG8gZWRpdCBhIHByb3BlcnR5LCBkZWZpbmUgdGhlIGtleSB0byBlZGl0IGFuZCB0aGUgbmV3IHZhbHVlIHRvIHNldCBmb3IgdGhhdCBrZXkuIFRvXG4gICAqIHJlbW92ZSBhIHByb3BlcnR5LCBkZWZpbmUgdGhlIGtleSB0byBkZWxldGUuXG4gICAqIFxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgVGhlIGlkIG9mIHRoZSBjYXJkIHRvIGVkaXQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIGFkZCwgZWRpdCwgb3IgcmVtb3ZlLlxuICAgKiBAcGFyYW0ge2FueX0gW3ZhbHVlPW51bGxdIFRoZSB2YWx1ZSB0byBhZGQgdG8gdGhlIGtleS4gSWYgcmVtb3ZpbmcgYSBrZXkganVzdCBsZWF2ZSB0aGlzIGJsYW5rLlxuICAgKiBcbiAgICogQHJldHVybnMge0RlY2tidWlsZGVyfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxuICAgKi9cbiAgZWRpdChpZDogc3RyaW5nLCBrZXk6IHN0cmluZywgdmFsdWU6IGFueSA9IG51bGwpOiBEZWNrYnVpbGRlciB7XG5cbiAgICBmb3IgKGNvbnN0IGNhcmQgb2YgdGhpcy5kZWNrKSB7XG5cbiAgICAgIGlmIChjYXJkLmlkID09PSBpZCkge1xuXG4gICAgICAgIHZhbHVlID8gY2FyZFtrZXldID0gdmFsdWUgOiBkZWxldGUgY2FyZFtrZXldO1xuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICB9XG5cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcblxuICB9XG5cbiAgLyoqXG4gICAqIFNodWZmbGVzIHRoZSBkZWNrIHVzaW5nIG9uZSBvZiB0aGUgYXZhaWxhYmxlIHNodWZmbGUgbWV0aG9kcyBhbnkgbnVtYmVyIG9mIHRpbWVzLlxuICAgKiBcbiAgICogQHBhcmFtIHtudW1iZXJ9IFt0aW1lcz0xXSBUaGUgbnVtYmVyIG9mIHRpbWVzIHRvIHNodWZmbGUgdGhlIGRlY2suXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbbWV0aG9kPSdmaXNoZXJZYXRlcyddIFRoZSBtZXRob2QgdG8gdXNlIGZvciBzaHVmZmxpbmcgdGhlIGRlY2suXG4gICAqIFxuICAgKiBAcmV0dXJucyB7RGVja2J1aWxkZXJ9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXG4gICAqL1xuICBzaHVmZmxlKHRpbWVzOiBudW1iZXIgPSAxLCBtZXRob2Q6IEZ1bmN0aW9uID0gdGhpcy5TSFVGRkxFX01FVEhPRFMuRklTSEVSWUFURVMpOiBEZWNrYnVpbGRlciB7XG5cbiAgICB0aGlzLmRlY2sgPSBtZXRob2QodGhpcy5kZWNrLCB0aW1lcyk7XG5cbiAgICByZXR1cm4gdGhpcztcblxuICB9XG5cbiAgLyoqXG4gICAqIERlYWxzIGEgc3BlY2lmaWVkIG51bWJlciBvZiBjYXJkcyBmcm9tIHRoZSBkZWNrIHRvIGEgc3BlY2lmaWVkIG51bWJlciBvZiBwbGF5ZXJzLlxuICAgKiBcbiAgICogVGhlIGNhcmRzIGNhbiBiZSBkZWFsdCBvbmUgYXQgYSB0aW1lIG9yIGFsbCBhdCBvbmNlIGZvciBlYWNoIHBsYXllci5cbiAgICogXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBwbGF5ZXJzIFRoZSBudW1iZXIgb2YgcGxheWVycyB0byBkZWFsIGNhcmRzIHRvLlxuICAgKiBAcGFyYW0ge251bWJlcn0gY2FyZHMgVGhlIGFtb3VudCBvZiBjYXJkcyB0byBkZWFsIHRvIGVhY2ggcGxheWVyLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFthbGxBdE9uY2U9ZmFsc2VdIElmIHNldCB0byB0cnVlLCBhbGwgdGhlIGNhcmRzIHdpbGwgYmUgZGVhbHQgdG8gZWFjaCBwbGF5ZXIgaW5zdGVhZCBvZiBqdXN0IG9uZSBhdCBhIHRpbWUuXG4gICAqIFxuICAgKiBAcmV0dXJucyB7RGVhbH0gUmV0dXJucyBhIERlYWwgb2JqZWN0IGNvbnRhaW5pbmcgdGhlIHBsYXllcnMgYW5kIHRoZSBjYXJkcyB0aGV5IGhhdmUgYmVlbiBkZWFsdC5cbiAgICovXG4gIGRlYWwocGxheWVyczogbnVtYmVyLCBjYXJkczogbnVtYmVyLCBhbGxBdE9uY2U6IGJvb2xlYW4gPSBmYWxzZSk6IERlYWwge1xuXG4gICAgY29uc3QgZGVhbDogRGVhbCA9IHt9O1xuXG4gICAgbGV0IF9kZWNrOiBBcnJheTxDYXJkPiA9IGRlZXBDb3B5KHRoaXMuZGVjayk7XG5cbiAgICBjb25zdCB0b3RhbENhcmRzOiBudW1iZXIgPSBwbGF5ZXJzICogY2FyZHM7XG5cbiAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwLCBwbGF5ZXI6IG51bWJlciA9IDA7IGkgPCB0b3RhbENhcmRzOyArK2ksICsrcGxheWVyKSB7XG5cbiAgICAgIGlmIChwbGF5ZXIgPj0gcGxheWVycykgcGxheWVyID0gMDtcblxuICAgICAgY29uc3QgY3VycmVudFBsYXllcjogbnVtYmVyID0gcGxheWVyICsgMTtcblxuICAgICAgaWYgKCFkZWFsW2N1cnJlbnRQbGF5ZXJdKSBkZWFsW2N1cnJlbnRQbGF5ZXJdID0gW107XG5cbiAgICAgIGRlYWxbY3VycmVudFBsYXllcl0ucHVzaCh0aGlzLmRlY2tbaV0pO1xuXG4gICAgICB0aGlzLmRyYXduLnB1c2godGhpcy5kZWNrW2ldKTtcblxuICAgICAgX2RlY2suZmlsdGVyKGNhcmQgPT4ge1xuXG4gICAgICAgIGlmIChjYXJkLmlkID09IHRoaXMuZGVja1tpXS5pZCkgX2RlY2suc3BsaWNlKF9kZWNrLmluZGV4T2YoY2FyZCksIDEpO1xuXG4gICAgICB9KTtcblxuICAgIH1cblxuICAgIHRoaXMuZGVjayA9IF9kZWNrO1xuXG4gICAgcmV0dXJuIGRlYWw7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBEcmF3IGFueSBudW1iZXIgb2YgY2FyZHMgZnJvbSB0aGUgdG9wIG9mIHRoZSBkZWNrLlxuICAgKiBcbiAgICogQHBhcmFtIHtudW1iZXJ9IGNhcmRzIFRoZSBudW1iZXIgb2YgY2FyZHMgdG8gZHJhdy5cbiAgICogXG4gICAqIEByZXR1cm5zIHtBcnJheTxDYXJkPn0gVGhlIGNhcmRzIHRoYXQgaGF2ZSBiZWVuIGRyYXduLlxuICAgKi9cbiAgZHJhdyhjYXJkczogbnVtYmVyKTogQXJyYXk8Q2FyZD4ge1xuXG4gICAgY29uc3QgZHJhd246IEFycmF5PENhcmQ+ID0gW107XG5cbiAgICBjb25zdCBfZGVjazogQXJyYXk8Q2FyZD4gPSBkZWVwQ29weSh0aGlzLmRlY2spO1xuXG4gICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8IGNhcmRzOyArK2kpIHtcblxuICAgICAgdGhpcy5kcmF3bi5wdXNoKHRoaXMuZGVja1tpXSk7XG5cbiAgICAgIF9kZWNrLmZpbHRlcihjYXJkID0+IHsgaWYgKGNhcmQuaWQgPT0gdGhpcy5kZWNrW2ldLmlkKSBfZGVjay5zcGxpY2UoX2RlY2suaW5kZXhPZihjYXJkKSwgMSk7IH0pO1xuXG4gICAgfVxuXG4gICAgdGhpcy5kZWNrID0gX2RlY2s7XG5cbiAgICByZXR1cm4gZHJhd247XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBQaWNrIG9uZSBvciBtb3JlIGNhcmRzIGZyb20gdGhlIGRlY2sgYnkgdGhlaXIgaWQvaWRzLlxuICAgKiBcbiAgICogQHBhcmFtIHtzdHJpbmd8QXJyYXk8c3RyaW5nPn0gaWRzIFRoZSBpZCBvciBpZHMgb2YgdGhlIGNhcmRzIHRvIHBpY2suXG4gICAqIFxuICAgKiBAcmV0dXJucyB7QXJyYXk8Q2FyZD59IFJldHVybnMgdGhlIHBpY2tlZCBjYXJkcy5cbiAgICovXG4gIHBpY2soaWRzOiAoc3RyaW5nIHwgQXJyYXk8c3RyaW5nPikpOiBBcnJheTxDYXJkPiB7XG5cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoaWRzKSkgaWRzID0gW2lkc107XG5cbiAgICByZXR1cm4gdGhpcy5kZWNrLmZpbHRlcihjYXJkID0+IGlkcy5pbmNsdWRlcyhjYXJkLmlkKSk7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBcbiAgICogU2VhcmNoZXMgYW5kIGRyYXdzIGNhcmRzIGZyb20gdGhlIGRlY2tcbiAgICogXG4gICAqIEBwYXJhbSBjcml0ZXJpYSBzZWFyY2ggY3JpdGVyaWFcbiAgICogQHBhcmFtIG1heCBtYXhpbXVtIG51bWJlciBvZiBjYXJkcyB0aGF0IG11c3QgbWF0Y2ggdGhlIGNyaXRlcmlhLiBJZiBzcGVjaWZpZWQgYW5kIHJlYWNoZWQsIGZ1cnRoZXIgY2FyZHMgd2lsbCBub3QgYmUgY29uc2lkZXJlZFxuICAgKiBAcGFyYW0gbWluIG1pbmltdW0gbnVtYmVyIG9mIGNhcmRzIHRoYXQgbXVzdCBtYXRjaCB0aGUgY3JpdGVyaWEuIElmIG5vdCByZWFjaGVkLCBubyBjYXJkIHdpbGwgYmUgZHJhd25cbiAgICogQHJldHVybnMgY2FyZHMgbWF0Y2hpbmcgdGhlIGNyaXRlcmlhIChpZiBtaW4gaXMgc2F0aXNmaWVkKSwgdXAgdG8gbWF4IChpZiBzcGVjaWZpZWQpXG4gICAqL1xuICBzZWFyY2goY3JpdGVyaWE6IENyaXRlcmlhLCBtYXg/OiBudW1iZXIsIG1pbj86IG51bWJlcik6IEFycmF5PENhcmQ+IHtcblxuICAgIGlmICghbWluKSBtaW4gPSAxO1xuICAgIGlmICghbWF4KSBtYXggPSBJbmZpbml0eTtcblxuICAgIGNvbnN0IG1hdGNoZXM6IEFycmF5PENhcmQ+ID0gW107XG5cbiAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgdGhpcy5kZWNrLmxlbmd0aDsgKytpKSB7XG5cbiAgICAgIGlmIChtYXRjaGVzLmxlbmd0aCA+PSBtYXgpIGNvbnRpbnVlO1xuXG4gICAgICBpZiAoY3JpdGVyaWEodGhpcy5kZWNrW2ldLCBpLCB0aGlzLmRlY2spKSB7XG4gICAgICAgIG1hdGNoZXMucHVzaCh0aGlzLmRlY2tbaV0pO1xuICAgICAgfVxuXG4gICAgfVxuXG4gICAgaWYgKG1hdGNoZXMubGVuZ3RoID49IG1pbikge1xuICAgICAgdGhpcy5kcmF3biA9IFsuLi50aGlzLmRyYXduLCAuLi5tYXRjaGVzXTtcbiAgICAgIHRoaXMuZGVjayA9IHRoaXMuZGVjay5maWx0ZXIoY2FyZCA9PiAhbWF0Y2hlcy5tYXAoY2FyZCA9PiBjYXJkLmlkKS5pbmNsdWRlcyhjYXJkLmlkKSk7XG4gICAgICByZXR1cm4gbWF0Y2hlcztcbiAgICB9XG5cbiAgICByZXR1cm4gW107XG5cbiAgfSBcblxuICAvKipcbiAgICogRGlzY2FyZHMgYW55IG51bWJlciBvZiBjYXJkcyBmcm9tIHRoZSBkcmF3IHBpbGUgYW5kIG9wdGlvbmFsbHkgZnJvbSB0aGUgZGVjay5cbiAgICogXG4gICAqIEBwYXJhbSB7c3RyaW5nfEFycmF5PHN0cmluZz59IGlkcyBUaGUgaWQgb3IgaWRzIG9mIHRoZSBjYXJkcyB0byBkaXNjYXJkLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtjaGVja0RlY2s9ZmFsc2VdIElmIHNldCB0byB0cnVlLCBpdCB3aWxsIGFsc28gY2hlY2sgdGhlIGRlY2sgZm9yIGNhcmRzIGl0IGNhbiBkaXNjYXJkIGFuZCBub3QganVzdCB0aGUgZHJhd24gcGlsZS5cbiAgICogXG4gICAqIEByZXR1cm5zIHtEZWNrYnVpbGRlcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cbiAgICovXG4gIGRpc2NhcmQoaWRzOiAoc3RyaW5nIHwgQXJyYXk8c3RyaW5nPiksIGNoZWNrRGVjazogYm9vbGVhbiA9IGZhbHNlKTogRGVja2J1aWxkZXIge1xuXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGlkcykpIGlkcyA9IFtpZHNdO1xuXG4gICAgdGhpcy5kaXNjYXJkZWQgPSB0aGlzLmRyYXduLmZpbHRlcihjYXJkID0+IGlkcy5pbmNsdWRlcyhjYXJkLmlkKSk7XG5cbiAgICB0aGlzLmRyYXduID0gdGhpcy5kcmF3bi5maWx0ZXIoY2FyZCA9PiAhaWRzLmluY2x1ZGVzKGNhcmQuaWQpKTtcblxuICAgIGlmIChjaGVja0RlY2spIHtcblxuICAgICAgdGhpcy5kaXNjYXJkZWQgPSB0aGlzLmRpc2NhcmRlZC5jb25jYXQodGhpcy5kZWNrLmZpbHRlcihjYXJkID0+IGlkcy5pbmNsdWRlcyhjYXJkLmlkKSkpO1xuXG4gICAgICB0aGlzLmRlY2sgPSB0aGlzLmRlY2suZmlsdGVyKGNhcmQgPT4gIWlkcy5pbmNsdWRlcyhjYXJkLmlkKSk7XG5cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcblxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgY2FyZHMgZnJvbSB0aGUgZHJhd24gcGlsZSBiYWNrIHRvIHRoZSBkZWNrLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ3xBcnJheTxzdHJpbmc+fSBbY2FyZHNdIEJ5IGRlZmF1bHQgYWxsIGNhcmRzIGZyb20gdGhlIGRyYXcgcGlsZSB3aWxsIGJlIHJldHVybmVkLCB0aGlzIG9wdGlvbiBjYW4gYmUgdXNlZCB0byByZXR1cm4gb25seSBjZXJ0YWluIGNhcmRzIGZyb20gdGhlIGRyYXduIHBpbGUuXG4gICAqICBcbiAgICogQHJldHVybnMge0RlY2tidWlsZGVyfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxuICAgKi9cbiAgcmV0dXJuRHJhd24oY2FyZHM6IChhbnkgfCBBcnJheTxzdHJpbmc+KSA9IFtdKTogRGVja2J1aWxkZXIge1xuXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGNhcmRzKSkgY2FyZHMgPSBbY2FyZHNdO1xuXG4gICAgaWYgKGNhcmRzLmxlbmd0aCA9PT0gMCkge1xuXG4gICAgICB0aGlzLmRlY2sgPSB0aGlzLmRlY2suY29uY2F0KHRoaXMuZHJhd24pO1xuXG4gICAgICB0aGlzLmRyYXduID0gW107XG5cbiAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfVxuXG4gICAgY29uc3QgY2FyZHNUb1JldHVybiA9IHRoaXMuZHJhd24uZmlsdGVyKGNhcmQgPT4gY2FyZHMuaW5jbHVkZXMoY2FyZC5pZCkpO1xuXG4gICAgdGhpcy5kZWNrID0gdGhpcy5kZWNrLmNvbmNhdChjYXJkc1RvUmV0dXJuKTtcblxuICAgIHRoaXMuZHJhd24gPSB0aGlzLmRyYXduLmZpbHRlcihjYXJkID0+ICFjYXJkcy5pbmNsdWRlcyhjYXJkLmlkKSk7XG5cbiAgICByZXR1cm4gdGhpcztcblxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgY2FyZHMgZnJvbSB0aGUgZGlzY2FyZGVkIHBpbGUgYmFjayB0byB0aGUgZGVjay5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd8QXJyYXk8c3RyaW5nPn0gW2NhcmRzXSBCeSBkZWZhdWx0IGFsbCBjYXJkcyBmcm9tIHRoZSBkaXNjYXJkZWQgcGlsZSB3aWxsIGJlIHJldHVybmVkLCB0aGlzIG9wdGlvbiBjYW4gYmUgdXNlZCB0byByZXR1cm4gb25seSBjZXJ0YWluIGNhcmRzIGZyb20gdGhlIGRpc2NhcmRlZCBwaWxlLlxuICAgKiAgXG4gICAqIEByZXR1cm5zIHtEZWNrYnVpbGRlcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cbiAgICovXG4gIHJldHVybkRpc2NhcmRlZChjYXJkczogKGFueSB8IEFycmF5PHN0cmluZz4pID0gW10pOiBEZWNrYnVpbGRlciB7XG5cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoY2FyZHMpKSBjYXJkcyA9IFtjYXJkc107XG5cbiAgICBpZiAoY2FyZHMubGVuZ3RoID09PSAwKSB7XG5cbiAgICAgIHRoaXMuZGVjayA9IHRoaXMuZGVjay5jb25jYXQodGhpcy5kaXNjYXJkZWQpO1xuXG4gICAgICB0aGlzLmRpc2NhcmRlZCA9IFtdO1xuXG4gICAgICByZXR1cm4gdGhpcztcblxuICAgIH1cblxuICAgIGNvbnN0IGNhcmRzVG9SZXR1cm4gPSB0aGlzLmRpc2NhcmRlZC5maWx0ZXIoY2FyZCA9PiBjYXJkcy5pbmNsdWRlcyhjYXJkLmlkKSk7XG5cbiAgICB0aGlzLmRlY2sgPSB0aGlzLmRlY2suY29uY2F0KGNhcmRzVG9SZXR1cm4pO1xuXG4gICAgdGhpcy5kaXNjYXJkZWQgPSB0aGlzLmRpc2NhcmRlZC5maWx0ZXIoY2FyZCA9PiAhY2FyZHMuaW5jbHVkZXMoY2FyZC5pZCkpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgfVxuXG59Il19