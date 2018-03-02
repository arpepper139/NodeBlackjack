let Card = require('../../app/models/card');
let Hand = require('../../app/models/hand');

describe('Hand', () => {
  let aceCard,
  aceCard2,
  faceCard,
  numberCard,
  noAceHand,
  oneAceHand,
  perfectHand,
  twoAceHand;

  beforeEach(() => {
    aceCard = new Card('A', '♦');
    aceCard2 = new Card('A', '♠');
    faceCard = new Card('K', '♣');
    numberCard = new Card('8', '♥');

    noAceHand = new Hand([numberCard, faceCard]);
    oneAceHand = new Hand([aceCard, numberCard]);
    perfectHand = new Hand([aceCard, faceCard]);
    twoAceHand = new Hand([aceCard, aceCard2, faceCard, numberCard]);
  });

  describe('new Hand()', () => {
    it('takes an array of cards', () => {
      expect(noAceHand).toBeDefined();
      expect(noAceHand.cards.length).toEqual(2);
    });
  });

  describe('hit()', () => {
    it('takes a card and adds it to the hand', () => {
      noAceHand.hit(aceCard);
      expect(noAceHand.cards.length).toEqual(3);
    });
  });

  describe('aceCount()', () => {
    it('returns the number of aces in the hand', () => {
      expect(noAceHand.aceCount()).toEqual(0);
      expect(oneAceHand.aceCount()).toEqual(1);
      expect(twoAceHand.aceCount()).toEqual(2);
    });
  });

  describe('highAceCheck()', () => {
    it('checks if the base total is less than 12, and makes one ace high if so', () => {
      expect()
    })
  });

  describe('value()', () => {
    it('returns the value of the hand', () => {
      expect(noAceHand.value()).toEqual(18);
      expect(oneAceHand.value()).toEqual(19);
      expect(perfectHand.value()).toEqual(21);
      expect(twoAceHand.value()).toEqual(20);
    });
  });
});
