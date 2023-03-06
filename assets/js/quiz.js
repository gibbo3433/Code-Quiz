var startQuiz = document.getElementById("startQuiz")
var saveScore = document.getElementById("saveScore")
var playAgain = document.getElementById("playAgain")
var highScores = document.getElementById("viewScores")
var highScoreList = document.getElementById("highScoreList")
var textEntry = document.getElementById("initials")

var welcome = document.getElementById("welcome")
var quiz = document.getElementById("quiz")
var result = document.getElementById("result")

var options = document.getElementById("options")
var message = document.getElementById("message")

var summary = document.getElementById("summary")
var timer = document.getElementById("timer")

var currentScore = 0;
var secondsleft = 0;
var score = 0;
var currentQuestion = 0;
var countdownTimer;
textEntry.style.display = "none"

function stopGame() {
    
    // This will stop the countdown timer when the game stops
    clearInterval(countdownTimer)

    // This will clear the text context of the timer
    timer.textContent = "";

    // This line will hide the quiz style, and display the result style
    textEntry.style.display = "block"
    quiz.style.display = "none";
    result.style.display = "";

    // This will deisplay the score of the most recent game
    // summary.textContent = " Your score this game was " + score;
}

// This function will save the recent initals and  score to the local storage 
function onSaveScore () {

    // Grab the initials from what the user puts in the placeholder
    var initials = document.getElementById("initials").value

    // Make an empty array for all the scores and names to go in
    var scores = [];

    // Grab the local scores from localStorage 
    var localScores = localStorage.getItem("score");

    if (localScores !== null) {
        scores = JSON.parse(localScores);
    }

    // Push the name and the score of the person into the local storage
    scores.push({
        name: initials,
        score: currentScore,
    });

    localStorage.setItem("score", JSON.stringify(scores));

    getHighScores();

}

function getHighScores() {
    //clear the html file of data
    highScoreList.innerHTML = "";
  
    //display new from the local storage
    var score = JSON.parse(localStorage.getItem("score"));
   
    //sorts scores from highest to lowesst
    var sortedScores = score.sort((a, b) => b.score - a.score);
  
  
    // save top 5 scores to local storage
    sortedScores.splice(5);
  
    //stores top 5 scores into local storage 
    localStorage.setItem("topScores", JSON.stringify(sortedScores));
  
    
  //retrieve from local storage
  var topScores = JSON.parse(localStorage.getItem("topScores"));
  
  //mapping top scores into HTML
    highScoreList.innerHTML = topScores
      .map((score) => {
        return `<span>${score.name} - ${score.score}</span>`;
      }).join("");
    
    highScoreList.style.display = "flex"
    
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
        currentScore += 10;
        displayMessage (message, 'You got that right!')

    } else {
        currentScore -= 5;
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

    // Stop the game if there is no time left
    if (secondsleft <=0) {
        stopGame();
    }
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
    

    textEntry.style.display = "none"
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
playAgain.addEventListener("click", onStartGame)
highScores.addEventListener("click", getHighScores);
