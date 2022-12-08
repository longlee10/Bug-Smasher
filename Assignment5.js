/*
        Author: Hoang Long Le
        ID: 301236235
        Date: July 28, 2022
*/

// Declare variables
var bug = document.getElementById('bug');
var playArea = document.getElementById('play-area');
var scoreSection = document.getElementById('scoreSection');
var resetScore = document.getElementById('resetScore');
var score = parseInt(scoreSection.innerText.slice(-1)); // Get the last char (0) and the convert to int to increment it later
var resetSpeed = document.getElementById('resetSpeed');
var time = 1800; 
var interval = setInterval(setPosition, time); // Set the interval between execution of the setPosition function to 1800 millisecs

// Functions

// Set first postion for the bug
window.addEventListener("load", setupPage);
function setupPage(){
    setPosition(); // When the page load the bug appear at a random position
}

// Add score when bug is catch
// When bug is clicked it dissappear and score incremented, interval is cleared and set a new interval with the time 100ms shorter
bug.addEventListener('click', addScore);
function addScore(){
    clearInterval(interval); 
    time-=100;
    interval = setInterval(setPosition, time);
    score++;                                                //increment score and 
    scoreSection.innerText = "SCORE: " + score.toString(); // convert it to string and concatenate to scoreSection
    bug.style.visibility = "hidden"; // Make the bug disappear when the user click on it (for better visual effect)
}

// Reset score to 0 and reset speed to 2000ms
resetScore.addEventListener('click', resetScoreToZero);
function resetScoreToZero(){
     score = 0;
     scoreSection.innerText = "SCORE: " + score.toString();
     resetSpeedToOriginal();
}

// Set up first postion (randomly)
function setPosition(){
    var top = Math.floor(Math.random()*(playArea.clientHeight - bug.clientHeight));
    var left = Math.floor(Math.random()*(playArea.clientWidth - bug.clientHeight));
    bug.style.marginTop = top + "px";
    bug.style.marginLeft = left + "px"; // Margins of the bug is created randomly so that it can change position
    bug.style.visibility = "visible";
}

// Reset speed to 2000 ms
resetSpeed.addEventListener('click', resetSpeedToOriginal);
function resetSpeedToOriginal(){
    clearInterval(interval);
    time = 1800;
    interval = setInterval(setPosition, time);
}

/*
The logic of the game:

When the page loads the setPosition function throws the bug randomly on the screen. Then this function is executed
continously with the interval of 1.8s.

When the user click on the bug, it disappear, score is incremented and original interval is cleared.
The time is decremented by 0.1s and new interval is set with the new time. 
This makes the effect that the bug is hopping increasingly faster.

The bug can only appear inside the div "play-area"

When either reset score or reset speed is clicked the interval is reset to 1.8s again.
*/