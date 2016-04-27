var buildField = function(){
  var x = 20;
  var y = 20;
  var rows = new Array(x + 1).join('n').split('');
  return rows.map(function(){
    return new Array(y + 1).join('n').split('');
  });
};

var populateField = function(field){
  var $field = $('.field');
  $field.children().remove();
  var len_i = field.length;
  for(var i = 0; i < len_i; i++){
    var len_j = field[i].length;
    var $row = $('<div class=row></div>');
    for(var j = 0; j < len_j; j++){
      var $cell = $('<div class=cell></div>');
      $cell.attr('id', field[i][j]);
      $row.append($cell);
    }
    $field.append($row);
  }
};

var Player = function(position, marker){
  this.position = position;
  this.marker = marker;
  this.enemy = marker === 'c' ? 'm' : 'c';
};

Player.prototype.init = function(field){
  field[this.position[0]][this.position[1]] = this.marker;
  return field;
};

Player.prototype.move = function(i, j, field){
  if (field[this.position[0] + i][this.position[1] + j] === this.enemy) {
    $('h2').text('Yummmmm tasty mouse. Gameover.');
  }
  if (field[this.position[0] + i] === undefined ||
    field[this.position[0] + i][this.position[1] + j] === undefined){
    return field;
  }
  field[this.position[0]][this.position[1]] = 'n';
  this.position[0] = this.position[0] + i;
  this.position[1] = this.position[1] + j;
  field[this.position[0]][this.position[1]] = this.marker;
  return field;
};

Player.prototype.direction = function(state){
  var axis_i = (state.mouse.position[0] > state.cat.position[0]) ? 1 : -1;
  var axis_j = (state.mouse.position[1] > state.cat.position[1]) ? 1 : -1;
  var result = [axis_i, axis_j];
  result[Math.floor(2*Math.random())] = 0;
  return result;
};

var Levels = function(){
  this.level = 0,
  this.catSpeed = 500,
  this.next = function(){
    this.level++;
    this.catSpeed = Math.floor(this.catSpeed*.8);
    $('h2').text('Level ' + this.level);
  },
  this.reset = function(){
    this.level = 1;
    this.catSpeed = 500;
    $('h2').text('Level ' + this.level);
  };
};

var initData = function(){
  var state = {};
  state.mouse = new Player([1,1], 'm');
  state.cat = new Player([18,18], 'c');
  state.levels = new Levels();
  state.field = buildField();
  state.field = state.mouse.init(state.field);
  state.field = state.cat.init(state.field);
  return state;
};

$(document).ready(function() {
  var state = initData();
  populateField(state.field);

  var levelControl = setInterval(function(){
    clearInterval(catControl);
    var catControl = setInterval(function(){
      var d = state.cat.direction(state);
      state.field = state.cat.move(d[0], d[1], state.field);
      populateField(state.field);
    }, state.levels.catSpeed);
  state.levels.next();
  }, 5000);

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
    state.field = state.mouse.move(i, j, state.field);
    populateField(state.field);
  });
});




