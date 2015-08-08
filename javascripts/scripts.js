
console.log("...scripts loaded");

function BlackjackGame() {
  // this.deck = this.makeDeck();
  this.dealer = new Player("dealer");
  this.player = new Player("player");
  this.bankRoll = 500;
  this.bet = 10;
  this.hitMargin = 0;
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
  this.updateBetAmount();
  this.bindDealButton();
  this.bindIncreaseBetButton();
  this.bindDecreaseBetButton();
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
  $("#dealCards").off('click');
  $("#increaseBet").off('click');
  $("#decreaseBet").off('click');
  var scope = this;
  this.deck = this.makeDeck();
  this.player.hand.cards = [];
  this.player.hand = this.getHand(this.player);
  this.dealer.hand = this.getHand(this.dealer);
  this.displayDealtCards();
  setTimeout(function() {
    if (scope.isBlackjack()) {
      var dcard1 = $("#dealerCard1>img");
      dcard1.attr("src", scope.dealer.hand.cards[0].src);
      if (scope.dealer.hand.cards[1].value < 21) {
       scope.blackjack();
     } else {
       scope.playersPush();
      }
    }
  }, 2000);
  this.bindHitButton();
  this.bindStandButton();
};

//TEST: *** dealCards() deals cards

BlackjackGame.prototype.displayDealtCards = function displayDealtCards () {
  var pcard1 = $("#playerCard1>img");
  pcard1.html("").css({
  position: "fixed",
  left: "2.1%",
  top:"4%"});
  var pcard2 = $("#playerCard2>img");
  pcard2.html("").css({
  position: "fixed",
  left: "2.1%",
  top:"4%"});
  var dcard1 = $("#dealerCard1>img");
  dcard1.html("").css({
  position: "fixed",
  left: "2.1%",
  top:"4%"});
  var dcard2 = $("#dealerCard2>img");
  dcard2.html("").css({
  position: "fixed",
  left: "2.1%",
  top:"4%"});
  var playerHitCards = $("#playerHitCards");
  playerHitCards.html("");
  var dealerHitCards = $("#dealerHitCards");
  dealerHitCards.html("");
  var playerButtons = $("#playerButtons");
  if(isiPhone()){
    playerButtons.css({position: "absolute", bottom:"4%"});
    pcard1.attr("src", this.player.hand.cards[0].src).attr("class", "dealtPlayerCards");
    pcard1.animate({top:"60%", left:"30%"});
    pcard2.attr("src", this.player.hand.cards[1].src).attr("class", "dealtPlayerCards");
    setTimeout(function(){
      pcard2.animate({top:"60%", left:"50%"})
    }, 500);
    dcard1.attr("src", "images/classic-cards/BlueFacedown.png").attr("class", "dealtPlayerCards");
    setTimeout(function(){
      dcard1.animate({top:"20%", left:"30%"})
    }, 1000);
    dcard2.attr("src", this.dealer.hand.cards[1].src).attr("class", "dealtPlayerCards");
    setTimeout(function(){
      dcard2.animate({top:"20%", left:"50%"})
    }, 1500);
  } else {
    playerButtons.css({position: "absolute", bottom:"4%"});
    pcard1.attr("src", this.player.hand.cards[0].src).attr("class", "dealtPlayerCards");
    pcard1.animate({top:"55%", left:"39%"});
    pcard2.attr("src", this.player.hand.cards[1].src).attr("class", "dealtPlayerCards");
    setTimeout(function(){
      pcard2.animate({top:"55%", left:"50%"})
    }, 500);
    dcard1.attr("src", "images/classic-cards/BlueFacedown.png").attr("class", "dealtPlayerCards");
    setTimeout(function(){
      dcard1.animate({top:"15%", left:"39%"})
    }, 1000);
    dcard2.attr("src", this.dealer.hand.cards[1].src).attr("class", "dealtPlayerCards");
    setTimeout(function(){
      dcard2.animate({top:"15%", left:"50%"})
    }, 1500);
  }
};

//TEST: *** displayDealtCards() animates the original deal

BlackjackGame.prototype.bindDealButton = function bindDealButton() {
  var scope = this;
  var dealButton = $("#dealCards");
  dealButton.on('click', function(){
    if (scope.bankRoll > 0) {
      scope.dealCards();
      scope.bankRoll -= scope.bet;
      scope.updateBankRoll();
    }
  });
};

// TEST: *** bindBetButton() adds event listener for bet button

BlackjackGame.prototype.bindIncreaseBetButton = function bindIncreaseBetButton() {
  var scope = this;
  var increaseBetButton = $("#increaseBet");
  increaseBetButton.on('click', function(){
    if (scope.bet < scope.bankRoll){
      scope.bet += 10;
      scope.updateBetAmount();
    }
  });
}

//TEST: *** bindIncreaseBetButton()

BlackjackGame.prototype.bindDecreaseBetButton = function bindDecreaseBetButton() {
  var scope = this;
  var decreaseBetButton = $("#decreaseBet");
  decreaseBetButton.on('click', function(){
    if (scope.bet >= 20) {
      scope.bet -= 10;
      scope.updateBetAmount();
    }
  });
}

