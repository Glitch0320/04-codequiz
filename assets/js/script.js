var start = document.querySelector('#start');
var timerEl = document.querySelector('#timer');
var questionCard = document.querySelector('#question');
var highscores = document.querySelector('#highscores');
highscores.setAttribute('style', 'display: none;');
var showScores = document.querySelector('#show-scores');
var initialsInput = document.forms['form']['initials'];
var submit = document.querySelector('#submit')
var form = document.forms['form'];
var formShown = false;
var score = 0;
var qIndex = 0;
gameOn = false;
keys = 'QAZWSXEDCRFVTGBYHNUJMIKOLPqazwsxedcrfvtgbyhnujmikolp'

// get scores from local storage
var scores = JSON.parse(localStorage.getItem('scores'));
if (!scores) {
    scores = {};
}
// add scores to highscores
scoresArr = Object.entries(scores);
for (let i = 0; i < scoresArr.length; i++) {
    var scoreElement = document.createElement('span');
    scoreElement.innerHTML = scoresArr[i][0] + ': ' + scoresArr[i][1];
    highscores.appendChild(scoreElement);
}

class question {
    constructor(question, correct, answers) {
        this.question = question;
        this.correct = correct;
        this.answers = answers;
    }
}

// Questions and Answers
let q1 = new question('What is the meaning of this?', 'correct', ['ans1', 'ans2']);
let q2 = new question('What is the meaning of this2?', 'correct', ['2ans1', '2ans2']);
var unshuffledQueue = [q1, q2];

// shuffle questions
var queue = [];

while (unshuffledQueue.length) {
    var random = Math.floor(Math.random() * unshuffledQueue.length);
        item = unshuffledQueue.splice(random, 1);
    queue.push(item[0])
}

const queueLen = queue.length;

// Add all questions and answers to page
for (let i = 0; i < queueLen; i++) {

    // add div with id for each question
    var div = document.createElement('div');
    div.setAttribute('id', 'div-' + i);
    div.setAttribute('style', 'display: none;');
    questionCard.appendChild(div);

    // add question
    var q = queue.shift();

    var h2 = document.createElement('h2');
    h2.innerHTML = q.question;
    div.appendChild(h2);

    // add answers and correct in randomly
    var correctIndex = Math.floor(Math.random() * q.answers.length + 1);
    var answerIndex = 0;

    for (let j = 0; j < q.answers.length + 1; j++) {

        if (j === correctIndex) {
            h3 = document.createElement('h3');
            h3.innerHTML = q.correct;
            div.append(h3);
        } else {
            p = document.createElement('p');
            p.innerHTML = q.answers[answerIndex];
            div.append(p);
            answerIndex++;
        }

    }

}

// timer
var totalTime = 10 * queueLen;
timerEl.textContent = totalTime;


function validate() {
    let input = initialsInput.value;
    // if input isn't equal to two letters
    if (input.length != 2 || 
        !keys.includes(input[0]) ||
        !keys.includes(input[1]) ) {
        alert('Please enter two letters');
        return false;
    } else {
        form.style.display = 'none';
        scores[input] = score;
        localStorage.setItem('scores', JSON.stringify(scores));
        score = 0;
        qIndex = 0;
    }
}


function game() {

    if (!gameOn) {

        gameOn = true;

        console.log(scores);

        var timer = setInterval( () => {

            totalTime--;
            timerEl.textContent = totalTime;

            // Game ends here
            if (totalTime <= 0 || qIndex === queueLen) {
                gameOn = false;
                clearInterval(timer);
                // Allow user to save score and initials
                form.style.display = 'block';
                formShown = true;
            }
        
        }, 1000);

        // Show first question
        var thisQuestion = document.querySelector('#div-' + qIndex);
        thisQuestion.style.display = 'block';

    }

}



questionCard.addEventListener('click', (e) => {
    var thisQuestion = document.querySelector('#div-' + qIndex);
    // If correct
    if (e.target.nodeName === 'H3') {
        score++;
        thisQuestion.style.display = 'none';
        // If there is a next question, display it
        qIndex++;
        if (qIndex < queueLen) {

            thisQuestion = document.querySelector('#div-' + qIndex);
            thisQuestion.style.display = 'block';
        }
    } else if (e.target.nodeName === 'P') {
        totalTime -= 3;
        thisQuestion.style.display = 'none';
        // If there is a next question, display it
        qIndex++;
        if (qIndex < queueLen) {
            thisQuestion = document.querySelector('#div-' + qIndex);
            thisQuestion.style.display = 'block';
        }
    }
});

scoresShown = false;
showScores.addEventListener('click', () => {
    if (!scoresShown) {
        // show scores 
        scoresShown = true;
        highscores.setAttribute('style', 'display: flex;')
    } else {
        // hide scores
        scoresShown = false;
        highscores.setAttribute('style', 'display: none;')
    }
});

start.addEventListener('click', () => {
    game();
});

submit.addEventListener('click', () => {
    formShown ? validate() : score += 0;
});

document.addEventListener('keydown', (e) => {
    e.key === 'Enter' && formShown ? validate() : score +=0;
});