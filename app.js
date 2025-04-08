const hitsEL = document.getElementById('hit');
const timerEL = document.getElementById('timer');
const scoreEL = document.getElementById('score');

const bubblesEl = document.querySelector('.bubbles');
const bubbleEL = document.querySelectorAll('.bubble');
const startEl = document.querySelector('.start');
const titleCardEl = document.querySelector('.title-card');
const titleEl = document.querySelector('.title');


let hit, score = 0, timer, timeLeft = 120;

// Generate a random target number between 0–24
const generateHit = () => {
    hit = Math.floor(Math.random() * 20); // 0 to 24
    hitsEL.textContent = hit;
}

// Randomize all bubble numbers
const randomizeBubbles = () => {
    bubbleEL.forEach(bubble => {
        bubble.textContent = Math.floor(Math.random() * 25);
    });
}


const startTimer = () => {
    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            timerEL.textContent = "Time's up!";
            bubblesEl.removeEventListener('click', bubbleClicked);
        } else {
            // Format as MM:SS
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
        randomizeBubbles();
        generateHit();
    }
}

// Event listener on container
bubblesEl.addEventListener('click', bubbleClicked);

const startCard = () => {
    titleCardEl.classList.add('hide');
    bubblesEl.classList.remove('hide');
    titleEl.textContent='Play Again!';
    // Initial setup
    randomizeBubbles();
    generateHit();
    startTimer();

}

startEl.addEventListener('click',startCard);