//TEST: *** bindDecreaseBetButton()

BlackjackGame.prototype.bindHitButton = function bindHitButton() {
  var scope = this;
  var hitButton = $("#hit>button");
  hitButton.on('click', function() {
    scope.addCard(scope.player);
  });
};

// TEST: *** bindHitButton() adds event listener for hit button

BlackjackGame.prototype.addCard = function addCard(playerTakingCard) {
  this.hitMargin += 1;
  var scope = this;
  var cardDivId = "#" + playerTakingCard.name + "HitCards";
  var cardDiv = $(cardDivId);
  var newCardObject = this.dealRandomCard();
  playerTakingCard.hand.cards.push(newCardObject);
  var newCard = $("<div>").addClass("dealtPlayerCards");
  newCard.append($("<img>").attr("src", newCardObject.src));
  cardDiv.append(newCard);
  setTimeout(function(){
    newCard.switchClass("dealtPlayerCards", playerTakingCard.name + "HitCard"), 1000;
  },300);
  playerTakingCard.hand.total = playerTakingCard.handValue();
  if (this.isBusted(playerTakingCard)) {
    var playerHand = playerTakingCard.hand.cards;
    for (var i = 0; i < playerHand.length; i++){
      if (playerHand[i].name.charAt(0)==='A' && playerHand[i].value === 11){
        playerHand[i].value = 1;
        playerTakingCard.hand.total = playerTakingCard.handValue();
        break;
      }
    }
  }
  if (scope.isBusted(playerTakingCard) && playerTakingCard === scope.player) {
    setTimeout(function() {
      scope.outcomeMessage("BUSTED!");
      scope.playerLoses();
    }, 1000);
      if (scope.bankRoll === 0) {
        setTimeout(function() {
          scope.outcomeMessage("You're out of money!");
          var playAgain = prompt("Would you like to buy back in? Y for Yes or N for No");
          if (playAgain.toUpperCase() === "Y") {
            location.reload();
          }
        },2000);
      }
  }
};
// TEST: *** addCard() adds a card to a player's hand

BlackjackGame.prototype.outcomeMessage = function outcomeMessage(outcome) {
  var message = $("#messages").text(outcome).css({display:"block"});
  setTimeout(function(){
    message.css({display:"none"});
  }, 1500);
}

// TEST: *** outcomeMessage() displays outcome of game

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
  var playerTotal = this.player.hand.total;
  var dealerTotal =  this.dealer.hand.total
  if (playerTotal > dealerTotal || dealerTotal > 21) {
    this.playerWins();
  } else if (playerTotal < dealerTotal) {
    this.outcomeMessage("DEALER WINS!")
    this.playerLoses();
  } else if (playerTotal === dealerTotal) {
    this.playersPush();
  }
};
// TEST: *** compareHands() compares the dealer's hand to the player's hand, returns the winner, and shows the dealer's second card.

BlackjackGame.prototype.playersPush = function playersPush() {
  this.outcomeMessage("PUSH!");
  this.bankRoll += this.bet;
  this.updateBankRoll();
  this.resetListeners();
}

//TEST: push displays push message and returns money to bankroll
BlackjackGame.prototype.isBlackjack = function isBlackjack() {
  return this.player.hand.total === 21;
};

//TEST: *** isBlackjack sees if player has been dealt blackjack and returns true or false

BlackjackGame.prototype.isBusted = function isBusted(playerorDealer) {
  return playerorDealer.hand.total > 21;
};

//TEST: *** isBusted() checks the players hand to see if it is over 21

BlackjackGame.prototype.playerWins = function playerWins () {
  this.outcomeMessage("YOU WIN!");
  this.bankRoll += 2*this.bet;
  this.updateBankRoll();
  this.resetListeners();
};
//TEST: *** playerWins() adds winnings to bankRoll

BlackjackGame.prototype.playerLoses = function playerLoses() {
  this.resetListeners();
}
//TEST: playerLoses() resets Event Listeners
BlackjackGame.prototype.blackjack = function blackjack() {
  this.outcomeMessage("BLACKJACK!!!");
  this.bankRoll += 2.5*this.bet;
  this.updateBankRoll();
  this.resetListeners();
};

//TEST: *** blackjack() adds 3/2 winnings after hitting a blackjack

BlackjackGame.prototype.updateBankRoll = function updateBankRoll() {
  var wallet = $("#wallet");
  wallet.text("Bankroll: $" + this.bankRoll);
};

//TEST: *** updateBankroll() updates the bankroll on screen

BlackjackGame.prototype.updateBetAmount = function updateBetAmount() {
  var betSize = $("#betAmount");
  betSize.text("Bet: $" + this.bet);
};
//TEST: *** updateBetAmount() updates the bet amount on screen

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

BlackjackGame.prototype.resetListeners = function resetListeners() {
  $("#hit>button").off('click');
  $("#stand>button").off('click');
  this.bindDealButton();
  this.bindIncreaseBetButton();
  this.bindDecreaseBetButton();
}

//TEST: *** removeListeners resets listeners

var game = new BlackjackGame()
$(document).on('ready', function(){
  game.init();
});
