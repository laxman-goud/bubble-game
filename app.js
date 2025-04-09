const hitsEL = document.getElementById('hit');
const timerEL = document.getElementById('timer');
const scoreEL = document.getElementById('score');

const bubblesEl = document.querySelector('.bubbles');
const startEl = document.querySelector('.start');
const titleCardEl = document.querySelector('.title-card');

let hit = 0;
let score = 0;
let timer;
let timeLeft = 30; // Changed from 3 to 30 for actual play time

// Generate a random target number between 0–24
const generateHit = () => {
    hit = Math.floor(Math.random() * 25); // 0 to 24
    hitsEL.textContent = hit;
}

// Start the countdown timer
const startTimer = () => {
    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            timerEL.textContent = "Time's up!";
            bubblesEl.removeEventListener('click', bubbleClicked);
        } else {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerEL.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
            timeLeft--;
        }
    }, 1000);
};

// Click handler
const bubbleClicked = (e) => {
    if (e.target.classList.contains('bubble')) {
        const clickedValue = parseInt(e.target.textContent);
        if (clickedValue === hit) {
            score++;
            scoreEL.textContent = score;
        }
        generateBubbles();
        generateHit();
    }
}

// Generate bubbles with random numbers
const generateBubbles = () => {

    let bubbleHTML = "";
    for (let i = 0; i < 144; i++) {
        let temp = Math.floor(Math.random() * 25);
        bubbleHTML += `<div class="bubble">${temp}</div>`;
    }
    bubblesEl.innerHTML = bubbleHTML;
};


// Start game handler
const startCard = () => {
    titleCardEl.classList.add('hide');
    bubblesEl.classList.remove('hide');
    score = 0;
    timeLeft = 30;
    scoreEL.textContent = 0;
    generateBubbles();
    generateHit();
    startTimer();
    bubblesEl.addEventListener('click', bubbleClicked); // Ensures re-enabling after restart
}

// Event listener on start button
startEl.addEventListener('click', startCard);
