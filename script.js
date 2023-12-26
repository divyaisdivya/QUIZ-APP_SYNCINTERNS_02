const questions = [
    {
        question: "Who is our currrent Prime Minister?",
        answers: [
            { text: "Kalvakutla Chandrashekar Rao", correct: false},
            { text: "Manmohan Singh", correct: false},
            { text: "Atal Bihari Vajpayee", correct: false},
            { text: "Narendra Modi", correct: true},
        ]
    },
    {
        question: "What is the full form of ISRO?",
        answers: [
            { text: "Indian Space Research Organization", correct: true},
            { text: "Iran Space Research Organization", correct: false},
            { text: "Indian Science Research Organization", correct: false},
            { text: "Indian Space Resourse Organization", correct: false},
        ]
    },
    {
        question: "Which country is the birthplace of Yoga?",
        answers: [
            { text: "America", correct: false},
            { text: "India", correct: true},
            { text: "England", correct: false},
            { text: "China", correct: false},
        ]
    },
    {
        question: "Which state is also known as the Fruit Bowl of India?",
        answers: [
            { text: "Jammu and Kashmir", correct: false},
            { text: "Himachal Pradesh", correct: true},
            { text: "Assam", correct: false},
            { text: "Meghalaya", correct: false},
        ]
    },
    {
        question: "Who is popularly known as the Iron Man of India?",
        answers: [
            { text: "Lal Bahadur Shastri", correct: false},
            { text: "Mahatma Gandhi", correct: false},
            { text: "Sardar Vallabh Bhai Patel", correct: true},
            { text: "Dr.B.R Ambedkar", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();