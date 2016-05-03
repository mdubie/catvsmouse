var drawCanvas = function(){
  const canvasWidth = 700;
  const canvasHeight = 700;
  var $canvas = $("<canvas id='canv' width='" + canvasWidth + "' height='" + canvasHeight + "'></canvas>");
  $('.field').append($canvas);
  return $canvas.get(0).getContext("2d");
};

var Player = function(color, x, y, width, height){
  return {
    color: color,
    x: x,
    y: y,
    width: width,
    height: height,
  };
};

var isCaught = function(state){
  return Math.abs(state.mouse.x - state.cat.x) < 20 
    && Math.abs(state.mouse.y - state.cat.y) < 20;
}

$(document).ready(function() {
  var canvas = drawCanvas();
  var state = {};
  state.mouse = Player('#fff', 50, 50, 20, 20);
  state.cat = Player('#000', 650, 650, 20, 20);

  var update = function(){
    if (isCaught(state)){
      console.log('dead');
    }

    var x = state.mouse.x;
    var y = state.mouse.y; 

    if (keydown.left) {
      x -= 5;
    } if (keydown.right) {
      x += 5;
    } if (keydown.up) {
      y -= 5;
    } if (keydown.down) {
      y += 5;
    }

    

  };

  function draw(state) {
    canvas.clearRect(0, 0, 700, 700);
    canvas.fillStyle = state.mouse.color;
    canvas.fillRect(state.mouse.x, state.mouse.y, state.mouse.width, state.mouse.height);
    canvas.fillStyle = state.cat.color;
    canvas.fillRect(state.cat.x, state.cat.y, state.cat.width, state.cat.height);
  }


  var FPS = 30;
  setInterval(function(){
    update();
    draw(state);
  }, 1000/FPS);

});
