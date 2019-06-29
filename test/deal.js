'use strict'

const chai = require('chai');
const Deckbuilder = require('../index');

let deckbuilder;

describe('Dealing Cards', () => {

  beforeEach(() => deckbuilder = new Deckbuilder());

  afterEach(() => deckbuilder = null);

  it('should deal one card to 5 players from the top of the deck', () => {

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

    deckbuilder.deal(5, 1);

    chai.expect(deckbuilder.deck.length).to.equal(5) && chai.expect(deckbuilder.drawn.length).to.equal(5);

  });

  it('should deal three cards to 2 players from the top of the deck', () => {

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

    deckbuilder.deal(2, 3);

    chai.expect(deckbuilder.deck.length).to.equal(4) && chai.expect(deckbuilder.drawn.length).to.equal(6);

  });

});