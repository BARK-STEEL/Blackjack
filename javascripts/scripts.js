
console.log("...scripts loaded");

function BlackjackGame() {
  this.deck = this.makeDeck();
  this.dealer = new Player("dealer");
  this.player = new Player("player");
  this.bankRoll = 500;
  this.bet = "";
};

// TEST: *** BlackjackGame() constructor returns a new game

function Player (name) {
  this.name = name;
  this.hand = {};
};

// TEST: *** Player constructor returns a player with a hand and adds the calculate hand total to the hand object.

BlackjackGame.prototype.getHand = function getHand (playerorDealer) {
  var hand = {};
  hand.cards = []
  hand.cards.push(this.dealRandomCard());
  hand.cards.push(this.dealRandomCard());
  hand.total = hand.cards[0].value + hand.cards[1].value;
  return hand;
};

// TEST: *** getHand() returns two random cards in a hand object

Player.prototype.handValue = function handValue() {
  var total = 0;
  for (var i = 0; i < this.hand.cards.length; i++){
    total += this.hand.cards[i].value;
  }
  return total;
};

//TEST: *** handValue() calculate the value of a hand

BlackjackGame.prototype.makeDeck = function makeDeck() {

  var deck = [];
  var faceCards = ["J", "Q", "K"];
  var ace = "A";
  var suits = ["S", "C", "H", "D"]
  var card;
  for (var i = 0; i < suits.length; i++){
    card = {};
    card.name = ace + suits[i];
    card.value = 11;
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
  return this.shuffleDeck(deck);
};

// TEST: *** makeDeck() creates a deck and binds cards to value and image

BlackjackGame.prototype.init = function init() {

  this.updateBankRoll();
  this.bindBetButton();
};


// TEST: *** init() sets up initial game state, with dealer and player cards

BlackjackGame.prototype.shuffleDeck = function shuffleDeck(deck) {
  var shuffledDeck = [];
  var j = deck.length;
  for (var i = 0; i < j; i++){
    var randomIndex = Math.floor(Math.random()*deck.length);
    shuffledDeck.push(deck.splice(randomIndex,1)[0]);
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
};


BlackjackGame.prototype.dealCards = function dealCards() {
  var scope = this;
  this.player.hand.cards = [];
  this.player.hand = this.getHand(this.player);
  this.dealer.hand = this.getHand(this.dealer);
  this.displayDealtCards();
  setTimeout(function() {
    if (scope.isBlackjack()) {
      alert("You got Blackjack!");
      scope.playerWins();
    }
  }, 2000);
  this.bindHitButton();
  this.bindStandButton();
};

//TEST: *** dealCards() deals cards

BlackjackGame.prototype.displayDealtCards = function displayDealtCards () {
  var playerHitCards = $("#playerHitCards");
  playerHitCards.html("");
  var dealerHitCards = $("#dealerHitCards");
  dealerHitCards.html("");
  var playerButtons = $("#playerButtons");
  if(isiPhone()){
    playerButtons.css({position: "absolute", bottom:"4%"});
    var pcard1 = $("#playerCard1>img");
    pcard1.attr("src", this.player.hand.cards[0].src).attr("class", "dealtPlayerCards");
    pcard1.animate({top:"60%", left:"30%"});
    var pcard2 = $("#playerCard2>img");
    pcard2.attr("src", this.player.hand.cards[1].src).attr("class", "dealtPlayerCards");
    setTimeout(function(){
      pcard2.animate({top:"60%", left:"50%"})
    }, 500);
    var dcard1 = $("#dealerCard1>img");
    dcard1.attr("src", "images/classic-cards/BlueFacedown.png").attr("class", "dealtPlayerCards");
    setTimeout(function(){
      dcard1.animate({top:"20%", left:"30%"})
    }, 1000);
    var dcard2 = $("#dealerCard2>img");
    dcard2.attr("src", this.dealer.hand.cards[1].src).attr("class", "dealtPlayerCards");
    setTimeout(function(){
      dcard2.animate({top:"20%", left:"50%"})
    }, 1500);
  } else {
    playerButtons.css({position: "absolute", bottom:"4%"});
    var pcard1 = $("#playerCard1>img");
    pcard1.attr("src", this.player.hand.cards[0].src).attr("class", "dealtPlayerCards");
    pcard1.animate({top:"55%", left:"39%"});
    var pcard2 = $("#playerCard2>img");
    pcard2.attr("src", this.player.hand.cards[1].src).attr("class", "dealtPlayerCards");
    setTimeout(function(){
      pcard2.animate({top:"55%", left:"50%"})
    }, 500);
    var dcard1 = $("#dealerCard1>img");
    dcard1.attr("src", "images/classic-cards/BlueFacedown.png").attr("class", "dealtPlayerCards");
    setTimeout(function(){
      dcard1.animate({top:"15%", left:"39%"})
    }, 1000);
    var dcard2 = $("#dealerCard2>img");
    dcard2.attr("src", this.dealer.hand.cards[1].src).attr("class", "dealtPlayerCards");
    setTimeout(function(){
      dcard2.animate({top:"15%", left:"50%"})
    }, 1500);
  }
};
BlackjackGame.prototype.bindBetButton = function bindBetButton() {
  var scope = this;
  var betButton = $("#betDiv>button");
  betButton.on('click', function(){
    var betString = $('#betDiv>input');
    if (betString.val() === "") {
      alert ("Please make a bet");
    } else {
      scope.dealCards();
      scope.bet = parseInt(betString.val());
      var betAmount = $('#betAmount').text("Bet: " + scope.bet);
      scope.bankRoll -= scope.bet;
      scope.updateBankRoll();
      betString.val("");
    }
  });
};

// TEST: *** bindBetButton() adds event listener for bet button

BlackjackGame.prototype.bindHitButton = function bindHitButton() {
  var scope = this;
  var hitButton = $("#hit>button");
  hitButton.on('click', function() {
    scope.addCard(scope.player);
  });
};

// TEST: *** bindHitButton() adds event listener for hit button

BlackjackGame.prototype.addCard = function addCard(playerTakingCard) {
  var scope = this;
  var cardDivId = "#" + playerTakingCard.name + "HitCards";
  var cardDiv = $(cardDivId);
  var newCardObject = this.dealRandomCard();
  playerTakingCard.hand.cards.push(newCardObject);
  var newCard = $("<div>").addClass(playerTakingCard.name + "HitCard");
  newCard.append($("<img>").attr("src", newCardObject.src));
  cardDiv.append(newCard);
  newCard.animate()
  playerTakingCard.hand.total = playerTakingCard.handValue();
  if (this.isBusted(playerTakingCard)) {
    var playerHand = playerTakingCard.hand.cards;
    for (var i = 0; i < playerHand.length; i++){
      if (playerHand[i].name.charAt(0)==='A'){
        playerHand[i].value = 1;
        playerTakingCard.hand.total = playerTakingCard.handValue();
        break;
      }
    }
  }
  setTimeout(function(){
    if (scope.isBusted(playerTakingCard)) {
      alert("Busted!");
      scope.removeListeners();
    }
  }, 500);
};

// TEST: addCard() adds a card to a player's hand

BlackjackGame.prototype.bindStandButton = function bindStandButton() {
  var scope = this;
  var standButton = $("#stand>button");
  standButton.on('click', function() {
    scope.dealerHand();
  });
};

// TEST: *** bindStandButton() adds event listener for stand button

BlackjackGame.prototype.bindSplitButton = function bindSplitButton() {




};

// TEST: bindSplitButton() adds event listener for split button

BlackjackGame.prototype.bindDoubleDownButton = function bindDoubleDownButton() {




};

// TEST: bindDoubleDownButton() adds event listener for double down button


// TEST: checkForAce() checks a card to see if it is an ace and askes user if they want it to be a 1 or an 11.

BlackjackGame.prototype.compareHands = function compareHands() {
  this.removeListeners();
  var playerTotal = this.player.hand.total;
  var dealerTotal =  this.dealer.hand.total
  if (playerTotal > dealerTotal) {
    alert("You win!") ;
    this.playerWins();
  } else if (playerTotal < dealerTotal) {
    alert("The dealer wins!");
  } else if (playerTotal === dealerTotal) {
    alert("You push!")
  }
};
// TEST: *** compareHands() compares the dealer's hand to the player's hand, returns the winner, and shows the dealer's second card.

BlackjackGame.prototype.isBlackjack = function isBlackjack() {
  return this.player.hand.total === 21;
};

//TEST: *** isBlackjack sees if player has been dealt blackjack and returns true or false

BlackjackGame.prototype.isBusted = function isBusted(playerorDealer) {
  return playerorDealer.hand.total > 21;
};

//TEST: *** isBusted() checks the players hand to see if it is over 21

BlackjackGame.prototype.playerWins = function playerWins () {
  this.bankRoll += 2*this.bet;
  this.updateBankRoll();
  this.removeListeners();
};
//TEST: *** playerWins() adds winnings to bankRoll

BlackjackGame.prototype.updateBankRoll = function updateBankRoll() {
  var wallet = $("#wallet");
  wallet.text("Bankroll: " + this.bankRoll);
};
//TEST: *** updateBankroll() updates the bankroll on screen

BlackjackGame.prototype.dealerHand = function dealerHand() {
  var scope = this;
  var dcard1 = $("#dealerCard1>img");
  dcard1.attr("src", this.dealer.hand.cards[0].src);
  setTimeout(function(){
    while (scope.dealer.hand.total < 17) {
        scope.addCard(scope.dealer);
    };
  }, 500);
  setTimeout(function(){
    scope.compareHands();
  }, 1000);
};

//TEST: *** dealerHand() adds cards to dealer hand until outcome is reached

BlackjackGame.prototype.removeListeners = function removeListeners() {
  $("#hit>button").off('click');
  $("#stand>button").off('click');
}

//TEST: removeListeners resets listeners

var game = new BlackjackGame()
$(document).on('ready', function(){
  game.init();
});
