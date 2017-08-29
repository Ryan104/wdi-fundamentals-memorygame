
const cards = [
	{
		rank: "king",
		suit: "diamonds",
		cardImage: "images/king-of-diamonds.png"
	},
	{
		rank: "queen",
		suit: "diamonds",
		cardImage: "images/queen-of-diamonds.png"
	},
	{
		rank: "king",
		suit: "hearts",
		cardImage: "images/king-of-hearts.png"
	},
	{
		rank: "queen",
		suit: "hearts",
		cardImage: "images/queen-of-hearts.png"
	}
];

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
	cardsInPlay.push(card.rank);
	console.log('User flipped ' + card.rank);
	console.log(card.cardImage);
};

flipCard(0);
flipCard(1);

checkForMatch();
