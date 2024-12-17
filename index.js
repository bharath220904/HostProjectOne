let startBtn = document.getElementById('start-btn');
let playAgainBtn = document.getElementById('play-again-btn');
let startScreen = document.getElementById('start-screen');
let gameScreen = document.getElementById('game-screen');
let endScreen = document.getElementById('end-screen');
let gameBoard = document.getElementById('game-board');
let scoreDisplay = document.getElementById('score');
let finalScoreDisplay = document.getElementById('final-score');

let cards = [];
let flippedCards = [];
let matchedCards = 0;
let score = 0;

const cardValues = ['🐶', '🐱', '🐰', '🐯', '🦁', '🐻', '🐸', '🐨'];
const totalCards = cardValues.length * 2; 


function generateDeck() {
    let deck = [...cardValues, ...cardValues]; 
    deck = deck.sort(() => Math.random() - 0.5); 
    return deck;
}


function createCards(deck) {
    gameBoard.innerHTML = ''; 
    deck.forEach((value, index) => {
        let card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}


function flipCard(event) {
    let clickedCard = event.target;

   
    if (flippedCards.length === 2 || clickedCard.classList.contains('flipped') || clickedCard.classList.contains('matched')) {
        return;
    }

    clickedCard.classList.add('flipped');
    clickedCard.textContent = clickedCard.dataset.value;

    flippedCards.push(clickedCard);

   
    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 800);
    }
}


function checkMatch() {
    if (flippedCards[0].dataset.value === flippedCards[1].dataset.value) {
        flippedCards[0].classList.add('matched');
        flippedCards[1].classList.add('matched');
        matchedCards++;
        score += 10;
        scoreDisplay.textContent = score;
    } else {
        flippedCards[0].classList.remove('flipped');
        flippedCards[1].classList.remove('flipped');
        flippedCards[0].textContent = '';
        flippedCards[1].textContent = '';
    }

    flippedCards = [];

   
    if (matchedCards === cardValues.length) {
        endGame();
    }
}


function endGame() {
    finalScoreDisplay.textContent = score;
    gameScreen.style.display = 'none';
    endScreen.style.display = 'block';
}


function startGame() {
    matchedCards = 0;
    score = 0;
    scoreDisplay.textContent = score;
    let deck = generateDeck();
    createCards(deck);

    startScreen.style.display = 'none';
    gameScreen.style.display = 'block';
}


function resetGame() {
    endScreen.style.display = 'none';
    startScreen.style.display = 'block';
}


startBtn.addEventListener('click', startGame);
playAgainBtn.addEventListener('click', resetGame);
