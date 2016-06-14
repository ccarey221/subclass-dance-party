// Creates and returns a new dancer object that can step
var Dancer = function(top, left, timeBetweenSteps) {
  this.$node = $('<span class="dancer"></span>');
  //console.log(this);
  this.step();
  this.top = top;
  this.left = left;
  this.setPosition(top, left);
  this.timeBetweenSteps = timeBetweenSteps;
  this.directionLeft = 0;
  this.directionTop = 0;
};

Dancer.prototype.step = function() {
  // the basic dancer doesn't do anything interesting at all on each step,
  // it just schedules the next step
  var boundStep = this.step.bind(this);//BlinkyDancer.prototype);
  //console.log(this.timeBetweenSteps, this);
  setTimeout(boundStep, this.timeBetweenSteps);
};

Dancer.prototype.setPosition = function(top, left) {
  // Use css top and left properties to position our <span> tag
  // where it belongs on the page. See http://api.jquery.com/css/
  //
  this.top = top;
  this.left = left;

  var styleSettings = {
    top: top,
    left: left
  };

  this.$node.css(styleSettings);
};
