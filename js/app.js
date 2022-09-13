let movesCount = 0;
let correctGuessesCount = 0;
const movesDisplay = document.querySelector('.moves');
const deck = document.querySelector('.deck');
const playAgainButtons = document.querySelectorAll('.playAgainButton');
const gameScreen = document.querySelector('.container');
let time = document.querySelector('#time');
let count = timeSpent = 120;
const stars = document.querySelector('#stars');
let starCount = 5;
const star = "⭐";
let starMeasure = 12;

let matchCheckContainer = [];
let correctGuesses = [];

playAgainButtons.forEach(button => {
    button.addEventListener('click', playAgain);
});

function countDown(){
    count -= 1;
    time.innerHTML = count;
    if(count == 0){
        clearInterval(clockTimer);
        gameOver();
    }
}

const clockTimer = setInterval(countDown, 1000);

function shuffleCards(){
    let cardContainers = document.querySelectorAll('.card');
    let cards =  document.querySelectorAll('.fa');

    let initIndex = cardContainers.length;

    cardContainers.forEach(cardContainer => {
        let randomIndex = Math.floor(Math.random() * initIndex);
        cardContainer.replaceChild(cards[randomIndex], cardContainer.firstElementChild);
        cards = cards.filter(element => element !== cards[randomIndex]);
        initIndex -= 1;
    });
}

function playMove(e){

    let selectedTile = e.target;
    let guessClass = selectedTile.firstElementChild.className;

    if(selectedTile.nodeName == "LI"){

        if(!matchCheckContainer.includes(selectedTile)  && !correctGuesses.includes(guessClass)){

            matchCheckContainer.push(selectedTile);

            selectedTile.classList.add('open', 'show', 'animate__flipInY');

            if(matchCheckContainer.length >= 2){
                if(matchCheckContainer[0].firstElementChild.className == matchCheckContainer[1].firstElementChild.className){
                    correctGuess();
                    correctGuesses.push(guessClass);
                    if(correctGuessesCount == 8){
                        setTimeout(gameWon, 1000);
                    }
                }
                else{
                    matchCheckContainer.forEach(card => {
                        card.classList.add('mismatch'); 
                    })
                    wrongGuess();
                }
                movesCount += 1;
                movesDisplay.innerHTML = movesCount;
            }
            if(movesCount == starMeasure){
                starCount -= 1;
                stars.innerHTML = star.repeat(starCount);
                starMeasure += 4;
            }
        }
    }
        
    console.log(guessClass);
}

function correctGuess(){
    matchCheckContainer.forEach(card => {
        if(card.classList.contains('animate__flipInY')){
            card.classList.remove('animate__flipInY');
        }
    });
    matchCheckContainer[0].classList.add('match', 'animate__bounce');
    matchCheckContainer[1].classList.add('match', 'animate__bounce');
    matchCheckContainer = [];
    correctGuessesCount += 1;
}

function wrongGuess(){
     setTimeout(() => {matchCheckContainer.forEach(card => {
        card.classList.remove('open','show', 'mismatch'); 
    });
    matchCheckContainer = [];}, 500);
}

function gameWon(){
    clearInterval(clockTimer);
    const winSummary = document.querySelector('#winSummary');
    winSummary.innerHTML = `${starCount} ${star.repeat(starCount)} General! 
                                <br><br> You did it in ${timeSpent - count} seconds with ${movesCount} moves!`;
    gameScreen.classList.add('hide');
    winScreen.classList.remove('hide');
}

function gameOver(){
    const loseSummary = document.querySelector('#loseSummary');
    loseSummary.innerHTML = `You could only make ${correctGuesses.length} matches with ${movesCount} moves!`;
    gameScreen.classList.add('hide');
    loseScreen.classList.remove('hide');
    document.body.style.background = "black";
}

function playAgain(){
    location.replace('index.html');
}

deck.addEventListener('click', playMove);
shuffleCards();