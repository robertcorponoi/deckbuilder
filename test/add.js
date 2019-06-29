'use strict'

const chai = require('chai');
const Deckbuilder = require('../index');

let deckbuilder;

describe('Adding Cards', () => {

  beforeEach(() => deckbuilder = new Deckbuilder({ maxCardCount: 2 }));

  afterEach(() => deckbuilder = null);

  it('should not let a card without an id be added to the deck', () => {

    const card = { name: 'Exhaused StackOverflow Moderator', tired: 10 };

    deckbuilder.add(card);

    chai.expect(deckbuilder.deck.length).to.equal(0);

  });

  it('should not add a third card to the deck because of the deck size limit', () => {

    const cards = [
      { id: 1, name: 'Bob' },
      { id: 2, name: 'Joe' },
      { id: 3, name: 'Zac' },
    ];

    deckbuilder.add(cards);

    chai.expect(deckbuilder.deck.length).to.equal(2);

  });

});