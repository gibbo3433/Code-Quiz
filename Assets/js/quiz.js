var startQuiz = document.getElementById("startQuiz")
var saveScore = document.getElementById("saveScore")
var playAgain = document.getElementById("playAgain")

var welcome = document.getElementById("welcome")

var quiz = document.getElementById("quiz")
var question = document.getElementById("question")
var options = document.getElementById("options")
var message = document.getElementById("message")

var result = document.getElementById("result")
var summary = document.getElementById("summary")
var scores = document.getElementById("scores")
var timer = document.getElementById("timer")
var initials = document.getElementById("initials")

var secondsleft = 0;
var score = 0;
var currentQuestion = 0;
var countdownTimer;

function stopGame() {
    
    // This will stop the countdown timer when the game stops
    clearInterval(countdownTimer)

    // This will clear the text context of the timer
    timer.textContent = "";

    // This line will hide the quiz style, and display the result style
    quiz.style.display = "none";
    result.style.display = "flex";

    // This will deisplay the score of the most recent game
    summary.textContent.display = " Your score this game was " + score;
}

// This function will save the recent initals and  score to the local storage 
function SaveScore () {
    if  (initials !== "" ) {
        localStorage.setItem(initials, score);
        document.getElementById("initals").value = "";
    }
}

