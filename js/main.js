
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
		// Only flipCard() that isn't already flipped...
		if (this.getAttribute('src') === 'images/back.png'){
			// Increase Move Count/Score
			moveCount += 1;
			moveElement.innerHTML = moveCount;

			// Flip over unmatched cards
			if (moveCount % 2 === 1){
				// Loop through cards and 'flip over' face up cards
				// ie update card images
				boardState = board.childNodes;
				for (var child in boardState) {
					if (boardState[child].className === 'flipped') {
						boardState[child].setAttribute('src', 'images/back.png');
						boardState[child].removeAttribute('class');
					} else if (boardState[child].className === 'matched'){
						boardState[child].setAttribute('src', 'images/blank.png');
					}
				}
			}

			const cardID = this.getAttribute('data-id');
			const card = cards[cardID];
			this.setAttribute('src', card.cardImage);
			this.className = 'flipped';
			cardsInPlay.push(card.rank);
			postMessage('You flipped a ' + card.rank);
			// Checkfor match every even move number
			if (moveCount % 2 === 0){
				checkForMatch();
				// Reset cardsInPlay
				cardsInPlay = [];
			}
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
				// Set 'flipped' cards to 'matched'
				boardState = board.childNodes;
				for (var child in boardState) {
					if (boardState[child].className === 'flipped') {
						boardState[child].className = 'matched';
					}
				}
				postMessage(matchMessage);
			}
		} else {
			// Not a match
			postMessage(mismatchMessage);
		}
	}

	this.createCards = function() {
		for (var i in cards) {
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
				messageElement.innerHTML = "";
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

		// Delete and recreate cards
		board.innerHTML = "";
		postMessage(defaultMessage);
		createCards();
	});

	// Setup board
	postMessage(defaultMessage);
	createCards();
};


createBoard();
