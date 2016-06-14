var HeroDancer = function(top, left, timeBetweenSteps) {
  Dancer.call(this, top, left, timeBetweenSteps);
  this.$node = this.$node.addClass("hero");
  this.top = top;
  this.left = left;

};

HeroDancer.prototype = Object.create(Dancer.prototype);

/*HeroDancer.prototype.oldStep = function() {
  Dancer.prototype.step.call(this);
};*/

HeroDancer.prototype.step = function() {
  // call the old version of step at the beginning of any call to this new version of step
  // toggle() is a jQuery method to show/hide the <span> tag.
  // See http://api.jquery.com/category/effects/ for this and
  // other effects you can use on a jQuery-wrapped html tag.
/*  var styleSettings = {
    top: this.top,
    left: this.left
  };

  this.$node.css(styleSettings);*/
};

HeroDancer.prototype.constructor = HeroDancer;