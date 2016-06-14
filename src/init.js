$(document).ready(function() {
  window.zombieDancers = [];
  window.michaelChasers = [];
  window.heroDancers = [];

  $('.addDancerButton').on('click', function(event) {
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
    var dancerMakerFunctionName = $(this).data('dancer-maker-function-name');

    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName];

    // make a dancer with a random position

    var dancer = new dancerMakerFunction(
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
  });

  var heroDancer = new HeroDancer(
    $('body').height() / 2,
    $('body').width() / 2,
    300
  );

  window.heroDancers.push(heroDancer);
  window.michaelChasers.push(heroDancer);

  $('.dancefloor').append(heroDancer.$node);


  $('.LineUpButton').on('click', function(event) {
    for (var i = 0; i < window.heroDancers.length; i++) {
      window.heroDancers[i].setPosition(i * 50 + 200, 500);
    }
    for (var i = 0; i < window.zombieDancers.length; i++) {
      window.zombieDancers[i].setPosition(i * 50 + 200, 1000);
    }
    if (linedUp) {
      linedUp = false;
    } else {
      linedUp = true;
    }
  });

/*  $('.dancefloor').on('mouseover', '.zombie', function(event) {
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
  });*/

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

  var direction = null;
  var linedUp = null;

  var moveUp = function() {
    // console.log('up arrow');
    $(heroDancer.$node).stop().animate({
      top: '-=100'
    }, 300, function() {
      heroDancer.top -= 60;
    });
    direction = 'up';
  };

  var moveDown = function() {
    // console.log('down arrow');
    $(heroDancer.$node).stop().animate({
      top: '+=100'
    }, 300, function() {
      heroDancer.top += 60;
    });
    direction = 'down';
  };

  var moveLeft = function() {
    // console.log('left arrow');
    $(heroDancer.$node).stop().animate({
      left: '-=100'
    }, 300, function() {
      heroDancer.left -= 60;
    });
    direction = 'left';
  };

  var moveRight = function() {
    // console.log('right arrow');
    $(heroDancer.$node).stop().animate({
      left: '+=100'
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
      updateFollowerPostitions();
    } else if (direction === 'right') {
      moveRight();
      updateFollowerPostitions();
    }
  };

  setInterval(function() {
    if (!linedUp) {
      continueDirection();
      detectCollision();
    }
  }, 600);

  $(document).keypress(function(e) {
    var code = e.keyCode || e.which;
    // console.log(code);
    if (code === 97) { //left (a)
      heroDancer.directionTop = 0;
      heroDancer.directionLeft = 20;
      moveLeft();
    } else if (code === 119) { //Up (w)
      heroDancer.directionTop = 20;
      heroDancer.directionLeft = 0;
      moveUp();
    } else if (code === 100) { //right (d)
      heroDancer.directionTop = 0;
      heroDancer.directionLeft = -20;
      moveRight();
    } else if (code === 115) { //down (s)
      heroDancer.directionTop = -20;
      heroDancer.directionLeft = 0;
      moveDown();
    }
  });

  //collision detection:
  var detectCollision = function() {
  //iterate through array of zombies
    for (var zombie = 0; zombie < zombieDancers.length; zombie++) {
      //if baby michael's left or right page position is within the zombie's left/right bounds
      if ((zombieDancers[zombie].$node.position().left < heroDancer.$node.position().left && heroDancer.$node.position().left < zombieDancers[zombie].$node.position().left + 90) ||
        (zombieDancers[zombie].$node.position().left < heroDancer.$node.position().left + 90 && heroDancer.$node.position().left + 90 < zombieDancers[zombie].$node.position().left + 90)) {
        //if baby michael's top or bottom page position is within the zombie's top/bottom bounds
        if ((zombieDancers[zombie].$node.position().top < heroDancer.$node.position().top && heroDancer.$node.position().top < zombieDancers[zombie].$node.position().top + 150) ||
        (zombieDancers[zombie].$node.position().top < heroDancer.$node.position().top + 150 && heroDancer.$node.position().top + 150 < zombieDancers[zombie].$node.position().top + 150)) {
          //add zombie to followBabyMichael array
          var chaserArrayLength = michaelChasers.length;
          michaelChasers.push(zombieDancers[zombie]);
          //update zombie's position to be equal to position of previous index in followmichael array
          zombieDancers[zombie].setPosition(michaelChasers[chaserArrayLength - 1].top, michaelChasers[chaserArrayLength - 1].left);
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
      updateFollowerDirection(curZombie, prevZombie);
      curZombie.setPosition(prevZombie.$node.position().top + curZombie.directionTop, prevZombie.$node.position().left + curZombie.directionLeft);
    }
  };

  var updateFollowerDirection = function(zombie, prevZombie) {
    zombie.directionLeft = prevZombie.directionLeft;
    zombie.directionTop = prevZombie.directionTop;
  };


});

//check for keypress:


