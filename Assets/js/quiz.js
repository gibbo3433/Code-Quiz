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

function StopGame() {
    
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

// This function changes to show the score.html page
function ViewScores () {
    window.location.href = 'scores.html'
}

// If the user selects the correct score, their scoe will add one. If not, it will subtract 1
// Also, after the score has been selected and the score has changed, the next question will appear
function SelectAnswer () {
    var correctanswer = questions[currentQuestion].answer;
    var userAnswer = e.target.textContent;

    if (correctanswer = userAnswer) {
        score ++;

    } else {
        score --;
    }

    displayQuestion();
}

function displayQuestion () {
    
    // This moves onto the next question
    currentQuestion ++;
    console.log (" The question now is " + currentQuestion);

    if (currentQuestion >= questions.length) {
        StopGame ();
        return
    }

    // Load the question into the title for the user to see
    var question = questions[currentQuestion];
    document.getElementById("question").textContent = question.title

    // Clears the options script back to nothing
    options.innerHTML = "";

    // This will choose the next questions until all the questions have been chosen
    for (var i = 0; 1 < question.choices.length; i++) {
        
        // This will make a new "div", give the person the choices to answer from, when the click an answer it will run the "SelectAnswer" function
        var option = document.createElement("div");
        option.textContent = question.choices[i];
        option.onclick = SelectAnswer;
        option.classList.add["option"];

        // This will add the persons choice into the options variable
        options.appendChild(option);
    }

}


// This function will start the game
function StartGame () {
    
    // This will set the timer to 70 seconds
    secondsleft = 70;

    // This will start the game at the first question
    currentQuestion = 0;

    // This will reset the score ready for this new game
    score = 0;

    // This will start the countdown timer

    // Set interval is needed as we do not want the timer to loop, not timeout
    countdownTimer = setInterval(function () {

        if (secondsleft > 0) {
            timer.textContent = secondsleft;
        } else {

            // This function will stop the game
            StopGame();
        }
        //If there is still time left, reduce that number by 1
        secondsleft--;

    }, 1000);
    
    // The welcome display will disappear
    welcome.style.display = "none";
    // The result display will disappear
    result.style.display = "none";
    // The quiz display will show
    quiz.style.display = "flex";

    // Show the first question
    displayQuestion();
}

startQuiz.addEventListener("click", StartGame)
saveScore.addEventListener("click", SaveScore)
viewScores.addEventListener("click", ViewScores)
playAgain.addEventListener("click", StartGame)