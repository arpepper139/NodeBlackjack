const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const Hand = require('./models/hand');
const Deck = require('./models/deck');

initialHandInfo = (owner, hand) => {
  let infoString = '';
  infoString += `${owner} first card: ${hand.cards[0].rank}${hand.cards[0].suit}\n`;
  infoString += `${owner} second card: ${hand.cards[1].rank}${hand.cards[1].suit}\n`;
  infoString += `${owner} Score: ${hand.value()}\n`;
  return infoString;
};

playBlackjack = (playerHand, computerHand) => {
  rl.question('Hit or stand? (h/s)> ', (answer) => {
    choice = answer.trim().toLowerCase();
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

playerHits = (playerHand, computerHand) => {
  let newPlayerCard = deck.deal(1)[0];
  playerHand.hit(newPlayerCard);
  if (playerHand.value() <= 21) {
    promptAgain(newPlayerCard, playerHand, computerHand);
  }
  else {
    playerBusts(newPlayerCard, playerHand);
  }
}

promptAgain = (newPlayerCard, playerHand, computerHand) => {
  console.log(`You were dealt ${newPlayerCard.rank}${newPlayerCard.suit}`);
  console.log(`Score: ${playerHand.value()}`);
  playBlackjack(playerHand, computerHand);
}

playerBusts = (newPlayerCard, playerHand) => {
  console.log(`You were dealt ${newPlayerCard.rank}${newPlayerCard.suit}`);
  console.log(`Score: ${playerHand.value()}`);
  console.log('Bust: You lose.');
  rl.close();
}

computerHits = (computerHand) => {
  let newComputerCard = deck.deal(1)[0];
  computerHand.hit(newComputerCard);
  console.log(`Dealer was dealt ${newComputerCard.rank}${newComputerCard.suit}`);
  console.log(`Dealer Score: ${computerHand.value()}`);
}

determineWinner = (playerHand, computerHand) => {
  let playerScore = playerHand.value();
  let computerScore = computerHand.value();
  if (playerScore > computerScore || computerScore > 21) {
    console.log('Congrats! You win!')
  }
  else if (playerScore === computerScore) {
    console.log('Push!')
  }
  else {
    console.log('Dealer Wins.')
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
