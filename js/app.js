let movesCount = 0;
let correctGuessesCount = 0;
const movesDisplay = document.querySelector('.moves');
const deck = document.querySelector('.deck');
const playAgainButton = document.querySelector('#playAgainButton');
const winLevel = document.querySelector('#winLevel');
const restartButton = document.querySelector('.restart');
const winScreen = document.querySelector('#winScreen');
gameScreen = document.querySelector('.container');

let matchCheckContainer = [];
let correctGuesses = [];

function playMove(e){

    let selectedTile = e.target;
    let guessClass = selectedTile.firstElementChild.className;

    if(selectedTile.nodeName == "LI"){

        if(!matchCheckContainer.includes(selectedTile)  && !correctGuesses.includes(guessClass)){

            matchCheckContainer.push(selectedTile);

            selectedTile.classList.add('open', 'show');

            if(matchCheckContainer.length == 2){
                if(matchCheckContainer[0].firstElementChild.className == matchCheckContainer[1].firstElementChild.className){
                    correctGuess();
                    correctGuesses.push(guessClass);
                    if(correctGuessesCount == 8){
                        setTimeout(gameWon, 500);
                    }
                }
                else{
                    setTimeout(wrongGuess, 400);
                }
                matchCheckContainer = [];
                movesCount += 1;
                movesDisplay.innerHTML = movesCount;
            }
        }
    }
        
    console.log(guessClass);
}

function correctGuess(){
    matchCheckContainer[0].classList.add('match');
    matchCheckContainer[1].classList.add('match');
    correctGuessesCount += 1;
}

function wrongGuess(){
    matchCheckContainer[0].classList.remove('open','show');
    matchCheckContainer[1].classList.remove('open','show');
}

function gameWon(){
    gameScreen.classList.add('hide');
    winScreen.classList.remove('hide');
}

function gameOver(){
}

function playAgain(){
    location.replace('index.html');
}

playAgainButton.addEventListener('click', playAgain);
deck.addEventListener('click', playMove);
restartButton.addEventListener('click', playAgain);