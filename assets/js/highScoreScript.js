var rootEl = $("#root");
var goBackBTN = $(".goback-button");
var clearBTN = $(".clear-button");
var highScoreOl = $("<ol>");

renderHighScores();
//our renderHighscores function will be in charge of grabbing the
//values stored in my array of objects saved in the localStorage
// first we parse them into a new variable which will be sorted
//depending on the total score, in an descending order, which once again
//will be storing in a new variable which will be our sorted elements array
function renderHighScores() {
  var highScoreValues = JSON.parse(localStorage.getItem("scoreInfo")) || [];
  if (highScoreValues.length === 0) {
    rootEl.append($("<p>").text(" No high scores registered!"));
  }

  var sortedHighscores = highScoreValues.sort(function (a, b) {
    if (a.score > b.score) {
      return -1;
    }
  });
  sortedHighscores.forEach((element) => {
    console.log(element.initials);
    var highscoresLi = $("<li>");
    highscoresLi.text(element.initials + " - " + element.score);
    highScoreOl.append(highscoresLi);
    rootEl.append(highScoreOl);
    // if (element.initials === null || element.score === null) {
    //   $("li").remove();
    //   $("p").remove();
    //   rootEl.append($("<p>").text(" No high scores registered!"));
    // }
  });
}

//Here we are re-directing the user to the main index page
goBackBTN.on("click", function () {
  window.location.assign("/index.html");
});

// Here, listening the click of the clear highscores button and
//with the help of the function "clear()" provided by localStorage
//we are able to clear the memory
//in our localStorage,
clearBTN.on("click", function () {
  localStorage.clear();
  $("li").remove();
  $("p").remove();
  rootEl.append($("<p>").text(" No high scores registered!"));
});
