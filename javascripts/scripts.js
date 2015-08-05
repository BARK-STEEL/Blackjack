
console.log("...scripts loaded");

function BlackjackGame() {
  this.deck = this.makeDeck();
  this.deck = this.shuffleDeck();
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

BlackjackGame.prototype.dealPlayerCards = function dealPlayerCards() {

}

// TEST: dealPlayerCards() deals two random cards from deck

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
