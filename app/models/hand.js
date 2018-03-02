let Card = require('./card');

class Hand {
  constructor(cards) {
    this.cards = cards;
  }

  hit(card) {
    this.cards.push(card);
  }

  aceCount() {
    let cards = this.cards;
    let aces = cards.filter(card => { return card.rank === 'A'; });
    return aces.length;
  }

  highAceCheck(aceCount, baseTotal) {
    let total;
    if (aceCount > 0 && baseTotal < 12) {
      total = baseTotal + 10;
    }
    else {
      total = baseTotal;
    }
    return total;
  }

  value() {
    let cards = this.cards;
    let baseTotal = cards.reduce((acc, card) => acc + card.baseValue(), 0);
    let value = this.highAceCheck(this.aceCount(), baseTotal);
    return value;
  }
}

module.exports = Hand;
