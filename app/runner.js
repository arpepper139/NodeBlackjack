const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const Card = require('./models/card');
const Hand = require('./models/hand');
const Deck = require('./models/deck');

const welcomeMessage = 'Welcome to Blackjack!\n'
const bustMessage = 'Bust! You lose.'

initialHandInfo = (player, hand) => {
  let infoString = '';
  infoString += `${player} was dealt ${hand.cards[0].rank}${hand.cards[0].suit}\n`;
  infoString += `${player} was dealt ${hand.cards[1].rank}${hand.cards[1].suit}\n`;
  infoString += `${player} Score: ${hand.value()}\n`;
  return infoString;
};

hitOrStand = () => {
  rl.question('Hit or stand? (h/s)> ', (answer) => {
    choice = answer.trim().toLowerCase();
    if (choice === 'h' || choice === 's') {
      rl.close();
      return choice;
    }
    else {
      console.log('Sorry! You can only hit or stand.\n')
      hitOrStand();
    }
  });
};




//Game

const deck = new Deck();
deck.shuffle();

const playerHand = new Hand(deck.deal(2));
const computerHand = new Hand(deck.deal(2));

console.log(welcomeMessage);
console.log(initialHandInfo('Player', playerHand));
hitOrStand();
