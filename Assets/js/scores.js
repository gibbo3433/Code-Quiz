var scoresheet = document.getElementById("scoresheet")
var backtoQuiz = document.getElementById("backtoQuiz")

// This will allow the user to return back to the quiz html page
function BackToQuiz() {
    window.location.href = 'index.html';
}

for ( var i = 0; i < localStorage.length; i++) {

    var initials = localStorage.key(i);
    var score = localStorage.getItem(initials);

    var result = document.createElement("div");
    result.classList.add('result');

    tables

    result.innerHTML = '<div class="score-item"> ${initials} </div>'


}



backtoQuiz.addEventListener("click", BackToQuiz)