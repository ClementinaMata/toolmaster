function Key(x, y, speed){
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.element = $('<div>').attr("class","key");
  this.element.css({top:this.y, left:this.x, position:'absolute'});
  $('#board').append(this.element);
}

Key.prototype.updateKey = function(){
  this.x += this.speed;
  this.element.css({top:this.y, left:this.x, position:'absolute'});

  if(this.x >= $("#board").width() || this.x <= 0){
    this.speed *= -1;
  }
};
