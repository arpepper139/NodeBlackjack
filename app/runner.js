let Card = require('./models/card');
let Hand = require('./models/hand');

let aceCard = new Card('A', '♦');
let faceCard = new Card('K', '♣');
let numberCard = new Card('8', '♥');
let noAceHand = new Hand([numberCard, faceCard]);

console.log(aceCard);
console.log(faceCard);
console.log(numberCard);
console.log(noAceHand);
