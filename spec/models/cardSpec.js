const Card = require('../../app/models/card');

describe('Card', () => {
  let aceCard,
  faceCard,
  numberCard;

  beforeEach(() => {
    aceCard = new Card('A', '♦');
    faceCard = new Card('K', '♣');
    numberCard = new Card('8', '♥');
  });

  describe('new Card()', () => {
    it('takes a suit and a rank', () => {
      expect(aceCard).toBeDefined();
      expect(aceCard.rank).toEqual('A');
      expect(aceCard.suit).toEqual('♦');
    });
  });

  describe('#baseValue()', () => {
    it('returns 1 for ace cards', () => {
      expect(aceCard.baseValue()).toEqual(1);
    });

    it('returns 10 for face cards', () => {
      expect(faceCard.baseValue()).toEqual(10);
    });

    it('returns the numerical value of number cards', () => {
      expect(numberCard.baseValue()).toEqual(8);
    });
  });
});
