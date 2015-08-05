
console.log("...scripts loaded");

function BlackjackGame() {
  this.deck = this.makeDeck();
  this.deck = this.shuffleDeck();
  this.playerCard1 = this.dealRandomCard();
  this.playerCard2 = this.dealRandomCard();
  this.dealerCard1 = this.dealRandomCard();
  this.dealerCard2 = this.dealRandomCard();
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
  //     <img id="dealer1Image" src="images/classic-cards/BlueFacedown.png" alt="" />
  //   </div>
  //   <div id="dealerCard2" class="dealerCard">
  //     <img id="dealer2Image" src="images/classic-cards/KD.png" alt="" />
  //   </div>
  
  // <div id="playerCards">
  //   <div id="playerCard1" class="playerCard">
  //     <img id="player1Image" src="images/classic-cards/10D.png" alt="" />
  //   </div>
  //   <div id="playerCard2" class="playerCard">
  //     <img id="player2Image" src="images/classic-cards/2H.png" alt="" />
  //   </div>
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
