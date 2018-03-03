const Hand = require('./models/hand');
const Deck = require('./models/deck');

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

initialHandInfo = (owner, hand) => {
  let infoString = '';
  infoString += `${owner} first card: ${hand.cards[0].rank}${hand.cards[0].suit}\n`;
  infoString += `${owner} second card: ${hand.cards[1].rank}${hand.cards[1].suit}\n`;
  infoString += `${owner} Score: ${hand.value()}\n`;
  return infoString;
};

playBlackjack = (playerHand, computerHand) => {
  rl.question('Hit or stand? (h/s)> ', (answer) => {
    let choice = answer.trim().toLowerCase();
    if (choice === 'h') {
      playerHits(playerHand, computerHand);
    }
    else if (choice === 's') {
      console.log(initialHandInfo('Dealer\'s', computerHand));
      while (computerHand.value() < 17) {
        computerHits(computerHand);
      }
      determineWinner(playerHand, computerHand);
      rl.close();
    }
    else {
      console.log('Sorry! You can only hit or stand.\n');
      playBlackjack(playerHand, computerHand);
    }
  });
};

updatedHandInfo = (owner, card, hand) => {
  const verb = `${ (owner === 'You') ? 'were' : 'was' }`;
  const possessive = `${ (owner === 'You') ? 'Your' : 'Dealer\'s' }`;
  let newInfoString = '';
  newInfoString += `${owner} ${verb} dealt ${card.rank}${card.suit}\n`;
  newInfoString += `${possessive} Score: ${hand.value()}`;
  return newInfoString;
};

playerHits = (playerHand, computerHand) => {
  let newPlayerCard = deck.deal(1)[0];
  playerHand.hit(newPlayerCard);
  console.log(updatedHandInfo('You', newPlayerCard, playerHand));
  if (playerHand.value() <= 21) {
    playBlackjack(playerHand, computerHand);
  }
  else {
    console.log('Bust: You lose.');
    rl.close();
  }
};

computerHits = (computerHand) => {
  let newComputerCard = deck.deal(1)[0];
  computerHand.hit(newComputerCard);
  console.log(updatedHandInfo('Dealer', newComputerCard, computerHand));
};

determineWinner = (playerHand, computerHand) => {
  let playerScore = playerHand.value();
  let computerScore = computerHand.value();
  if (playerScore > computerScore || computerScore > 21) {
    console.log('Congrats! You win!');
  }
  else if (playerScore === computerScore) {
    console.log('Push!');
  }
  else {
    console.log('Dealer Wins.');
  }
};

//Game
const deck = new Deck();
deck.shuffle();

const playerHand = new Hand(deck.deal(2));
const computerHand = new Hand(deck.deal(2));

console.log(`Welcome! Let's play blackjack!`);
console.log(initialHandInfo('Your', playerHand));
playBlackjack(playerHand, computerHand);
