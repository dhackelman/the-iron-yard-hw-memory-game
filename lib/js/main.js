"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  "use strict";

  var memoryGameModule = function memoryGameModule() {

    var startButton = document.querySelector('.start-game-button');
    var userGuess = [];
    var cardArray = [];
    var randomizedArray = [];

    var MemoryCards = function () {
      function MemoryCards(arg1, arg2) {
        _classCallCheck(this, MemoryCards);

        this.image = arg2, this.id = arg1;
        this.build();
      }

      _createClass(MemoryCards, [{
        key: "build",
        value: function build() {
          var source = $("#card-template").html();
          var template = Handlebars.compile(source);
          var context = {
            image: this.image,
            id: this.id
          };
          var html = template(context);
          cardArray.push(html);
        }
      }]);

      return MemoryCards;
    }();

    function bindEvents() {
      startGame();
      clickCard();
    }

    function buildCardSet() {
      for (var index = 0; index <= 15; index++) {
        cardArray.push(new MemoryCards("" + (index + 1), "" + index));
        cardArray.push(new MemoryCards("" + (index + 1), "" + index));
      }
    }

    function checkMatches() {
      if (userGuess[0] === userGuess[1]) {
        $('.match-or-no').html('<p>Match!</p>');
        setTimeout(placeCheckMark, 900);
      } else {
        $('.match-or-no').html('Not a match! Try again!');
        // $('.card').toggleClass('check');
        setTimeout(fixNonMatches, 2500);
      }
    }

    function placeCheckMark() {
      var counter = $('.card.check').length / 2;
      $('.card.check .card-id.hide').html('<img src="https://www.ifonly.com/images/io/icon_checkmark_green.png">');
      $('.count-score').html(counter);
    }

    function clickCard() {
      $('.card-container').on('click', '.card', function () {
        userGuess.push($(this).attr('data-id'));
        $(this).children().toggleClass('hide');
        $(this).addClass('check');
        console.log($(this));
        trackTwoGuesses();
      });
    }

    function randomlyOrderedCards() {
      randomizedArray = cardArray.sort(function (a, b) {
        return 0.5 - Math.random();
      });
      // console.log(randomizedArray);
    }

    function showRandomlyOrderedCards() {
      $('.match-or-no').html('');
      for (var i = 0; i < randomizedArray.length; i++) {
        $('.card-container').append(randomizedArray[i]);
      }
    }

    function fixNonMatches() {
      // $('.card ').toggleClass('check');
      $('.card:not(check) .card-id.hide').removeClass('hide');
      $('.card-image:not(hide)').addClass('hide');
    }

    function startGame() {
      startButton.addEventListener('click', function () {
        event.preventDefault();
        $('.card-container').toggleClass('hide');
        buildCardSet();
        randomlyOrderedCards();
        showRandomlyOrderedCards();
        setInterval(showTime, 5000);
      });
    }

    function trackTwoGuesses() {
      console.log(userGuess);
      if (userGuess.length === 2) {
        checkMatches();
        userGuess.length = 0;
      }
      console.log(userGuess);
    }

    function init() {
      bindEvents();
    }

    return {
      init: init
    };
  };

  var memoryGameApp = memoryGameModule();

  memoryGameApp.init();

  function showTime() {
    var timeBox = document.querySelector('.add-time');
    var time = new Date();
    var newTime = time.toLocaleTimeString();
    timeBox.innerHTML = newTime;
  }
  setInterval(showTime, 1000);
})();