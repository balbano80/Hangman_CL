var word = require("./Word.js");
var inquirer = require("inquirer");

var wordBank = ["something else", "somewhere out there", "somehow someway", "sometime later"];

var guessWord = new word.Word();

var wordCounter = 0;
var numGuesses = 9;
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
};

function letterCheck(char){
    if (char.length > 1){
        console.log("You guessed too many letters.  Try again with only one letter.");
        console.log("Number of guesses left: " + numGuesses);
        return;
    }
    else if (char.length === 0){
        console.log("You did not guess a letter.  Try again.");
        console.log("Number of guesses left: " + numGuesses);
        return;
    }
    else if (guessedLetters.indexOf(char) >= 0){
        console.log("You already guessed " + char + ".  Try again.");
        console.log("Number of guesses left: " + numGuesses);
        return;
    }
 //   else if(check for non-letter keys here)

    else{
        guessedLetters.push(char);
        console.log(guessedLetters);
        var currentCount = wordCheck(guessWord.displayWord());
        guessWord.guessedChar(char);
        var newCount = wordCheck(guessWord.displayWord());
        if (newCount === currentCount){
            console.log("Incorrect");
            numGuesses--;
        }
        else{
            console.log("Correct");
        }
        console.log("Number of guesses left: " + numGuesses);
    }   
};

function newWord(){
    numGuesses = 9;
    guessWord = new word.Word();
    guessWord.createArr(wordBank[wordCounter]);
};

function playAgain(){
    wordCounter++;
    if(wordCounter < wordBank.length  && numGuesses > 0){
        console.log("Next phrase: ");
        newWord();
        playGame();
    }
    else{
        inquirer.prompt([
            {
                type: "confirm",
                name: "again",
                message: "Want to play again?"
            }
        ]).then(function(response){
            /// need losing playAgain which starts off at beginning
            if (response.again === true){
                // console.log(response.again);
                // console.log(wordCounter);
                wordCounter = 0;
                newWord();
                playGame();
            }
            else{
                return;
            }
        })
    }
};

var playGame = function() {

    if (numGuesses > 0 && guessWord.displayWord().indexOf("_") >= 0){
        console.log(guessWord.displayWord());
        inquirer.prompt([
            {
                name: "userChar",
                message: "Please guess a letter: "
            }
        ]).then(function(userLetter){
            letterCheck(userLetter.userChar);
            playGame();
        })
    }
    else{
        if (numGuesses === 0){
            console.log(guessWord.displayWord());
            console.log("You lost");
            playAgain();
        }
        else if (guessWord.displayWord().indexOf("_") === -1){
            console.log(guessWord.displayWord());
            console.log("You guessed the word correctly!!!");
            if (wordCounter === wordBank.length){
                console.log("Congrats!!! You guessed all the words correctly.")
                return;
            }
            else{
                playAgain();
            }
        }
    }
};

playGame();


