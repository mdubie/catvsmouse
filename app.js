
/**
 * On initilization, populates HTML field based upon the data field
 * @param  {object} state contains field property used to build HTML
 */
var populateField = function(){
  const fieldWidth = 20;
  const fieldHeight = 20;
  var $field = $('.field');
  $field.children().remove();
  for(var i = 0; i < fieldWidth; i++){
    var $row = $('<div class=row></div>');
    for(var j = 0; j < fieldHeight; j++){
      var $cell = $('<div class=cell></div>');
      $row.append($cell);
    }
    $field.append($row);
  }
};

/**
 * Constructor
 * @param {array} position initial position of that player
 * @param {string} id used to defined the data field
 */
var Player = function(position, id){
  this.position = position;
  this.id = id;
  this.enemy = id === 'cat' ? 'mouse' : 'cat';
};

/**
 * Checks if cat and mouse occupy the same square >> game over
 * Checks if player is trying to go off the map >> nothing happens
 * Else, removes player from current location, and moves them to new location on data field
 * @param  {number} i     coordinates to move player (up and down) [-1, 0, 1]
 * @param  {number} j     coordinates to move player (left and right) [-1, 0 ,1]
 * @param  {object} state current data, use the state field and level data
 * @return {object}       returns state object (and new position of the player)
 */
Player.prototype.updateState = function(d, state){
  var i = this.position[0] + d[0];
  var j = this.position[1] + d[1];
  var enemyPos = state[this.enemy].position;
  if (i === enemyPos[0] && j === enemyPos[1]) {
    //termination of game function
    return state;
  }
  if (!(0 <= i && i < 20 && 0 <= j && j < 20)){
    return state;
  }
  this.position = [i, j];
  return state;
};

/**
 * updates HTML field after player makes a move
 */
Player.prototype.updateDisplay = function(){
  $('#' + this.id).removeAttr('id', this.id);
  $target = $('.row').first();
  for(var i = 0; i < this.position[0]; i++){
    $target = $target.next();
  }
  $target = $target.children().first();
  for(var j = 0; j < this.position[1]; j++){
    $target = $target.next();
  }
  $target.attr('id', this.id);
};

/**
 * Based upon the relative position of the cat and mouse, outputs a direction for the cat to go
 * @param  {object} state state object
 * @return {array}       direction of cat to go next move
 */
Player.prototype.direction = function(state){
  var i = (state.mouse.position[0] > state.cat.position[0]) ? 1 : -1;
  var j = (state.mouse.position[1] > state.cat.position[1]) ? 1 : -1;
  var result = [i, j];
  result[Math.floor(2*Math.random())] = 0;
  return result;
};

/**
 * Initializes state variable (and calls populates field)
 * @return {object} state object
 */
var initData = function(){
  var state = {};
  state.mouse = new Player([1,1], 'mouse');
  state.cat = new Player([18,18], 'cat');
  return state;
};

var initDisplay = function(state){
  populateField();
  state.mouse.updateDisplay();
  state.cat.updateDisplay();
};

var captureUserInput = function(e){
  var d = [0,0];
  if (e.keyCode == 37) {
    d[1] = -1;
  } if (e.keyCode == 38) { 
    d[0] = -1;
  } if (e.keyCode == 39) { 
    d[1] = 1;
  } if (e.keyCode == 40) { 
    d[0] = 1;
  }
  return d;
}

$(document).ready(function() {
  var state = initData();
  initDisplay(state);

  var catControl = setInterval(function(){
    var d = state.cat.direction(state);
    state = state.cat.updateState(d, state);
    state.cat.updateDisplay();
  }, 200);

  /**
   * Takes user input from keys and translates into mouse movement
   * @param  {number} e keyboard event
   */ 
  $(document).keydown(function(e){
    var d = captureUserInput(e);
    state = state.mouse.updateState(d, state);
    state.mouse.updateDisplay();
  });
});