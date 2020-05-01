const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// List of words for game
const words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving',
];

let score = 0;
let time = 5;
let difficulty = 'easy';
let randomWord = '';
let timeInterval = null;

text.focus();
addWordToDom();
loadSavedData();
resetTimer();

text.addEventListener('input', (e) => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    e.target.value = '';
    addWordToDom();
    incrementScore();
    resetTimer();
  }
});

settingsForm.addEventListener('change', (e) => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
  location.reload();
});

///////////////////////////////////////////////////////////////////////////////////////Helper Functions

function addWordToDom() {
  randomWord = words[Math.floor(Math.random() * words.length)];
  word.innerText = randomWord;
}

function loadSavedData() {
  const savedDifficulty = localStorage.getItem('difficulty');
  difficulty = savedDifficulty ? savedDifficulty : 'easy';
  difficultySelect.value = difficulty;
}

function resetTimer() {
  if (difficulty === 'hard') {
    time = 2;
  } else if (difficulty == 'medium') {
    time = 3;
  } else {
    time = 5;
  }

  //Resetting the value of the label to the initial value.
  timeEl.innerHTML = time + 's';

  //Clearing the old timer if it was set to ensure the timer always start counting when resetTimer is called.
  if (timeInterval) clearInterval(timeInterval);

  //every second call the update time function.
  timeInterval = setInterval(decrementTime, 1000);
}

function decrementTime() {
  time--;
  if (time === 0) {
    //The following is used to reset the timer
    clearInterval(timeInterval);
    gameOver();
  } else {
    timeEl.innerHTML = time + 's';
  }
}

function incrementScore() {
  score++;
  scoreEl.innerHTML = score;
}

function gameOver() {
  endgameEl.innerHTML = `
        <h1>Time ran out</h1>
        <p>Your final score is ${score}</p>
        <button onclick="location.reload()">Reload</button>
    `;

  endgameEl.style.display = 'flex';
}
