'use strict'

function engine() {
  
  function Field(cols, rows, unitSize) {
    this.cols = cols;
    this.rows = rows;
    this.unitSize = unitSize;
    this.units = [];
  }
  
  Field.prototype.create = function(settings) {
    var  field = new Field();
    field.unitSize = settings.unitSize || 24;
    field.cols = settings.cols || document.documentElement.clientWidth / settings.unitSize;
    field.rows = settings.rows || document.documentElement.clientHeight / settings.unitSize;
    for (var i = 0; i < field.rows; i++) {
      for (var j = 0; j < field.cols; j++) {
        field.units[i][j] = null;
      }
    }   
    field.render();
    return field;
  }  
  Field.prototype.renderHTML = function() {
    var html = '';
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        html += '<div class="unit ' + this.units[i][j] + '" id="' + i + '-' + j + '></div>';
      }
      html += '<div class="clear"></div>';
    }    
    var fieldElem = document.getElementsByClassName('field')[0];    
    fieldElem.style.width = this.cols * this.unitSize + 'px';
    fieldElem.style.height = this.rows * this.unitSize + 'px';
    fieldElem.innerHTML = html;
  }
  Field.prototype.renderDOM = function() {
    var fieldElem = document.getElementsByClassName('field')[0];
    var elem;
    fieldElem.style.width = this.cols * this.unitSize + 'px';
    fieldElem.style.height = this.rows * this.unitSize + 'px';
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        elem = document.createElement("div");
        elem.id = i + '-' + j;
        elem.className = 'unit' + this.units[i][j];
        fieldElem.appendChild(elem);
      }
      elem = document.createElement("div");
      elem.className = 'clear';
      fieldElem.appendChild(elem);
    }    
  }
}
