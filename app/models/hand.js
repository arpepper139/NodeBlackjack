const Card = require('./card');

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
    return (aceCount > 0 && baseTotal < 12) ? true : false;
  }

  value() {
    let cards = this.cards;
    let baseTotal = cards.reduce((acc, card) => acc + card.baseValue(), 0);
    let highAce = this.highAceCheck(this.aceCount(), baseTotal);
    let value = highAce ? (baseTotal + 10) : baseTotal
    return value;
  }
}

module.exports = Hand;
