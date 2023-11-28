// alert("working");
// $("h1").css("color", "red");

var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;

//For starting the game
$(document).keypress(function(){
    $("h1").text("Press A Key to Start");
    nextSequence();
    $("h1").text("Level " + level);
})


//the user click
$(".btn").on("click", function(){

    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});


function nextSequence(){

    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 3) + 1;
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}


function playSound(name){

    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColour) {

    var addPressed = $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $(addPressed).removeClass("pressed");
    }, 100);
}


function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        if(level-1 === currentLevel){
            setTimeout(function(){
                userClickedPattern = [];
                nextSequence();
            }, 1000);
        }
    }

    else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over! Press Any Key to Restart");
        // $("h1").css("color", "black");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}


function startOver(){
    
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}

