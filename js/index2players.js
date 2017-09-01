$(document).ready(function() {
  play("effects/music.mp3");

  //Fijación de FPS, velocidades y cálculo del espacio.
  var fps = 60;
  var speedProtagonist = 8;
  var speedHammer = Math.random() * 5 + 10;
  var speedKey = 5;

  //Creación de Protagonist
  var protagonist = new Protagonist(500, 500, speedProtagonist, "main");
  var protagonist2 = new Protagonist(750, 500, speedProtagonist, "main2");

  //Detección del teclado 1
  $(document).keydown(function(e) {
    if (e.keyCode == 39) {
      protagonist.direction[0] = true;
    } else if (e.keyCode == 37) {
      protagonist.direction[1] = true;
    } else if (e.keyCode == 38) {
      protagonist.direction[2] = true;
    } else if (e.keyCode == 40) {
      protagonist.direction[3] = true;
    }
  });
  $(document).keyup(function(e) {
    if (e.keyCode == 39) {
      protagonist.direction[0] = false;
    } else if (e.keyCode == 37) {
      protagonist.direction[1] = false;
    } else if (e.keyCode == 38) {
      protagonist.direction[2] = false;
    } else if (e.keyCode == 40) {
      protagonist.direction[3] = false;
    }
  });

  //Detección del teclado 2
  $(document).keydown(function(e) {
    if (e.keyCode == 68) {
      protagonist2.direction[0] = true;
    } else if (e.keyCode == 65) {
      protagonist2.direction[1] = true;
    } else if (e.keyCode == 87) {
      protagonist2.direction[2] = true;
    } else if (e.keyCode == 83) {
      protagonist2.direction[3] = true;
    }
  });
  $(document).keyup(function(e) {
    if (e.keyCode == 68) {
      protagonist2.direction[0] = false;
    } else if (e.keyCode == 65) {
      protagonist2.direction[1] = false;
    } else if (e.keyCode == 87) {
      protagonist2.direction[2] = false;
    } else if (e.keyCode == 83) {
      protagonist2.direction[3] = false;
    }
  });


  Protagonist.prototype.updateProtagonist = function() {
    //Implementar funciones ternarias.
    if (this.direction[2] == true && this.direction[0] == true) {
      this.moveUp();
      this.moveRight();
    } else if (this.direction[3] == true && this.direction[0] == true) {
      this.moveDown();
      this.moveRight();
    } else if (this.direction[3] == true && this.direction[1] == true) {
      this.moveDown();
      this.moveLeft();
    } else if (this.direction[2] == true && this.direction[1] == true) {
      this.moveUp();
      this.moveLeft();
    } else if (this.direction[2] == true) {
      this.moveUp();
    } else if (this.direction[3] == true) {
      this.moveDown();
    } else if (this.direction[0] == true) {
      this.moveRight();
    } else if (this.direction[1] == true) {
      this.moveLeft();
    }
    this.element.css({
      top: this.y,
      left: this.x,
      position: 'absolute'
    });
  };

  //Creación del Contador
  var counter = 0;

  function counterUpdate() {
    counter += 1 / 60;
    $(".counter").text(Math.trunc(counter));
  }

  //Creación de Meteors
  var desiredNumberOfMeteors = 12;
  var meteors = [];

  function fullfillMeteors(n) {
    for (var i = 0; i < n - meteors.length; i++) {
      var meteorX = Math.random() * $('#board').width();
      var speedMeteor = Math.random() * 5 + 10; // entre 10 y 15
      meteors.push(new Meteor(meteorX, -100, speedMeteor));
    }
  }

  //Control de salida de Meteors
  setTimeout(function() {
    fullfillMeteors(desiredNumberOfMeteors);
  }, 10000);

  //Creación de Hammers
  var desiredNumberOfHammers = 12;
  var hammers = [];

  //Control de salida de Hammers
  function fullfillHammers(n) {
    for (var i = 0; i < n - hammers.length; i++) {
      var hammerX = Math.random() * $('#board').width();
      hammers.push(new Hammer(hammerX, 200 + i * 200, speedHammer));
    }
  }
  setTimeout(function() {
    fullfillHammers(desiredNumberOfHammers);
  }, 14500);

  //Creación de Keys
  var desiredNumberOfKeys = 5;
  var keys = [];

  function fullfillKeys(n) {
    for (var i = 0; i < n - keys.length; i++) {
      var keyX = Math.random() * $('#board').height();
      keys.push(new Key(keyX, 310 * (i), speedKey));
    }
  }
  fullfillKeys(desiredNumberOfKeys);

  //Tiempo de caida de los meteors
  setInterval(function() {
    fullfillMeteors(desiredNumberOfMeteors);
  }, 6000);

  //Actualizado de objetos.
  function update() {
    //Update protagonist
    protagonist.updateProtagonist();
    protagonist2.updateProtagonist();

    //Update hammers
    hammers.forEach(function(e) {
      e.updateHammer();
      e.acelerateHammer();
    });
    // Update meteors
    meteors = meteors.filter(function(e) {
      return !e.tobeDeleted;
    });
    meteors.forEach(function(e) {
      e.update();
    });

    // Update keys
    keys.forEach(function(e) {
      e.updateKey();
    });

    // Update impacts
    checkObstacles();
    checkObstacles2();
    checkColision();
    // Update Counter
    counterUpdate();

  }
  //Efectos de explosión
  function play(title) {
    $("<audio>", {
          src: title
      }).each(function () {
          this.play();
      });
  }
  //Impactos (comprobación)
  function checkObstacles() {
    var a = $(".hammer").collision(".main");
    if ($(".hammer").collision(".main").length > 0 || $(".meteor").collision(".main").length > 0 || $(".key").collision(".main").length > 0) {
      if (protagonist.hp > 0) {
        protagonist.hp -= 1;
      } else {
        $(".main").addClass("explosion").removeClass("main");
        play("effects/pum.mp3");
        setTimeout(function() {
          var gameOver = $("<div>").attr("class", "gameOver").append("<a href='game2players.html'>Play Again!</a>");
          var exit = $("<div>").attr("class", "exit").append("<a href='index2.html'>Exit</a>");
          var points = $("<div>").attr("class", "points").append("You survived: " + Math.trunc( counter) + " seconds");

          gameOver.css({top: "200px",left: "500px",position: "absolute"});
          exit.css({top: "300px",left: "565px",position: "absolute"});
          points.css({top: "10px",left: "10px",position: "absolute"});


          $("#board").append(gameOver);
          $("#board").append(exit);
          $("#board").append(points);
          counter = 0;
        }, 500);
      }
    }
  }
  function checkObstacles2() {
    if ($(".hammer").collision(".main2").length > 0 || $(".meteor").collision(".main2").length > 0 || $(".key").collision(".main2").length > 0) {
      if (protagonist2.hp > 0) {
        protagonist2.hp -= 1;
      } else {
        $(".main2").addClass("explosion").removeClass("main2");
        play("effects/pum.mp3");
        setTimeout(function() {
          var gameOver = $("<div>").attr("class", "gameOver").append("<a href='game2players.html'>Play Again!</a>");
          var exit = $("<div>").attr("class", "exit").append("<a href='index.html'>Exit</a>");
          var points = $("<div>").attr("class", "points").append("You survived: " + Math.trunc( counter) + " seconds");

          gameOver.css({top: "200px",left: "500px",position: "absolute"});
          exit.css({top: "300px",left: "565px",position: "absolute"});
          points.css({top: "10px",left: "10px",position: "absolute"});
          counter = 0;


          $("#board").append(gameOver);
          $("#board").append(exit);
          $("#board").append(points);

        }, 500);
      }
    }
  }
  function checkColision() {
    if ($(".main").collision(".main2").length > 0) {
      if (protagonist2.hp > 0) {
        protagonist2.hp -= 1;
      } else {
        $(".main").addClass("explosion").removeClass("main");
        $(".main2").addClass("explosion").removeClass("main2");
        play("effects/pum.mp3");
        setTimeout(function() {
          var gameOver = $("<div>").attr("class", "gameOver").append("<a href='game2players.html'>Play Again!</a>");
          var exit = $("<div>").attr("class", "exit").append("<a href='index.html'>Exit</a>");
          var points = $("<div>").attr("class", "points").append("You survived: " + Math.trunc( counter) + " seconds");

          gameOver.css({top: "200px",left: "500px",position: "absolute"});
          exit.css({top: "300px",left: "565px",position: "absolute"});
          points.css({top: "10px",left: "10px",position: "absolute"});
          counter = 0;


          $("#board").append(gameOver);
          $("#board").append(exit);
          $("#board").append(points);
        }, 500);
      }
    }
  }


  //Set Interval
  setInterval(function() {
    update();
  }, 1000 / fps);
});
