console.log("GAME CONNECTED");
"use strict";
/**
 * GAME.JS
 * This file handles the game logic for yatzy.
**/

// calculates roll
function calcRoll() {
    for (var i = 0; i < Dice.length; i++) {
        if (Dice[i].dieState == 2) {
            Dice[i].dieScore = 
                getRandomInt(MINVALUE, MAXVALUE);
            currRoll[i] = Dice[i].dieScore;
        }
    }
    console.log(currRoll);
    if (Game.currPlayer == 1) {
        calcTurnScore(ScoreCard1);
    } else {
        calcTurnScore(ScoreCard2);
    }    
    displayRoll();
}

// calculates turn score
function calcTurnScore(scorecard) {
    calcUpper(scorecard);
    calcUpperTotal(scorecard); 
    calcScoreCount(scorecard);
    calcCurrRollTotal();
    calcMiddle(scorecard);

    calcGameScore(scorecard);   
}

// calculates game score
function calcGameScore(scorecard) {
    displayScore(scorecard);
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