console.log("VAR CONNECTED");
"use strict";
/**
 * VAR.JS
 * This file contains the variables for yatzy.
**/

// CONSTANTS:
// The MINVALUE is the lowest face on a die.
const MINVALUE = 1;

// The MAXVALUE is the highest face on a die.
const MAXVALUE = 6;

// the number of different faces on a die
const FACES = 6;

// the index of the scorecard where the
// lower scores begin to be calculated
const LOWERSCOREINDEX = 7;

// the length of the scorecard
const SCORELENGTH = 15;

// the required score for the bonus
const UPPERBOUND = 63;

// the bonus for the upperTotal
const BONUS = 35;

// full house score
const FULLHOUSE = 25;

// small straight score
const SMALLSTRAIGHT = 30;

// large straight score
const LARGESTRAIGHT = 40;

// yatzy score
const YATZY = 50;

// A round of Yatzy has 13 rounds of play.
// Each round is 2 turns.
const ROUNDS = 13;

// the face value of the five dice
var currRoll = [1, 1, 1, 1, 1]; 

// the face count from each die
var scoreCount = [0, 0, 0, 0, 0, 0]; 

/**
 * The Game object helps
 * store the state and control 
 * the behavior of the game.
 */
var Game = {
    round: 1,
    turn: 1,
    currPlayer: 1,    
    clickCount: 0,
    rollCount: 0,
    currRollTotal: 0,
    upperTotal: 0,
    turnStart: true,
    gameOver: false
};

// the scorecard array template
var scoreCard  = [
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0
];

// Player 1 and 2 score cards
var ScoreCard1 = scoreCard.slice(); // for player 1
var ScoreCard2 = scoreCard.slice(); // for player 2

// scorecard for temporary display purposes
var displayCard = scoreCard.slice(); 

// scorecards to keep track of the selected scores
var Selected1 = scoreCard.slice(); // for player 1
var Selected2 = scoreCard.slice(); // for player 2

/**
 * The Die object keeps track of the
 * state and score of each die.
 * 1 = held
 * 2 = active
 */
class Die {
    constructor() {
        this.dieState = 1;
        this.dieScore = 1;
    }
}

// array of Die objects
var Dice = [
    Die0 = new Die(),
    Die1 = new Die(),
    Die2 = new Die(),
    Die3 = new Die(),
    Die4 = new Die(),
];