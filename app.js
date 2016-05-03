

$(document).ready(function() {
  const canvasWidth = 700;
  const canvasHeight = 700;
  var $canvas = $("<canvas id='canv' width='" + canvasWidth + "' height='" + canvasHeight + "'></canvas>");
  var canvas = $canvas.get(0).getContext("2d");
  $('.field').append($canvas);



  var Player = function(color, x, y, width, height){
    return {
      color: color,
      x: x,
      y: y,
      width: width,
      height: height,
      draw: function() {
        canvas.fillStyle = this.color;
        canvas.fillRect(this.x, this.y, this.width, this.height);
      }
    };
  };

  var mouse = Player('#fff', 50, 50, 20, 20);

  var update = function(){
    mouse.x += 2;
  };

  function draw() {
    canvas.clearRect(0, 0, canvasWidth, canvasHeight);
    mouse.draw();
  }

  var FPS = 30;
  setInterval(function(){
    update();
    draw();
  }, 1000/FPS);

});