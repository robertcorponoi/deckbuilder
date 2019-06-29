'use strict'

const chai = require('chai');
const Deckbuilder = require('../index');

let deckbuilder;

describe('Editing Cards', () => {

  beforeEach(() => deckbuilder = new Deckbuilder());

  afterEach(() => deckbuilder = null);

  it('should add a property to a card', () => {

    const cards = [
      { id: 1, name: 'Bob' },
      { id: 2, name: 'Joe' },
      { id: 3, name: 'Zac' },
    ];

    deckbuilder.add(cards);

    deckbuilder.edit(2, 'kungfu', 10);

    chai.expect(deckbuilder.deck[1].kungfu).to.equal(10);

  });

  it('should edit a property of a card', () => {

    const cards = [
      { id: 1, name: 'Bob' },
      { id: 2, name: 'Joe' },
      { id: 3, name: 'Zac' },
    ];

    deckbuilder.add(cards);

    deckbuilder.edit(2, 'name', 'Schmoe');

    chai.expect(deckbuilder.deck[1].name).to.equal('Schmoe');

  });

  it('should remove a property of a card', () => {

    const cards = [
      { id: 1, name: 'Bob' },
      { id: 2, name: 'Joe' },
      { id: 3, name: 'Zac' },
    ];

    deckbuilder.add(cards);

    deckbuilder.edit(2, 'name');

    chai.expect(deckbuilder.deck[1].name).to.be.undefined;

  });

});