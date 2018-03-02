const Card = require('../../app/models/card');
const Deck = require('../../app/models/deck');

describe('Deck', () => {
  let deck;

  beforeEach(() => {
    deck = new Deck();
  });

  describe('new Deck()', () => {
    it('creates a new deck of 52 cards', () => {
      expect(deck).toBeDefined();
      expect(deck.cards.length).toEqual(52);
    });
  });

  describe('#buildDeck()', () => {
    it('creates a new deck in order', () => {
      deck.buildDeck();
      expect(deck.cards.length).toEqual(52);

      expect(deck.cards[0].rank).toEqual('2');
      expect(deck.cards[0].suit).toEqual('♦');

      expect(deck.cards[21].rank).toEqual('10');
      expect(deck.cards[21].suit).toEqual('♣');

      expect(deck.cards[51].rank).toEqual('A');
      expect(deck.cards[51].suit).toEqual('♥');
    });
  });

  describe('#shuffle()', () => {
    it('shuffles the cards in the deck', () => {
      deck.shuffle();
      expect(deck.cards.length).toEqual(52);
    });
  });

  describe('#deal()', () => {
    it('deals the specified number of cards', () => {
      const Cards = deck.deal(2);
      expect(deck.cards.length).toEqual(50);
      expect(Cards[0]).toEqual(jasmine.any(Card));
    });
  });
});
