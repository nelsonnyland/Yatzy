console.log("GAME CONNECTED");
"use strict";
/**
 * GAME.JS
 * This file handles the game logic and 
 * deligation of commands to calculate
 * the die and various scores.
**/

/**
 * This function calculates the roll for each
 * die and sends the dice to be displayed and
 * calculated.
 */
function calcRoll() {
    for (var i = 0; i < Dice.length; i++) {
        if (Dice[i].dieState == 2) {
            Dice[i].dieScore = 
                getRandomInt(MINVALUE, MAXVALUE);
            currRoll[i] = Dice[i].dieScore;
        }
    }
    console.log("current roll: " + currRoll);
    displayRoll();
    if (Game.currPlayer == 1) {
        calcScoreCard(ScoreCard1, Selected1);
        console.log("ScoreCard1: " + ScoreCard1);
    } else {
        calcScoreCard(ScoreCard2, Selected2);
        console.log("ScoreCard2: " + ScoreCard2);
    }    
}

/**
 * Handles deligating scorecard calculation
 * function calls.
 * @param {Array} scorecard The current player's scorecard
 * @param {Array} selected The current player's selections
 */
function calcScoreCard(scorecard, selected) {
    calcUpper(scorecard, selected);
    calcUpperTotal(scorecard); 
    calcScoreCount(scorecard);
    calcCurrRollTotal();
    threeOfKind(scorecard, selected);
    fourOfKind(scorecard, selected);
    fullhouse(scorecard, selected);
    straight(scorecard, selected);
    chance(scorecard, selected);
    yatzy(scorecard, selected);
    displayScore(scorecard, selected);
}

/**
 * Gets a random integer value between
 * the minimum value and maximum value
 * inclusively.
 * @param minValue The inclusive min value
 * @param maxValue The inclusive max value
 */
function getRandomInt(minValue, maxValue) {
    minValue = Math.floor(minValue);
    maxValue = Math.floor(maxValue);
    return Math.floor(Math.random() * 
        (maxValue - minValue + 1) + minValue);
}