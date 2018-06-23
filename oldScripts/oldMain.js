console.log("MAIN CONNECTED");
"use strict";
/**
 * MAIN.JS
 * This application is a simulation of a yatzy game.
 * This class handles the page events and displays
 * game data to the DOM.
 * @author Nelson Nyland
 * @version 1.0 (May 31, 2018)
**/

function $(id) {
    return document.getElementById(id);
}

// put dice into play
function roll() {
    if (Game.turnStart) {
        for (var i = 0; i < Dice.length; i++) {
            Dice[i].dieState = 2;
        }
    }
    calcRoll();
    Game.gameStart = false;
    Game.turnStart = false;    
}

// moves die between held and active
function move(i) {    
    if (Number(Dice[i].dieState) == 1) {
        Dice[i].dieState = 2;
    } else {
        Dice[i].dieState = 1;
    }
    displayRoll();
}

function clearTable() {
    $("held").innerHTML = "";
    $("active").innerHTML = "";
}

window.onclick = e => {
    if (e.target.id != "roll") {
        console.log(e.target);
        console.log(e.target.id);
        var targetID = e.target.id;    
        var i = targetID.substring(3);
        move(i);
    }    
}

// onload handles roll button click events
window.onload = function() {
    $("roll").onclick = roll;    
}