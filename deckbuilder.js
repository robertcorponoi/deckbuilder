function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var Options =
/**
 * The maximum amount of cards that the deck can contain.
 * 
 * @since 0.1.0
 * 
 * @property {number}
 * 
 * @default Infinity
 */

/**
 * @param {Object} options The initialiation parameters from Deckbuilder.
 */
function Options() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  _classCallCheck(this, Options);

  _defineProperty(this, "maxCardCount", Infinity);

  Object.assign(this, options);
};

/**
 * Clone an object and its properties.
 * 
 * @param {Object} o The object to clone.
 * 
 * @returns {Object} Returns the cloned object.
 */
function deepCopy(o) {
  var out;
  var key;
  var v;
  out = Array.isArray(o) ? [] : {};

  for (key in o) {
    v = o[key];
    out[key] = _typeof(v) === 'object' && v !== null ? deepCopy(v) : v;
  }

  return out;
}

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
function fisherYates(deck) {
  var times = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  while (times > 0) {
    var i = deck.length;
    if (i === 0) return false;

    while (--i) {
      var j = Math.floor(Math.random() * (i + 1));
      var cardI = deck[i];
      var cardJ = deck[j];
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

function strip(deck) {
  var times = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var cutMax = Math.floor(deck.length * (1 / 4));
  var splitNum = randomInt(3, cutMax);

  while (times > -1) {
    var deckSplit = deck.splice(0, splitNum);
    var insertPos = randomInt(0, deck.length);
    var deck1 = deck.slice(0, insertPos);
    var deck2 = deck.slice(insertPos);
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

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Deckbuilder helps you create and manage car decks for any type of card game.
 * 
 * @author Robert Corponoi <robertcorponoi@gmail.com>
 * 
 * @version 1.0.0
 */

var Deckbuilder =
/*#__PURE__*/
function () {
  /**
   * A reference to the options for this instance.
   * 
   * @since 1.0.0
   * 
   * @property {Options}
   */

  /**
   * A reference to the current deck of cards.
   * 
   * @since 0.1.0
   * 
   * @property {Array<Card>}
   */

  /**
   * The total number of cards in this deck.
   * 
   * @since 0.1.0
   * 
   * @property {number}
   */

  /**
   * A reference to the cards that are currently drawn out and not a part of the deck.
   * 
   * @since 0.1.0
   * 
   * @property {Array<Card>}
   */

  /**
   * A reference to the cards that are currently discarded and not part of the deck.
   * 
   * @since 0.1.0
   * 
   * @property {Array<Card>}
   */

  /**
   * The shuffle methods available for use.
   * 
   * @since 0.1.0
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
      STRIP: strip,
      FISHERYATES: fisherYates
    });

    this.options = new Options(options);
  }
  /**
   * Adds one or more cards to the deck.
   * 
   * A card must be an object and it can have any properties that suit your needs but at the very least it needs an id that Deckbuilder
   * can use to keep track of the card.
   * 
   * @since 0.1.0
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
     * @since 0.1.0
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
     * @since 0.1.0
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
     * @since 0.1.0
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
     * @since 0.1.0
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
      var deal = {};

      var _deck = deepCopy(this.deck);

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
     * @since 0.1.0
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

      var _deck = deepCopy(this.deck);

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
     * @since 0.1.0
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
     * @since 0.1.0
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
     * @since 1.0.0
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
     * @since 1.0.0
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

export default Deckbuilder;
