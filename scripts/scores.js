console.log("SCORES CONNECTED");
"use strict";
/**
 * SCORES.JS
 * This file handles the algorithms for parsing
 * scores for the scorecard.
*/

/**
 * Calculates the upper scorecard.
 * The score is the face of the die.
 * i is the die being checked
 * j is the score being checked (j + 1)
 * @param {Array} scorecard The current player's scorecard
 * @param {Array} selected The current player's selections
 */
function calcUpper(scorecard, selected) {
    displayCard = scoreCard.slice();
    for (var i = 0; i < Dice.length; i++) {
        for (var j = 0; j < FACES; j++) {        
            if (selected[j] == 0 &&
                currRoll[i] == (j + 1)) {
                displayCard[j] += (j + 1);
            }
        }                
    }
}

// Calculates the upper total and bonus.
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

/**
 * Calculates the times a die face occurs
 * in the current roll whether held or active.
 */
function calcScoreCount(scorecard) {
    Game.currRollTotal = 0; // the sum of all die faces
    scoreCount = [0, 0, 0, 0, 0, 0]; 
    var test = currRoll.slice();
    test.sort();
    for (var i = 0; i < Dice.length; i++) { // current die
        for (var j = i + 1; j < Dice.length; j++) { // the other die
            if (test[i] == test[j]) {
                for (var k = 0; k < scoreCount.length; k++) {
                    if (test[i] == (k + 1)) {
                        scoreCount[k]++;
                        test[j] = 0; // removes found die
                    }
                }
            }         
        }                
    }    
}

// calculates the sum of the current roll
function calcCurrRollTotal() {
    Game.currRollTotal = 0;
    for (var i = 0; i < currRoll.length; i++) {
        Game.currRollTotal += currRoll[i];       
    }
}

// calculates three of a kind score
function threeOfKind(scorecard, selected) {
    if (selected[7] == 0) {
        for (var i = 0; i < scoreCount.length; i++) {
            if (scoreCount[i] == 2) {
                displayCard[7] = Game.currRollTotal;
            }
        }
    }
}

// calculates four of a kind score
function fourOfKind(scorecard, selected) {
    if (selected[8] == 0) {
        for (var i = 0; i < scoreCount.length; i++) {
            if (scoreCount[i] == 3) {
                displayCard[8] = Game.currRollTotal;
            }
        }
    }
}

// calculates fullhouse score
function fullhouse(scorecard, selected) {
    var two = 0;
    var three = 0;
    if (selected[9] == 0) {
        for (var i = 0; i < scoreCount.length; i++) {
            if (scoreCount[i] == 1) {
                two++;
            }
        }
        for (var i = 0; i < scoreCount.length; i++) {
            if (scoreCount[i] == 2) {
                three++;
            }
        }
    }
    if (two > 0 && three > 0) {
        displayCard[9] = FULLHOUSE;
    }
}

// calculates small and large straight score
function straight(scorecard, selected) {
    var count = 0;
    var test = currRoll.slice();
    test.sort();
    test = removeDuplicates(test);
    var j = 0; // testing first half of set
    straightTest(scorecard, selected, test, j);
    j = 1; // testing second half of set
    straightTest(scorecard, selected, test, j);
}

// tests whether current roll is a small or large straight
function straightTest(scorecard, selected, test, j) {
    var count = 0;
    for (var i = j; i < test.length - 1; i++) {
        if (test[i] == (test[i + 1] - 1)) {
            count += 1;            
        }            
    } // testing for small straight
    if (count >= 3) {
        if (selected[10] == 0) {
            displayCard[10] = SMALLSTRAIGHT;
        }        
    } // testing for large straight
    if (count == 4) {
        if (selected[11] == 0) {
            displayCard[11] = LARGESTRAIGHT;
        }        
    }
}

// removes duplicate values for straight test
function removeDuplicates(test) {
    for (var i = test.length - 1; i >= 0; i--) {
        if (test[i] == test[i - 1]) {
            test.splice(i, 1);
        }
    }
    return test;
}

// calculates chance score
function chance(scorecard, selected) {
    if (selected[12] == 0) {
        displayCard[12] = Game.currRollTotal;
    }    
}

// calculates yatzy score (5 of a kind)
function yatzy(scorecard, selected) {
    if (selected[13] == 0) {
        for (var i = 0; i < scoreCount.length; i++) {
            if (scoreCount[i] == 4) {
                displayCard[13] = YATZY;
            }
        }
    }
}

/**
 * Calculates the total score for the 
 * current player's scorecard.
 * @param {Array} scorecard The current player's scorecard
 */
function total(scorecard) {
    var total = 0;
    for (var i = 0; i < 14; i++) {
        total += scorecard[i];
    }
    scorecard[14] = total;
}
