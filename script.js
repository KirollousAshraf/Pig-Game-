'use strict';
// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing
// Starting conditions functionality
const init = function () {
    scores = [0, 0]
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}
init()



// Rolling dice functionality
btnRoll.addEventListener('click', function () {
    if (playing) {
        // 1. Generating a random dice roll
        const dice = Math.floor(Math.random() * 6 + 1);
        console.log(dice);
        // 2. Display dice
        diceEl.classList.remove('hidden');
        diceEl.setAttribute('src', `dice-${dice}.png`);
        // or
        // diceEl.src = `dice-${dice}.png`

        // 3. Check for rolled 1
        if (dice !== 1) {
            // add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
            // current0El.textContent = currentScore because this equation for static player for 0 

        } else {
            // Switching to the next player
            switchPlayer();

        }
    }
})

// Holding score functionality
btnHold.addEventListener('click', function () {
    if (playing) {
        // 1. Add current score to active player score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer]
        // 2. check if player's score is >=100
        if (scores[activePlayer] >= 20) {
            // finish the game 
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            diceEl.classList.add('hidden');


        } else {
            // switch to the next player 
            switchPlayer();
        }

    }

})

// Reset score functionality
btnNew.addEventListener('click', init)

// Switching-player functionality
function switchPlayer() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

