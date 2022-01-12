'use strict';

// Selecting Elements
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
const scores = [0, 0];
let currentScore;
let activePlayer;
let isPlaying;

// Starting Conditions

const initStartingConditions = () => {
  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  scores[0] = 0;
  scores[1] = 0;
  currentScore = 0;
  activePlayer = 0;
  isPlaying = true;
};

initStartingConditions();
score1El.textContent = 0;
score0El.textContent = 0;
diceEl.classList.add('hidden');

// Rolling Dice
btnRoll.addEventListener('click', function () {
  if (isPlaying) {
    // 1. Generate a random Diceroll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display The dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1: if true, switch to next Player
    if (dice !== 1) {
      // add dice to score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  resetgame();
});

btnHold.addEventListener('click', function () {
  if (isPlaying) {
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. check if score >= 100
    if (scores[activePlayer] >= 10) {
      // Yes: finish game
      isPlaying = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      diceEl.classList.add('hidden');
    } else {
      // No: switch to other player
      switchPlayer();
    }
  }
});

const switchPlayer = () => {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const resetgame = () => {
  initStartingConditions();
  document.querySelector('.player--winner').classList.remove('player--winner');
  if (player1El.classList.contains('player--active')) {
    switchPlayer();
  }
};
