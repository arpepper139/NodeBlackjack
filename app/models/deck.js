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
    if (this.cards != []) {
      return cards;
    }
    else {
      this.cards = cards;
    }
  }

  shuffle() {
    //Fisher–Yates Shuffle
    let cards = this.cards;
    let lastIndex = cards.length - 1;
    let randomIndex;
    let currentLastCard;

    while(lastIndex >= 0) {
      randomIndex = Math.floor(Math.random() * lastIndex);
      currentLastCard = cards[lastIndex];
      cards[lastIndex] = cards[randomIndex];
      cards[randomIndex] = currentLastCard;
      lastIndex--;
    }
    this.cards = cards;
  }

  deal(num) {
    let cards = this.cards.splice(0, num);
    return cards;
  }
}

module.exports = Deck;
