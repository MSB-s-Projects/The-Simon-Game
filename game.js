// Available Colors
var buttonColors = ["red", "blue", "green", "yellow"];
// Array to store game pattern
var gamePattern = [];
// Array to store pattern from user
var userClickedPattern = [];

// variable to check if the game is started
var started = false;

// initialising the game level as 0
var level = 0;

// Checking for a keypress to start the game
$(document).keypress(function () {
  if (!started) {
    nextSequence();
    started = true;
  }
});

// handling the user's button clicks.
$(".tile").click(function (e) {
  var UserChosenColor = e.target.id;
  userClickedPattern.push(UserChosenColor);
  playSound(UserChosenColor);
  animatePress(UserChosenColor);

  // Checking the user's answer after each input
  checkAnswer(userClickedPattern.length - 1);
});

// main function to determine the next sequence

function nextSequence() {
  // emptying the user click pattern before starting the next level
  userClickedPattern = [];

  // Changing the level everytime the function is called
  level++;

  // change the heading to the current level
  $("h1").text("level " + level);

  // Creating a random number to choose next color
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];

  // Pushing the random color generated to game pattern
  gamePattern.push(randomChosenColor);

  // Animating the game pattern color and playing a sound
  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColor);

  checkAnswer(level);
}

// A function to play sounds
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// A function to animate the buttons clicked by user
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// A function to check the user input pattern
function checkAnswer(currentLevel) {
  // checking if the pattern entered by the user is correct
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");

    // checking if the user has entered the complete pattern
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    console.log("wrong");
    // Playing the wrong sound effect and the wrong animation
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    },200);

    // changing the text of h1
    $("h1").text("Game Over, Press Any Key to Restart");
    // calling the startOver function
    startOver();
  }
}

// A startOver function to reset the variable values
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
