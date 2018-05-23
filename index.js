var word = require("./Word.js");
var inquirer = require("inquirer");
var colors = require('colors');

var wordBank = ["something else", "somewhere out there", "somehow someway", "sometime later"];

var wordCounter = 0;
// var wordCounter = Math.floor(Math.random() * wordBank.length);
//TODO: implement it to take random phrase from wordBank array
//    : will need to slice out the chosen one 
//    : also change logic to stop when wordBank.length === 0
var numGuesses = 9;
// var guessWord = new word.Word(wordBank[wordCounter]);
var guessWord = new word();
guessWord.createArr(wordBank[wordCounter]);
var guessedLetters = [];

function wordCheck(word){
    var usCount = 0;
    for (var i = 0; i < word.length; i++){
        if (word[i] === "_"){
            usCount++;
        }
    }
    return usCount;
};// Runs through passed string and returns number of "_"(underscore) characters

function isLetter(str) {
    if(str.match(/[a-z]/i) !== null){
      return true;
    }
    else{
      return false;
    }
};// Verifies if input is actually a letter

function letterCheck(char){
    var char = char.toLowerCase();
    // console.log(char);
    if (char.length > 1){
        console.log("You guessed too many letters.  Try again with only one letter.".yellow);
        console.log("Number of guesses left: " + numGuesses);
        console.log("");
        return;
    }// Input validation for user putting in more than one letter
    else if (char.length === 0){
        console.log("You did not guess a letter.  Try again.".yellow);
        console.log("Number of guesses left: " + numGuesses);
        console.log("");
        return;
    }// Input validation for user not entering in a letter 
    else if (guessedLetters.indexOf(char) >= 0){
        console.log("You already guessed " + char + ".  Try again.".yellow);
        console.log("Number of guesses left: " + numGuesses);
        console.log("");
        return;
    }// Input validation for user inputting an already guessed letter
    else if(!isLetter(char)){
        console.log(char + " is not a letter.  Try again.".yellow);
        console.log("Number of guesses left: " + numGuesses);
        console.log("");
        return;
    }// Input validation for user inputting something that is not a letter
    else{
        guessedLetters.push(char);
        console.log("Guessed letters: " + guessedLetters.join(", "));
        var currentCount = wordCheck(guessWord.displayWord());
        guessWord.guessedChar(char);
        var newCount = wordCheck(guessWord.displayWord());
        if (newCount === currentCount){
            console.log("Incorrect".red);
            numGuesses--;
        }// Checking if original number of "_" is same as after user input.  If so, user input letter was not in phrase
        else{
            console.log("Correct".green);
        }// Else, user input letter was in phrase
        console.log("Number of guesses left: " + numGuesses);
        console.log("");
    }// Pushing guessed letter into array of lettersGuessed, displaying guessed letters, running guessedChar function,
     // passing user guess letter to it, and displaying current word again
}; //letter check function

function newWord(){
    numGuesses = 9;
    guessWord = new word();
    guessedLetters = [];
    guessWord.createArr(wordBank[wordCounter]);
};// resets number of guesses left, guessed letters array, guessWord to a new word object and runs word object array function

function playAgain(){
    wordCounter++;
    if(wordCounter < wordBank.length  && numGuesses > 0){
        console.log("Next phrase: ");
        console.log("");
        newWord();
        playGame();
    }// checks if at end of array of words to guess,and if number of guesses is greater than 0
     // then runs newWord function and calls the playGame function again
    else{
        inquirer.prompt([
            {
                type: "confirm",
                name: "again",
                message: "Want to play again?"
            }
        ]).then(function(response){
            if (response.again === true){
                wordCounter = 0;
                newWord();
                playGame();
            }// if they want to play again(true), resets wordCounter to 0, calls newWord function and calls playGame function again
            else{
                return;
            } // returns to console if user selects that they do not want to play again
        })
    }// else
};// play again function

var playGame = function() {
    if (numGuesses > 0 && guessWord.displayWord().indexOf("_") >= 0){
        console.log("");
        console.log(guessWord.displayWord());
        console.log("");
        inquirer.prompt([
            {
                name: "userChar",
                message: "Please guess a letter: "
            }
        ]).then(function(userLetter){

            letterCheck(userLetter.userChar);
            playGame();
        })
    } // checks if user still has guesses left and if there are any "_" left in the word to guess
      // asks user to input a letter
      // then runs the letterCheck function with the returned user input letter
      // calls playgame function again to continue
    else{
        if (numGuesses === 0){
            console.log(guessWord.displayWord());
            console.log("HAHA, You lost".red);
            playAgain();
        } // if user runs out of guesses, runs playAgain function(asks if they want to play again)
        else if (guessWord.displayWord().indexOf("_") === -1){
            console.log(guessWord.displayWord());
            console.log("You guessed the word correctly!!!".green);
            console.log("# # # # # # # # # # # # # # # # # # # # # # # # # # # # #".rainbow);
            if (wordCounter === wordBank.length){
                console.log("Congrats!!! You guessed all the words correctly.".green)
                return;
            } // checks if all words guessed.  If so congrats message;
            else{
                playAgain();
            } // if not at end of wordBank array, call playAgain function
        } // checks/verifies if that there are no more "_" in word to guess
    } 
};// playGame function

playGame();


