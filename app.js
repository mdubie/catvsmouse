var buildField = function(){
  var x = 20;
  var y = 20;
  var rows = new Array(x + 1).join('n').split('');
  return rows.map(function(){
    return new Array(y + 1).join('n').split('');
  });
};

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

var updateField = function(targetPlayer, newPos){
  var marker = '#' + targetPlayer.marker;
  $(marker).attr('id', 'n');
  $target = $('.row').first();
  for(var i = 0; i < newPos[0]; i++){
    $target = $target.next();
  }
  newPos[1] = Math.max(newPos[1],0);
  $target = $target.children().first();
  for(var j = 0; j < newPos[1]; j++){
    $target = $target.next();
  }
  $target.attr('id', targetPlayer.marker);
};

var Player = function(position, marker){
  this.position = position;
  this.marker = marker;
  this.enemy = marker === 'c' ? 'm' : 'c';
};

Player.prototype.init = function(state){
  state.field[this.position[0]][this.position[1]] = this.marker;
  return state;
};

Player.prototype.move = function(i, j, state){
  if (state.field[this.position[0] + i][this.position[1] + j] === this.enemy) {
    $('h2').text('Yummmmm tasty mouse. Gameover.');
    state = initData();
    return state;
  }
  if (state.field[this.position[0] + i] === undefined ||
    state.field[this.position[0] + i][this.position[1] + j] === undefined){
    return;
  }
  state.field[this.position[0]][this.position[1]] = 'n';
  this.position[0] = this.position[0] + i;
  this.position[1] = this.position[1] + j;
  state.field[this.position[0]][this.position[1]] = this.marker;
  return [state, [this.position[0], this.position[1]]];
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
    this.catSpeed = Math.floor(this.catSpeed * .8);
    $('h2').text('Level ' + this.level);
  },
  this.reset = function(){
    this.level = 1;
    this.catSpeed = 500;
    $('h2').text('Level ' + this.level);
  }
};

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

  var levelControl = setInterval(function(){
    clearInterval(catControl);
    var catControl = setInterval(function(){
      var d = state.cat.direction(state);
      var resultC = state.cat.move(d[0], d[1], state);
      state = resultC[0];
      updateField(state.cat, resultC[1]);
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
    var resultM = state.mouse.move(i, j, state);
    state = resultM[0];
    updateField(state.mouse, resultM[1]);
  });
});




