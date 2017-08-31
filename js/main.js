
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
let matchCount = 0;

// Messages
const defaultMessage = "Choose a card";
const matchMessage = "You found a match!";
const mismatchMessage = "Sorry, try again...";
const winMessage = "Nice! You found all the matches in X moves";

const createBoard = () => {
	const board = document.getElementById('game-board');
	const moveElement = document.getElementById('moves');
	const resetButtonElement = document.getElementById('resetButton');
	const messageElement = document.getElementById('statusMessage');

	this.flipCard = function(event) {
		// Increase Move Count/Score
		moveCount += 1;
		moveElement.innerHTML = moveCount;

		const cardID = this.getAttribute('data-id');
		const card = cards[cardID];
		this.setAttribute('src', card.cardImage);
		cardsInPlay.push(card.rank);
		postMessage('You flipped a ' + card.rank);
		// Checkfor match every even move number
		if (moveCount % 2 === 0){
			checkForMatch();
			// Reset cardsInPlay
			cardsInPlay = [];
		}
	};

	this.checkForMatch = function() {
		if (cardsInPlay[0] === cardsInPlay[1]) {
			// Its a match
			matchCount += 1;
			if (cards.length/2 === matchCount) {
				// The game is over
				postMessage(winMessage);
			} else {
				// The game continues
				postMessage(matchMessage);				
			}
		} else {
			// Not a match
			postMessage(mismatchMessage);
		}
	}

	this.createCards = function() {
		for (i in cards) {
			cardElement = document.createElement('img');
			cardElement.setAttribute('src', 'images/back.png');
			cardElement.setAttribute('data-id', i);
			cardElement.addEventListener('click', this.flipCard, false);
			board.appendChild(cardElement);
		}
	};

	// Status Message
	this.postMessage = function(message) {
		// Clear messages on odd movecounts
		if (moveCount % 2 === 1) {
			messageElement.innerHTML = "";
		}
		// Create message element
		messageP = document.createElement('p');
		messageP.textContent = message.replace('X', moveCount);

		// Conditionally style the message
		switch (message) {
			case matchMessage:
				messageP.className = 'matchMessage';
				break;
			case mismatchMessage:
				messageP.className = 'missmatchMessage';
				break;
			case winMessage:
				messageP.className = 'winMessage';
				break;
			case defaultMessage:
				messageP.className = 'defaultMessage';
				break;
			default:
				messageP.className = 'flipMessage';
		};

		// Add element to DOM
		messageElement.appendChild(messageP);
	};

	// REST BUTTON
	resetButton.addEventListener('click', () => {
		cardsInPlay = [];
		moveCount = 0;
		matchCount = 0;
		moveElement.innerHTML = moveCount;
		postMessage(defaultMessage);
		// Delete and recreate cards
		board.innerHTML = "";
		createCards();
	});

	// Setup board
	postMessage(defaultMessage);
	createCards();
};


createBoard();
