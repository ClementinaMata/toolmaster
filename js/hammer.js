function Hammer(x, y) {
  this.x = x;
  this.y = y;
  this.speed = 5;
  this.direction = 90; // in degrees
  this.actor = $("<div>").attr("class", "hammer");
  this.actor.css({
    top: this.y,
    left: this.x,
    position: "absolute"
  });
  $("#board").append(this.actor);
}


Hammer.prototype.updateHammer = function() {
  if (this.x <= 10) {
    this.direction += 45;
    this.x = 10;
  } else if (this.x >= $("#board").width() - 20) {
    this.direction += 45;
    this.x = $("#board").width() - 20;
  }
  if (this.y <= 10) {
    this.direction += 45;
    this.y = 10;
  } else if (this.y >= $("#board").height() - 20) {
    this.direction += 45;
    this.y = $("#board").height() - 20;
  }
  this.x += Math.cos(this.direction) * this.speed;
  this.y += Math.sin(this.direction) * this.speed;
  this.actor.css({
    top: this.y,
    left: this.x
  });
};

Hammer.prototype.acelerateHammer = function (){
  this.speed +=0.01;
};
