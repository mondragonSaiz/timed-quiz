// We grab the root element in our index with the jquery selector
var rootEl = $("#root");
var rootUl = $("<ul>");
var timeSpan = $("#timer-count");
var startBTN = $("#boton");
var lineaDiv = $("<hr/>");

// Goblal Variables
var seconds;
var counter = 0;
var scoreCounter = 0;
var answerLi;
var timer;
var submitBTN = $("<button>");

rootEl.addClass("card");
var scoreInitials = $("<input>");

var questions = [
  "What does HTML stands for :",
  "What does CSS Stands for :",
  "Arrays in JavaScript can be used to store :",
  "What does WWW stands for :",
];

var answers = [];

answers[0] = new Array(
  "Hypertext Markup Language",
  "Hypertool Makeup Language",
  "Hyperboot Markup Language"
);

answers[1] = new Array(
  "Coconout Styled Sheet",
  "Cascading Style Sheet",
  "Cascading Styled Storm"
);

answers[2] = new Array("Strings", "objects", "both");

answers[3] = new Array("Wake Woke Woken", "World Woke Web", "World Wide Web");

var correctAnswers = [
  "Hypertext Markup Language",
  "Cascading Style Sheet",
  "both",
  "World Wide Web",
];

// I set the time (seconds) that the user will have to answer the quiz
seconds = 60;

//When I click on my button element, I call the initQuiz() function
// Which it will add a hidden class to the Start quiz button and
// it will call for the RenderQuestion(), renderAnswer(), and startTimer() functions
startBTN.on("click", initQuiz);

function initQuiz() {
  //console.log("Init quiz clicked!!!");
  startBTN.addClass("hiddenBTN");
  renderQuestion();
  renderAnswer();
  startTimer();
}

//My function startTimer will set an interval, with a function that
// is going to rest by 1 the seconds and display it in an span
// it will also set some conditions when the time reaches 0
function startTimer() {
  //console.log(answers[0].a1);

  timer = setInterval(function () {
    seconds--;
    console.log(seconds);
    timeSpan.text(seconds.toString());
    if (seconds === 0) {
      console.log("Time's UP!!!!");
      var yesOrNo = confirm("Out of time! Do you want to play again?");
      if (yesOrNo) {
        location.reload();
      }
      // console.log("seconds left : ", seconds);
      // clearInterval(timer);
      // $("p").remove();
      // $("li").remove();
    }
  }, 1000);
}

// Our renderQuestion function is going to render our set
//of questions which are stored in an array
// in order to do this, we need the help of a counter, which will be changing
// everytime we click on an answer
var question = $("<p>");
function renderQuestion() {
  question.text(questions[counter]);
  rootEl.append(question);
}

// Here I'm creating the message that will be below the answers to
// display wheter or not the user was correct in his answer
var correctOrWrongMessage = $("<h2>");
correctOrWrongMessage.addClass("message-class");

// Here our  rendeAnswerFunction will render our set of answers
//which is an array of arrays for each question,
//we also use the help of a counter to iterate in that 2D array
// we also add a new attribute to each answer(li element)
// which will contain the valu of that answer in order to check it later
function renderAnswer() {
  rootEl.append(rootUl);
  for (var i = 0; i < answers[counter].length; i++) {
    answerLi = $("<li>");
    answerLi.text(answers[counter][i]);
    answerLi.addClass("li-c");
    answerLi.attr("data-answer", answers[counter][i]);
    rootUl.append(answerLi);
  }
  //Here we are calling the renderMessage function to show the user
  // wheter or not he was right in his choice of answer.
  renderMessage();

  //In this part we are adding a click event to our list of answers
  //that are displayed on screen, we use the data-answer attribute
  //that was added above in order to pass that value to out checkAnswers
  // function
  $("li").click(function () {
    console.log(this.getAttribute("data-answer"));
    checkAnswer(this.getAttribute("data-answer"));
    console.log("counter :", counter);
    console.log("questions :", questions.length);
    //When we reach the maximum amount of questions we will trigger the
    //renderScore() funtion ir order to shos the users their highscore
    //and we also stop our timer
    if (counter === questions.length - 1) {
      question.text("");
      renderScore();
      renderMessage();
      clearInterval(timer);
      console.log("Seconds left : ", seconds);
    }
    if (seconds <= 0) {
      var yesOrNo = confirm(
        "Wrong answer! Sorry, you ran out of time, do you want to play again?"
      );
      if (yesOrNo) {
        location.reload();
      }
    }
    counter++;
    $("li").remove();

    renderQuestion();
    renderAnswer();
  });
}

//Here in our checkAnswer funtion will check the user choice,
//with the value we recieve in the renderAnswer function when the user
//clicks on any answer listed (li elements).
// if the user is right will be adding points to their score
// If the user is wrong will be substracting 10 seconds from their time left
// it's important to mention that if the user choices are wrong
// and the time substracted makes the time reaches 0 or less the program will stop
// (Line 140: inside renderAnswer() function)
function checkAnswer(answer) {
  console.log("Respuesta : ", answer);
  if (answer === correctAnswers[counter]) {
    //console.log("Estas En lo correcto!!!");
    correctOrWrongMessage.text("Correct!!!");
    scoreCounter += 10;
    //console.log(event.val());
  } else {
    //console.log("Lo siento, estas mal de la cabeza");
    correctOrWrongMessage.text("Wrong!");
    seconds -= 10;
  }
}

//

function renderScore() {
  console.log("hola soy el score");
  var initialsSection = $("<div>");

  var scoreTitle = $("<h3>");
  scoreTitle.text("All done");

  var scoreMsg = $("<p>");
  scoreMsg.text("Your final score is : " + scoreCounter);
  //Here we are setting our final score to the localStorage so we can
  // use that value in the highScores page in order to show the user
  //the list of highscores

  scoreMsg.addClass("score-msg");
  var initialsMSG = $("<p>");
  initialsMSG.text("Please enter your initials");
  initialsMSG.addClass("score-msg");
  scoreInitials.addClass("sc-initials");
  scoreInitials.attr("id", "initials");

  submitBTN.addClass("submit-btn");
  //submitBTN.type('submit')
  submitBTN.attr("type", "submit");
  submitBTN.text("Submit");
  rootEl.append(scoreTitle);
  rootEl.append(scoreMsg);
  initialsSection.append(initialsMSG);
  initialsSection.append(scoreInitials);
  initialsSection.addClass("score-section");
  initialsSection.append(submitBTN);
  rootEl.append(initialsSection);
}

function renderMessage() {
  rootEl.append(lineaDiv);
  rootEl.append(correctOrWrongMessage);
}

//Here, we are listenning to the submitBTN for a click event
// which will trigger the submitInitials() function.
submitBTN.on("click", submitInitials);

//Our submitInitials function will be in charge of saving the value
//the user inputs in order to "save" them in the localStorage
//we also re-direct the user to the highScores page.
function submitInitials(event) {
  event.preventDefault();
  var highScoreArray = JSON.parse(localStorage.getItem("scoreInfo")) || [];
  var initials = document.querySelector("#initials").value;
  var scoreEntry = {
    initials: initials,
    score: scoreCounter,
  };
  highScoreArray.push(scoreEntry);
  console.log(initials);
  localStorage.setItem("scoreInfo", JSON.stringify(highScoreArray));

  window.location.replace("highScores.html");
}
