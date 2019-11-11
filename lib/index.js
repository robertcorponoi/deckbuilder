'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Options = _interopRequireDefault(require("./options/Options"));

var _utils = require("./utils/utils");

var _shuffle = require("./utils/shuffle");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Deckbuilder helps you create and manage car decks for any type of card game.
 */
var Deckbuilder =
/*#__PURE__*/
function () {
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
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = cards[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var card = _step.value;

          if (!card.id) {
            console.warn('Card is missing the id property, skipping...');
            continue;
          }

          if (this.count === this.options.maxCardCount) {
            console.warn('The maximum amount of cards for this deck has been reached');
            return this;
          }

          if (shuffleIn) {
            var randomPosition = Math.floor(Math.random() * this.deck.length);
            this.deck.splice(randomPosition, 0, card);
          } else this.deck.push(card);

          this.count++;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
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
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.deck[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var card = _step2.value;

          if (card.id === id) {
            value ? card[key] = value : delete card[key];
            break;
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJEZWNrYnVpbGRlciIsIm9wdGlvbnMiLCJTVFJJUCIsInN0cmlwIiwiRklTSEVSWUFURVMiLCJmaXNoZXJZYXRlcyIsIk9wdGlvbnMiLCJjYXJkcyIsInNodWZmbGVJbiIsIkFycmF5IiwiaXNBcnJheSIsImNhcmQiLCJpZCIsImNvbnNvbGUiLCJ3YXJuIiwiY291bnQiLCJtYXhDYXJkQ291bnQiLCJyYW5kb21Qb3NpdGlvbiIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImRlY2siLCJsZW5ndGgiLCJzcGxpY2UiLCJwdXNoIiwiaWRzIiwiZmlsdGVyIiwiaW5jbHVkZXMiLCJrZXkiLCJ2YWx1ZSIsInRpbWVzIiwibWV0aG9kIiwiU0hVRkZMRV9NRVRIT0RTIiwicGxheWVycyIsImFsbEF0T25jZSIsImRlYWwiLCJfZGVjayIsInRvdGFsQ2FyZHMiLCJpIiwicGxheWVyIiwiY3VycmVudFBsYXllciIsImRyYXduIiwiaW5kZXhPZiIsImNoZWNrRGVjayIsImRpc2NhcmRlZCIsImNvbmNhdCIsImNhcmRzVG9SZXR1cm4iXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FBS0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBOzs7SUFHcUJBLFc7OztBQUVuQjs7Ozs7O0FBT0E7Ozs7OztBQU9BOzs7Ozs7QUFPQTs7Ozs7O0FBT0E7Ozs7OztBQU9BOzs7Ozs7QUFVQTs7OztBQUlBLHVCQUFZQyxPQUFaLEVBQThCO0FBQUE7O0FBQUE7O0FBQUEsa0NBckNWLEVBcUNVOztBQUFBLG1DQTlCZCxDQThCYzs7QUFBQSxtQ0F2QlQsRUF1QlM7O0FBQUEsdUNBaEJMLEVBZ0JLOztBQUFBLDZDQVRQO0FBQ3JCQyxNQUFBQSxLQUFLLEVBQUVDLGNBRGM7QUFFckJDLE1BQUFBLFdBQVcsRUFBRUM7QUFGUSxLQVNPOztBQUU1QixTQUFLSixPQUFMLEdBQWUsSUFBSUssbUJBQUosQ0FBWUwsT0FBWixDQUFmO0FBRUQ7QUFFRDs7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QUFmLElBQUk7QUFBQSxlQUFJLENBQUNKLEtBQUssQ0FBQ29CLFFBQU4sQ0FBZWhCLElBQUksQ0FBQ0MsRUFBcEIsQ0FBTDtBQUFBLE9BQTFCLENBQWpCO0FBRUEsYUFBTyxJQUFQO0FBRUQiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcclxuXHJcbmltcG9ydCBDYXJkIGZyb20gJy4vaW50ZXJmYWNlcy9DYXJkJztcclxuaW1wb3J0IERlYWwgZnJvbSAnLi9pbnRlcmZhY2VzL0RlYWwnO1xyXG5cclxuaW1wb3J0IE9wdGlvbnMgZnJvbSAnLi9vcHRpb25zL09wdGlvbnMnO1xyXG5pbXBvcnQgeyBkZWVwQ29weSB9IGZyb20gJy4vdXRpbHMvdXRpbHMnO1xyXG5pbXBvcnQgeyBmaXNoZXJZYXRlcywgc3RyaXAgfSBmcm9tICcuL3V0aWxzL3NodWZmbGUnO1xyXG5cclxuLyoqXHJcbiAqIERlY2tidWlsZGVyIGhlbHBzIHlvdSBjcmVhdGUgYW5kIG1hbmFnZSBjYXIgZGVja3MgZm9yIGFueSB0eXBlIG9mIGNhcmQgZ2FtZS5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERlY2tidWlsZGVyIHtcclxuXHJcbiAgLyoqXHJcbiAgICogQSByZWZlcmVuY2UgdG8gdGhlIG9wdGlvbnMgZm9yIHRoaXMgaW5zdGFuY2UuXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtPcHRpb25zfVxyXG4gICAqL1xyXG4gIG9wdGlvbnM6IE9wdGlvbnM7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgcmVmZXJlbmNlIHRvIHRoZSBjdXJyZW50IGRlY2sgb2YgY2FyZHMuXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtBcnJheTxDYXJkPn1cclxuICAgKi9cclxuICBkZWNrOiBBcnJheTxDYXJkPiA9IFtdO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgdG90YWwgbnVtYmVyIG9mIGNhcmRzIGluIHRoaXMgZGVjay5cclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgKi9cclxuICBjb3VudDogbnVtYmVyID0gMDtcclxuXHJcbiAgLyoqXHJcbiAgICogQSByZWZlcmVuY2UgdG8gdGhlIGNhcmRzIHRoYXQgYXJlIGN1cnJlbnRseSBkcmF3biBvdXQgYW5kIG5vdCBhIHBhcnQgb2YgdGhlIGRlY2suXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtBcnJheTxDYXJkPn1cclxuICAgKi9cclxuICBkcmF3bjogQXJyYXk8Q2FyZD4gPSBbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogQSByZWZlcmVuY2UgdG8gdGhlIGNhcmRzIHRoYXQgYXJlIGN1cnJlbnRseSBkaXNjYXJkZWQgYW5kIG5vdCBwYXJ0IG9mIHRoZSBkZWNrLlxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7QXJyYXk8Q2FyZD59XHJcbiAgICovXHJcbiAgZGlzY2FyZGVkOiBBcnJheTxDYXJkPiA9IFtdO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgc2h1ZmZsZSBtZXRob2RzIGF2YWlsYWJsZSBmb3IgdXNlLlxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7YW55fVxyXG4gICAqL1xyXG4gIFNIVUZGTEVfTUVUSE9EUzogYW55ID0ge1xyXG4gICAgU1RSSVA6IHN0cmlwLFxyXG4gICAgRklTSEVSWUFURVM6IGZpc2hlcllhdGVzLFxyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cclxuICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMubWF4Q2FyZENvdW50PUluZmluaXR5XSBUaGUgbWF4aW11bSBudW1iZXIgb2YgY2FyZHMgdGhhdCBjYW4gYmUgaW4gdGhpcyBkZWNrLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM/OiBPYmplY3QpIHtcclxuXHJcbiAgICB0aGlzLm9wdGlvbnMgPSBuZXcgT3B0aW9ucyhvcHRpb25zKTtcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGRzIG9uZSBvciBtb3JlIGNhcmRzIHRvIHRoZSBkZWNrLlxyXG4gICAqIFxyXG4gICAqIEEgY2FyZCBtdXN0IGJlIGFuIG9iamVjdCBhbmQgaXQgY2FuIGhhdmUgYW55IHByb3BlcnRpZXMgdGhhdCBzdWl0IHlvdXIgbmVlZHMgYnV0IGF0IHRoZSB2ZXJ5IGxlYXN0IGl0IG5lZWRzIGFuIGlkIHRoYXQgRGVja2J1aWxkZXJcclxuICAgKiBjYW4gdXNlIHRvIGtlZXAgdHJhY2sgb2YgdGhlIGNhcmQuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtDYXJkIHwgQXJyYXk8Q2FyZD59IGNhcmRzIE9uZSBvciBtb3JlIGNhcmRzIHRvIGFkZCB0byB0aGUgZGVjay5cclxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtzaHVmZmxlSW49ZmFsc2VdIElmIHRoaXMgaXMgc2V0IHRvIHRydWUsIHRoZSBjYXJkIHdpbGwgYmUgaW5zZXJ0ZWQgaW50byBhIHJhbmRvbSBwb3NpdGlvbiBpbiB0aGUgZGVjayBpbnN0ZWFkIG9mIGJlaW5nIGFkZGVkIHRvIHRoZSBib3R0b20uXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge0RlY2tidWlsZGVyfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIGFkZChjYXJkczogKENhcmQgfCBBcnJheTxDYXJkPiksIHNodWZmbGVJbjogYm9vbGVhbiA9IGZhbHNlKTogRGVja2J1aWxkZXIge1xyXG5cclxuICAgIGlmICghQXJyYXkuaXNBcnJheShjYXJkcykpIGNhcmRzID0gW2NhcmRzXTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IGNhcmQgb2YgY2FyZHMpIHtcclxuXHJcbiAgICAgIGlmICghY2FyZC5pZCkge1xyXG5cclxuICAgICAgICBjb25zb2xlLndhcm4oJ0NhcmQgaXMgbWlzc2luZyB0aGUgaWQgcHJvcGVydHksIHNraXBwaW5nLi4uJyk7XHJcbiAgICAgICAgY29udGludWU7XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodGhpcy5jb3VudCA9PT0gdGhpcy5vcHRpb25zLm1heENhcmRDb3VudCkge1xyXG5cclxuICAgICAgICBjb25zb2xlLndhcm4oJ1RoZSBtYXhpbXVtIGFtb3VudCBvZiBjYXJkcyBmb3IgdGhpcyBkZWNrIGhhcyBiZWVuIHJlYWNoZWQnKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChzaHVmZmxlSW4pIHtcclxuXHJcbiAgICAgICAgY29uc3QgcmFuZG9tUG9zaXRpb246IG51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuZGVjay5sZW5ndGgpO1xyXG5cclxuICAgICAgICB0aGlzLmRlY2suc3BsaWNlKHJhbmRvbVBvc2l0aW9uLCAwLCBjYXJkKTtcclxuXHJcbiAgICAgIH0gZWxzZSB0aGlzLmRlY2sucHVzaChjYXJkKTtcclxuXHJcbiAgICAgIHRoaXMuY291bnQrKztcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlIG9uZSBvciBtb3JlIGNhcmRzIGZyb20gdGhlIGRlY2suXHJcbiAgICogXHJcbiAgICogVGhlIGNhcmQgb3IgY2FyZHMgdG8gYmUgcmVtb3ZlZCBuZWVkIHRvIGJlIHJlZmVyZW5jZWQgYnkgdGhlaXIgaWQgcHJvcGVydHkuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtzdHJpbmd8QXJyYXk8c3RyaW5nPn0gaWRzIFRoZSBpZCBvciBpZHMgb2YgdGhlIGNhcmRzIHRvIHJlbW92ZSBmcm9tIHRoZSBkZWNrLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtEZWNrYnVpbGRlcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICByZW1vdmUoaWRzOiAoc3RyaW5nIHwgQXJyYXk8c3RyaW5nPikpOiBEZWNrYnVpbGRlciB7XHJcblxyXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGlkcykpIGlkcyA9IFtpZHNdO1xyXG5cclxuICAgIHRoaXMuZGVjayA9IHRoaXMuZGVjay5maWx0ZXIoY2FyZCA9PiAhaWRzLmluY2x1ZGVzKGNhcmQuaWQpKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBFZGl0cyBhIGNhcmQncyBwcm9wZXJ0aWVzIGZyb20gdGhlIGRlY2suXHJcbiAgICogXHJcbiAgICogVG8gZGVmaW5lIGEgbmV3IHByb3BlcnR5LCBqdXN0IHNldCBhIG5ldyBrZXkgYW5kIHZhbHVlLiBUbyBlZGl0IGEgcHJvcGVydHksIGRlZmluZSB0aGUga2V5IHRvIGVkaXQgYW5kIHRoZSBuZXcgdmFsdWUgdG8gc2V0IGZvciB0aGF0IGtleS4gVG9cclxuICAgKiByZW1vdmUgYSBwcm9wZXJ0eSwgZGVmaW5lIHRoZSBrZXkgdG8gZGVsZXRlLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZCBUaGUgaWQgb2YgdGhlIGNhcmQgdG8gZWRpdC5cclxuICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byBhZGQsIGVkaXQsIG9yIHJlbW92ZS5cclxuICAgKiBAcGFyYW0ge2FueX0gW3ZhbHVlPW51bGxdIFRoZSB2YWx1ZSB0byBhZGQgdG8gdGhlIGtleS4gSWYgcmVtb3ZpbmcgYSBrZXkganVzdCBsZWF2ZSB0aGlzIGJsYW5rLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtEZWNrYnVpbGRlcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBlZGl0KGlkOiBzdHJpbmcsIGtleTogc3RyaW5nLCB2YWx1ZTogYW55ID0gbnVsbCk6IERlY2tidWlsZGVyIHtcclxuXHJcbiAgICBmb3IgKGNvbnN0IGNhcmQgb2YgdGhpcy5kZWNrKSB7XHJcblxyXG4gICAgICBpZiAoY2FyZC5pZCA9PT0gaWQpIHtcclxuXHJcbiAgICAgICAgdmFsdWUgPyBjYXJkW2tleV0gPSB2YWx1ZSA6IGRlbGV0ZSBjYXJkW2tleV07XHJcblxyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTaHVmZmxlcyB0aGUgZGVjayB1c2luZyBvbmUgb2YgdGhlIGF2YWlsYWJsZSBzaHVmZmxlIG1ldGhvZHMgYW55IG51bWJlciBvZiB0aW1lcy5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge251bWJlcn0gW3RpbWVzPTFdIFRoZSBudW1iZXIgb2YgdGltZXMgdG8gc2h1ZmZsZSB0aGUgZGVjay5cclxuICAgKiBAcGFyYW0ge3N0cmluZ30gW21ldGhvZD0nZmlzaGVyWWF0ZXMnXSBUaGUgbWV0aG9kIHRvIHVzZSBmb3Igc2h1ZmZsaW5nIHRoZSBkZWNrLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtEZWNrYnVpbGRlcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBzaHVmZmxlKHRpbWVzOiBudW1iZXIgPSAxLCBtZXRob2Q6IEZ1bmN0aW9uID0gdGhpcy5TSFVGRkxFX01FVEhPRFMuRklTSEVSWUFURVMpOiBEZWNrYnVpbGRlciB7XHJcblxyXG4gICAgdGhpcy5kZWNrID0gbWV0aG9kKHRoaXMuZGVjaywgdGltZXMpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERlYWxzIGEgc3BlY2lmaWVkIG51bWJlciBvZiBjYXJkcyBmcm9tIHRoZSBkZWNrIHRvIGEgc3BlY2lmaWVkIG51bWJlciBvZiBwbGF5ZXJzLlxyXG4gICAqIFxyXG4gICAqIFRoZSBjYXJkcyBjYW4gYmUgZGVhbHQgb25lIGF0IGEgdGltZSBvciBhbGwgYXQgb25jZSBmb3IgZWFjaCBwbGF5ZXIuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHBsYXllcnMgVGhlIG51bWJlciBvZiBwbGF5ZXJzIHRvIGRlYWwgY2FyZHMgdG8uXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGNhcmRzIFRoZSBhbW91bnQgb2YgY2FyZHMgdG8gZGVhbCB0byBlYWNoIHBsYXllci5cclxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFthbGxBdE9uY2U9ZmFsc2VdIElmIHNldCB0byB0cnVlLCBhbGwgdGhlIGNhcmRzIHdpbGwgYmUgZGVhbHQgdG8gZWFjaCBwbGF5ZXIgaW5zdGVhZCBvZiBqdXN0IG9uZSBhdCBhIHRpbWUuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge0RlYWx9IFJldHVybnMgYSBEZWFsIG9iamVjdCBjb250YWluaW5nIHRoZSBwbGF5ZXJzIGFuZCB0aGUgY2FyZHMgdGhleSBoYXZlIGJlZW4gZGVhbHQuXHJcbiAgICovXHJcbiAgZGVhbChwbGF5ZXJzOiBudW1iZXIsIGNhcmRzOiBudW1iZXIsIGFsbEF0T25jZTogYm9vbGVhbiA9IGZhbHNlKTogRGVhbCB7XHJcblxyXG4gICAgY29uc3QgZGVhbDogRGVhbCA9IHt9O1xyXG5cclxuICAgIGxldCBfZGVjazogQXJyYXk8Q2FyZD4gPSBkZWVwQ29weSh0aGlzLmRlY2spO1xyXG5cclxuICAgIGNvbnN0IHRvdGFsQ2FyZHM6IG51bWJlciA9IHBsYXllcnMgKiBjYXJkcztcclxuXHJcbiAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwLCBwbGF5ZXI6IG51bWJlciA9IDA7IGkgPCB0b3RhbENhcmRzOyArK2ksICsrcGxheWVyKSB7XHJcblxyXG4gICAgICBpZiAocGxheWVyID49IHBsYXllcnMpIHBsYXllciA9IDA7XHJcblxyXG4gICAgICBjb25zdCBjdXJyZW50UGxheWVyOiBudW1iZXIgPSBwbGF5ZXIgKyAxO1xyXG5cclxuICAgICAgaWYgKCFkZWFsW2N1cnJlbnRQbGF5ZXJdKSBkZWFsW2N1cnJlbnRQbGF5ZXJdID0gW107XHJcblxyXG4gICAgICBkZWFsW2N1cnJlbnRQbGF5ZXJdLnB1c2godGhpcy5kZWNrW2ldKTtcclxuXHJcbiAgICAgIHRoaXMuZHJhd24ucHVzaCh0aGlzLmRlY2tbaV0pO1xyXG5cclxuICAgICAgX2RlY2suZmlsdGVyKGNhcmQgPT4ge1xyXG5cclxuICAgICAgICBpZiAoY2FyZC5pZCA9PSB0aGlzLmRlY2tbaV0uaWQpIF9kZWNrLnNwbGljZShfZGVjay5pbmRleE9mKGNhcmQpLCAxKTtcclxuXHJcbiAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmRlY2sgPSBfZGVjaztcclxuXHJcbiAgICByZXR1cm4gZGVhbDtcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEcmF3IGFueSBudW1iZXIgb2YgY2FyZHMgZnJvbSB0aGUgdG9wIG9mIHRoZSBkZWNrLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBjYXJkcyBUaGUgbnVtYmVyIG9mIGNhcmRzIHRvIGRyYXcuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge0FycmF5PENhcmQ+fSBUaGUgY2FyZHMgdGhhdCBoYXZlIGJlZW4gZHJhd24uXHJcbiAgICovXHJcbiAgZHJhdyhjYXJkczogbnVtYmVyKTogQXJyYXk8Q2FyZD4ge1xyXG5cclxuICAgIGNvbnN0IGRyYXduOiBBcnJheTxDYXJkPiA9IFtdO1xyXG5cclxuICAgIGNvbnN0IF9kZWNrOiBBcnJheTxDYXJkPiA9IGRlZXBDb3B5KHRoaXMuZGVjayk7XHJcblxyXG4gICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8IGNhcmRzOyArK2kpIHtcclxuXHJcbiAgICAgIHRoaXMuZHJhd24ucHVzaCh0aGlzLmRlY2tbaV0pO1xyXG5cclxuICAgICAgX2RlY2suZmlsdGVyKGNhcmQgPT4geyBpZiAoY2FyZC5pZCA9PSB0aGlzLmRlY2tbaV0uaWQpIF9kZWNrLnNwbGljZShfZGVjay5pbmRleE9mKGNhcmQpLCAxKTsgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZGVjayA9IF9kZWNrO1xyXG5cclxuICAgIHJldHVybiBkcmF3bjtcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQaWNrIG9uZSBvciBtb3JlIGNhcmRzIGZyb20gdGhlIGRlY2sgYnkgdGhlaXIgaWQvaWRzLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfEFycmF5PHN0cmluZz59IGlkcyBUaGUgaWQgb3IgaWRzIG9mIHRoZSBjYXJkcyB0byBwaWNrLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtBcnJheTxDYXJkPn0gUmV0dXJucyB0aGUgcGlja2VkIGNhcmRzLlxyXG4gICAqL1xyXG4gIHBpY2soaWRzOiAoc3RyaW5nIHwgQXJyYXk8c3RyaW5nPikpOiBBcnJheTxDYXJkPiB7XHJcblxyXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGlkcykpIGlkcyA9IFtpZHNdO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmRlY2suZmlsdGVyKGNhcmQgPT4gaWRzLmluY2x1ZGVzKGNhcmQuaWQpKTtcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEaXNjYXJkcyBhbnkgbnVtYmVyIG9mIGNhcmRzIGZyb20gdGhlIGRyYXcgcGlsZSBhbmQgb3B0aW9uYWxseSBmcm9tIHRoZSBkZWNrLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfEFycmF5PHN0cmluZz59IGlkcyBUaGUgaWQgb3IgaWRzIG9mIHRoZSBjYXJkcyB0byBkaXNjYXJkLlxyXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2NoZWNrRGVjaz1mYWxzZV0gSWYgc2V0IHRvIHRydWUsIGl0IHdpbGwgYWxzbyBjaGVjayB0aGUgZGVjayBmb3IgY2FyZHMgaXQgY2FuIGRpc2NhcmQgYW5kIG5vdCBqdXN0IHRoZSBkcmF3biBwaWxlLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtEZWNrYnVpbGRlcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBkaXNjYXJkKGlkczogKHN0cmluZyB8IEFycmF5PHN0cmluZz4pLCBjaGVja0RlY2s6IGJvb2xlYW4gPSBmYWxzZSk6IERlY2tidWlsZGVyIHtcclxuXHJcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoaWRzKSkgaWRzID0gW2lkc107XHJcblxyXG4gICAgdGhpcy5kaXNjYXJkZWQgPSB0aGlzLmRyYXduLmZpbHRlcihjYXJkID0+IGlkcy5pbmNsdWRlcyhjYXJkLmlkKSk7XHJcblxyXG4gICAgdGhpcy5kcmF3biA9IHRoaXMuZHJhd24uZmlsdGVyKGNhcmQgPT4gIWlkcy5pbmNsdWRlcyhjYXJkLmlkKSk7XHJcblxyXG4gICAgaWYgKGNoZWNrRGVjaykge1xyXG5cclxuICAgICAgdGhpcy5kaXNjYXJkZWQgPSB0aGlzLmRpc2NhcmRlZC5jb25jYXQodGhpcy5kZWNrLmZpbHRlcihjYXJkID0+IGlkcy5pbmNsdWRlcyhjYXJkLmlkKSkpO1xyXG5cclxuICAgICAgdGhpcy5kZWNrID0gdGhpcy5kZWNrLmZpbHRlcihjYXJkID0+ICFpZHMuaW5jbHVkZXMoY2FyZC5pZCkpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIGNhcmRzIGZyb20gdGhlIGRyYXduIHBpbGUgYmFjayB0byB0aGUgZGVjay5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfEFycmF5PHN0cmluZz59IFtjYXJkc10gQnkgZGVmYXVsdCBhbGwgY2FyZHMgZnJvbSB0aGUgZHJhdyBwaWxlIHdpbGwgYmUgcmV0dXJuZWQsIHRoaXMgb3B0aW9uIGNhbiBiZSB1c2VkIHRvIHJldHVybiBvbmx5IGNlcnRhaW4gY2FyZHMgZnJvbSB0aGUgZHJhd24gcGlsZS5cclxuICAgKiAgXHJcbiAgICogQHJldHVybnMge0RlY2tidWlsZGVyfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIHJldHVybkRyYXduKGNhcmRzOiAoYW55IHwgQXJyYXk8c3RyaW5nPikgPSBbXSk6IERlY2tidWlsZGVyIHtcclxuXHJcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoY2FyZHMpKSBjYXJkcyA9IFtjYXJkc107XHJcblxyXG4gICAgaWYgKGNhcmRzLmxlbmd0aCA9PT0gMCkge1xyXG5cclxuICAgICAgdGhpcy5kZWNrID0gdGhpcy5kZWNrLmNvbmNhdCh0aGlzLmRyYXduKTtcclxuXHJcbiAgICAgIHRoaXMuZHJhd24gPSBbXTtcclxuXHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjYXJkc1RvUmV0dXJuID0gdGhpcy5kcmF3bi5maWx0ZXIoY2FyZCA9PiBjYXJkcy5pbmNsdWRlcyhjYXJkLmlkKSk7XHJcblxyXG4gICAgdGhpcy5kZWNrID0gdGhpcy5kZWNrLmNvbmNhdChjYXJkc1RvUmV0dXJuKTtcclxuXHJcbiAgICB0aGlzLmRyYXduID0gdGhpcy5kcmF3bi5maWx0ZXIoY2FyZCA9PiAhY2FyZHMuaW5jbHVkZXMoY2FyZC5pZCkpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgY2FyZHMgZnJvbSB0aGUgZGlzY2FyZGVkIHBpbGUgYmFjayB0byB0aGUgZGVjay5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfEFycmF5PHN0cmluZz59IFtjYXJkc10gQnkgZGVmYXVsdCBhbGwgY2FyZHMgZnJvbSB0aGUgZGlzY2FyZGVkIHBpbGUgd2lsbCBiZSByZXR1cm5lZCwgdGhpcyBvcHRpb24gY2FuIGJlIHVzZWQgdG8gcmV0dXJuIG9ubHkgY2VydGFpbiBjYXJkcyBmcm9tIHRoZSBkaXNjYXJkZWQgcGlsZS5cclxuICAgKiAgXHJcbiAgICogQHJldHVybnMge0RlY2tidWlsZGVyfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIHJldHVybkRpc2NhcmRlZChjYXJkczogKGFueSB8IEFycmF5PHN0cmluZz4pID0gW10pOiBEZWNrYnVpbGRlciB7XHJcblxyXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGNhcmRzKSkgY2FyZHMgPSBbY2FyZHNdO1xyXG5cclxuICAgIGlmIChjYXJkcy5sZW5ndGggPT09IDApIHtcclxuXHJcbiAgICAgIHRoaXMuZGVjayA9IHRoaXMuZGVjay5jb25jYXQodGhpcy5kaXNjYXJkZWQpO1xyXG5cclxuICAgICAgdGhpcy5kaXNjYXJkZWQgPSBbXTtcclxuXHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjYXJkc1RvUmV0dXJuID0gdGhpcy5kaXNjYXJkZWQuZmlsdGVyKGNhcmQgPT4gY2FyZHMuaW5jbHVkZXMoY2FyZC5pZCkpO1xyXG5cclxuICAgIHRoaXMuZGVjayA9IHRoaXMuZGVjay5jb25jYXQoY2FyZHNUb1JldHVybik7XHJcblxyXG4gICAgdGhpcy5kaXNjYXJkZWQgPSB0aGlzLmRpc2NhcmRlZC5maWx0ZXIoY2FyZCA9PiAhY2FyZHMuaW5jbHVkZXMoY2FyZC5pZCkpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG5cclxuICB9XHJcblxyXG59Il19