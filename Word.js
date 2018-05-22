var letter = require("./Letter.js");

var Word = function(){
    this.wordArr = [];
    this.createArr = function(targetWord){
        for (var i = 0; i < targetWord.length; i++){
            var tempLetter = new letter.Letter();
            tempLetter.character = targetWord[i];
            this.wordArr.push(tempLetter);
        }
    };
    this.displayWord = function(){
        var wordLog = "";
        for (var j = 0; j <this.wordArr.length; j++){
            wordLog += this.wordArr[j].display();
        }
        return wordLog;       
    };
    this.guessedChar = function(char){
        for (var k = 0; k < this.wordArr.length; k++){
            this.wordArr[k].guess(char);
        }
    };
};

module.exports = {
    Word: Word
};

// var aWord = new Word();
// aWord.createArr("somewhere");
// // console.log(aWord.wordArr);
// console.log(aWord.displayWord());
// aWord.guessedChar("s");
// console.log(aWord.displayWord());

// aWord.guessedChar("e");
// console.log(aWord.displayWord());

