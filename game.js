var buttonColours = ["red", "blue", "green", "yellow"]

var level = 0;

var gamePattern = [];
var userClickedPattern = [];

var started = false;

$(document).on("keypress", function(){
  if(!started){
  $("h1").text("level " +level);
  nextSequence();
  started = true;
  }
});

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  $("#" + userChosenColour).addClass("pressed");
  setTimeout(function(){
      $("#" + userChosenColour).removeClass("pressed")

  },100);
  checkAnswer(userClickedPattern.length -1);
})


function nextSequence(){
  userClickedPattern = [];

  level++;
  $("h1").text("level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);


}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
console.log("bka");
if(gamePattern.length===userClickedPattern.length){
  setTimeout(function () {
    nextSequence();
  }, 1000);}
}else{
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  $("#level-title").text("Game Over, Press Any Key to Restart");
  startOver();
};

}

function startOver(){
level = 0;
gamePattern = [];
started = false;
}