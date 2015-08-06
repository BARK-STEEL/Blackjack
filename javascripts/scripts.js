
console.log("...scripts loaded");

function BlackjackGame() {
  this.deck = this.makeDeck();
  this.deck = this.shuffleDeck();
  this.playerCard1 = this.dealRandomCard();
  this.playerCard2 = this.dealRandomCard();
  this.dealerCard1 = this.dealRandomCard();
  this.dealerCard2 = this.dealRandomCard();
  this.playerTotal = this.playerCard1.value + this.playerCard2.value;
  this.dealerTotal = this.dealerCard1.value + this.dealerCard2.value;
  this.moneyRemaining = 100;
}

// TEST: *** blackjackGame() constructor returns a new game

BlackjackGame.prototype.makeDeck = function makeDeck() {

  var deck = [];
  var faceCards = ["J", "Q", "K"];
  var ace = "A";
  var suits = ["S", "C", "H", "D"]
  var card;
  for (var i = 0; i < suits.length; i++){
    card = {};
    card.name = ace + suits[i];
    card.value = 1;
    card.src = "images/classic-cards/" + card.name + ".png";
    deck.push(card);
    for (var j = 0; j < faceCards.length; j++) {
      card = {};
      card.name = faceCards[j] + suits[i];
      card.value = 10;
      card.src = "images/classic-cards/" + card.name + ".png";
      deck.push(card);
    };
    for (var k = 2; k <= 10; k++) {
      card = {};
      card.name = k + suits[i];
      card.value = k;
      card.src = "images/classic-cards/" + card.name + ".png"
      deck.push(card);
    }
  }
  return deck;
};

// TEST: *** makeDeck() creates a deck and binds cards to value and image

BlackjackGame.prototype.init = function init() {

  var moneyLeft = $("#wallet");
  moneyLeft.text("Money Remaining: " + this.moneyRemaining);
  this.bindBetButton();

};
// TEST: *** init() sets up initial game state, with dealer and player cards

BlackjackGame.prototype.shuffleDeck = function shuffleDeck() {
  var shuffledDeck = [];
  var j = this.deck.length;
  for (var i = 0; i < j; i++){
    var randomIndex = Math.floor(Math.random()*this.deck.length);
    shuffledDeck.push(this.deck.splice(randomIndex,1)[0]);
  }
  return shuffledDeck;
};

// TEST: *** shuffleDeck() returns a shuffled deck

BlackjackGame.prototype.dealRandomCard = function dealRandomCard() {
  var randomIndex = Math.floor(Math.random()*this.deck.length);
  var randomCard = this.deck.splice(randomIndex,1)[0];
  return randomCard;
};
// TEST: *** dealRandomCard() returns a random card object from the deck;
function isiPhone(){
    return (
        //Detect iPhone
    //var isiPad = navigator.userAgent.match(/iPad/i) != null;
        (navigator.platform.indexOf("iPhone") != -1) ||
        //Detect iPod
        (navigator.platform.indexOf("iPad") != -1)
    );
}

BlackjackGame.prototype.bindBetButton = function bindBetButton() {
  var scope = this;
  var betButton = $("#bet>button");
  var playerButtons = $("#playerButtons");
  betButton.on('click', function(){
    if(isiPhone()){
      playerButtons.css({position: "absolute", bottom:"4%"});
      var pcard1 = $("#playerCard1>img");
      pcard1.attr("src", scope.playerCard1.src).attr("class", "dealtPlayerCards");
      pcard1.animate({top:"60%", left:"30%"});
      var pcard2 = $("#playerCard2>img");
      pcard2.attr("src", scope.playerCard2.src).attr("class", "dealtPlayerCards");
      setTimeout(function(){
        pcard2.animate({top:"65%", left:"50%"})
      }, 500);
      var dcard1 = $("#dealerCard1>img");
      dcard1.attr("src", "images/classic-cards/BlueFacedown.png").attr("class", "dealtPlayerCards");
      setTimeout(function(){
        dcard1.animate({top:"20%", left:"30%"})
      }, 1000);
      var dcard2 = $("#dealerCard2>img");
      dcard2.attr("src", scope.dealerCard1.src).attr("class", "dealtPlayerCards");
      setTimeout(function(){
        dcard2.animate({top:"20%", left:"50%"})
      }, 1500);
    } else {
      playerButtons.css({position: "absolute", bottom:"4%"});
      var pcard1 = $("#playerCard1>img");
      pcard1.attr("src", scope.playerCard1.src).attr("class", "dealtPlayerCards");
      pcard1.animate({top:"55%", left:"39%"});
      var pcard2 = $("#playerCard2>img");
      pcard2.attr("src", scope.playerCard2.src).attr("class", "dealtPlayerCards");
      setTimeout(function(){
        pcard2.animate({top:"55%", left:"50%"})
      }, 500);
      var dcard1 = $("#dealerCard1>img");
      dcard1.attr("src", "images/classic-cards/BlueFacedown.png").attr("class", "dealtPlayerCards");
      setTimeout(function(){
        dcard1.animate({top:"15%", left:"39%"})
      }, 1000);
      var dcard2 = $("#dealerCard2>img");
      dcard2.attr("src", scope.dealerCard1.src).attr("class", "dealtPlayerCards");
      setTimeout(function(){
        dcard2.animate({top:"15%", left:"50%"})
      }, 1500);
  };
  });
};
// TEST: *** bindBetButton() adds event listener for bet button
// TEST: bindHitButton() adds event listener for hit button
// TEST: bindStandButton() adds event listener for stand button
// TEST: bindSplitButton() adds event listener for split button
// TEST: bindDoubleDownButton() adds event listener for double down button
var game = new BlackjackGame()
$(document).on('ready', function(){
  game.init();
});
