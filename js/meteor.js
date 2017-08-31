function Meteor(x, y, speed) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.tobeDeleted = false;
  this.element = $("<div>").attr("class", "meteor");
  this.element.css({top: this.y,left: this.x,position: "absolute"});
  $("#board").append(this.element);
}

Meteor.prototype.update = function() {
  this.y = (this.y + this.speed);
  this.element.css({top: this.y,position: 'absolute'});

  if(this.y > $("#board").height()+this.element.height()){
    this.element.remove();
    this.tobeDeleted = true;
  }
};
