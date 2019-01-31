// Обработка WEB-интерфейса
//'use strict'

window.onload = function() {



  var elements = document.querySelectorAll('.open, .close');
  for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', togglePopup);
  }
  var navigationElem = document.querySelector('.navigation');
  navigationElem.addEventListener('click', navigation);

  var fieldElem = document.getElementsByClassName('field')[0];
  var handler = function(event) {
    if(event.ctrlKey) {
      return;
    }
    if (event.target.classList.contains('unit')) {
      game.makeMove(event);
    }
    event.stopImmediatePropagation()
  }


  fieldElem.addEventListener('click', handler);
   

  fieldElem.addEventListener('mousedown', enableMoving);
  fieldElem.addEventListener('mouseup', disableMoving);
  fieldElem.addEventListener('contextmenu', preventContextMenu);

  function preventContextMenu(event) {
      event.preventDefault();
  }
  function enableMoving(event) {
    if(event.which == 3 || (event.which == 1 &&  (event.ctrlKey || event.metaKey))) {
      var fieldElem = document.getElementsByClassName('field')[0];
      fieldElem.style.cursor = 'move';
      fieldElem.onmousemove = function() {var x=1; moveField()};
      event.stopImmediatePropagation();
    }
    

  }
  function disableMoving(event) {
    var fieldElem = document.getElementsByClassName('field')[0];
    fieldElem.style.cursor = 'default';
    fieldElem.onmousemove = null;
  }
  function moveField(event) { 
    var fieldContainer = document.querySelector('.fieldContainer');
      fieldContainer.scrollLeft++;
      fieldContainer.scrollTop++;
      x++;
      window.prevClientX = event.clientX;
      window.prevClientY = event.clientY;
  }

  

  function navigation(event) {
    var fieldContainer = document.getElementsByClassName('fieldContainer')[0];
    if (event.target.classList.contains('moveUp')) {
      fieldContainer.scrollTop -= 24;
      if (event.ctrlKey || event.metaKey) {
        fieldContainer.scrollTop = 0;
      }
    } else 
    if (event.target.classList.contains('moveDown')) {
      fieldContainer.scrollTop += 24;
      if (event.ctrlKey || event.metaKey) {
        fieldContainer.scrollTop = fieldContainer.scrollHeight;
      }
    } else 
    if (event.target.classList.contains('moveLeft')) {
      fieldContainer.scrollLeft -= 24;
      if (event.ctrlKey || event.metaKey) {
        fieldContainer.scrollLeft = 0;
      }
    } else 
    if (event.target.classList.contains('moveRight')) {
      fieldContainer.scrollLeft += 24;
      if (event.ctrlKey || event.metaKey) {
        fieldContainer.scrollLeft = fieldContainer.scrollWidth;
      }
    } else 
    if (event.target.classList.contains('moveCenter')) {
      fieldContainer.scrollLeft = (fieldContainer.scrollWidth - fieldContainer.clientWidth) / 2;
      fieldContainer.scrollTop = (fieldContainer.scrollHeight - fieldContainer.clientHeight) / 2;
    } else 
    if (event.target.classList.contains('zoomIn')) {
      zoomIn();
    } else 
    if (event.target.classList.contains('zoomOut')) {
      zoomOut();
    }  
  }

  function togglePopup(event) {
    var elements = event.target.parentElement.children;
    for (var i = 0; i < elements.length; i++) {
      elements[i].classList.toggle('hidden');
    }
  }


    // обход направлений вправо
    // values - координаты направляющего вектора (X, Y)
    // keys - угол наклона вектора в оси X
  DIRECTIONS = {
    0:   [1, 0],
    45:  [1, 1],
    90:  [0, 1],
    135: [-1, 1],
    180: [-1, 0],
    225: [-1, -1],
    270: [0, -1],
    315: [1, -1],
    getChangeAngle: function(angle1, angle2) {
      var changeAngle = angle2 - angle1;
      if (changeAngle > 180) {
        changeAngle = changeAngle - 360;
      } else if (changeAngle < -180) {
        changeAngle = changeAngle + 360;
      }
      return changeAngle;
    },
    getValidAngle: function(angle) {
      if (angle >= 360) {
        angle = angle - 360;
      } else if (angle < 0) {
        angle = angle + 360;
      }
      return angle;
    },
    getVector: function(angle) {
      return this[this.getValidAngle(angle)];
    },
    getPosition: function(startPosition, angle) {
      var vector = this.getVector(angle);
      var x = startPosition[0] + vector[0];
      var y = startPosition[1] + vector[1];
      return [x, y];
    },
    getSectors: function(startAngle, endAngle) {
      startAngle = this.getValidAngle(startAngle).toString();
      endAngle = this.getValidAngle(endAngle).toString();
      var sectors = [];
      var angles = Object.keys(DIRECTIONS);
      var i = angles.indexOf(startAngle);
      while (true) {
        i++;
        if (i == angles.length) {
          i = 0;
        }
        sectors.push(angles[i]);
        if (angles[i] == endAngle) {
          return sectors;
        }
      }
    }
  }
  Object.defineProperty(DIRECTIONS, 'getChangeAngle', {enumerable: false});
  Object.defineProperty(DIRECTIONS, 'getVector', {enumerable: false});
  Object.defineProperty(DIRECTIONS, 'getPosition', {enumerable: false});
  Object.defineProperty(DIRECTIONS, 'getValidAngle', {enumerable: false});
  Object.defineProperty(DIRECTIONS, 'getSectors', {enumerable: false});


  function Game() {
    this.settings = new Settings();
    this.settings.loadFromLocalStorage();
    this.currentPlayer = 'player1';
    this.currentMove = null;
    this.scores = [0, 0];
    this.time = [0, 0, 0];
    this.moves = [];
    this.field = Field.build(this.settings);
    this.updateScores();
    this.updateTime();
  };
  Game.prototype.saveToLocalStorage = function(name) {
    var saves = localStorage.getItem('saves') || [];
    saves.push({time: new Date, name: name, game: this});
    localStorage.setItem('saves', JSON.stringify(saves));
  };
  Game.prototype.getSavedGames = function() {
    return localStorage.getItem('saves') || [];
  };
  Game.prototype.loadFromLocalStorage = function(index) {
    var gameSave = this.getSavedGames()[index];
    this.settings = gameSave.settings;
    this.currentPlayer = gameSave.currentPlayer;
    this.currentMove = gameSave.currentMove;
    this.scores = gameSave.scores;
    this.time = gameSave.time;
    this.moves = gameSave.moves;
    this.field = gameSave.field;
  };
  Game.prototype.pause = function() {
    
  };
  Game.prototype.resume = function() {

  };
  Game.prototype.takeBackMove = function() {
    var lastMove = this.moves.pop();
    if (lastMove.scores) {
      this.moves.push(lastMove);
      return false;
    }
    return true;
  };
  Game.prototype.makeMove = function(event) {
    var move;
    var unit = this.field.getUnit(event.target.id);
    if (unit.player) {
      return
    }
    if (unit.setPoint(this.currentPlayer)) {
      if (unit.position[1] == this.field.firstRow) {
        this.field.extend('top');
      } else if (unit.position[1] > this.field.firstRow + this.field.rows  -2) {
        this.field.extend('bottom');
      } else if (unit.position[0] == this.field.firstCol) {
        this.field.extend('left');
      } else if (unit.position[0] > this.field.firstCol + this.field.cols - 2) {
        this.field.extend('right');
      } 
      move = new Move(this.currentPlayer, unit);
      move.trySurround();
      this.moves.push(move);
      this.updateScores();
      this.updateTime();
      this.togglePlayer();
    }
  };
  Game.prototype.togglePlayer = function() {
    this.currentPlayer = this.currentPlayer == 'player1' ? 'player2' : 'player1';
    var body = document.body;
    body.classList.toggle('player1');
    body.classList.toggle('player2');
  };
  // ui
  Game.prototype.updateScores = function() {
    var player1ScoreElem = document.querySelector('.content .player1 .score');
    var player2ScoreElem = document.querySelector('.content .player2 .score');
    player1ScoreElem.innerHTML = this.scores[0];
    player2ScoreElem.innerHTML = this.scores[1];
  };
  Game.prototype.updateTime = function() {
    var player1TimeElem = document.querySelector('.content .player1 .time');
    var player2TimeElem = document.querySelector('.content .player2 .time');
    var gameTimeElem = document.querySelector('.content .time');
    player1TimeElem.innerHTML = this.time[1];
    player2TimeElem.innerHTML = this.time[2];
    gameTimeElem.innerHTML = this.time[0];
  };


  function Move(player, unit) {
    this.player = player;
    this.unit = unit;
    this.scores = null;
  };
  Move.prototype.trySurround = function() {
    var pathTree = PathTree.build(this.unit);
  ///////////////////////////
    var path = pathTree.getBestPath();
    if (!path) return;

    path.render();
   ////////////////////////////
  };


  function Settings() {
    this.player1 = {name: "player1", color: 'rgb(25,125,125)'};
    this.player2 = {name: "player2", color: 'rgb(125,25,125)'};
    this.score = 'point'; // point/area
    this.maxWidth = null;
    this.maxHeight = null;
    this.gameTimeLimit = null;
    this.moveTimeLimit = null;
    this.accumulateMoveTimeLimit = false;
    this.scoresToWin = null;
    this.scoresDifferenceToWin = null;
    this.unitSize = 24;
  };
  Settings.prototype.loadFromLocalStorage = function () {
    var newSettings = JSON.parse(localStorage.getItem('settings'));
    if (newSettings) {
      this.copySettings(this, newSettings);
    }
  };
  Settings.prototype.loadDefaults = function() {
    var newSettings = new Settings;
    this.copySettings(this, newSettings);
  };
  Settings.prototype.copySettings = function(oldSettings, newSettings) {
    oldSettings.player1.color = newSettings.player1.color;
    oldSettings.player2.color = newSettings.player2.color;
    oldSettings.score = newSettings.score;
    oldSettings.maxWidth = newSettings.maxWidth;
    oldSettings.maxHeight = newSettings.maxHeight;
    oldSettings.gameTimeLimit = newSettings.gameTimeLimit;
    oldSettings.moveTimeLimit = newSettings.moveTimeLimit;
    oldSettings.accumulateMoveTimeLimit = newSettings.accumulateMoveTimeLimit;
    oldSettings.scoresToWin = newSettings.scoresToWin;
    oldSettings.scoresDifferenceToWin = newSettings.scoresDifferenceToWin;
    oldSettings.unitSize = newSettings.unitSize;
  };
  Settings.prototype.saveToLocalStorage = function() {
    localStorage.setItem('settings', JSON.stringify(this));
  };
  Settings.prototype.update = function(event) {
    this[event.name] = event.value;
    this.saveToLocalStorage();
  };

