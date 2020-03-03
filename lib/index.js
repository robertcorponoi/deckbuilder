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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJEZWNrYnVpbGRlciIsIm9wdGlvbnMiLCJTVFJJUCIsInN0cmlwIiwiRklTSEVSWUFURVMiLCJmaXNoZXJZYXRlcyIsIk9wdGlvbnMiLCJjYXJkcyIsInNodWZmbGVJbiIsIkFycmF5IiwiaXNBcnJheSIsImNhcmQiLCJpZCIsImNvbnNvbGUiLCJ3YXJuIiwiY291bnQiLCJtYXhDYXJkQ291bnQiLCJyYW5kb21Qb3NpdGlvbiIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImRlY2siLCJsZW5ndGgiLCJzcGxpY2UiLCJwdXNoIiwiaWRzIiwiZmlsdGVyIiwiaW5jbHVkZXMiLCJrZXkiLCJ2YWx1ZSIsInRpbWVzIiwibWV0aG9kIiwiU0hVRkZMRV9NRVRIT0RTIiwicGxheWVycyIsImFsbEF0T25jZSIsImRlYWwiLCJfZGVjayIsInRvdGFsQ2FyZHMiLCJpIiwicGxheWVyIiwiY3VycmVudFBsYXllciIsImRyYXduIiwiaW5kZXhPZiIsImNoZWNrRGVjayIsImRpc2NhcmRlZCIsImNvbmNhdCIsImNhcmRzVG9SZXR1cm4iXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FBS0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBOzs7SUFHcUJBLFc7QUFFbkI7Ozs7OztBQU9BOzs7Ozs7QUFPQTs7Ozs7O0FBT0E7Ozs7OztBQU9BOzs7Ozs7QUFPQTs7Ozs7O0FBVUE7Ozs7QUFJQSx1QkFBWUMsT0FBWixFQUE4QjtBQUFBOztBQUFBOztBQUFBLGtDQXJDVixFQXFDVTs7QUFBQSxtQ0E5QmQsQ0E4QmM7O0FBQUEsbUNBdkJULEVBdUJTOztBQUFBLHVDQWhCTCxFQWdCSzs7QUFBQSw2Q0FUUDtBQUNyQkMsTUFBQUEsS0FBSyxFQUFFQyxjQURjO0FBRXJCQyxNQUFBQSxXQUFXLEVBQUVDO0FBRlEsS0FTTzs7QUFFNUIsU0FBS0osT0FBTCxHQUFlLElBQUlLLG1CQUFKLENBQVlMLE9BQVosQ0FBZjtBQUVEO0FBRUQ7Ozs7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ZixJQUFJO0FBQUEsZUFBSSxDQUFDSixLQUFLLENBQUNvQixRQUFOLENBQWVoQixJQUFJLENBQUNDLEVBQXBCLENBQUw7QUFBQSxPQUExQixDQUFqQjtBQUVBLGFBQU8sSUFBUDtBQUVEIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXHJcblxyXG5pbXBvcnQgQ2FyZCBmcm9tICcuL2ludGVyZmFjZXMvQ2FyZCc7XHJcbmltcG9ydCBEZWFsIGZyb20gJy4vaW50ZXJmYWNlcy9EZWFsJztcclxuXHJcbmltcG9ydCBPcHRpb25zIGZyb20gJy4vb3B0aW9ucy9PcHRpb25zJztcclxuaW1wb3J0IHsgZGVlcENvcHkgfSBmcm9tICcuL3V0aWxzL3V0aWxzJztcclxuaW1wb3J0IHsgZmlzaGVyWWF0ZXMsIHN0cmlwIH0gZnJvbSAnLi91dGlscy9zaHVmZmxlJztcclxuXHJcbi8qKlxyXG4gKiBEZWNrYnVpbGRlciBoZWxwcyB5b3UgY3JlYXRlIGFuZCBtYW5hZ2UgY2FyIGRlY2tzIGZvciBhbnkgdHlwZSBvZiBjYXJkIGdhbWUuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZWNrYnVpbGRlciB7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgcmVmZXJlbmNlIHRvIHRoZSBvcHRpb25zIGZvciB0aGlzIGluc3RhbmNlLlxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7T3B0aW9uc31cclxuICAgKi9cclxuICBvcHRpb25zOiBPcHRpb25zO1xyXG5cclxuICAvKipcclxuICAgKiBBIHJlZmVyZW5jZSB0byB0aGUgY3VycmVudCBkZWNrIG9mIGNhcmRzLlxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7QXJyYXk8Q2FyZD59XHJcbiAgICovXHJcbiAgZGVjazogQXJyYXk8Q2FyZD4gPSBbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHRvdGFsIG51bWJlciBvZiBjYXJkcyBpbiB0aGlzIGRlY2suXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICovXHJcbiAgY291bnQ6IG51bWJlciA9IDA7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgcmVmZXJlbmNlIHRvIHRoZSBjYXJkcyB0aGF0IGFyZSBjdXJyZW50bHkgZHJhd24gb3V0IGFuZCBub3QgYSBwYXJ0IG9mIHRoZSBkZWNrLlxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7QXJyYXk8Q2FyZD59XHJcbiAgICovXHJcbiAgZHJhd246IEFycmF5PENhcmQ+ID0gW107XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgcmVmZXJlbmNlIHRvIHRoZSBjYXJkcyB0aGF0IGFyZSBjdXJyZW50bHkgZGlzY2FyZGVkIGFuZCBub3QgcGFydCBvZiB0aGUgZGVjay5cclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge0FycmF5PENhcmQ+fVxyXG4gICAqL1xyXG4gIGRpc2NhcmRlZDogQXJyYXk8Q2FyZD4gPSBbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHNodWZmbGUgbWV0aG9kcyBhdmFpbGFibGUgZm9yIHVzZS5cclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge2FueX1cclxuICAgKi9cclxuICBTSFVGRkxFX01FVEhPRFM6IGFueSA9IHtcclxuICAgIFNUUklQOiBzdHJpcCxcclxuICAgIEZJU0hFUllBVEVTOiBmaXNoZXJZYXRlcyxcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm1heENhcmRDb3VudD1JbmZpbml0eV0gVGhlIG1heGltdW0gbnVtYmVyIG9mIGNhcmRzIHRoYXQgY2FuIGJlIGluIHRoaXMgZGVjay5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihvcHRpb25zPzogT2JqZWN0KSB7XHJcblxyXG4gICAgdGhpcy5vcHRpb25zID0gbmV3IE9wdGlvbnMob3B0aW9ucyk7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkcyBvbmUgb3IgbW9yZSBjYXJkcyB0byB0aGUgZGVjay5cclxuICAgKiBcclxuICAgKiBBIGNhcmQgbXVzdCBiZSBhbiBvYmplY3QgYW5kIGl0IGNhbiBoYXZlIGFueSBwcm9wZXJ0aWVzIHRoYXQgc3VpdCB5b3VyIG5lZWRzIGJ1dCBhdCB0aGUgdmVyeSBsZWFzdCBpdCBuZWVkcyBhbiBpZCB0aGF0IERlY2tidWlsZGVyXHJcbiAgICogY2FuIHVzZSB0byBrZWVwIHRyYWNrIG9mIHRoZSBjYXJkLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7Q2FyZCB8IEFycmF5PENhcmQ+fSBjYXJkcyBPbmUgb3IgbW9yZSBjYXJkcyB0byBhZGQgdG8gdGhlIGRlY2suXHJcbiAgICogQHBhcmFtIHtib29sZWFufSBbc2h1ZmZsZUluPWZhbHNlXSBJZiB0aGlzIGlzIHNldCB0byB0cnVlLCB0aGUgY2FyZCB3aWxsIGJlIGluc2VydGVkIGludG8gYSByYW5kb20gcG9zaXRpb24gaW4gdGhlIGRlY2sgaW5zdGVhZCBvZiBiZWluZyBhZGRlZCB0byB0aGUgYm90dG9tLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtEZWNrYnVpbGRlcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBhZGQoY2FyZHM6IChDYXJkIHwgQXJyYXk8Q2FyZD4pLCBzaHVmZmxlSW46IGJvb2xlYW4gPSBmYWxzZSk6IERlY2tidWlsZGVyIHtcclxuXHJcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoY2FyZHMpKSBjYXJkcyA9IFtjYXJkc107XHJcblxyXG4gICAgZm9yIChjb25zdCBjYXJkIG9mIGNhcmRzKSB7XHJcblxyXG4gICAgICBpZiAoIWNhcmQuaWQpIHtcclxuXHJcbiAgICAgICAgY29uc29sZS53YXJuKCdDYXJkIGlzIG1pc3NpbmcgdGhlIGlkIHByb3BlcnR5LCBza2lwcGluZy4uLicpO1xyXG4gICAgICAgIGNvbnRpbnVlO1xyXG5cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHRoaXMuY291bnQgPT09IHRoaXMub3B0aW9ucy5tYXhDYXJkQ291bnQpIHtcclxuXHJcbiAgICAgICAgY29uc29sZS53YXJuKCdUaGUgbWF4aW11bSBhbW91bnQgb2YgY2FyZHMgZm9yIHRoaXMgZGVjayBoYXMgYmVlbiByZWFjaGVkJyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoc2h1ZmZsZUluKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IHJhbmRvbVBvc2l0aW9uOiBudW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLmRlY2subGVuZ3RoKTtcclxuXHJcbiAgICAgICAgdGhpcy5kZWNrLnNwbGljZShyYW5kb21Qb3NpdGlvbiwgMCwgY2FyZCk7XHJcblxyXG4gICAgICB9IGVsc2UgdGhpcy5kZWNrLnB1c2goY2FyZCk7XHJcblxyXG4gICAgICB0aGlzLmNvdW50Kys7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZSBvbmUgb3IgbW9yZSBjYXJkcyBmcm9tIHRoZSBkZWNrLlxyXG4gICAqIFxyXG4gICAqIFRoZSBjYXJkIG9yIGNhcmRzIHRvIGJlIHJlbW92ZWQgbmVlZCB0byBiZSByZWZlcmVuY2VkIGJ5IHRoZWlyIGlkIHByb3BlcnR5LlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfEFycmF5PHN0cmluZz59IGlkcyBUaGUgaWQgb3IgaWRzIG9mIHRoZSBjYXJkcyB0byByZW1vdmUgZnJvbSB0aGUgZGVjay5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7RGVja2J1aWxkZXJ9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgcmVtb3ZlKGlkczogKHN0cmluZyB8IEFycmF5PHN0cmluZz4pKTogRGVja2J1aWxkZXIge1xyXG5cclxuICAgIGlmICghQXJyYXkuaXNBcnJheShpZHMpKSBpZHMgPSBbaWRzXTtcclxuXHJcbiAgICB0aGlzLmRlY2sgPSB0aGlzLmRlY2suZmlsdGVyKGNhcmQgPT4gIWlkcy5pbmNsdWRlcyhjYXJkLmlkKSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRWRpdHMgYSBjYXJkJ3MgcHJvcGVydGllcyBmcm9tIHRoZSBkZWNrLlxyXG4gICAqIFxyXG4gICAqIFRvIGRlZmluZSBhIG5ldyBwcm9wZXJ0eSwganVzdCBzZXQgYSBuZXcga2V5IGFuZCB2YWx1ZS4gVG8gZWRpdCBhIHByb3BlcnR5LCBkZWZpbmUgdGhlIGtleSB0byBlZGl0IGFuZCB0aGUgbmV3IHZhbHVlIHRvIHNldCBmb3IgdGhhdCBrZXkuIFRvXHJcbiAgICogcmVtb3ZlIGEgcHJvcGVydHksIGRlZmluZSB0aGUga2V5IHRvIGRlbGV0ZS5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgVGhlIGlkIG9mIHRoZSBjYXJkIHRvIGVkaXQuXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gYWRkLCBlZGl0LCBvciByZW1vdmUuXHJcbiAgICogQHBhcmFtIHthbnl9IFt2YWx1ZT1udWxsXSBUaGUgdmFsdWUgdG8gYWRkIHRvIHRoZSBrZXkuIElmIHJlbW92aW5nIGEga2V5IGp1c3QgbGVhdmUgdGhpcyBibGFuay5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7RGVja2J1aWxkZXJ9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgZWRpdChpZDogc3RyaW5nLCBrZXk6IHN0cmluZywgdmFsdWU6IGFueSA9IG51bGwpOiBEZWNrYnVpbGRlciB7XHJcblxyXG4gICAgZm9yIChjb25zdCBjYXJkIG9mIHRoaXMuZGVjaykge1xyXG5cclxuICAgICAgaWYgKGNhcmQuaWQgPT09IGlkKSB7XHJcblxyXG4gICAgICAgIHZhbHVlID8gY2FyZFtrZXldID0gdmFsdWUgOiBkZWxldGUgY2FyZFtrZXldO1xyXG5cclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2h1ZmZsZXMgdGhlIGRlY2sgdXNpbmcgb25lIG9mIHRoZSBhdmFpbGFibGUgc2h1ZmZsZSBtZXRob2RzIGFueSBudW1iZXIgb2YgdGltZXMuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IFt0aW1lcz0xXSBUaGUgbnVtYmVyIG9mIHRpbWVzIHRvIHNodWZmbGUgdGhlIGRlY2suXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IFttZXRob2Q9J2Zpc2hlcllhdGVzJ10gVGhlIG1ldGhvZCB0byB1c2UgZm9yIHNodWZmbGluZyB0aGUgZGVjay5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7RGVja2J1aWxkZXJ9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgc2h1ZmZsZSh0aW1lczogbnVtYmVyID0gMSwgbWV0aG9kOiBGdW5jdGlvbiA9IHRoaXMuU0hVRkZMRV9NRVRIT0RTLkZJU0hFUllBVEVTKTogRGVja2J1aWxkZXIge1xyXG5cclxuICAgIHRoaXMuZGVjayA9IG1ldGhvZCh0aGlzLmRlY2ssIHRpbWVzKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZWFscyBhIHNwZWNpZmllZCBudW1iZXIgb2YgY2FyZHMgZnJvbSB0aGUgZGVjayB0byBhIHNwZWNpZmllZCBudW1iZXIgb2YgcGxheWVycy5cclxuICAgKiBcclxuICAgKiBUaGUgY2FyZHMgY2FuIGJlIGRlYWx0IG9uZSBhdCBhIHRpbWUgb3IgYWxsIGF0IG9uY2UgZm9yIGVhY2ggcGxheWVyLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBwbGF5ZXJzIFRoZSBudW1iZXIgb2YgcGxheWVycyB0byBkZWFsIGNhcmRzIHRvLlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBjYXJkcyBUaGUgYW1vdW50IG9mIGNhcmRzIHRvIGRlYWwgdG8gZWFjaCBwbGF5ZXIuXHJcbiAgICogQHBhcmFtIHtib29sZWFufSBbYWxsQXRPbmNlPWZhbHNlXSBJZiBzZXQgdG8gdHJ1ZSwgYWxsIHRoZSBjYXJkcyB3aWxsIGJlIGRlYWx0IHRvIGVhY2ggcGxheWVyIGluc3RlYWQgb2YganVzdCBvbmUgYXQgYSB0aW1lLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtEZWFsfSBSZXR1cm5zIGEgRGVhbCBvYmplY3QgY29udGFpbmluZyB0aGUgcGxheWVycyBhbmQgdGhlIGNhcmRzIHRoZXkgaGF2ZSBiZWVuIGRlYWx0LlxyXG4gICAqL1xyXG4gIGRlYWwocGxheWVyczogbnVtYmVyLCBjYXJkczogbnVtYmVyLCBhbGxBdE9uY2U6IGJvb2xlYW4gPSBmYWxzZSk6IERlYWwge1xyXG5cclxuICAgIGNvbnN0IGRlYWw6IERlYWwgPSB7fTtcclxuXHJcbiAgICBsZXQgX2RlY2s6IEFycmF5PENhcmQ+ID0gZGVlcENvcHkodGhpcy5kZWNrKTtcclxuXHJcbiAgICBjb25zdCB0b3RhbENhcmRzOiBudW1iZXIgPSBwbGF5ZXJzICogY2FyZHM7XHJcblxyXG4gICAgZm9yIChsZXQgaTogbnVtYmVyID0gMCwgcGxheWVyOiBudW1iZXIgPSAwOyBpIDwgdG90YWxDYXJkczsgKytpLCArK3BsYXllcikge1xyXG5cclxuICAgICAgaWYgKHBsYXllciA+PSBwbGF5ZXJzKSBwbGF5ZXIgPSAwO1xyXG5cclxuICAgICAgY29uc3QgY3VycmVudFBsYXllcjogbnVtYmVyID0gcGxheWVyICsgMTtcclxuXHJcbiAgICAgIGlmICghZGVhbFtjdXJyZW50UGxheWVyXSkgZGVhbFtjdXJyZW50UGxheWVyXSA9IFtdO1xyXG5cclxuICAgICAgZGVhbFtjdXJyZW50UGxheWVyXS5wdXNoKHRoaXMuZGVja1tpXSk7XHJcblxyXG4gICAgICB0aGlzLmRyYXduLnB1c2godGhpcy5kZWNrW2ldKTtcclxuXHJcbiAgICAgIF9kZWNrLmZpbHRlcihjYXJkID0+IHtcclxuXHJcbiAgICAgICAgaWYgKGNhcmQuaWQgPT0gdGhpcy5kZWNrW2ldLmlkKSBfZGVjay5zcGxpY2UoX2RlY2suaW5kZXhPZihjYXJkKSwgMSk7XHJcblxyXG4gICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5kZWNrID0gX2RlY2s7XHJcblxyXG4gICAgcmV0dXJuIGRlYWw7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRHJhdyBhbnkgbnVtYmVyIG9mIGNhcmRzIGZyb20gdGhlIHRvcCBvZiB0aGUgZGVjay5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge251bWJlcn0gY2FyZHMgVGhlIG51bWJlciBvZiBjYXJkcyB0byBkcmF3LlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtBcnJheTxDYXJkPn0gVGhlIGNhcmRzIHRoYXQgaGF2ZSBiZWVuIGRyYXduLlxyXG4gICAqL1xyXG4gIGRyYXcoY2FyZHM6IG51bWJlcik6IEFycmF5PENhcmQ+IHtcclxuXHJcbiAgICBjb25zdCBkcmF3bjogQXJyYXk8Q2FyZD4gPSBbXTtcclxuXHJcbiAgICBjb25zdCBfZGVjazogQXJyYXk8Q2FyZD4gPSBkZWVwQ29weSh0aGlzLmRlY2spO1xyXG5cclxuICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCBjYXJkczsgKytpKSB7XHJcblxyXG4gICAgICB0aGlzLmRyYXduLnB1c2godGhpcy5kZWNrW2ldKTtcclxuXHJcbiAgICAgIF9kZWNrLmZpbHRlcihjYXJkID0+IHsgaWYgKGNhcmQuaWQgPT0gdGhpcy5kZWNrW2ldLmlkKSBfZGVjay5zcGxpY2UoX2RlY2suaW5kZXhPZihjYXJkKSwgMSk7IH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmRlY2sgPSBfZGVjaztcclxuXHJcbiAgICByZXR1cm4gZHJhd247XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUGljayBvbmUgb3IgbW9yZSBjYXJkcyBmcm9tIHRoZSBkZWNrIGJ5IHRoZWlyIGlkL2lkcy5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge3N0cmluZ3xBcnJheTxzdHJpbmc+fSBpZHMgVGhlIGlkIG9yIGlkcyBvZiB0aGUgY2FyZHMgdG8gcGljay5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7QXJyYXk8Q2FyZD59IFJldHVybnMgdGhlIHBpY2tlZCBjYXJkcy5cclxuICAgKi9cclxuICBwaWNrKGlkczogKHN0cmluZyB8IEFycmF5PHN0cmluZz4pKTogQXJyYXk8Q2FyZD4ge1xyXG5cclxuICAgIGlmICghQXJyYXkuaXNBcnJheShpZHMpKSBpZHMgPSBbaWRzXTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5kZWNrLmZpbHRlcihjYXJkID0+IGlkcy5pbmNsdWRlcyhjYXJkLmlkKSk7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGlzY2FyZHMgYW55IG51bWJlciBvZiBjYXJkcyBmcm9tIHRoZSBkcmF3IHBpbGUgYW5kIG9wdGlvbmFsbHkgZnJvbSB0aGUgZGVjay5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge3N0cmluZ3xBcnJheTxzdHJpbmc+fSBpZHMgVGhlIGlkIG9yIGlkcyBvZiB0aGUgY2FyZHMgdG8gZGlzY2FyZC5cclxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtjaGVja0RlY2s9ZmFsc2VdIElmIHNldCB0byB0cnVlLCBpdCB3aWxsIGFsc28gY2hlY2sgdGhlIGRlY2sgZm9yIGNhcmRzIGl0IGNhbiBkaXNjYXJkIGFuZCBub3QganVzdCB0aGUgZHJhd24gcGlsZS5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7RGVja2J1aWxkZXJ9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgZGlzY2FyZChpZHM6IChzdHJpbmcgfCBBcnJheTxzdHJpbmc+KSwgY2hlY2tEZWNrOiBib29sZWFuID0gZmFsc2UpOiBEZWNrYnVpbGRlciB7XHJcblxyXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGlkcykpIGlkcyA9IFtpZHNdO1xyXG5cclxuICAgIHRoaXMuZGlzY2FyZGVkID0gdGhpcy5kcmF3bi5maWx0ZXIoY2FyZCA9PiBpZHMuaW5jbHVkZXMoY2FyZC5pZCkpO1xyXG5cclxuICAgIHRoaXMuZHJhd24gPSB0aGlzLmRyYXduLmZpbHRlcihjYXJkID0+ICFpZHMuaW5jbHVkZXMoY2FyZC5pZCkpO1xyXG5cclxuICAgIGlmIChjaGVja0RlY2spIHtcclxuXHJcbiAgICAgIHRoaXMuZGlzY2FyZGVkID0gdGhpcy5kaXNjYXJkZWQuY29uY2F0KHRoaXMuZGVjay5maWx0ZXIoY2FyZCA9PiBpZHMuaW5jbHVkZXMoY2FyZC5pZCkpKTtcclxuXHJcbiAgICAgIHRoaXMuZGVjayA9IHRoaXMuZGVjay5maWx0ZXIoY2FyZCA9PiAhaWRzLmluY2x1ZGVzKGNhcmQuaWQpKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyBjYXJkcyBmcm9tIHRoZSBkcmF3biBwaWxlIGJhY2sgdG8gdGhlIGRlY2suXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ3xBcnJheTxzdHJpbmc+fSBbY2FyZHNdIEJ5IGRlZmF1bHQgYWxsIGNhcmRzIGZyb20gdGhlIGRyYXcgcGlsZSB3aWxsIGJlIHJldHVybmVkLCB0aGlzIG9wdGlvbiBjYW4gYmUgdXNlZCB0byByZXR1cm4gb25seSBjZXJ0YWluIGNhcmRzIGZyb20gdGhlIGRyYXduIHBpbGUuXHJcbiAgICogIFxyXG4gICAqIEByZXR1cm5zIHtEZWNrYnVpbGRlcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICByZXR1cm5EcmF3bihjYXJkczogKGFueSB8IEFycmF5PHN0cmluZz4pID0gW10pOiBEZWNrYnVpbGRlciB7XHJcblxyXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGNhcmRzKSkgY2FyZHMgPSBbY2FyZHNdO1xyXG5cclxuICAgIGlmIChjYXJkcy5sZW5ndGggPT09IDApIHtcclxuXHJcbiAgICAgIHRoaXMuZGVjayA9IHRoaXMuZGVjay5jb25jYXQodGhpcy5kcmF3bik7XHJcblxyXG4gICAgICB0aGlzLmRyYXduID0gW107XHJcblxyXG4gICAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY2FyZHNUb1JldHVybiA9IHRoaXMuZHJhd24uZmlsdGVyKGNhcmQgPT4gY2FyZHMuaW5jbHVkZXMoY2FyZC5pZCkpO1xyXG5cclxuICAgIHRoaXMuZGVjayA9IHRoaXMuZGVjay5jb25jYXQoY2FyZHNUb1JldHVybik7XHJcblxyXG4gICAgdGhpcy5kcmF3biA9IHRoaXMuZHJhd24uZmlsdGVyKGNhcmQgPT4gIWNhcmRzLmluY2x1ZGVzKGNhcmQuaWQpKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIGNhcmRzIGZyb20gdGhlIGRpc2NhcmRlZCBwaWxlIGJhY2sgdG8gdGhlIGRlY2suXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ3xBcnJheTxzdHJpbmc+fSBbY2FyZHNdIEJ5IGRlZmF1bHQgYWxsIGNhcmRzIGZyb20gdGhlIGRpc2NhcmRlZCBwaWxlIHdpbGwgYmUgcmV0dXJuZWQsIHRoaXMgb3B0aW9uIGNhbiBiZSB1c2VkIHRvIHJldHVybiBvbmx5IGNlcnRhaW4gY2FyZHMgZnJvbSB0aGUgZGlzY2FyZGVkIHBpbGUuXHJcbiAgICogIFxyXG4gICAqIEByZXR1cm5zIHtEZWNrYnVpbGRlcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICByZXR1cm5EaXNjYXJkZWQoY2FyZHM6IChhbnkgfCBBcnJheTxzdHJpbmc+KSA9IFtdKTogRGVja2J1aWxkZXIge1xyXG5cclxuICAgIGlmICghQXJyYXkuaXNBcnJheShjYXJkcykpIGNhcmRzID0gW2NhcmRzXTtcclxuXHJcbiAgICBpZiAoY2FyZHMubGVuZ3RoID09PSAwKSB7XHJcblxyXG4gICAgICB0aGlzLmRlY2sgPSB0aGlzLmRlY2suY29uY2F0KHRoaXMuZGlzY2FyZGVkKTtcclxuXHJcbiAgICAgIHRoaXMuZGlzY2FyZGVkID0gW107XHJcblxyXG4gICAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY2FyZHNUb1JldHVybiA9IHRoaXMuZGlzY2FyZGVkLmZpbHRlcihjYXJkID0+IGNhcmRzLmluY2x1ZGVzKGNhcmQuaWQpKTtcclxuXHJcbiAgICB0aGlzLmRlY2sgPSB0aGlzLmRlY2suY29uY2F0KGNhcmRzVG9SZXR1cm4pO1xyXG5cclxuICAgIHRoaXMuZGlzY2FyZGVkID0gdGhpcy5kaXNjYXJkZWQuZmlsdGVyKGNhcmQgPT4gIWNhcmRzLmluY2x1ZGVzKGNhcmQuaWQpKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuXHJcbiAgfVxyXG5cclxufSJdfQ==