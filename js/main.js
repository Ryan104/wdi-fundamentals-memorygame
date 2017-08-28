
const cards = ["queen", "queen", "king", "king"];
let cardsInPlay = [];

const checkForMatch = () => {
	if (cardsInPlay[0] === cardsInPlay[1]) {
		alert("Congrats! You found a match!");
	} else {
		alert("Sorry, try again...");
	}
}

const flipCard = (cardId) => {
	const card = cards[cardId];
	cardsInPlay.push(card);
	console.log('User flipped ' + card);
};

flipCard(0);
flipCard(1);

checkForMatch();
