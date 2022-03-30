'use strict'

const chai = require('chai');
const Deckbuilder = require('../index');

let deckbuilder;

describe('Searching Cards', () => {

  beforeEach(() => deckbuilder = new Deckbuilder());

  afterEach(() => deckbuilder = null);

  it('should draw cards with a value of 30, 40 and 50', () => {

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

    const drawn = deckbuilder.search((card) => card.value === 30 || card.value === 40 || card.value === 50);

    chai.expect(deckbuilder.deck.length).to.equal(7);
    chai.expect(deckbuilder.drawn.length).to.equal(3);

    [drawn, deckbuilder.drawn].map(results => {
      chai.expect(results.length).to.equal(3);
      chai.expect(results).to.deep.include({ id: 3, value: 30 });
      chai.expect(results).to.deep.include({ id: 4, value: 40 });
      chai.expect(results).to.deep.include({ id: 5, value: 50 });
    });

  });

  it('should draw cards with a value of 30, 40 (and not 50) if limited to max=2', () => {

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

    const drawn = deckbuilder.search((card) => card.value === 30 || card.value === 40 || card.value === 50, 2);

    chai.expect(deckbuilder.deck.length).to.equal(8);
    chai.expect(deckbuilder.drawn.length).to.equal(2);

    [drawn, deckbuilder.drawn].map(results => {
      chai.expect(results.length).to.equal(2);
      chai.expect(results).to.deep.include({ id: 3, value: 30 });
      chai.expect(results).to.deep.include({ id: 4, value: 40 });
      chai.expect(results).not.to.deep.include({ id: 5, value: 50 });
    });

  });

  it('should not draw cards if min is not reached', () => {

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

    // there are not 8 cards with a value of 30!
    const drawn = deckbuilder.search((card) => card.value === 30, Infinity, 8);

    chai.expect(deckbuilder.deck.length).to.equal(10);
    chai.expect(deckbuilder.drawn.length).to.equal(0);

    [drawn, deckbuilder.drawn].map(results => {
      chai.expect(results.length).to.equal(0);
    });

  });

});