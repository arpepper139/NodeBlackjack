const Hand = require('./models/hand');
const Deck = require('./models/deck');

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const cyan = '\x1b[36m%s\x1b[0m';
const magenta = '\x1b[35m%s\x1b[0m';

initialHandInfo = (owner, hand) => {
  let infoString = '';
  infoString += `\n${owner} first card: ${hand.cards[0].rank}${hand.cards[0].suit}\n`;
  infoString += `${owner} second card: ${hand.cards[1].rank}${hand.cards[1].suit}\n`;
  infoString += `${owner} Score: ${hand.value()}`;
  return infoString;
};

hit = (owner, hand) => {
  const newCard = deck.deal(1)[0];
  const color = `${owner === 'You' ? cyan : magenta}`;
  hand.hit(newCard);
  console.log(color, updatedHandInfo(owner, newCard, hand));
};

updatedHandInfo = (owner, card, hand) => {
  const verb = `${ (owner === 'You') ? 'were' : 'was' }`;
  const possessive = `${ (owner === 'You') ? 'Your' : 'Dealer\'s' }`;
  let newInfoString = '';
  newInfoString += `\n${owner} ${verb} dealt ${card.rank}${card.suit}\n`;
  newInfoString += `${possessive} Score: ${hand.value()}`;
  return newInfoString;
};

determineWinner = (playerHand, computerHand) => {
  const playerScore = playerHand.value();
  const computerScore = computerHand.value();
  if (playerScore > computerScore || computerScore > 21) {
    console.log(cyan, '\nCongrats! You win!');
  }
  else if (playerScore === computerScore) {
    console.log('\nPush!');
  }
  else {
    console.log(magenta, '\nDealer Wins.');
  }
};

playBlackjack = (playerHand, computerHand) => {
  const prompt = '\nHit or stand? (h/s)> ';
  rl.question(prompt, (answer) => {
    const playerChoice = answer.trim().toLowerCase();
    if (playerChoice === 'h') {
      hit('You', playerHand);
      if (playerHand.value() <= 21) {
        playBlackjack(playerHand, computerHand);
      }
      else {
        console.log(magenta, '\nBust: You lose.');
        rl.close();
      }
    }
    else if (playerChoice === 's') {
      console.log(magenta, initialHandInfo('Dealer\'s', computerHand));
      while (computerHand.value() < 17) {
        hit('Dealer', computerHand);
      }
      determineWinner(playerHand, computerHand);
      rl.close();
    }
    else {
      console.log('\nSorry! You can only hit or stand.');
      playBlackjack(playerHand, computerHand);
    }
  });
};

const deck = new Deck();
deck.shuffle();

const playerHand = new Hand(deck.deal(2));
const computerHand = new Hand(deck.deal(2));

console.log(`Welcome! Let's play blackjack!`);
console.log(cyan, initialHandInfo('Your', playerHand));
playBlackjack(playerHand, computerHand);
