/**
 * Builds an x,y array of populated with 'n' characters, 'n' represents nothing
 * @return {array}
 */
var buildField = function(){
  var x = 20;
  var y = 20;
  var rows = new Array(x + 1).join('n').split('');
  return rows.map(function(){
    return new Array(y + 1).join('n').split('');
  });
};

/**
 * On initilization, populates HTML field based upon the data field
 * @param  {object} state contains field property used to build HTML
 */
var populateField = function(state){
  var $field = $('.field');
  $field.children().remove();
  var len_i = state.field.length;
  for(var i = 0; i < len_i; i++){
    var len_j = state.field[i].length;
    var $row = $('<div class=row></div>');
    for(var j = 0; j < len_j; j++){
      var $cell = $('<div class=cell></div>');
      $cell.attr('id', state.field[i][j]);
      $row.append($cell);
    }
    $field.append($row);
  }
};

/**
 * Constructor
 * @param {array} position initial position of that player
 * @param {string} marker used to defined the data field
 */
var Player = function(position, marker){
  this.position = position;
  this.marker = marker;
  this.enemy = marker === 'c' ? 'm' : 'c';
  this.newPos = [];
};

/**
 * Initilizes player on the data field
 * @param  {object} state holds data field for storing locations of players
 * @return {object}       returns state with player placed on the data field
 */
Player.prototype.init = function(state){
  state.field[this.position[0]][this.position[1]] = this.marker;
  return state;
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
Player.prototype.move = function(i, j, state){
  var x = this.position[0] + i;
  var y = this.position[1] + j;
  if (state.field[x][y] === this.enemy) {
    var finalLevel = state.levels.level;
    $('h1').text('Yummmmm tasty mouse. Gameover. Final level: ' + finalLevel +'\n refresh page to play again');
    $('.field').remove();
    $('h2').remove();
  }
  if (state.field[x] === undefined ||
    state.field[x][y] === undefined){
    return state;
  }
  state.field[x - i][y - j] = 'n';
  this.position[0] = x;
  this.position[1] = y;
  state.field[x][y] = this.marker;
  this.newPos = [x, y];
  return state;
};

/**
 * updates HTML field after player makes a move
 */
Player.prototype.updateField = function(){
  $('#' + this.marker).attr('id', 'n');
  $target = $('.row').first();
  for(var i = 0; i < this.newPos[0]; i++){
    $target = $target.next();
  }
  $target = $target.children().first();
  for(var j = 0; j < this.newPos[1]; j++){
    $target = $target.next();
  }
  $target.attr('id', this.marker);
};

/**
 * Based upon the relative position of the cat and mouse, outputs a direction for the cat to go
 * @param  {object} state state object
 * @return {array}       direction of cat to go next move
 */
Player.prototype.direction = function(state){
  var axis_i = (state.mouse.position[0] > state.cat.position[0]) ? 1 : -1;
  var axis_j = (state.mouse.position[1] > state.cat.position[1]) ? 1 : -1;
  var result = [axis_i, axis_j];
  result[Math.floor(2*Math.random())] = 0;
  return result;
};

/**
 * constructor for levels object
 */
var Levels = function(){
  this.level = 0,
  this.catSpeed = 500,
  this.next = function(){
    this.level++;
    this.catSpeed = Math.floor(this.catSpeed * .8);
    $('h2').text('Level ' + this.level);
  };
};

/**
 * Initializes state variable (and calls populates field)
 * @return {object} state object
 */
var initData = function(){
  var state = {};
  state.mouse = new Player([1,1], 'm');
  state.cat = new Player([18,18], 'c');
  state.levels = new Levels();
  state.field = buildField();
  state = state.mouse.init(state);
  state = state.cat.init(state);
  populateField(state);
  return state;
};

$(document).ready(function() {
  var state = initData();
  
  /**
   * Controls the levels timer
   */
  var levelControl = setInterval(function(){
    clearInterval(catControl);
    /**
     * Controls the cat movement intervals
     */
    var catControl = setInterval(function(){
      var d = state.cat.direction(state);
      state = state.cat.move(d[0], d[1], state);
      state.cat.updateField();
    }, state.levels.catSpeed);
  state.levels.next();
  }, 5000);

  /**
   * Takes user input from keys and translates into mouse movement
   * @param  {number} e keyboard event
   */
  $(document).keydown(function(e){
    var i = 0;
    var j = 0;
    if (e.keyCode == 37) {
      j = -1;
    } if (e.keyCode == 38) { 
      i = -1;
    } if (e.keyCode == 39) { 
      j = 1;
    } if (e.keyCode == 40) { 
      i = 1;
    } 
    state = state.mouse.move(i, j, state);
    state.mouse.updateField();
  });
});