(function() {
  "use strict";

  const memoryGameModule = function() {

    const startButton = document.querySelector('.start-game-button');
    const userGuess = [];
    const cardArray = [];
    let randomizedArray = [];

    class MemoryCards {
      constructor(arg1, arg2) {
          this.image = arg2,
          this.id = arg1;
          this.build();
      }

      build() {
        const source = $("#card-template").html();
        const template = Handlebars.compile(source);
        const context = {
            image: this.image,
            id: this.id
        };
        const html = template(context);
        cardArray.push(html);
      }
    }

    function bindEvents() {
      startGame();
      clickCard();
    }

    function buildCardSet() {
      for (let index = 0; index <= 15; index++) {
          cardArray.push(new MemoryCards(`${index+1}`, `${index}`));
          cardArray.push(new MemoryCards(`${index+1}`, `${index}`));
        }
    }

    function checkMatches() {
      if (userGuess[0] === userGuess[1]){
        $('.match-or-no').html('<p>Match!</p>');
        setTimeout(placeCheckMark, 900);
      } else {
        $('.match-or-no').html('Not a match! Try again!');
        // $('.card').toggleClass('check');
        setTimeout(fixNonMatches, 2500);
      }
    }

    function placeCheckMark() {
      let counter = ($('.card.check').length)/2;
      $('.card.check .card-id.hide').html('<img src="https://www.ifonly.com/images/io/icon_checkmark_green.png">');
      $('.count-score').html(counter);
    }

    function clickCard() {
      $('.card-container').on('click', '.card', function() {
        userGuess.push($(this).attr('data-id'));
        $(this).children().toggleClass('hide');
        $(this).addClass('check');
        console.log($(this));
        trackTwoGuesses();

      });
    }



    function randomlyOrderedCards() {
      randomizedArray = cardArray.sort(function(a, b){return 0.5 - Math.random()});
      // console.log(randomizedArray);
    }

    function showRandomlyOrderedCards(){
      $('.match-or-no').html('');
      for (let i=0; i<randomizedArray.length;i++){
        $('.card-container').append(randomizedArray[i]);
      }
    }

    function fixNonMatches(){
      // $('.card ').toggleClass('check');
      $('.card:not(check) .card-id.hide').removeClass('hide');
      $('.card-image:not(hide)').addClass('hide');
    }


    function startGame() {
      startButton.addEventListener('click', ()=> {
        event.preventDefault();
        $('.card-container').toggleClass('hide');
        buildCardSet();
        randomlyOrderedCards();
        showRandomlyOrderedCards();
        setInterval(showTime, 5000);
      })
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
    }


  }

  const memoryGameApp = memoryGameModule();

  memoryGameApp.init();

  function showTime() {
    const timeBox = document.querySelector('.add-time');
    let time = new Date();
    let newTime = time.toLocaleTimeString();
    timeBox.innerHTML = newTime;
  }
  setInterval(showTime, 1000);

})();
