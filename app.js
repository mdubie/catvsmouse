var drawCanvas = function(){
  const canvasWidth = 700;
  const canvasHeight = 700;
  var $canvas = $("<canvas id='canv' width='" + canvasWidth + "' height='" + canvasHeight + "'></canvas>");
  $('.field').append($canvas);
  var canvas = $canvas.get(0).getContext("2d");
  canvas.FPS = 30;
  return canvas;
};

var Player = function(color, x, y, width, height, speed){
  return {
    color: color,
    x: x,
    y: y,
    width: width,
    height: height,
    speed: speed
  };
};

var isCaught = function(state){
  return Math.abs(state.mouse.x - state.cat.x) < 20 
    && Math.abs(state.mouse.y - state.cat.y) < 20;
};

var mouseMove = function(state, keydown){
  var x = state.mouse.x;
  var y = state.mouse.y;
  var s = state.mouse.speed;

  if (keydown.left) {
    x -= s;
  } if (keydown.right) {
    x += s;
  } if (keydown.up) {
    y -= s;
  } if (keydown.down) {
    y += s;
  }

  x = Math.min(Math.max(x,0), 680);
  y = Math.min(Math.max(y,0), 680);

  state.mouse.x = x;
  state.mouse.y = y;
  return state;
};

var catMove = function(state){
  var x = state.mouse.x - state.cat.x;
  var y = state.mouse.y - state.cat.y;
  var s = state.cat.speed/Math.sqrt(x*x + y*y);
  state.cat.x += x*s*Math.random();
  state.cat.y += y*s*Math.random();
  return state;
};

var update = function(state){
  if (isCaught(state)){
    state.levels.over = true;
    return state;
  } 
  state = mouseMove(state, keydown);
  state = catMove(state);
  return state;
};

var displayPlayer = function(player, canvas){
  canvas.fillStyle = player.color;
  canvas.fillRect(player.x, player.y, player.width, player.height);
}

var gameoverDisplay = function(state){
  $('h2').text('Game over final level: ' + state.levels.level)
  state.canvas.clearRect(0, 0, 700, 700);
}

var gameDisplay = function(state){
  $('h2').text('Current level: ' + state.levels.level);
  state.canvas.clearRect(0, 0, 700, 700);
  displayPlayer(state.cat, state.canvas);
  displayPlayer(state.mouse, state.canvas);
}

var draw = function(state) {
  state.levels.over ?
    gameoverDisplay(state) :
    gameDisplay(state);
};

var Levels = function(){
  return {
    level: 1,
    incTime: 3000,
    over: false,
    nextLevel: function(state){
      if (!this.over) {
        state.cat.speed *= 1.15;
        this.level ++;
      }
    }
  };
};

var initData = function(){
  var state = {};
  state.canvas = drawCanvas();
  state.mouse = Player('#fff', 50, 50, 20, 20, 15);
  state.cat = Player('#000', 650, 650, 20, 20, 5);
  state.levels = Levels();
  return state;
};

$(document).ready(function() {
  var state = initData();

  setInterval(function(){
    state.levels.nextLevel(state);
  }, state.levels.incTime)

  setInterval(function(){
    state = update(state);
    draw(state);
  }, 1000/state.canvas.FPS);

});
