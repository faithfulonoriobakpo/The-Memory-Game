let movesCount = 0;
let correctGuessesCount = 0;
const movesDisplay = document.querySelector('.moves');
const deck = document.querySelector('.deck');
const restartButton = document.querySelector('.restart');

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
                }
                else{
                    setTimeout(wrongGuess, 700);
                }
                movesCount += 1;
                movesDisplay.innerHTML = movesCount;
            }
        }
    }
        
    console.log(guessClass);
}

function correctGuess(){
    correctGuesses.push(guessClass);
    matchCheckContainer[0].classList.add('match');
    matchCheckContainer[1].classList.add('match');
    matchCheckContainer = [];
    correctGuessesCount += 1;
}

function wrongGuess(){
    matchCheckContainer[0].classList.toggle('open');
    matchCheckContainer[0].classList.toggle('show')
    matchCheckContainer[1].classList.toggle('open');
    matchCheckContainer[1].classList.toggle('show');
    matchCheckContainer = [];
}

deck.addEventListener('click', playMove);
