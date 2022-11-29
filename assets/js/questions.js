// DOM elements in index.html
let quizElement = document.querySelector('main')
let startBtn = document.querySelector('#start')
let headingEl = document.querySelector('#heading')
let optionsEl = document.querySelector('#options')
let choices = document.querySelectorAll('.answerChoice')

// New DOM elements that renders after quiz starts 
let timerEl = document.createElement("h2")
let scoreEl = document.createElement("h2")

 // Questions for the quiz
 const questions = [
  {
    q: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts"
  },
  {
    q: "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses"
  },
  {
    q: "Arrays in Javascript can be used to store ____.",
    choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
    answer: "all of the above"
  },
  {
    q: "String values must be enclosed within ____ when being assigned to variables.",
    choices: ["commas", "curly brackets", "quotes", "parenthesis"],
    answer: "quotes"
  },
  {
    q: "A very useful tool for used during development and debugging for printing content to the debugger is:",
    choices: ["Javascript", "terminal / bash", "for loops", "console log"],
    answer: "console log"
  },
];

// Quiz timer and score
let currentQuestion = 0;
let score = 0;
let time = 15 * questions.length

// startQuiz function creates a timer and hides the instructions on the main element then renders the quiz
function startQuiz() {

// Hides the initial instructions and renders the quiz
  startBtn.remove()
  document.querySelector('#instructions').classList.toggle("hidden")
  choices.forEach((el) => el.classList.toggle("hidden"))
  createTimer()
  renderQuiz()
}

// When startQuiz function starts, the timer and score will also render with the quiz.
function createTimer() {
  timerEl.textContent = `Time left: ${time}`
  scoreEl.textContent = `Score: ${score}`

  quizElement.appendChild(timerEl)
  quizElement.appendChild(scoreEl)

  let gametime = setInterval(() => {
    timerEl.textContent = `Time left: ${--time}`
    if (time <= 0) {
      timerEl.remove()
      clearInterval(gametime)
      endGame()
    }
  }, 1000)
}

// renderQuiz function updates the DOM with the current question and run the nextQuestion
function renderQuiz() {
  //update content of each answer choices
  headingEl.textContent = questions[currentQuestion].q
  choices.forEach((el, i) => {
    el.textContent = questions[currentQuestion].choices[i]
    el.onclick = nextQuestion
  })
}

// Function that checks for the correct answer. It will change the colors based on the right or wrong choice. If there are no more questions, then the quiz ends.
function nextQuestion(e) {
  // If the last question is answered, timer is removed and endGame function is called.
  if (currentQuestion < questions.length - 1) {
    scoreEl.textContent = `Score: ${score}`
  let result = setTimeout(() => {
    ++currentQuestion;
    e.target.classList.remove('valid')
    e.target.classList.remove('invalid')
    renderQuiz()
  }, 350)
  result
  } else {
    timerEl.remove()
    endGame();
  }

  if (e.target.textContent == questions[currentQuestion].answer) {
    e.target.classList.add('valid')
    score += 10
  } else {
    e.target.classList.add('invalid')
    time -= 10
    score -= 10
  }
}

// endGame function removes the quiz elements from the main element and displays a form that saves user input and their quiz score to the local storage
function endGame() {
  choices.forEach((choice) => {
    choice.classList.toggle('hidden')
  })
  // Displaying messages 
  headingEl.textContent = "Congratulations, you've reached the end!"
  let form = document.createElement("form")

  
  form.innerHTML = `
  <label for="initials"> Initials 
  <input id="initials" name="initials" placeholder="Enter your Initials"/>
  </label>
  <button type="submit" value="Submit">Submit</button>
  `
  quizElement.appendChild(form)
  form.addEventListener("submit", (e) => {
    
    let recentScores = JSON.parse(localStorage.getItem("score")) || []
    let initial = e.target[0].value

    recentScores.push({ "initial": initial, "score": score })
    localStorage.setItem('score', JSON.stringify(recentScores))
    
    form.remove()
    window.location = "/highscores.html";

  })
}


startBtn.addEventListener('click', startQuiz)

// Go back to home page or reset the quiz
document.getElementById("home").addEventListener("click", () => {
  window.location = "./"
})

// Go to highscores page
document.getElementById("highscores").addEventListener("click", () => {
  window.location = "./highscores.html"
})