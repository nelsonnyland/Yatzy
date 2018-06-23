console.log("SCORES CONNECTED");
"use strict";
/**
 * SCORES.JS
 * This file handles the algorithms for parsing
 * scores for yatzy.
*/
// calculates upper score
// i is the die being checked
// j is the score being checked (j + 1)
// the score is the face of the die
function calcUpper(scorecard) {
    displayCard = scoreCard.slice();
    for (var i = 0; i < Dice.length; i++) {
        for (var j = 0; j < FACES; j++) {        
            if (scorecard[j] == 0 &&
                currRoll[i] == (j + 1)) {
                displayCard[j] += (j + 1);
            }
        }                
    }
}

// calculates upper total and bonus
function calcUpperTotal(scorecard) {
    Game.upperTotal = 0;
    for (var i = 0; i < 6; i++) {
        Game.upperTotal += scorecard[i];
    }
    if (Game.upperTotal >= UPPERBOUND) {
        scorecard[6] = BONUS;
        Game.upperTotal += scorecard[6];
    }
}

// calculate the die count
function calcScoreCount(scorecard) {
    Game.currRollTotal = 0; // the sum of all die faces
    scoreCount = [0, 0, 0, 0, 0, 0]; 
    for (var i = 0; i < Dice.length - 1; i++) { // current die
        for (var j = i + 1; j < Dice.length; j++) { // the other die
            if (currRoll[i] == currRoll[j]) {
                for (var k = 0; k < scoreCount.length; k++) {
                    if (currRoll[i] == (k + 1)) {
                        scoreCount[k]++;
                    }
                }
            }         
        }                
    }    
    console.log("score count: " + scoreCount);
}

// calculate current roll total
function calcCurrRollTotal() {
    for (var i = 0; i < currRoll.length; i++) {
        Game.currRollTotal += currRoll[i];       
    }
    console.log("roll total: " + Game.currRollTotal);
}

// calculate multiple kind and full house
function calcMiddle(scorecard) {        
    for (var i = 0; i < scoreCount.length; i++) {        
        if (scoreCount[i] == 3) { // three of a kind
            if (scorecard[7] == 0) { // no score
                displayCard[7] = Game.currRollTotal;
            }
        }
        if (scoreCount[i] == 4) { // four of kind
            if (scorecard[8] == 0) {
                displayCard[8] = Game.currRollTotal;
            }
        }
    }
    if (displayCard[7] > 0 && 
        displayCard[8] > 0) { // three of a kind and four of a kind
        if (scorecard[9] == 0) {
            displayCard[9] = FULLHOUSE;
        }
    }
}

function straight() {
    var test = currRoll.slice();
    test.sort();
    // test for small straight
    if (test[0] == (test[1] + 1) &&
        test[1] == (test[2] + 1) &&
        test[2] == (test[3] + 1)) {
        displayCard[10] = SMALLSTRAIGHT;
    } else if (test[1] == (test[2] + 1) &&
               test[2] == (test[3] + 1) &&
               test[4] == (test[5] + 1)) {
        displayCard[10] = SMALLSTRAIGHT;
    }
    // test for large straight
    if (test[0] == (test[1] + 1) &&
        test[1] == (test[2] + 1) &&
        test[2] == (test[3] + 1) &&
        test[3] == (test[4] + 1)) {
        displayCard[11] = LARGESTRAIGHT;
    }
}