console.log("DISPLAY CONNECTED");
"use strict";
/**
 * DISPLAY.JS
 * This files displays the scores to the page.
*/

// displays the current roll whether
// held or active
function displayRoll() {     
    clearTable();
    for (var i = 0; i < Dice.length; i++) {
        var display = 
            "<img id=\"die" + i + "\" " +
            "src=\"img/die" + currRoll[i] + 
            ".png\" alt=\"die\" height=\"50\"" +
            " width=\"50\">";
        console.log(display);
        if (Dice[i].dieState == 1) {
            $("held").innerHTML += display;
        } else {
            $("active").innerHTML += display;
        }
    }
}

// displays the scores for the current
// turn
function displayScore(scorecard) {
    var text = document.querySelectorAll("td")
    // skip through td elements        
    if (Game.currPlayer == 1) {
        var j = 1;        
    } else {
        var j = 2;
    }
    for (var i = 0; i < SCORELENGTH; i++) {
        text[j].innerText = scorecard[i];
        if (displayCard[i] != 0) {
            text[j].innerText = displayCard[i];
        }
        j += 3;
    }
}