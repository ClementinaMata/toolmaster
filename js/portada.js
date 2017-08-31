$(document).ready(function() {
  play("effects/portada.mp3");
  //Fijación de FPS, velocidades y cálculo del espacio.
  var fps = 60;
  var speedHammer = 10;
  //Creación de Hammers
  var desiredNumberOfHammers = 1;
  var hammers = [];
  $("#controls").hide();
  $("#controls1").hide();

  $("#three").on("click",function(){
    $("#controls").show(2000);
    $("#controls").hide(2000);
    $("#controls1").show(2000);
    $("#controls1").hide(2000);
  });
  //Control de salida de Hammers
  function fullfillHammers(n) {
    for (var i = 0; i < n - hammers.length; i++) {
      var hammerX = Math.random() * $('#board').width();
      hammers.push(new Hammer(hammerX, 200 + i * 200, speedHammer));
    }
  }
  fullfillHammers(desiredNumberOfHammers);
  //Actualizado de objetos.
  function update() {
    //Update hammers
    hammers.forEach(function(e) {
      e.updateHammer();
    });
  }
  //Efectos de sonido
  function play(title) {
    $("<audio>", {
          src: title
      }).each(function () {
          this.play();
      });
  }

  //Set Interval
  setInterval(function() {
    update();
  }, 1000 / fps);
});
