

var Letter = function(char){
    this.character = char;
    this.isGuessed = false;
    this.display = function(){
        if (this.isGuessed){
            return this.character;
        }
        else if(this.character === " "){
            return " ";
            this.isGuessed = true;
        }
        else{
            return "_";
        }
    };
    this.guess = function(char){
        if (char === this.character){
            this.isGuessed = true;
        }
    };
};

module.exports = Letter;
// var aLetter = new Letter();
// aLetter.character = "a";

// console.log(aLetter);
// console.log(aLetter.display());
// aLetter.guess("a");

// console.log(aLetter.display());