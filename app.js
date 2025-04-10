// 🔥 DOM Elements
const hitsEL = document.getElementById('hit');
const timerEL = document.getElementById('timer');
const scoreEL = document.getElementById('score');

const bubblesEl = document.querySelector('.bubbles');
const startEl = document.querySelector('.start');
const titleCardEl = document.querySelector('.title-card');
const title = document.querySelector('.title');
const subTitle = document.querySelector('.subTitle');

const gameCard = document.querySelector('.game');

// 🔥 Game State Variables
let hit = 0;
let score = 0;
let timer;
let timeLeft = 60; // 🔥 Total game duration in seconds

// 🔥 Generates a random target number and displays it
const generateHit = () => {
    hit = Math.floor(Math.random() * 25); // Target between 0-24
    hitsEL.textContent = hit;
}

// 🔥 Starts the countdown timer
const startTimer = () => {
    timer = setInterval(() => {
        if (timeLeft < 0) {
            clearInterval(timer); // 🔥 Stop the timer when time's up
            bubblesEl.removeEventListener('click', bubbleClicked); // Disable clicks

            // 🔥 Show end screen and results
            startEl.textContent = "Play Again";
            title.textContent = "Time Up!";
            subTitle.textContent = `Game Over Your Score is ${score}`;
            bubblesEl.classList.add('hide');
            titleCardEl.classList.remove('hide');
        } else {
            // 🔥 Format time as MM:SS
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerEL.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
            timeLeft--;
        }
    }, 1000);
};

// 🔥 Handles user bubble click
const bubbleClicked = (e) => {
    if (e.target.classList.contains('bubble')) {
        const clickedValue = parseInt(e.target.textContent);
        if (clickedValue === hit) {
            score++; // 🔥 Increase score on correct hit
            scoreEL.textContent = score;
        }
        generateBubbles(); // 🔥 Refresh bubbles
        generateHit();     // 🔥 New target
    }
}

// 🔥 Generates grid of bubbles
const generateBubbles = () => {
    const bubbleSize = 48;   // 🔥 Bubble dimensions (px)
    const bubbleGap = 6;     // 🔥 Gap between bubbles (px)
    const padding = 12;      // 🔥 Horizontal padding total (6px each side)

    // 🔥 Adjust for actual usable container space
    const containerWidth = gameCard.offsetWidth - padding;
    const containerHeight = gameCard.offsetHeight - padding;

    // 🔥 Calculate number of bubbles per row and column
    const columns = Math.floor((containerWidth + bubbleGap) / (bubbleSize + bubbleGap));
    const rows = Math.floor((containerHeight + bubbleGap) / (bubbleSize + bubbleGap));

    let bubbleHTML = "";

    // 🔥 Ensure at least two target bubbles exist
    let rand1 = Math.floor(Math.random() * (rows * columns));
    let rand2 = Math.floor(Math.random() * (rows * columns));
    while (rand2 === rand1) {
        rand2 = Math.floor(Math.random() * (rows * columns)); // 🔥 Prevent overlap
    }

    // 🔥 Create all bubbles
    for (let i = 0; i < rows * columns; i++) {
        if (i === rand1 || i === rand2) {
            bubbleHTML += `<div class="bubble">${hit}</div>`; // 🔥 Target bubble
        } else {
            let temp = Math.floor(Math.random() * 25); // 🔥 Random value
            bubbleHTML += `<div class="bubble">${temp}</div>`;
        }
    }

    // 🔥 Inject bubbles into the DOM
    bubblesEl.innerHTML = bubbleHTML;
    gameCard.style.height = 'auto';

    // 🔥 Fill extra space with a few more bubbles if needed
    if ((containerHeight + padding) <= bubblesEl.offsetHeight) {
        for (let i = 0; i < ((columns - 1) - rows); i++) {
            let temp = Math.floor(Math.random() * 25);
            bubblesEl.innerHTML += `<div class="bubble">${temp}</div>`;
        }
    }
};

// 🔥 Handles the start of the game
const startCard = () => {
    titleCardEl.classList.add('hide');    // 🔥 Hide intro screen
    bubblesEl.classList.remove('hide');   // 🔥 Show game area
    score = 0;
    timeLeft = 60;
    scoreEL.textContent = 0;
    generateHit();        // 🔥 New target
    generateBubbles();    // 🔥 New bubble layout
    startTimer();         // 🔥 Start countdown
    bubblesEl.addEventListener('click', bubbleClicked); // 🔥 Enable bubble click
}

// 🔥 Start button click listener
startEl.addEventListener('click', startCard);
