// DOM elememts
var scoreRecords = document.getElementById('scoreRecords')
var highScore = document.querySelector("#highScore");
var clear = document.querySelector("#clearScore");
var goBack = document.querySelector("#goBack");



// Go back to home or resets the quiz
document.getElementById("home").addEventListener("click", () => {
  window.location = "/"
})

// Changes back to the index.html which is the main page
goBack.addEventListener("click", function () {
  window.location.replace("./index.html");
});
// Displays scores as a li element in the main element
function displayScores() {
    scoreRecords.innerHTML = ` 
    <h1 <strong>High Scores</strong>
    </h1>`
    
    // Parses the local storage data into a string. If there is no score, then the function ends.
    let recentScores = JSON.parse(localStorage.getItem("score"))
    if (recentScores == null) {
      return
    }
    // Sorts the scores in the local storage to be highest to lowest.
    recentScores.sort((a, b) => b.score - a.score)
    for (var i = 0; i < recentScores.length; i++) {
      // After sorting, an li element will be created for each score.
        var li = document.createElement("li")
        li.innerHTML = recentScores[i].initial + " - " + recentScores[i].score;
        scoreRecords.appendChild(li);
    }
};

// Calls for the scores to render on page
displayScores();

// The top home button goes back home / the quiz page
document.getElementById("home").addEventListener("click", () => {
  window.location = "./index.html"
})

// Changes back to the index.html which is the main page
goBack.addEventListener("click", function () {
  window.location.replace("./index.html");
});

// Clear scores in local storage
clear.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});