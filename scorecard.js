// Set up the vue instance
var app = new Vue({
  el: '#app',
  data: {
    title: 'Canasta Solo Scorecard',
    player1GoOut: false,
    player1NaturalCanastaCount: 0,
    player1MixedCanastaCount: 0,
    player1RedThreeCount: 0,
    player1CardHandValueIsDisabled: false,
    player1CardHandValueHasError: false,
    player1CardHandValue: 0,
    player1CardValueHasError: false,
    player1CardValue: 0,
    player1Score: 0,
    player1TotalScore: 0,
    player1: 'You',
    player1New: '',
    player1Win: false,
    player1Loss: false,
    scores: [],
    player1Scores: [],
    hasError: false,
    player1TotalGameScore: 0,
    year: '',
    inputPlayer1Name: false,
    player1NameHasError: false,
    gameOver: false,
  
  },
  
  mounted() {
      this.year = new Date().getFullYear();
      //console.log(this.gameOver);
      if (this.player1TotalScore == 0) {
        this.hasError = true;
      }
  },
  
  methods: {
    editPlayerName: function (player) {
      if (player == 'Player1') {
        this.inputPlayer1Name = true;
      } 
    },
    savePlayerName: function (player, p1Name) {
     
      if (p1Name == '') {
        this.player1NameHasError = true;
      } else {
        if (player == 'Player1') {
          this.player1 = p1Name;
        } 
      }
    
      this.inputPlayer1Name = false;
      
    },
    goOut: function(player) {
       
      if ((player == 'player1') && (this.player1GoOut != true)) {
        this.player1Score=this.player1Score+100; 
        this.player1CardHandValueIsDisabled = true;
        this.makeTotalScore('player1');
      } else if (player == 'player1') {
        this.player1Score=this.player1Score-100; 
        this.player1CardHandValueIsDisabled = false;
        this.makeTotalScore('player1');
      }
      
    },
    redThreeCount: function(player, direction) {
       
      if ((player == 'player1') && (direction == 'up')) {
        if (this.player1RedThreeCount <= 1) {
          this.player1Score=this.player1Score+50; 
          this.player1RedThreeCount=this.player1RedThreeCount+1;
          this.makeTotalScore('player1');
        } 
      } 
      if ((player == 'player1') && (direction == 'down')) {
        if (this.player1RedThreeCount > 0) {
          this.player1Score=this.player1Score-50; 
          this.player1RedThreeCount=this.player1RedThreeCount-1;
          this.makeTotalScore('player1');
        } 
      } 

      
    },
    canastaCount: function(player, direction, type) {
       
      let pointValue = (type == 'natural') ? 500 : 300;

      if ((player == 'player1') && (direction == 'up') && (type == 'natural')) {
        this.player1Score=this.player1Score+pointValue; 
        this.player1NaturalCanastaCount=this.player1NaturalCanastaCount+1;
        this.makeTotalScore('player1');
      } else if ((player == 'player1') && (this.player1NaturalCanastaCount > 0) && (type == 'natural')) {
        this.player1Score=this.player1Score-pointValue; 
        this.player1NaturalCanastaCount=this.player1NaturalCanastaCount-1;
        this.makeTotalScore('player1');
      }

      if ((player == 'player1') && (direction == 'up') && (type == 'mixed')) {
        this.player1Score=this.player1Score+pointValue; 
        this.player1MixedCanastaCount=this.player1MixedCanastaCount+1;
        this.makeTotalScore('player1');
      } else if ((player == 'player1') && (this.player1MixedCanastaCount > 0) && (type == 'mixed')) {
        this.player1Score=this.player1Score-pointValue; 
        this.player1MixedCanastaCount=this.player1MixedCanastaCount-1;
        this.makeTotalScore('player1');
      }
      
    },
    makeTotalScore: function(player) {
      
      let numbers = /^[0-9]+$/;
      
      //let frog = numbers.test(this.player1CardHandValue); 
      //console.log(frog);

      if (this.player1TotalScore == 0) {
        this.hasError = true;
      }

      if (player == 'player1') {
        (numbers.test(this.player1CardHandValue)) ? this.player1CardHandValueHasError = false : this.player1CardHandValueHasError = true;
        (numbers.test(this.player1CardValue)) ? this.player1CardValueHasError = false : this.player1CardValueHasError = true;
        if ((!this.player1CardHandValueHasError) && (!this.player1CardValueHasError)) {
          this.player1TotalScore = (this.player1Score+(parseFloat(this.player1CardValue)-parseFloat(this.player1CardHandValue)));  
          this.hasError = false;
          
        } else {
          this.player1TotalScore = '';
          this.hasError = true;
        }
      }

      if (this.player1TotalScore == 0) {
        this.hasError = true;
      }
      /*
      if ((player == 'player2') && (this.player2CardHandValue.match(numbers))) {
        this.player2TotalScore = (this.player2Score+(parseFloat(this.player2CardValue)-parseFloat(this.player2CardHandValue)));      
      }
      */
    },
    saveScores: function() {


      
      let roundCount = this.scores.length+1; // which round is this?
      //console.log('Round '+roundCount);

      if (roundCount <= 3) { //If you're in the first 3 rounds...
        this.scores.push(this.player1TotalScore); //Add this score to the array used to build table
        //Add up all your scoers from each round
        this.player1TotalGameScore = 0;
        for (var i in this.scores) {
          this.player1TotalGameScore += this.scores[i];
        }
        //console.log(JSON.stringify(this.scores));
        //console.log(JSON.stringify(this.player1TotalGameScore));
        if (this.player1TotalGameScore >= 500)  {
          this.player1Win = true;
          this.hasError = true;
          this.gameOver = true;
          //console.log(this.gameOver);
          //console.log('Player 1 Wins!');
        }

      }

        
      
        if ((roundCount == 3) && (this.player1TotalGameScore < 500)) {
          //this.scores.push(this.player1TotalScore);
          this.hasError = true;
          this.player1Loss = true;
          this.player1Win = false;
          this.gameOver = true;
          //console.log(this.gameOver);
      }
      /*
      if (this.player1TotalGameScore >= 500)  {
        
          this.player1Win = true;
          this.hasError = true;
          this.gameOver = true;
          console.log(this.gameOver);
          console.log('Player 1 Wins!');
      }
      //console.log(JSON.stringify(total1));
      //console.log(JSON.stringify(this.player2Scores));
      
      //this.scores = [
        //[{'Player1': 470, 'Player2': 1025}],
        //[{'Player1': 350, 'Player2': 700}],
        //[{'Player1': 10, 'Player2': 3550}],
        //[{'Player1': 35, 'Player2': 50}],
       //];

    */

      this.player1GoOut = false;
      this.player1NaturalCanastaCount = 0;
      this.player1MixedCanastaCount = 0;
      this.player1RedThreeCount = 0;
      this.player1Score = 0;
      this.player1TotalScore = 0;
      this.player1CardHandValueIsDisabled = false;
      this.player1CardHandValue = 0;
      this.player1CardHandValueHasError = false;
      this.player1CardValueHasError = false;
      this.player1CardValue = 0;
    
      //this.hasError = false;

      if (this.player1TotalScore == 0) {
        this.hasError = true;
      }

    },
    removeRound: function(index, p1) {
      //console.log(JSON.stringify(this.scores));
      this.scores.splice(index, 1);
      this.player1TotalGameScore -= p1;
     
      //console.log(JSON.stringify(this.scores));
      if (this.player1TotalScore == 0) {
        this.hasError = true;
      }
    },
    resetAll: function() {
      this.player1GoOut = false;
      this.player1NaturalCanastaCount = 0;
      this.player1MixedCanastaCount = 0;
      this.player1RedThreeCount = 0;
      this.scores = [];
      this.player1Score = 0;
      this.player1Scores = [];
      this.player1TotalScore = 0;
      this.player1TotalGameScore = 0;
      this.player1Win = false;
      this.player1Loss = false;
      this.player1CardHandValueIsDisabled = false;
      this.player1CardHandValue = 0;
      this.player1CardHandValueHasError = false;
      this.player1CardValueHasError = false;
      this.player1CardValue = 0;
      this.hasError = false;
      this.inputPlayer1Name = false;
      this.gameOver = false;
    
    },

	}
})