/*
*
*
*/
  function Field(cols, rows, unitSize) {
    this.firstCol = 0;
    this.firstRow = 0;
    this.cols = cols;
    this.rows = rows;
    this.unitSize = unitSize;
    this.units = [];
  };
  Field.build = function(settings) {
    var field = new Field();
    field.unitSize = settings.unitSize || 24;
    field.cols = Math.ceil(document.documentElement.clientWidth / field.unitSize);
    field.rows = Math.ceil(document.documentElement.clientHeight / field.unitSize);
    for (var i = 0; i < field.rows; i++) {
      field.units[i] = [];
      for (var j = 0; j < field.cols; j++) {
        field.units[i][j] = new Unit(j, i);
      }
    }
    field.render();
    return field;
  };
  Field.prototype.extend = function(position) {
    var fromRow, fromCol, toRow, toCol;
    switch (position) {
      case 'top':
        fromRow = --this.firstRow;
        this.rows++;
        toRow = fromRow +1;
        fromCol = this.firstCol;
        toCol = this.firstCol + this.cols;
        this.units[fromRow] = [];
        break;
      case 'bottom':
        fromRow = this.firstRow + this.rows++;
        toRow = fromRow +1;
        fromCol = this.firstCol;
        toCol = this.firstCol + this.cols;
        this.units[fromRow] = [];
        break;
      case 'left':
        fromRow = this.firstRow;
        toRow = this.firstRow + this.rows;
        fromCol = --this.firstCol;
        this.cols++;
        toCol = fromCol + 1;
        break;
      case 'right':
        fromRow = this.firstRow;
        toRow = this.firstRow + this.rows;
        fromCol = this.firstCol + this.cols++;
        toCol = fromCol + 1;
        break;
    }
    for (var i = fromRow; i < toRow; i++) {
      for (var j = fromCol; j < toCol; j++) {
        this.units[i][j] = new Unit(j, i);
      }
    }
    this.render(position);
  };
  Field.prototype.render = function(position) {
    var toRow = this.firstRow + this.rows;
    var toCol = this.firstCol + this.cols;
    var fieldElem = document.getElementsByClassName('field')[0];
    var clearElem = document.createElement("div");
    clearElem.className = 'clear';
    switch (position) {
      case 'top':
        fieldElem.insertBefore(getRow.call(this, this.firstRow), fieldElem.firstChild);        
        fieldElem.style.height = parseInt(fieldElem.style.height) + this.unitSize + 'px';
        break;
      case 'bottom':
        fieldElem.appendChild(getRow.call(this, this.firstRow + this.rows - 1));
        fieldElem.style.height = parseInt(fieldElem.style.height) + this.unitSize + 'px';
        fieldElem.parentElement.scrollTop += 24;
        break;
      case 'left':
        var col = this.firstCol;
        var nextCol = col + 1;
        for (var i = this.firstRow; i < toRow; i++) {
          this.getUnit(nextCol, i).elem.insertAdjacentElement('beforebegin', this.getUnit(col, i).elem);
        }
        fieldElem.style.width = parseInt(fieldElem.style.width) + this.unitSize + 'px';
        break;
      case 'right':
        var col = this.firstCol + this.cols - 1;
        var prewCol = col - 1;
        for (var i = this.firstRow; i < toRow; i++) {
          this.getUnit(prewCol, i).elem.insertAdjacentElement('afterend', this.getUnit(col, i).elem);
        }
        fieldElem.style.width = parseInt(fieldElem.style.width) + this.unitSize + 'px';
        fieldElem.parentElement.scrollLeft += 24;
        break;
      default:
        fieldElem.innerHTML = '';
        fieldElem.style.width = this.cols * this.unitSize + 'px';
        fieldElem.style.height = this.rows * this.unitSize + 'px';
        var fragment = document.createDocumentFragment();
        for (var i = this.firstRow; i < toRow; i++) {
          for (var j = this.firstCol; j < toCol; j++) {
            fragment.appendChild(this.getUnit(j, i).elem);
          }
          fragment.appendChild(clearElem.cloneNode());
        }
        fieldElem.appendChild(fragment);   
    }
    
    function getRow(rowNum) { 
      var fragment = document.createDocumentFragment();
      for (var j = this.firstCol; j < toCol; j++) {
        fragment.appendChild(this.getUnit(j, rowNum).elem);
      }
      fragment.appendChild(clearElem.cloneNode());
      return fragment;
    }
  };
  // one argument String - id
  // one argument Array - [row, col]
  // two arguments - row, col
  Field.prototype.getUnit = function() {
    var row, col, unit;
    if (arguments.length == 2) {
      row = arguments[0];
      col = arguments[1];
    } else if (arguments[0] instanceof Array) {
      row = arguments[0][0];
      col = arguments[0][1];
    } else {
      row = arguments[0].split(':')[0];
      col = arguments[0].split(':')[1];
    }
      return this.units[col][row];
  };


  function PathTree(startUnit) {
    this.levels = [];
    this.levels[0] = [new Node(startUnit)];
    this.pathes = [];

    //~ this.build();
  };
  PathTree.build = function(startUnit) {
    var pathTree = new PathTree(startUnit);
    var lvlNum = 0;
    while (pathTree.levels[lvlNum][0]){
      pathTree.addLevel(++lvlNum);
    }
    for (var i = 0; i < pathTree.pathes.length; i++) {
      pathTree.pathes[i].analyze();      
    }
    return pathTree;
  };
  PathTree.prototype.addLevel = function(lvlNum) {
    var path, childNode;
    var level = this.levels[lvlNum] = [];
    var parentNodes = this.levels[lvlNum - 1];
    for (var i = 0; i < parentNodes.length; i++) {
      var allias = parentNodes[i].allias;
      for (var j = 0; j < allias.length; j++) {
        if (childNode = parentNodes[i].createChildNode(allias[j])) {
          if (childNode.unit == this.levels[0][0].unit) {
            if (path = Path.build(childNode)) {
              this.pathes.push(path);
            }
          } else if (isUnitNotInParentNodes(childNode)) {
            level.push(childNode);
          }
        }
      }
    }
    function isUnitNotInParentNodes(node) {
      var checkableUnit = node.unit;
      while (node = node.parentNode) {
        if (node.unit == checkableUnit) {
          return false;
        }
      }
      return true;
    }
  };
  PathTree.prototype.getBestPath = function() {
    var bestPath;
    var scores = 0;
    for (var i = 0; i <this.pathes.length; i++) {
      var path = this.pathes[i];
      if (path.valid) {
        var pathScores = game.currentPlayer == 'player1' ? path.scores[0] : path.scores[1];
        if ((scores < pathScores) || (scores == pathScores && area < path.scores[2])) {
          scores = pathScores;
          area = path.scores[2];
          bestPath = path;
        }
      }
    }
    return bestPath;
  };


  function Path() {
    this.nodes = [];
    this.scores = 0;
    this.valid = true;
    this.innerUnits =[];
  };
  Path.build = function(node) {
    var path = new Path;
    var totalAngle = 0;
    var changeAngle;
    path.nodes.push(node);
    while (true) {
      changeAngle = node.parentChangeAngle;
      node = Object.create(node.parentNode);
      if (!node.parentNode) {
        path.nodes[0].changeAngle = DIRECTIONS.getChangeAngle(path.nodes[0].angle, path.nodes[path.nodes.length - 1].angle);
        path.nodes[0].checkNoBorder();
        totalAngle += path.nodes[0].changeAngle;
        if (totalAngle != 360) {
          return false;
        }
        return path;
      }
      path.nodes.push(node);
      node.changeAngle = changeAngle;
      node.checkNoBorder();
      totalAngle += node.changeAngle;
    }
  };
  Path.prototype.render = function() {
    for (var i = 0; i < this.nodes.length; i++) {
      this.nodes[i].render();
      if (game.settings.score == 'area') {
        this.nodes[i].unit.scores += (180 - this.nodes[i].changeAngle)/45;
      }
    }
    for (var i = 0; i < this.innerUnits.length; i++) {
      this.innerUnits[i].paint('full');
      this.innerUnits[i].surrounded = true;
      switch (game.settings.score) {
        case 'area':
          this.innerUnits[i].scores = 8;
          break;
        case 'point':
          if (game.currentPlayer && this.innerUnits[i].player != game.currentPlayer) {
            this.innerUnits[i].scores = 1;
          } else {
            this.innerUnits[i].scores = 0;
          }
          break;
      }
    }
    game.scores[0] += this.scores[0];
    game.scores[1] += this.scores[1];
  };
  Path.prototype.analyze = function() {
    this.locateInnerUnits();
    var area = 0;
    var alliedDots = 0;
    var enemyDots = 0;
    var enemyScores = 0;
    var scores;
    for (var i = 0; i < this.innerUnits.length; i++) {
      area += 8;
      enemyScores += this.innerUnits[i].scores;
      var player = this.innerUnits[i].player;
      if (player == game.currentPlayer && !this.innerUnits[i].surrounded) {
        alliedDots++;
      } else if (player && player != game.currentPlayer) {
        enemyDots++;
      }
    } 
    if (alliedDots || enemyDots == 0) {
      this.valid = false;
      return;
    }
    for (var i = 0; i < this.nodes.length; i++) {
      area += (180 - this.nodes[i].changeAngle)/45;
    }
    scores = game.settings.score == 'area' ? area : enemyDots;
    this.scores = game.currentPlayer == 'player1' ? [scores, - enemyScores, area] : [- enemyScores, scores, area];
  };
  Path.prototype.locateInnerUnits = function() {
    var minX = maxX = this.nodes[0].unit.position[0];
    var minY = maxY = this.nodes[0].unit.position[1];
    for (var i = 1; i < this.nodes.length; i++) {
      if (minX > this.nodes[i].unit.position[0]) {
        minX = this.nodes[i].unit.position[0];
      }
      if (maxX < this.nodes[i].unit.position[0]) {
        maxX = this.nodes[i].unit.position[0];
      }
      if (minY > this.nodes[i].unit.position[1]) {
        minY = this.nodes[i].unit.position[1];
      }
      if (maxY < this.nodes[i].unit.position[1]) {
        maxY = this.nodes[i].unit.position[1];
      }
    }
    var unit, node;
    var units = [];
    for (var y = minY; y < maxY + 1; y++) {
      var inner = false;
      for (var x = minX; x < maxX + 1; x++) {
        unit = game.field.getUnit(x, y);
        if (node = this.containsNodeWithUnit(unit)) {
          if (node.noBorderLeft) {
            if (units[0]) {
              this.innerUnits = this.innerUnits.concat(units);
            }
            inner = false;
          }
          if (node.noBorderRight) {
            units = [];
            inner = true;
          }
        } else if (inner) {
          units.push(unit);
        }
      }
    }
  };
  Path.prototype.containsNodeWithUnit = function(unit) {
    for (var i = 0; i < this.nodes.length; i++) {
      if (this.nodes[i].unit == unit) {
        return this.nodes[i];
      }
    }
    return false;
  };


  function Node(unit, parentNode, angle, changeAngle) {
    this.unit = unit;
    this.angle = angle;
    this.changeAngle = changeAngle;
    this.allias = this.unit.getAllias();
    if (this.parentNode = parentNode) {
      for (var i = 0; i < this.allias.length; i++) {
        if (this.allias[i].unit == parentNode.unit) {
          this.allias.splice(i, 1);
          break;
        }
      }
    }
  };
  Node.prototype.createChildNode = function(ally) {
    var node = new Node(ally.unit, this);
    if (!node.allias) {
      return false;
    }
    node.angle = ally.angle;
    if (this.angle != undefined) {
      node.parentChangeAngle = DIRECTIONS.getChangeAngle(this.angle, node.angle);
        if (this.isSectorsExistsInUnit(node.parentChangeAngle)) {
        return false;
      }
    } 
    return node;
  };
  Node.prototype.getSVGPath = function() {
    var startPosition = DIRECTIONS.getVector(this.angle + 180);
    var endPosition = DIRECTIONS.getVector(this.angle + this.changeAngle);
    var svgPath = [startPosition, [0, 0], endPosition];
    var keys = Object.keys(DIRECTIONS);
    var i = 0;
    var position = endPosition;
    loop:
    while (true) {
      if (isSamePosition(position, DIRECTIONS[keys[i]])) {
        while (true) {
          i++;
          if (i == keys.length) {
            i = 0;
          }
          position = DIRECTIONS[keys[i]];
          svgPath.push(position);
          if (isSamePosition(position, startPosition)) {
            break loop;
          }
        }
      }
      i++;
    }
    return svgPath;

    function isSamePosition(position1, position2) {
      if (position1[0] == position2[0] && position1[1] == position2[1]) {
        return true;
      } else {
        return false;
      }
    }
  };
  Node.prototype.checkNoBorder = function() {
    var startAngle = DIRECTIONS.getValidAngle(this.angle + 180);
    var endAngle = DIRECTIONS.getValidAngle(this.angle + this.changeAngle);
    if (startAngle > 0 && startAngle < 315 && startAngle < endAngle) {
      this.noBorderRight = true;
    }
    startAngle = DIRECTIONS.getValidAngle(startAngle + 180);
    endAngle = DIRECTIONS.getValidAngle(endAngle + 180);
    if (startAngle > 0 && startAngle < 315 && startAngle < endAngle) {
      this.noBorderLeft = true;
    }
  };
  Node.prototype.isSectorsExistsInUnit = function(changeAngle) {
    var sectors = DIRECTIONS.getSectors(this.angle + changeAngle, this.angle + 180);
    for (var i = 0; i < sectors.length; i++) {
      if (this.unit.sectors.indexOf(sectors[i]) != -1) {
        return true;
      }
    }
    return false;
  };
  Node.prototype.render = function() {
    var sectors = DIRECTIONS.getSectors(this.angle + this.changeAngle, this.angle + 180);
    this.unit.sectors = this.unit.sectors.concat(sectors);
    var svgPath = this.getSVGPath();
    this.unit.render(svgPath);
  };


  function Unit(col, row) {
    this.id = col + ':' + row;
    this.position = [col, row];
    this.sectors = [];
    this.player = '';
    this.painted = false;
    this.scores = 0;
    this.surrounded = false;
    this.elem = document.createElement("div");
    this.render();
  };
  Unit.prototype.render = function(svgPath) {
    this.elem.id = this.id;
    this.elem.classList.add('unit');
    if (this.player) {
      this.elem.classList.add(this.player);
    }
    if (svgPath) {
      this.paint(svgPath);
    }
  };
  Unit.prototype.setPoint = function(player) {
    if (this.elem.classList.toggle(player)) {
      this.player = player;
      return true;
    }
    return false;
  };
  Unit.prototype.getAllias = function() {
    var allias = [];
    for (var angle in DIRECTIONS) {
      var unit = game.field.getUnit(DIRECTIONS.getPosition(this.position, angle));
      if (unit.player == this.player && !unit.surrounded) {
        allias.push({'unit': unit, 'angle': +angle});
      }
    }
    if (allias.length == 0) {
      return false;
    }
    return allias;
  };
  Unit.prototype.paint = function(svgPath) {
    var mainPath, borderPath;
    if (svgPath == 'full') {
      mainPath = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
      borderPath = null;
    } else {
      mainPath = svgPath;
      borderPath = [svgPath[0], svgPath[1], svgPath[2]];
    }
    var svgElem;
    if (!(svgElem = this.elem.children[0])) {
      svgElem = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
      svgElem.setAttribute('viewBox', '0 0 512 512');
      this.elem.appendChild(svgElem);
    }
    var svgPathElem = document.createElementNS("http://www.w3.org/2000/svg", 'path');
    var svgPathHTML = 'M' + 256*(1 + mainPath[0][0]) + ' ' + 256*(1 + mainPath[0][1]);
    for (var i = 1; i < svgPath.length; i++) {
      svgPathHTML += 'L' + 256*(1 + mainPath[i][0]) + ' ' + 256*(1 + mainPath[i][1]);
    }
    svgPathElem.setAttribute('d', svgPathHTML);
    svgPathElem.classList.add(game.currentPlayer);
    svgElem.appendChild(svgPathElem);
    if (!borderPath) {
      return;
    }
    svgPathElem = document.createElementNS("http://www.w3.org/2000/svg", 'path');
    svgPathHTML = 'M' + 256*(1 + borderPath[0][0]) + ' ' + 256*(1 + borderPath[0][1]);
    for (var i = 1; i < 3; i++) {
      svgPathHTML += 'L' + 256*(1 + borderPath[i][0]) + ' ' + 256*(1 + borderPath[i][1]);
    }
    svgPathElem.setAttribute('d', svgPathHTML);
    svgPathElem.classList.add('border');
    svgPathElem.classList.add(game.currentPlayer);
    svgElem.appendChild(svgPathElem);
  };



  var game = new Game();

};


