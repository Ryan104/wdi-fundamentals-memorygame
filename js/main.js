
const cards = ["queen", "queen", "king", "king"];
let cardsInPlay = [];

const cardOne = cards[0];
cardsInPlay.push(cardOne);

const cardTwo = cards[1];
cardsInPlay.push(cardTwo);

console.log('User flipped ' + cardOne);
console.log('User flipped ' + cardTwo);

if (cardsInPlay[0] === cardsInPlay[1]) {
	alert("Congrats! You found a match!");
} else {
	alert("Sorry, try again...");
}