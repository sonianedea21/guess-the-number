/* GAME FUNCTION: 
. player must guess a number between a min and a max
. player gets a gertain amount of guesses
. notify player of guesses remaining
. notify player of correct answer if lost
. let player choose to play again */

// game values
let min = 1, 
    max = 10,
    winningNum = getRandomNumber(min, max),
    guessesLeft = 3;

// UI elements
const game = document.querySelector('.game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// assign UI min and max 
minNum.textContent = min;
maxNum.textContent = max;

// play again event listener
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
});

// listen for button 
guessBtn.addEventListener('click', function(){
    // turn string to number 
    let guess = parseInt(guessInput.value);

    // validate input
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }

    // display outcome
    if(guess === winningNum){
        gameOver(true, `${winningNum} is correct, YOU WIN!`);

    } else {
        guessesLeft -= 1;

        if(guessesLeft === 0){
        gameOver(false, `Game over, you lost. The correct number was ${winningNum}`);

        } else {
        guessInput.style.borderColor = 'red';
        guessInput.value = 'nothing';
        setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
        }
    }
});

// game over
function gameOver(won, msg){
    let color;
    won === true ? color = 'green' : color = 'red';

    guessInput.disabled = true;
    guessInput.style.borderColor = color;
    message.style.color = color;
    setMessage(msg);

    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

// random winning number 
function getRandomNumber(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

// set message function
function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}
