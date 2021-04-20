var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var lvl = 0;
var gameStarted = false;

$(document).keydown(function() {
    if (!gameStarted) {
        $("h1").text("Level " + lvl);
        nextSequence();
        gameStarted = true;
    }
});

$(".start-game").click(function() {
    if (!gameStarted) {
        $("h1").text("Level " + lvl);
        nextSequence();
        gameStarted = true;
    }
});

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    isRight(userClickedPattern.length-1);
});

function nextSequence() {
    userClickedPattern = [];
    lvl++;
    $("h1").text("Level " + lvl);
    var rnd = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[rnd];
    gamePattern.push(randomChosenColour)
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function isRight(i){
    if(gamePattern[i] === userClickedPattern[i]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else{
        gameStarted = false;
        gamePattern = [];
        lvl=0;
        $("body").addClass("game-over");
        playSound("wrong");
        setTimeout(function () {
            $("body").removeClass("game-over");
            $("h1").text("Game Over, Press Key to Start");
        }, 500);
    }

}

function playSound(name) {
    new Audio("sounds/" + name + ".mp3").play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}
