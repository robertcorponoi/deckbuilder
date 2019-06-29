'use strict'

const chai = require('chai');
const Deckbuilder = require('../index');

let deckbuilder;

describe('Discarding Cards', () => {

  beforeEach(() => deckbuilder = new Deckbuilder());

  afterEach(() => deckbuilder = null);

  it('should discard 5 out of the 7 drawn cards', () => {

    const cards = [
      { id: 1, value: 10 },
      { id: 2, value: 20 },
      { id: 3, value: 30 },
      { id: 4, value: 40 },
      { id: 5, value: 50 },
      { id: 6, value: 60 },
      { id: 7, value: 70 },
      { id: 8, value: 80 },
      { id: 9, value: 90 },
      { id: 10, value: 100 }
    ];

    deckbuilder.add(cards);

    deckbuilder.draw(7);

    deckbuilder.discard([1, 2, 3, 4, 5]);

    chai.expect(deckbuilder.drawn.length).to.equal(2) && chai.expect(deckbuilder.discarded.length).to.equal(5);

  });

  it('should discard 2 out of 3 drawn cards and 3 out of 7 cards from the deck', () => {

    const cards = [
      { id: 1, value: 10 },
      { id: 2, value: 20 },
      { id: 3, value: 30 },
      { id: 4, value: 40 },
      { id: 5, value: 50 },
      { id: 6, value: 60 },
      { id: 7, value: 70 },
      { id: 8, value: 80 },
      { id: 9, value: 90 },
      { id: 10, value: 100 }
    ];

    deckbuilder.add(cards);

    deckbuilder.draw(3);

    deckbuilder.discard([1, 2, 8, 9, 10], true);

    chai.expect(deckbuilder.drawn.length).to.equal(1) && chai.expect(deckbuilder.deck.length).to.equal(4) && chai.expect(deckbuilder.discarded.length).to.equal(5);

  });

});