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
      Math.random() * 1000
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
      window.heroDancers[i].setPosition(i*50 + 200, 500);
    }
    for (var i = 0; i < window.villainDancers.length; i++) {
      window.villainDancers[i].setPosition(i*50 + 200, 1000);
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

    targetDancer.setPosition(heroMatch.top, heroMatch.left + 100);

  });


});

