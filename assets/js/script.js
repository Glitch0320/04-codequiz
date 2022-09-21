var start = document.querySelector('#start');
var timerEl = document.querySelector('#timer');
var questionCard = document.querySelector('#question');
var score = 0;
var qIndex = 0;

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
    div.setAttribute('id', i)
    questionCard.appendChild(div);

    // add question
    var q = queue.shift();

    var h2 = document.createElement('h2');
    h2.innerHTML = q.question;
    div.appendChild(h2)

    // add answers and correct in randomly
    var correctIndex = Math.floor(Math.random() * q.answers.length + 1);
    var answerIndex = 0;

    for (let j = 0; j < q.answers.length + 1; j++) {

        if (j === correctIndex) {
            h3 = document.createElement('h3');
            h3.innerHTML = q.correct;
            questionCard.appendChild(h3);
        } else {
            p = document.createElement('p');
            p.innerHTML = q.answers[answerIndex];
            questionCard.appendChild(p);
            answerIndex++;
        }

    }

}

// timer
var totalTime = 10 * queueLen;
timerEl.textContent = totalTime;

function game() {

    var timer = setInterval( () => {

        totalTime--;
        timerEl.textContent = totalTime;

        if (totalTime <= 0 || queue.length === 0) {
            clearInterval(timer);
            // Allow user to save score and initials
        }
    
    }, 1000);

    // Show question until clicked


}

start.addEventListener('click', () => {
    game();
});

questionCard.addEventListener('click', (e) => {
    console.log(e.target.nodeName)
});