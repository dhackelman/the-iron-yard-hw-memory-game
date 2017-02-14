(function() {
  "use strict";

  const memoryGameModule = function() {

    const startButton = document.querySelector('.start-game-button');
    const img1 = "../images/image-num1";
    const img2 = "../images/image-num2";
    const img3 = "../images/image-num3";
    const img4 = "../images/image-num4";
    const img5 = "../images/image-num5";
    const img6 = "../images/image-num6";
    const img7 = "../images/image-num7";
    const img8 = "../images/image-num8";
    const img9 = "../images/image-num9";
    const img10 = "../images/image-num10";
    const img11 = "../images/image-num11";
    const img12 = "../images/image-num12";
    const img13 = "../images/image-num13";
    const img14 = "../images/image-num14";
    const img15 = "../images/image-num15";
    const img16 = "../images/image-num16";
    const imageArrays = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15, img16];
    const userGuess = [];
    const cardArray = [];
    let randomizedArray = [];

    class MemoryCards {
      constructor(arg) {
          // this.image = cardId.url;
          this.id = arg1;
          this.id = arg2;
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
        for(let imgIndex = 0; imageIndex<imageArrays.length;imageIndex++){
          cardArray.push(new MemoryCards(`${index+1}`, `${imgIndex}`));
          cardArray.push(new MemoryCards(`${index+1}`, `${imgIndex}`));
        }
      }
    }

    function checkMatches() {
      if (userGuess[0] === userGuess[1]){
        $('.match-or-no').html('<p>Match!</p>')
        setTimeout(placeCheckMark, 900);
      } else {
        $('.match-or-no').html('Not a match! Try again!');
        $('.card').toggleClass('check');
        setTimeout(fixNonMatches, 2500);
      }
    }

    function placeCheckMark() {
      $('.card.check').html('<img src="https://www.ifonly.com/images/io/icon_checkmark_green.png">');
    }

    function clickCard() {
      $('.card-container').on('click', '.card', function() {
        userGuess.push($(this).attr('data-id'));
        $(this).children().toggleClass('hide');
        $(this).addClass('check');
        // console.log($(this));
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
      $('.card-id.hide').removeClass('hide');
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
    const timeBox = document.querySelector('.time');
    let time = new Date();
    let newTime = time.toLocaleTimeString();
    timeBox.innerHTML = newTime;
  }
  setInterval(showTime, 1000);

})();
