class Card {
  constructor(rank, suit) {
    this.rank = rank;
    this.suit = suit;
  }

  initialValue() {
    if (this.rank === 'A') {
      return 1;
    }
    else if (this.rank === "K" || this.rank === "Q" || this.rank == "J") {
      return 10;
    }
    else {
      return +(this.rank);
    }
  }
}

module.exports = Card;
