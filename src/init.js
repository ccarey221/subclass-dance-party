$(document).ready(function() {
  window.villainDancers = [];
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
      window.villainDancers.push(dancer);
    }
  });

  $('.LineUpButton').on('click', function(event) {
    for (var i = 0; i < window.heroDancers.length; i++) {
      window.heroDancers[i].setPosition(i * 50 + 200, 500);
    }
    for (var i = 0; i < window.villainDancers.length; i++) {
      window.villainDancers[i].setPosition(i * 50 + 200, 1000);
    }
  });

  $('.dancefloor').on('mouseover', '.villain', function(event) {
    var targetDancer = null;
    var totalDif = 10000;
    var heroMatch = null;

    //find targetDancer
    for (var i = 0; i < window.villainDancers.length; i++) {
      var topValue = window.villainDancers[i].$node.css('top');
      if ($(this).css('top') === topValue) {
        targetDancer = window.villainDancers[i];
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

  var moveUp = function() {
    HeroDancer.prototype.step = function() {
      // call the old version of step at the beginning of any call to this new version of step
      Dancer.prototype.step.call(this);
      // toggle() is a jQuery method to show/hide the <span> tag.
      // See http://api.jquery.com/category/effects/ for this and
      // other effects you can use on a jQuery-wrapped html tag.
      this.$node.animate({
        top: '-=50px'
      }, 200);
    };

    heroDancers[0].step();

  };

  var moveDown = function() {
    HeroDancer.prototype.step = function() {
      // call the old version of step at the beginning of any call to this new version of step
      Dancer.prototype.step.call(this);
      // toggle() is a jQuery method to show/hide the <span> tag.
      // See http://api.jquery.com/category/effects/ for this and
      // other effects you can use on a jQuery-wrapped html tag.
      this.$node.animate({
        top: '+=50px'
      }, 200);
    };

    heroDancers[0].step();

  };

  var moveLeft = function() {
    HeroDancer.prototype.step = function() {
      // call the old version of step at the beginning of any call to this new version of step
      Dancer.prototype.step.call(this);
      // toggle() is a jQuery method to show/hide the <span> tag.
      // See http://api.jquery.com/category/effects/ for this and
      // other effects you can use on a jQuery-wrapped html tag.
      this.$node.animate({
        left: '-=50px'
      }, 200);
    };

    heroDancers[0].step();

  };

  var moveRight = function() {
    HeroDancer.prototype.step = function() {
      // call the old version of step at the beginning of any call to this new version of step
      Dancer.prototype.step.call(this);
      // toggle() is a jQuery method to show/hide the <span> tag.
      // See http://api.jquery.com/category/effects/ for this and
      // other effects you can use on a jQuery-wrapped html tag.
      this.$node.animate({
        left: '+=50px'
      }, 200);
    };

    heroDancers[0].step();

  };
  $(document).keypress(function(e) {
    var code = e.keyCode || e.which;
    console.log(code);
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


