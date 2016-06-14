var BlinkyDancer = function(top, left, timeBetweenSteps) {
  Dancer.call(this, top, left, timeBetweenSteps);
  this.$node = this.$node.addClass("blinky");
  // we plan to overwrite the step function below, but we still want the superclass step behavior to work,
  // so we must keep a copy of the old version of this function
};

BlinkyDancer.prototype = Object.create(Dancer.prototype);

/*BlinkyDancer.prototype.oldStep = function() {
  Dancer.prototype.step.call(this);
};*/

BlinkyDancer.prototype.step = function() {
  // call the old version of step at the beginning of any call to this new version of step
  Dancer.prototype.step.call(this);
  // toggle() is a jQuery method to show/hide the <span> tag.
  // See http://api.jquery.com/category/effects/ for this and
  // other effects you can use on a jQuery-wrapped html tag.
  this.$node.toggle();
};

BlinkyDancer.prototype.constructor = BlinkyDancer;