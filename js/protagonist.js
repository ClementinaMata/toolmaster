function Protagonist(x, y, speed, nombre){
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.direction =[false,false,false,false];
  this.element = $("<div>").attr("class", nombre);
  this.element.css({top:this.y, left:this.x, position:"absolute"});
  $("#board").append(this.element);
  this.hp = 1;
}

Protagonist.prototype.moveRight = function(){
  if(this.x <= $('#board').width()-25){
    this.x += this.speed;
  }
};
Protagonist.prototype.moveLeft = function(){
  if(this.x <= 5){
  }
  else{this.x -= this.speed;}

};
Protagonist.prototype.moveUp = function(){
  if(this.y <= 5){
  }
  else{this.y -= this.speed;}

};
Protagonist.prototype.moveDown = function(){
  if(this.y <= $('#board').height()-25){
    this.y += this.speed;
  }

};
