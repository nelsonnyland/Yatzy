console.log("MAIN CONNECTED");
"use strict";
/**
 * MAIN.JS
 * This application is a simulation of a yatzy game.
 * This file handles the page events and general
 * functions of the state and behavior of the game.
 * @author Nelson Nyland
 * @version 1.0 (June 15, 2018)
**/

function $(id) {
    return document.getElementById(id);
}

/**
 * This function takes the button click event
 * from window.onload and processes initial
 * game tasks.
 */
function roll() {    
    Game.clickCount = 0;
    $("newTurn").hidden = true;
    if (Game.turnStart) {
        for (var i = 0; i < Dice.length; i++) {
            Dice[i].dieState = 2;
        }
    }        
    Game.rollCount++;
    console.log("");
    console.log("ROLL: " + Game.rollCount);
    console.log("ROUND: " + Game.round);
    calcRoll();    
    $("count").innerText = 
        "ROLL: " + Game.rollCount +
        " ROUND: " + Game.round;
    Game.turnStart = false;    
    if (Game.rollCount == 3) {
        $("roll").disabled = true;
        $("pass").hidden = false;
        $("info").hidden = false;
    }
}

/**
 * This function moves the die from active
 * to held state on the board.
 * @param {onclick} e The onclick event for the dice.
 */
function moveDie(e) {
    var targetID = e.target.id;    
    var i = targetID.substring(3);
    if (Number(Dice[i].dieState) == 1) {
        Dice[i].dieState = 2;
    } else {
        Dice[i].dieState = 1;
    }
    displayRoll();
}

/**
 * This function selects the score on the board
 * by using the onclick event to choose and save
 * the correct score.
 * @param {onclick} e The onclick event for the scorecard.
 */
function selectScore(e) {
    if (Game.gameOver == false) {
        if (Game.clickCount == 0) {
            if (Game.currPlayer == 1) {
                var scorecard = ScoreCard1;
                var selected = Selected1;
                var j = "b";
            } else { // current player 2
                var scorecard = ScoreCard2;
                var selected = Selected2;
                var j = "c";
            }        
            var targetID = e.target.id;
            var t = targetID.substring(1);    
            var currID = j + t;
            if (selected[t] == 0 && // unselected
                targetID == currID) {
                scorecard[t] = displayCard[t];
                selected[t] = 1; // selected
                total(scorecard);
                Game.clickCount++;
                displayScore(scorecard, selected);
                clearFields(selected, j);
                $(targetID).setAttribute("class", "score");            
                switchTurn();
            }
        }
    }    
}

/**
 * This function switches the turn between
 * players by handling the state and notifications
 * on the page.
 */
function switchTurn() {
    $("pass").hidden = true;
    $("info").hidden = true;
    // increase round
    if (Game.currPlayer == 2) {
        Game.round++;
    }    
    checkGameOver();
    // increase turn
    Game.turn++;
    // change player
    if (Game.currPlayer == 1) {
        Game.currPlayer = 2;
        $("p1").removeAttribute("class");
        $("p2").setAttribute("class", "player");       
    } else { // if 2:
        Game.currPlayer = 1;
        $("p1").setAttribute("class", "player");
        $("p2").removeAttribute("class");
    }
    // clear roll count
    Game.rollCount = 0;
    Game.turnStart = true;
    $("roll").disabled = false;    
    $("newTurn").hidden = false;
}

/**
 * This function checks the game-over state
 * every time the turn completes.
 */
function checkGameOver() {   
    // check game rounds
    if (Game.round == (ROUNDS + 1)) {
        gameOver();
    }
    
    // check selections
    var top = true;
    // check top scores
    for (var i = 0; i < 6; i++) {
        if (Selected1[i] == 0 &&
            Selected2[i] == 0) {
            top = false;
        }
    }
    var bottom = true;
    // check bottom scores
    for (var i = 7; i < 13; i++) {
        if (Selected1[i] == 0 &&
            Selected2[i] == 0) {
            bottom = false;
        }
    }
    if (top == true &&
        bottom == true) {
        gameOver();
    }
}

/**
 * This function executes game-over state.
 */
function gameOver() {
    if (ScoreCard1[14] > ScoreCard2[14]) {
        var winner = "PLAYER 1";
    } else { // player 2 wins
        var winner = "PLAYER 2";
    }
    $("gameOver").innerText = "GAME OVER - " +
        winner + " WON";
    $("roll").disabled = true;
    Game.gameOver = true;
}

// clears the page after roll
function clearTable() {
    $("held").innerHTML = "";
    $("active").innerHTML = "";
}

// onload handles roll button click events
window.onload = function() {
    $("roll").onclick = roll;
    $("pass").hidden = true;
    $("info").hidden = true;
    $("newTurn").hidden = true;
    $("p1").setAttribute("class", "player");
}