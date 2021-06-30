let possibleQuestions = {
    0: {
        "question"  : "Which of these css selectors would call the class?",
        "answers"   : {
            0 : "#class",
            1 : ":class",
            2 : ".class",
            3 : "None of the above"
        },
        "correct" : ".class"
    },
    1: {
        "question"  : "What Javascript function is used to prevent a form from submitting?",
        "answers"   : {
            0 : "event.preventDefault()",
            1 : "target='_blank'",
            2 : "event.stopPropagation()",
            3 : "None of the above"
        },
        "correct" : "event.preventDefault()"
    },
    2: {
        "question"  : "What kind of bear is best?",
        "answers"   : {
            0 : "Black Bear",
            1 : "Polar Bear",
            2 : "That's a ridiculous question",
            3 : "None of the above"
        },
        "correct" : "Black Bear"
    },
    3: {
        "question"  : "Which CSS rule is used to change the color of the text?",
        "answers"   : {
            0 : "word-color",
            1 : "text-color",
            2 : "font-color",
            3 : "None of the above"
        },
        "correct" : "None of the above"
    },
    4: {
        "question"  : "To execute a function by clicking a DOM element, which function would you use?",
        "answers"   : {
            0 : ".click(function)",
            1 : ".onClick(function)",
            2 : ".on('click', function)",
            3 : "None of the above"
        },
        "correct" : ".on('click', function)"
    },
    5: {
        "question"  : "Which of the following is NOT supported by native CSS?",
        "answers"   : {
            0 : "Variables",
            1 : "Media Queries",
            2 : "Functions",
            3 : "None of the above"
        },
        "correct" : "Functions"
    },
    6: {
        "question"  : "How many years was that old lady waiting to throw the 'Heart of the Ocean' diamond into the ocean?",
        "answers"   : {
            0 : "84",
            1 : "92",
            2 : "76",
            3 : "None of the above"
        },
        "correct" : "84"
    },
    7: {
        "question"  : "If someone wanted to make a new paragraph tag to insert into their HTML page, which function would they use?",
        "answers"   : {
            0 : "$('<p></p>')",
            1 : ".appead('p')",
            2 : ".createElement('p')",
            3 : "None of the above"
        },
        "correct" : ".createElement('p')"
    },
    8: {
        "question"  : "How long will something live in your local storage?",
        "answers"   : {
            0 : "Until the end of your page session",
            1 : "Until you close the browser",
            2 : "Until you clear your cookies",
            3 : "None of the above"
        },
        "correct" : "None of the above"
    },
    9: {
        "question"  : "How many of these questions were not about coding?",
        "answers"   : {
            0 : "1",
            1 : "2",
            2 : "3",
            3 : "4"
        },
        "correct" : "2"
    },

}

let currentScore = {
    "wrong"     : 0,
    "correct"   : 0,
    "timeleft"  : 0
};

let highScores = localStorage.getItem("bootcamp-quiz-scores");
let quizForm = document.getElementById("quizblock");
let theButton = quizForm.querySelector("button");
let timerWindow = document.getElementById("countdown");
let timeRemaining = 60;
let globalTimer;


// Grab control of the button and form
theButton.addEventListener("click", function(event){
    event.preventDefault();

    if( theButton.classList.contains("start") ){

        // Disable the button first
        theButton.style.display = "none";

        // START THE QUIZ!
        currentScore = {
            "wrong"     : 0,
            "correct"   : 0,
            "timeleft"  : 0
        };

    }
    else{
        // Reenable the button
        theButton.disabled = false;
        
        // Cancel the quiz
    }

    console.log("Button pushed!");

  });


// LUCIOWARE - Timer Completed
function clockManager(control){
    timeRemaining = 60;
    var theNumbers = timerWindow.querySelector("span");

    if(control == "reset"){
        // Reset the clock on page load
        theNumbers.textContent = timeRemaining;
        theButton.style.display = "block";
    }
    else if(control == "start"){
        timerWindow.classList.add("active");

        globalTimer = setInterval(function(){
            timeRemaining--;
            theNumbers.textContent = timeRemaining;

            if(timeRemaining <= 10 && timeRemaining > 0){
                if( !timerWindow.classList.contains("alert") ){
                    timerWindow.classList.add("alert");
                }
            }
            if(timeRemaining <= 0){
                clockManager("stop");
                // endQuiz();
            }
        }, 1000);
    }
    else if(control == "stop"){
        clearInterval(globalTimer);
        theNumbers.textContent = timeRemaining;
        timerWindow.classList.remove("active");
        timerWindow.classList.remove("alert");
        theButton.style.display = "block";
    }

}

// Make a question propogator
function quizHandler( questionNumber ){

    if( questionNumber >= 9 || timeRemaining <= 0){
        // outOfQuestions
        return;
    }

    // Clear the area
    var questionArea = quizForm.querySelector(".quizcontent");
    questionArea.textContent = "";
    questionArea.setAttribute("id","question"+questionNumber);


    // Make the elements
    var currentQuestion = possibleQuestions[questionNumber];

    var questionBlock = document.createElement("p");
    questionBlock.textContent = currentQuestion.question;
    questionArea.appendChild(questionBlock);

    for (i=0; i < 4; i++ ){

        var checkBox = document.createElement("input");
        checkBox.setAttribute("type", "checkbox");
        checkBox.setAttribute("name", "answer"+i);
        checkBox.setAttribute("id", "answer"+i);
        checkBox.setAttribute("value", currentQuestion.answers[i]);
        
        var optionBlock = document.createElement("label");
        optionBlock.setAttribute("for", "answer"+i)
        optionBlock.textContent = currentQuestion.answers[i];
        
        questionArea.appendChild(checkBox);
        questionArea.appendChild(optionBlock);
    }

    answerValidation(questionNumber);
}

// Validation + Loop
function answerValidation(questionNumber){

    var allAnswers = document.querySelectorAll(`input[type="checkbox"]`);
    for(i=0; i < allAnswers.length; i++){
        allAnswers[i].addEventListener("change", function(){            

            if(this.value == possibleQuestions[questionNumber].correct ){
                console.log(`Correct answer for question ${questionNumber}!`);
            }

            else{
                console.log(`Wrong answer for question ${questionNumber}...`);
            }

            quizHandler( questionNumber+1 )
        });
    }
}


// Make an answer validator

// STOP THE QUIZ! Tally the score...

// THE BIG ONE!
function initialize(){

    // console.log("Initialized");
    clockManager("reset");
    //displayScore();

}

// [Shania Voice] LET'S GO, GIRLS!
initialize();