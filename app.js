var allQuestions = [
    {
        question: "Petra is located in which country?",
        choices:["Iran", "Jordan", "Lebanon", "Iraq"],
        correctAnswer: "Jordan"
    },
    {
        question: "Taj Mahal is located in which country?",
        choices:["India", "Pakistan", "Indonesia", "Singapore"],
        correctAnswer: "India"
    },
    {
        question: "Chichen Itza is located in which country?",
        choices:["Mexico", "United States", "Chile", "Argentina"],
        correctAnswer: "Mexico"
    },
    {
        question: "The Colosseum is located in which country?",
        choices:["Italy", "France", "Norway", "Germany"],
        correctAnswer: "Italy"
    },
    {
        question: "Christ The Redeemer Statue on Corcovado Mountain is located in which country?",
        choices:["China", "Canada", "Hungary", "Brazil"],
        correctAnswer: "Brazil"
    },
    {
        question: "Machu Picchu is located in which country?",
        choices:["Jamaica", "Cuba", "Peru", "Puerto Rico"],
        correctAnswer: "Peru"
    },
    {
        question: "Bali is located in which country?",
        choices:["India", "Philippines", "Indonesia", "Romania"],
        correctAnswer: "Indonesia"
    },
    {
        question: "Iguazu Falls is located between which two countries?",
        choices:["Argentina and Brazil", "China-Nepal", "India-Pakistan", "Poland-Germany"],
        correctAnswer: "Argentina and Brazil"
    },
    {
        question: "Ngorongoro Crater is located in which country?",
        choices:["Nigeria", "Tanzania", "Algeria", "Chad"],
        correctAnswer: "Tanzania"
    },
    {
        question: "The Great Barrier Reef is located in which country?",
        choices:["Iran", "Australia", "Lebanon", "Taiwan"],
        correctAnswer: "Australia"
    },
];

var submitButton = document.getElementById("submitBtn");
var quizForm = document.getElementById("quiz");
var radioOptions = document.getElementsByName("choiceOption");
var statusDiv = document.getElementById("status");
var currentQuestion = 0;
var totalScore = 0;
var index = 0;

function firstPage() {
    currentQuestion = 0;
    submitButton.value = "Start Quiz";
    statusDiv.innerHTML = "";
    quizForm.innerHTML = "<h1>The World Famous Places Quiz</h1>"
    $("#submitBtn").off("click");
    $("#submitBtn").on("click", function(event) {
        askQuestion();
    });
}

function updateStatus() {
    statusDiv.innerHTML = "<p class='status'>Score: " + totalScore + " of " + allQuestions.length +
                            "<span>Question: " + (currentQuestion +1) + " of " + allQuestions.length + "</span>" + "</p>" + 
                            "<hr>";
}

function hasAnswer() {
    if ($('input[name="choiceOption"]:checked').length < 1) {
        return false;
    } else {
        return true;
    }
}

function checkAnswer() {
    if (radioOptions.length > 1) {
        for (var i = 0; i < radioOptions.length; i++) {
            var select = radioOptions[i];
            var correctAnswer = allQuestions[currentQuestion].correctAnswer;

            if (select.checked) {
                if (select.value === correctAnswer) {
                    console.log(correctAnswer);
                    return true;
                } else {
                    return false;
                }
            }
        }
    }
}

function askQuestion() {
    updateStatus();
    var choices = allQuestions[currentQuestion].choices;
    var question = allQuestions[currentQuestion].question;
    if (currentQuestion < allQuestions.length) {
        submitButton.value = "Submit Answer";
        quizForm.innerHTML = "<h2>" + question + "</h2>";

        for (var i = 0; i < choices.length; i++) {
            quizForm.innerHTML += "<lable><input class='radioChoices' type='radio' name='choiceOption' value='" + choices[i] + "'/> " +
                                    " " + choices[i] + "</label><br>";  
        }
    }
    $("#submitBtn").off("click");
    $("#submitBtn").on("click", function(event) {
        if(hasAnswer()) {
            revealAnswer();
        } else {
            alert('Please Answer the Question'); 
            askQuestion();
        }       
    });
}

function revealAnswer() {
    updateStatus();
    var correctAnswer = allQuestions[currentQuestion].correctAnswer;
    if (checkAnswer() == true) {
        quizForm.innerHTML = "<h3 class='correct'>You are correct!</h3>";
        totalScore += 1;
    } else {
        quizForm.innerHTML = "<h3 class='incorrect'>You are incorrect!</h3>" + 
                            "<h3 class='answer'>The right answer is " + correctAnswer + ".";
    }

    if (currentQuestion === (allQuestions.length - 1)) {
        submitButton.value = "Show Score";
        $("#submitBtn").off("click");
        $("#submitBtn").on("click", function(event) {
            showScore();
        });
    } else {
        submitButton.value = "Next Question >>";
        $("#submitBtn").off("click");
        $("#submitBtn").on("click", function(event) {
            currentQuestion += 1;
            askQuestion();
        });
    }    
}

function showScore() {
    updateStatus();
    statusDiv.innerHTML = "";
    quizForm.innerHTML = "<p class='finish'>You have finished the quiz.</p>" + 
                        "<p class='total'>Your score is a total of " + totalScore + " out of " + allQuestions.length + "</p>";
    submitButton.value = "Start Over"
    $("#submitBtn").off("click");
    $("#submitBtn").on("click", function(event) {
        firstPage();
    });
}

$(document).ready(function() {
    firstPage();
});




    





























