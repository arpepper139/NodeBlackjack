const Card = require('./card');

const Suits = ['♦', '♣', '♠', '♥'];
const Ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", 'J', 'Q', 'K', 'A'];

class Deck {
  constructor() {
    this.cards = this.buildDeck();
  }

  buildDeck() {
    let cards = [];
    Suits.forEach(suit => {
      Ranks.forEach(rank => {
        let card = new Card(rank, suit);
        cards.push(card);
      });
    });
    return cards;
  }

  shuffle() {
    //Fisher-Yates Shuffle Here
  }

  deal(num) {
    let cards = this.cards.splice(0, num);
    return cards;
  }
}

module.exports = Deck;
