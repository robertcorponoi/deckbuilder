'use strict'

const chai = require('chai');
const Deckbuilder = require('../index');

// Test the core functionality of Deckbuilder.
describe('Deckbuilder', () => {

  // Test the following aspects of Deckbuilder's card addition functionality:
  // 1. Will not add a card if it does not have an id property.
  // 2. Will not add a card if Deckbuilder is already at max capacity.
  describe('#add()', () => {

    let deckbuilder;

    beforeEach(() => {

      deckbuilder = new Deckbuilder({ maxCardCount: 2 });

    });

    afterEach(() => {

      deckbuilder = null;

    });

    it('should not add a card to the deck because the card is missing an id property', () => {

      const card = {

        name: 'Exhaused StackOverflow Moderator',
        tired: 10

      };

      deckbuilder.add(card);

      chai.expect(deckbuilder.deck.length).to.equal(0);

    });

    it('should add two cards but reject the third card because the maximum limit has been reached', () => {

      const cards = [
        {
          id: 1,
          name: 'Bob'
        },
        {
          id: 2,
          name: 'Joe'
        },
        {
          id: 3,
          name: 'Ashley'
        }
      ];

      deckbuilder.add(cards, true);

      chai.expect(deckbuilder.deck.length).to.equal(2);

    });

  });

  // Test removing cards from the deck.
  describe('#remove()', () => {

    let deckbuilder;

    beforeEach(() => {

      deckbuilder = new Deckbuilder();

    });

    afterEach(() => {

      deckbuilder = null;

    });

    it('should add three cards to the deck and then delete the first and third card and leave the second card in the deck', () => {

      const cards = [
        {
          id: 1,
          name: 'Bob'
        },
        {
          id: 2,
          name: 'Joe'
        },
        {
          id: 3,
          name: 'Ashley'
        }
      ];

      deckbuilder.add(cards);

      deckbuilder.remove([1, 3]);

      chai.expect(deckbuilder.deck[0].id).to.equal(2);

    });

  });

  // Test editing a card's properties.
  describe('#edit()', () => {

    let deckbuilder;

    beforeEach(() => {

      deckbuilder = new Deckbuilder();

    });

    afterEach(() => {

      deckbuilder = null;

    });

    it('should add a card to the deck and then edit it\'s tired value and add two new properties to it', () => {

      const cardToAdd = {

        id: 1,
        name: 'Exhaused StackOverflow Moderator',
        tired: 10

      };

      const cardEdit = {

        tired: 5,
        kungfu: 5,
        baking: 10

      };

      const expectedCard = {

        baking: 10,
        id: 1,
        kungfu: 5,
        name: 'Exhaused StackOverflow Moderator',
        tired: 5,

      };

      deckbuilder.add(cardToAdd);
      deckbuilder.edit(1, cardEdit);

      chai.expect(deckbuilder.deck[0]).to.deep.equal(expectedCard);

    });

    it('should remove the tired property completely from the card', () => {

      const cardToAdd = {

        id: 1,
        name: 'Exhaused StackOverflow Moderator',
        tired: 10

      };

      const expectedCard = {

        id: 1,
        name: 'Exhaused StackOverflow Moderator'

      };

      deckbuilder.add(cardToAdd);
      deckbuilder.edit(1, { tired: null });

      chai.expect(deckbuilder.deck[0]).to.deep.equal(expectedCard);

    });

  });

  // Test shuffling the deck.
  describe('#shuffle()', () => {

    let deckbuilder;

    beforeEach(() => {

      deckbuilder = new Deckbuilder();

    });

    afterEach(() => {

      deckbuilder = null;

    });

    it('should shuffle the deck using the fisher-yates method', () => {

      const cards = [
        {
          id: 1, value: 10
        },
        {
          id: 2, value: 20
        },
        {
          id: 3, value: 30
        },
        {
          id: 4, value: 40
        },
        {
          id: 5, value: 50
        },
        {
          id: 6, value: 60
        }
        ,
        {
          id: 7, value: 70
        }
        ,
        {
          id: 8, value: 80
        }
        ,
        {
          id: 9, value: 90
        }
        ,
        {
          id: 10, value: 100
        }
      ];

      deckbuilder.add(cards);

      deckbuilder.shuffle();

      chai.expect(deckbuilder.deck).to.not.deep.equal(cards);

    });

  });

  // Test the deal method to make sure that:
  // 1. Cards are removed from the deck and placed in the drawn pile.
  // 2. Cards are correctly assigned to each player.
  describe('#deal()', () => {

    let deckbuilder;

    beforeEach(() => {

      deckbuilder = new Deckbuilder();

    });

    afterEach(() => {

      deckbuilder = null;

    });

    it('deal one card to 5 hands from the top of the deck', () => {

      const cards = [
        {
          id: 1, value: 10
        },
        {
          id: 2, value: 20
        },
        {
          id: 3, value: 30
        },
        {
          id: 4, value: 40
        },
        {
          id: 5, value: 50
        },
        {
          id: 6, value: 60
        }
        ,
        {
          id: 7, value: 70
        }
        ,
        {
          id: 8, value: 80
        }
        ,
        {
          id: 9, value: 90
        }
        ,
        {
          id: 10, value: 100
        }
      ];

      deckbuilder.add(cards);

      deckbuilder.deal(5, 1);

      chai.expect(deckbuilder.deck.length).to.equal(5) && chai.expect(deckbuilder.drawn.length).to.equal(5);

    });

    it('deal three cards to 2 hands from the top of the deck', () => {

      const cards = [
        {
          id: 1, value: 10
        },
        {
          id: 2, value: 20
        },
        {
          id: 3, value: 30
        },
        {
          id: 4, value: 40
        },
        {
          id: 5, value: 50
        },
        {
          id: 6, value: 60
        }
        ,
        {
          id: 7, value: 70
        }
        ,
        {
          id: 8, value: 80
        }
        ,
        {
          id: 9, value: 90
        }
        ,
        {
          id: 10, value: 100
        }
      ];

      deckbuilder.add(cards);

      deckbuilder.deal(2, 3);

      chai.expect(deckbuilder.deck.length).to.equal(4) && chai.expect(deckbuilder.drawn.length).to.equal(6);

    });

  });

  // Test drawing cards and making sure they are added to the drawn pile.
  describe('#draw()', () => {

    let deckbuilder;

    beforeEach(() => {

      deckbuilder = new Deckbuilder();

    });

    afterEach(() => {

      deckbuilder = null;

    });

    it('draw 7 cards from the top of the deck', () => {

      const cards = [
        {
          id: 1, value: 10
        },
        {
          id: 2, value: 20
        },
        {
          id: 3, value: 30
        },
        {
          id: 4, value: 40
        },
        {
          id: 5, value: 50
        },
        {
          id: 6, value: 60
        }
        ,
        {
          id: 7, value: 70
        }
        ,
        {
          id: 8, value: 80
        }
        ,
        {
          id: 9, value: 90
        }
        ,
        {
          id: 10, value: 100
        }
      ];

      deckbuilder.add(cards);

      deckbuilder.draw(7);

      chai.expect(deckbuilder.deck.length).to.equal(3) && chai.expect(deckbuilder.drawn.length).to.equal(7);

    });

  });

  // Test discarding cards from the drawn pile and the deck.
  describe('#discard()', () => {

    let deckbuilder;

    beforeEach(() => {

      deckbuilder = new Deckbuilder();

    });

    afterEach(() => {

      deckbuilder = null;

    });

    it('should discard 5 out of the 7 drawn cards', () => {

      const cards = [
        {
          id: 1, value: 10
        },
        {
          id: 2, value: 20
        },
        {
          id: 3, value: 30
        },
        {
          id: 4, value: 40
        },
        {
          id: 5, value: 50
        },
        {
          id: 6, value: 60
        }
        ,
        {
          id: 7, value: 70
        }
        ,
        {
          id: 8, value: 80
        }
        ,
        {
          id: 9, value: 90
        }
        ,
        {
          id: 10, value: 100
        }
      ];

      deckbuilder.add(cards);

      deckbuilder.draw(7);

      deckbuilder.discard([1, 2, 3, 4, 5]);

      chai.expect(deckbuilder.drawn.length).to.equal(2) && chai.expect(deckbuilder.discarded.length).to.equal(5);

    });

    it('should discard 2 out of 3 drawn cards and 3 out of 7 cards from the deck', () => {

      const cards = [
        {
          id: 1, value: 10
        },
        {
          id: 2, value: 20
        },
        {
          id: 3, value: 30
        },
        {
          id: 4, value: 40
        },
        {
          id: 5, value: 50
        },
        {
          id: 6, value: 60
        }
        ,
        {
          id: 7, value: 70
        }
        ,
        {
          id: 8, value: 80
        }
        ,
        {
          id: 9, value: 90
        }
        ,
        {
          id: 10, value: 100
        }
      ];

      deckbuilder.add(cards);

      deckbuilder.draw(3);

      deckbuilder.discard([1, 2, 8, 9, 10], true);

      chai.expect(deckbuilder.drawn.length).to.equal(1) && chai.expect(deckbuilder.deck.length).to.equal(4) && chai.expect(deckbuilder.discarded.length).to.equal(5);

    });

  });

  // Test returning cards from the drawn and discard piles back to the deck.
  describe('#return()', () => {

    let deckbuilder;

    beforeEach(() => {

      deckbuilder = new Deckbuilder();

    });

    afterEach(() => {

      deckbuilder = null;

    });

    it('should return 3 out of 5 drawn cards and 2 out of 3 discarded cards back to the deck', () => {

      const cards = [
        {
          id: 1, value: 10
        },
        {
          id: 2, value: 20
        },
        {
          id: 3, value: 30
        },
        {
          id: 4, value: 40
        },
        {
          id: 5, value: 50
        },
        {
          id: 6, value: 60
        }
        ,
        {
          id: 7, value: 70
        }
        ,
        {
          id: 8, value: 80
        }
        ,
        {
          id: 9, value: 90
        }
        ,
        {
          id: 10, value: 100
        }
      ];

      deckbuilder.add(cards);

      deckbuilder.draw(8);

      deckbuilder.discard([1, 2, 3]);

      deckbuilder.return({ ids: [1, 2, 4, 5, 6] });

      chai.expect(deckbuilder.deck.length).to.equal(7) && chai.expect(deckbuilder.drawn.length).to.equal(2) && chai.expect(deckbuilder.discarded.length).to.equal(1);

    });

    it('should return all drawn and discarded cards back to the deck', () => {

      const cards = [
        {
          id: 1, value: 10
        },
        {
          id: 2, value: 20
        },
        {
          id: 3, value: 30
        },
        {
          id: 4, value: 40
        },
        {
          id: 5, value: 50
        },
        {
          id: 6, value: 60
        }
        ,
        {
          id: 7, value: 70
        }
        ,
        {
          id: 8, value: 80
        }
        ,
        {
          id: 9, value: 90
        }
        ,
        {
          id: 10, value: 100
        }
      ];

      deckbuilder.add(cards);

      deckbuilder.draw(8);

      deckbuilder.discard([1, 2, 3]);

      deckbuilder.return({ drawn: true, discarded: true });

      chai.expect(deckbuilder.deck.length).to.equal(10) && chai.expect(deckbuilder.drawn.length).to.equal(0) && chai.expect(deckbuilder.discarded.length).to.equal(0);

    });

  });

});