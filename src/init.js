$(document).ready(function() {
  window.zombieDancers = [];
  window.michaelChasers = [];
  window.gameEnders = [];
  window.heroDancers = [];

  //$('.addDancerButton').on('click', function(event) {
    /* This function sets up the click handlers for the create-dancer
     * buttons on dancefloor.html. You should only need to make one small change to it.
     * As long as the "data-dancer-maker-function-name" attribute of a
     * class="addDancerButton" DOM node matches one of the names of the
     * maker functions available in the global scope, clicking that node
     * will call the function to make the dancer.
     */

    /* dancerMakerFunctionName is a string which must match
     * one of the dancer maker functions available in global scope.
     * A new object of the given type will be created and added
     * to the stage.
     */
    //var dancerMakerFunctionName = $(this).data('dancer-maker-function-name');

    // get the maker function for the kind of dancer we're supposed to make
    //var dancerMakerFunction = window[dancerMakerFunctionName];

    // make a dancer with a random position


  var centerScreenLeft = $('body').width() / 2;
  var centerScreenTop = $('body').height() / 2;
  var bottomScreen = $('body').height();

  console.log(centerScreenLeft);
  var heroDancer = new HeroDancer(
    100,
    100,
    300
  );

  window.heroDancers.push(heroDancer);
  window.michaelChasers.push(heroDancer);

  $('.dancefloor').append(heroDancer.$node);


  $('.LineUpButton').on('click', function(event) {
    if (linedUp) {
      linedUp = false;
      heroDancer.setPosition(10, 10);

    } else {
      linedUp = true;
    }

    for (var i = 1; i < window.michaelChasers.length; i++) {
      if (i < michaelChasers.length / 2) {
        window.michaelChasers[i].setPosition(i * 50 + 100, 200);
      } else {
        window.michaelChasers[i].setPosition((i - (michaelChasers.length / 2) + 1) * 50 + 100, 1000);
      }
    }

    for (var i = 0; i < window.zombieDancers.length; i++) {
      window.zombieDancers[i].setPosition(600, i * 50 + 500);
    }

  });

  /*$('.dancefloor').on('mouseover', '.zombie', function(event) {
    var targetDancer = null;
    var totalDif = 10000;
    var heroMatch = null;

    //find targetDancer
    for (var i = 0; i < window.zombieDancers.length; i++) {
      var topValue = window.zombieDancers[i].$node.css('top');
      if ($(this).css('top') === topValue) {
        targetDancer = window.zombieDancers[i];
      }
    }

    //find corresponding hero
    for (var i = 0; i < window.heroDancers.length; i++) {
      var currentDif = Math.abs(targetDancer.top - window.heroDancers[i].top) + Math.abs(targetDancer.left - window.heroDancers[i].left);
      if (currentDif < totalDif) {
        totalDif = currentDif;
        heroMatch = window.heroDancers[i];
      }
    }

    targetDancer.$node.animate({
      left: heroMatch.left + 100,
      top: heroMatch.top
    }, 1000, function() {
      targetDancer.setPosition(heroMatch.top, heroMatch.left + 100);
    });
  });
*/
/*  document.addEventListener('keydown', keyDownTextField, false);
  var lastPress = 'down';
  var keyDownTextField = function(e) {
    e.preventDefault();
    var keyCode = e.keyCode;
    console.log(keyCode);
    if (keyCode === 37) {
    console.log('left arrow');
      $(heroDancers[0].$node).stop().animate({
        left: '-=200'
      });
    } 
    if (keyCode === 39) { 
    console.log('right arrow');
      $('.heroDancer').stop().animate({
        left: '+=200'
      }); 
    }
    if (keyCode === 38) {
    console.log('up arrow');
      $('.heroDancer').stop().animate({
        up: '+=200'
      });
    }
    if (keyCode === 40) {
    console.log('down arrow');
      $('.heroDancer').stop().animate({
        up: '+=200'
      }), 100, function() {};
    }
  };*/

  var direction = 'down';
  var linedUp = null;

  var moveUp = function() {
    // console.log('up arrow');
    $(heroDancer.$node).stop().animate({
      top: '-=150'
    }, 300, function() {
      heroDancer.top -= 60;
    });
    direction = 'up';
  };

  var moveDown = function() {
    // console.log('down arrow');
    $(heroDancer.$node).stop().animate({
      top: '+=150'
    }, 300, function() {
      heroDancer.top += 60;
    });
    direction = 'down';
  };

  var moveLeft = function() {
    // console.log('left arrow');
    $(heroDancer.$node).stop().animate({
      left: '-=150'
    }, 300, function() {
      heroDancer.left -= 60;
    });
    direction = 'left';
  };

  var moveRight = function() {
    // console.log('right arrow');
    $(heroDancer.$node).stop().animate({
      left: '+=150'
    }, 300, function() {
      heroDancer.left += 60;
    }); 

    direction = 'right';
  };

  var continueDirection = function() {
    if (direction === 'up') {
      moveUp();
      updateFollowerPostitions();
    } else if (direction === 'down') {
      moveDown();
      updateFollowerPostitions();
    } else if (direction === 'left') {
      moveLeft();
      $('.zombie').removeClass('flip');
      updateFollowerPostitions();
    } else if (direction === 'right') {
      $('.zombie').addClass('flip');
      moveRight();
      updateFollowerPostitions();
    }
  };


  //collision detection:
  var detectCollision = function(dancerArray) {
  //iterate through array of zombies
    for (var zombie = 0; zombie < dancerArray.length; zombie++) {
      //if baby michael's left or right page position is within the zombie's left/right bounds
      if ((dancerArray[zombie].$node.position().left < heroDancer.$node.position().left && heroDancer.$node.position().left < dancerArray[zombie].$node.position().left + 90) ||
        (dancerArray[zombie].$node.position().left < heroDancer.$node.position().left + 90 && heroDancer.$node.position().left + 90 < dancerArray[zombie].$node.position().left + 90)) {
        //if baby michael's top or bottom page position is within the zombie's top/bottom bounds
        if ((dancerArray[zombie].$node.position().top < heroDancer.$node.position().top && heroDancer.$node.position().top < dancerArray[zombie].$node.position().top + 150) ||
        (dancerArray[zombie].$node.position().top < heroDancer.$node.position().top + 150 && heroDancer.$node.position().top + 150 < dancerArray[zombie].$node.position().top + 150)) {
          //add zombie to followBabyMichael array
          var chaserArrayLength = michaelChasers.length;
          michaelChasers.push(dancerArray[zombie]);
          //update zombie's position to be equal to position of previous index in followmichael array
          dancerArray[zombie].setPosition(michaelChasers[chaserArrayLength - 1].top, michaelChasers[chaserArrayLength - 1].left);
          if (dancerArray == zombieDancers) {
            dancerArray.splice(zombie, 1);
            gameEnders = michaelChasers.slice(3);
          } else if (dancerArray == gameEnders) {
            $('body').addClass('endGame');
            $('.dancer').toggle();
            $('.hero').toggle();
          }
        }
      }
    }
  };

  var updateFollowerPostitions = function() {
    //iterate through michaelChaser array
    // console.log(michaelChasers[0].$node.position(), '********************', heroDancer.top);
    for (var zombie = michaelChasers.length - 1; zombie > 0; zombie--) {
      //update each zombie position to position of previous zombie in array
      var curZombie = michaelChasers[zombie];
      var prevZombie = michaelChasers[zombie - 1];
      curZombie.setPosition(prevZombie.$node.position().top, prevZombie.$node.position().left);
    }
  };

  var checkRightSide = function() {
    if (!$('body').hasClass('toGraveyard') && heroDancer.$node.position().top > bottomScreen) {
      $('.popcorn').toggle();
      $('body').addClass('toGraveyard');
      direction = 'up';
      setInterval(function() {
        var dancer = new ZombieDancer(//dancerMakerFunction(
          $("body").height() * Math.random(),
          $("body").width() * Math.random(),
          300
        );

        $('.dancefloor').append(dancer.$node);
        console.log(dancer.$node.css('top'));

        //push dancers to respective arrays.
        if (dancer.$node.hasClass('hero')) {
          window.heroDancers.push(dancer);
        } else {
          window.zombieDancers.push(dancer);
        }
      }, 2000);
    }
  };

  setInterval(function() {
    if (!linedUp) {
      continueDirection();
      detectCollision(zombieDancers);
      detectCollision(gameEnders);
      checkRightSide();
    } else {
      heroDancer.setPosition(centerScreenTop - 300, centerScreenLeft - 300);
      if ($('.zombie').hasClass('flip')) {
        $('.zombie').animate({
          left: '-=50'
        }, 300, function() {
          $('.zombie').removeClass('flip');
        });
      } else {
        $('.zombie').animate({
          left: '+=50'
        }, 300, function() {
          $('.zombie').addClass('flip');
        });
      }
    }
  }, 300);

  $(document).keypress(function(e) {
    var code = e.keyCode || e.which;
    // console.log(code);
    if (code === 97) { //left (a)
      moveLeft();
    } else if (code === 119) { //Up (w)
      moveUp();
    } else if (code === 100) { //right (d)
      moveRight();
    } else if (code === 115) { //down (s)
      moveDown();
    }
  });


});

//check for keypress:


