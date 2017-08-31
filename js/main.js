
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
let moveCount = 0;

const checkForMatch = () => {
	if (cardsInPlay[0] === cardsInPlay[1]) {
		console.log("Congrats! You found a match!");
	} else {
		console.log("Sorry, try again...");
	}
}

/*let flipCard = (event) => {
	console.log(event);
	console.log(this);
	const cardID = this.getAttribute('data-id');
	const card = cards[cardID];
	this.setAttribute('src', card.cardImage);
	cardsInPlay.push(card.rank);
	console.log('User flipped ' + card.rank);
	console.log(card.cardImage);
	if (cardsInPlay.length === 2){
		checkForMathc();
	}
};*/

const createBoard = () => {
	const board = document.getElementById('game-board');
	const moveElement = document.getElementById('moves');

	this.flipCard = function(event) {
		// Increase Move Count/Score
		moveCount += 1;
		moveElement.innerHTML = moveCount;
		const cardID = this.getAttribute('data-id');
		const card = cards[cardID];
		this.setAttribute('src', card.cardImage);
		cardsInPlay.push(card.rank);
		console.log('User flipped ' + card.rank);
		console.log(card.cardImage);
		// Checkfor match every even move number
		if (moveCount % 2 === 0){
			checkForMatch();
			// Reset cardsInPlay
			cardsInPlay = [];
		}		
	}

	for (i in cards) {
		cardElement = document.createElement('img');
		cardElement.setAttribute('src', 'images/back.png');
		cardElement.setAttribute('data-id', i);
		cardElement.addEventListener('click', this.flipCard, false);
		board.appendChild(cardElement);
	}
}

createBoard();
