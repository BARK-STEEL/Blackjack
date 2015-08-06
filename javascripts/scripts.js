
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
}

// TEST: *** makeDeck() creates a deck and binds cards to value and image

BlackjackGame.prototype.init = function init() {
  // <div id="dealerCards">
  //   <div id="dealerCard1" class="dealerCard">
  var dealerCards = $("#dealerCards");
  var dealer1 = $("<div>").attr("id", "dealerCard1").addClass("dealerCard");
  dealer1.append($("<img>").attr("id", "dealer1Image").attr("src", "images/classic-cards/BlueFacedown.png"));
  var dealer2 = $("<div>").attr("id", "dealerCard2").addClass("dealerCard");
  dealer2.append($("<img>").attr("id", "dealer2Image").attr("src", this.dealerCard2.src));
  dealerCards.append(dealer1);
  dealerCards.append(dealer2);
  var playerCards = $("#playerCards");
  var player1 = $("<div>").attr("id", "playerCard1").addClass("playerCard");
  player1.append($("<img>").attr("id", "player1Image").attr("src", this.playerCard1.src));
  var player2 = $("<div>").attr("id", "playerCard2").addClass("playerCard");
  player2.append($("<img>").attr("id", "player2Image").attr("src", this.playerCard2.src));
  playerCards.append(player1);
  playerCards.append(player2);
}

// TEST: init() sets up initial game state, with dealer and player cards

BlackjackGame.prototype.shuffleDeck = function shuffleDeck() {
  var shuffledDeck = [];
  var j = this.deck.length;
  for (var i = 0; i < j; i++){
    var randomIndex = Math.floor(Math.random()*this.deck.length);
    shuffledDeck.push(this.deck.splice(randomIndex,1)[0]);
  }
  return shuffledDeck;
}

// TEST: *** shuffleDeck() returns a shuffled deck

BlackjackGame.prototype.dealRandomCard = function dealRandomCard() {
  var randomIndex = Math.floor(Math.random()*this.deck.length);
  var randomCard = this.deck.splice(randomIndex,1)[0];
  return randomCard;
}
// TEST: *** dealRandomCard() returns a random card object from the deck;
var game = new BlackjackGame()
$(document).on('ready', function(){
  game.init();
});
