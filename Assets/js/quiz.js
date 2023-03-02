var startQuiz = document.getElementById("startQuiz")
var saveScore = document.getElementById("saveScore")
var playAgain = document.getElementById("playAgain")

var welcome = document.getElementById("welcome")
var quiz = document.getElementById("quiz")
var result = document.getElementById("result")

var options = document.getElementById("options")
var message = document.getElementById("message")


var summary = document.getElementById("summary")

var timer = document.getElementById("timer")


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
    result.style.display = "";

    // This will deisplay the score of the most recent game
    // summary.textContent = " Your score this game was " + score;
}

// This function will save the recent initals and  score to the local storage 
function onSaveScore (e) {
    var initials = document.getElementById("initials").value

    if  (initials !== "" ) {
        localStorage.setItem(initials, score);
        // document.getElementById("initals").value = "";
    }
}

// This function changes to show the score.html page
function onViewScores (e) {
    window.location.href = 'scores.html'
}

// If the user selects the correct score, their score will add one. If not, it will subtract 1
// Also, after the score has been selected and the score has changed, the next question will appear
function onSelectAnswer (e) {
    var correctanswer = questions[currentQuestion].answer;
    var userAnswer = e.target.textContent;

    if (correctanswer === userAnswer) {
        score ++;
        displayMessage (message, 'You got that right!')

    } else {
        score --;
        displayMessage (message, 'You got that wrong!')
        // Subtract 10 seconds from the time if an answer is wrong
        secondsleft -=10;
        updateTimer();
    }

    // shows the next question
    displayQuestion();
}

function updateTimer () {
    // Update the timer when a question is wrong
    timer.textContent = secondsleft;
}

function displayMessage(messageElement, message) {
    messageElement.textContent = message;

    setTimeout(function () {
        message.textContent = " ";
    }, 1500);
}

function displayQuestion () {
    
    // This moves onto the next question
    currentQuestion ++;
    console.log (" The question now is " + currentQuestion);

    if (currentQuestion >= questions.length) {
        stopGame ();
        return
    }
      // Get the current question from the questions array
  var question = questions[currentQuestion];

  // Display the question title
  document.getElementById("question").textContent = question.title;

  // Display the answer choices
  var choices = question.choices;

  // This will put the questions into the options div by grabbing its element
  var options = document.getElementById("options");
  options.innerHTML = "";
  // this will cycle through each question until all questions have been displayed
  for (var i = 0; i < choices.length; i++) {
    var option = document.createElement("div");
    option.textContent = choices[i];
    option.classList.add("option");
    option.addEventListener("click", onSelectAnswer);
    options.appendChild(option);
  }

}


// This function will start the game
function onStartGame () {
    
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
            stopGame();
        }
        //If there is still time left, reduce that number by 1
        secondsleft--;

    }, 1000);

    // The quiz display will show
    quiz.classList.remove("hidden");
    // The welcome display will disappear
    welcome.style.display = "none";
    // The result display will disappear
    result.style.display = "none";
    // result.style.display = "none";
    quiz.style.display = "flex";
    

    // Show the first question
    displayQuestion();
}

startQuiz.addEventListener("click", onStartGame)
saveScore.addEventListener("click", onSaveScore)
viewScores.addEventListener("click", onViewScores)
playAgain.addEventListener("click", onStartGame)