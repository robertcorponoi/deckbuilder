'use strict'

const chai = require('chai');
const Deckbuilder = require('../index');

let deckbuilder;

describe('Returning Cards', () => {

  beforeEach(() => deckbuilder = new Deckbuilder());

  afterEach(() => deckbuilder = null);

  it('should return some drawn cards back to the deck', () => {

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

    deckbuilder.draw(8);

    deckbuilder.returnDrawn([1, 2, 4, 5, 6]);

    chai.expect(deckbuilder.deck.length).to.equal(7);

  });

  it('should return all drawn cards back to the deck', () => {

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

    deckbuilder.draw(8);

    deckbuilder.returnDrawn();

    chai.expect(deckbuilder.deck.length).to.equal(10) && chai.expect(deckbuilder.drawn.length).to.equal(0);

  });

  it('should return some discarded cards back to the deck', () => {

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

    deckbuilder.draw(8);

    deckbuilder.discard([1, 2, 3]);

    deckbuilder.returnDiscarded([1, 2]);

    chai.expect(deckbuilder.deck.length).to.equal(4) && chai.expect(deckbuilder.discarded.length).to.equal(1);

  });

  it('should return all discarded cards back to the deck', () => {

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

    deckbuilder.draw(8);

    deckbuilder.discard([1, 2, 3]);

    deckbuilder.returnDiscarded();

    chai.expect(deckbuilder.deck.length).to.equal(5) && chai.expect(deckbuilder.discarded.length).to.equal(0);

  });

});