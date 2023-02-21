'use strict';
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');
const bntNewGame = document.querySelector('.btn--new');
const playTill = document.querySelector('.play-till');
const playTillID = document.getElementById('play-till');
const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const scoreEl01 = document.querySelector('#score--0');
const scoreEl02 = document.querySelector('#score--1');
const currentScoreEl01 = document.querySelector('#current--0');
const currentScoreEl02 = document.querySelector('#current--1');

console.log(Number(currentScoreEl01.textContent));
console.log(Number(playTill.textContent));
playTill.value = 50;

let scores;
let currentScore;
let activePlayer;
let playing;
let setScore;

const initial = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  playTillID.readOnly = false;

  scoreEl01.textContent = 0;
  scoreEl02.textContent = 0;
  currentScoreEl01.textContent = 0;
  currentScoreEl02.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

const switchPlayers = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const rollDice = function () {
  //Roll Dice
  playTillID.readOnly = true;
  if (playing) {
    let randNum;
    randNum = Math.trunc(Math.random() * 6 + 1);
    console.log(randNum);
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${randNum}.png`;
    if (randNum !== 1) {
      currentScore += randNum;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else if (randNum === 1) {
      // SWITCH PLAYERS
      switchPlayers();
    }
  }
};

const hold = function () {
  playTillID.readOnly = true;
  if (playing) {
    // PLAYER WINS
    if (scores[activePlayer] + currentScore >= Number(playTill.value)) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      console.log('Winner');
      scores[activePlayer] += currentScore;
      document.querySelector(`#score--${activePlayer}`).textContent =
        scores[activePlayer];
      currentScore = 0;
      // PLAYER HOLDS
    } else {
      scores[activePlayer] += currentScore;
      document.querySelector(`#score--${activePlayer}`).textContent =
        scores[activePlayer];
      // SWITCH PLAYERS
      switchPlayers();
    }
  }
};

const playAgain = function () {
  initial();
};

initial();
btnRollDice.addEventListener('click', rollDice);
btnHold.addEventListener('click', hold);
bntNewGame.addEventListener('click', playAgain);
