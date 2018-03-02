const Card = require('./card');

class Hand {
  constructor(cards) {
    this.cards = cards;
  }

  hit(card) {
    currentCards = this.cards;
    this.cards = currentCards.push(card);
  }

  aceCount() {
    cards = this.cards;
    aces = cards.filter(card => { return card.rank === 'A'; });
    return aces.length;
  }

  value() {
    cards = this.cards;
    acesLowTotal = cards.reduce((accumulator, currentCard) => total + value);
  }
}

module.exports = Hand;
