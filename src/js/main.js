(function() {
  "use strict";

  const memoryGameModule = function() {

    const startButton = document.querySelector('.start-game-button');
    const timeBox = document.querySelector('.time');
    const imageArrays = [];
    const userGuess = [];
    const cardArray = [];
    let time = moment.duration(1, "minutes");

    class MemoryCards {
      constructor(arg) {
          // this.image = cardId.url;
          this.id = arg;
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
        cardArray.push(new MemoryCards(`${index+1}`));
        cardArray.push(new MemoryCards(`${index+1}`));
      }
    }

    function checkMatches() {
      if (userGuess[0] === userGuess[1]){
        alert('Match!');
        freezeImages();
      }
    }

    function clickCard() {
      $('.card-container').on('click', '.card', function() {
        userGuess.push($(this).attr('data-id'));
        trackTwoGuesses();
      });
    }

    function freezeImages() {
      console.log('frozen');
    }

    function showTime() {
      timeBox.innerHTML += time;
    }

    function showRandomlyOrderedCards() {
      cardArray.sort(function(a, b){return 0.5 - Math.random()});
      for (let i = 0; i < cardArray.length; i++) {
        $('.card-container').append(cardArray[i]);
      }
    }

    function startGame() {
      startButton.addEventListener('click', ()=> {
        event.preventDefault();
        console.log('Start time is' + " " + time);
        $('.card-container').toggleClass('hide');
        buildCardSet();
        showRandomlyOrderedCards();
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
      showTime();
      bindEvents();
    }


    return {
      init: init
    }


  }

  const memoryGameApp = memoryGameModule();

  memoryGameApp.init()

})();
