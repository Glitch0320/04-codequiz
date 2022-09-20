var start = document.querySelector('#start');
var timerEl = document.querySelector('#timer');
var questionCard = document.querySelector('#question');
var score = 0;

//Made a class to quickly add new questions, and keep
//the user update (display) function stored as a method
class question {
    constructor(question, correct, answers) {
        this.question = question;
        this.correct = correct;
        this.answers = answers;
    }
    display() {
        // Show question
        var heading = document.createElement('h2');
        heading.innerText = this.question;
        questionCard.appendChild(heading);

        // This is to add the correct question to a random part of the answers
        var correctIndex = Math.floor(Math.random() * this.answers.length + 1);
        var answerIndex = 0;

        // Add answer to question div
        for (let i = 0; i < this.answers.length + 1; i++) {
            if (i === correctIndex) {
                let currentAnswer = document.createElement('h3');
                currentAnswer.innerText = this.correct;
                questionCard.appendChild(currentAnswer);
            } else {
                let currentAnswer = document.createElement('p');
                currentAnswer.innerText = this.answers[answerIndex];
                questionCard.appendChild(currentAnswer);
                answerIndex++;
            }
        }
    }
}

// Questions and Answers
let q1 = new question('What is the meaning of this?', 'correct', ['ans1', 'ans2']);
let q2 = new question('What is the meaning of this2?', 'correct', ['2ans1', '2ans2']);
var queue = [q1, q2];
qIndex = 0;
var totalTime = 10 * queue.length;
timerEl.textContent = totalTime;

// start quiz is clicked
start.addEventListener('click', () => {
    
    // A timer of 10s per question (6 questions ? 60s) begins countdown

    var globalTimer = setInterval( () => {

        totalTime--;
        timerEl.textContent = totalTime;

        if (totalTime === 0 || qIndex === queue.length - 1) {
            clearInterval(globalTimer);
            questionCard.innerHTML = '';
            //show score
        }

    }, 1000);

    queue[qIndex].display();
    // These vars must be declared while a question is being displayed
    var correctAnswers = document.querySelectorAll('h3');
    var wrongAnswers = document.querySelectorAll('p');
    console.log(correctAnswers, wrongAnswers)

});

// TODO: Add event listeners to p and h3 tags to catch user click
