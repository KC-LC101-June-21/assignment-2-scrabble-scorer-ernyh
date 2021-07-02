// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

const vowels = ['A', 'E', 'I', 'O', 'U'];

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  let word;
   console.log("Let's play some scrabble!");
   word = input.question("Enter the word to score: ");
   return word;
};

let simpleScore= function(word){
let score = word.length;
return score;
};

let vowelBonusScore = function(word){
word = word.toUpperCase();
let i = 0;
let score = 0;
for (i = 0; i < word.length; i++){
if(vowels.includes(word[i])){
  score += 3;
}
else{
  score++;
}
}
return score;
};

let scrabbleScore = function(word){
	word = word.toLowerCase();
	let score = 0;
  let i = 0;
  for (i = 0; i < word.length; i++){
      score += newPointStructure[word[i]];
  }
	return score;
}

const scoringAlgorithms = [
    {
    name:"Simple Score",
    description: "Each letter is worth 1 point." ,
    scoringFunction: simpleScore
  },
  {
    name:"Bonus Vowels" ,
    description:"Vowels are 3 pts, consonants are 1 pt." ,
    scoringFunction: vowelBonusScore
  },
  {
    name: "Scrabble",
    description:"The traditional scoring algorithm.	" ,
    scoringFunction: scrabbleScore
  }
];


function scorerPrompt() {
  let menuChoice;
console.log(`Which scoring algorithm would you like to use?

0 - Simple: One point per character
1 - Vowel Bonus: Vowels are worth 3 points
2 - Scrabble: Uses scrabble point system`);
menuChoice = input.question("Enter 0, 1, or 2: ");
return scoringAlgorithms[menuChoice];
}

function transform(oldStructure) {
let newStructure = {};
let letterArray = [];
let i =0
for (const oldKey in oldStructure){
for (i = 0; i < oldStructure[oldKey].length; i++){
newStructure[`${oldStructure[oldKey][i].toLowerCase()}`] = Number(oldKey);
}
}
return newStructure;
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
  let scorer;
   let word = initialPrompt();
   //console.log(oldScrabbleScorer(word));
   scorer = scorerPrompt();
   console.log(`Score for '${word}': ${scorer.scoringFunction(word)}`);
   //console.log(newPointStructure);
};

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

