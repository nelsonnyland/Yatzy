console.log("VAR CONNECTED");
"use strict";
/**
 * VAR.JS
 * This file contains the variables for yatzy.
**/
// CONSTANTS:
// The MINVALUE is the lowest face on a die.
// The MAXVALUE is the highest face on a die.
const MINVALUE = 1;
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

// A round of Yatzy has 13 rounds of play.
// Each round is 2 turns.
const ROUNDS = 13;

// VARIABLES:
var currRoll = [1, 1, 1, 1, 1]; // the face value of the five dice

var scoreCount = [0, 0, 0, 0, 0, 0]; // the face count from each die

// Game object
var Game = {
    round: 1,
    turn: 1,
    currPlayer: 1,
    currRollTotal: 0,
    upperTotal: 0,
    gameStart: true,
    turnStart: true
};

// ScoreCard class
var scoreCard  = [
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0
];

// Player 1 and 2 score cards
var ScoreCard1 = scoreCard.slice();
var ScoreCard2 = scoreCard.slice();
var displayCard = scoreCard.slice();

// Die object
// 1 = held
// 2 = active
var Die = {
    dieState: 1,
    dieScore: 1
};
// Dice array of Die objects
var Dice = [
    Die0 = Object.assign({}, Die),
    Die1 = Object.assign({}, Die),
    Die2 = Object.assign({}, Die),
    Die3 = Object.assign({}, Die),
    Die4 = Object.assign({}, Die),
];