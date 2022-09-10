let movesCount = 0;
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

            if(matchCheckContainer.length == 2){
                if(matchCheckContainer[0].firstElementChild.className == matchCheckContainer[1].firstElementChild.className){
                    //correctGuess();
                    correctGuesses.push(guessClass);
                }
                else{
                    //wrongGuess();
                }
                movesCount += 1;
                movesDisplay.innerHTML = movesCount;
                matchCheckContainer = [];
            }
        }
    }
        
    console.log(guessClass);
}

deck.addEventListener('click', playMove);
