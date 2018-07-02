console.log("DISPLAY CONNECTED");
"use strict";
/**
 * DISPLAY.JS
 * This files displays the scores to the page
 * and attaches onclick events to each element.
*/

/**
 * This function displays the die roll on the
 * page whether held or active and attaches
 * onclick listeners to each die.
 */
function displayRoll() {     
    clearTable();
    for (var i = 0; i < Dice.length; i++) {
        var display = 
            "<img id=\"die" + i + "\" " +
            "class=\"die\" src=\"img/die" + 
            currRoll[i] + ".png\" alt=\"die\"" + 
            " height=\"50\" width=\"50\">";   
        if (Dice[i].dieState == 1) {
            $("held").innerHTML += display;
        } else {
            $("active").innerHTML += display;
        }
    }    
    for (var i = 0; i < Dice.length; i++) {
        var id = "die" + i;
        $(id).onclick = moveDie;
    }
}

/**
 * This function displays the scores on the scorecard and 
 * attaches event listeners to each score.
 * @param {Array} scorecard The current player's scorecard
 * @param {Array} selected The current player's selections
 */
function displayScore(scorecard, selected) {
    if (Game.currPlayer == 1) {
        var j = "b";   
    } else {
        var j = "c";
    }
    for (var i = 0; i < SCORELENGTH; i++) {
        var id = j + i;
        $(id).innerText = scorecard[i];
        if (displayCard[i] != 0 &&
            selected[i] == 0) { // unselected
            $(id).innerText = displayCard[i];
        }
    }
    // wire up on-click events
    for (var i = 0; i < 6; i++) {
        var id = j + i;
        $(id).onclick = selectScore;
    }
    for (var i = 7; i < 14; i++) {
        var id = j + i;
        $(id).onclick = selectScore;
    }   
}

/**
 * This function clears the fields after a selection is made.
 * @param {Array} selected The current player's selections
 * @param {*} j The beginning letter of the element id
 */
function clearFields(selected, j) {
    for (var i = 0; i < 6; i++) {
        if (selected[i] == 0) { // unselected
            var id = j + i;
            $(id).innerText = "";
        }
    }
    for (var i = 7; i < 14; i++) {
        if (selected[i] == 0) { // unselected
            var id = j + i;
            $(id).innerText = "";
        }
    }
}