'use strict'

var symbols = [
  ["'","'"],
  ['"','"'],
  ['`','`'],
  ['{','}'],
  ['[',']'],
  ['(',')']];

function validate(code) {  
  var opened = [];
  var errors = [];
  for (var i = 0 ; i < code.length; i++) {
    for (var j = 0 ; j < symbols.length; j++) {
      if (code[i] == symbols[j][0]) {
        opened.push([i, j]);
        switch (j) {
          case 0:
          case 1:
            i = searchQuotes(code, i, symbols[j][1], opened, errors);
            break;
          case 2:
            i = searchBackQuotes(code, i, symbols[j][1], opened, errors);
            break;
          default:
            i = searchSingle(code, i, symbols[j][1], opened, errors);
        }
      } else if (code[i] == symbols[j][1]) {
        if  ( opened[0] && j == opened[opened.length - 1][1]) {
          opened.pop();
        } else {
          errors.push(i);
        }
      }
    }
  }
  while (opened[0]) {
    errors.push(opened.pop()[0]);
  }
  
  if (errors.length == 0) {
      return false;
  } else {
    return errors.sort(function (a, b) {return a - b;});
  }
}

function searchQuotes(code, position, symbol, opened, errors) {
  for (var i = position + 1; i < code.length; i++) {
    if (code[i] == symbol && code[i - 1] != '\\') {
      opened.pop();
      return  i;
    }
    if (code[i] == '\n') {
      errors.push(opened.pop()[0]);
      return position;      
    }
  }
  errors.push(opened.pop()[0]);
  return position;
}

function searchBackQuotes(code, position, symbol, opened, errors) {
  var textInBackQuotes = '';
  for (var i = position + 1; i < code.length; i++) {
    textInBackQuotes += code[i];
    if (code[i] == symbol && code[i - 1] != '\\') {
      opened.pop();
      searchCodeInBackQuotes(textInBackQuotes, position, errors);
      return  i;
    }    
  }
  errors.push(opened.pop()[0]);
  return position;
}

function searchCodeInBackQuotes(code, startPosition, errors) {
  for (var i = 0; i < code.length; i++) {
    var start = code.indexOf('${', i);
    if (start == -1) {
      break;
    }
    var end = code.indexOf('}', start + 2); 
    if (end == -1) {
      errors.push(startPosition + start + 1);
      errors.push(startPosition + start + 2);
      break;
    }
    var substringErrors = validate(code.slice(start + 2, end));
    if (substringErrors) {
      for (var i = 0; i < substringErrors.length; i++) {
        errors.push(substringErrors[i] + startPosition + start + 3);
      }
    }
    i = end;
  }
}


function searchSingle(code, position, symbol, opened, errors) {
  for (var i = position + 1; i < code.length; i++) {
    if (code[i] == symbol) {
      return  position;
    }
  }
  errors.push(opened.pop()[0]);
  return position;
}

function formatCode(code, errors) {
  var string = '';
  var openTagPosition = 0;
  var closeTagPosition = 0;
  for (var i = 0; i < errors.length; i++) {
    string += code.slice(closeTagPosition, errors[i]) + '<strong>';
    openTagPosition = errors[i];
    while (errors[i + 1] - errors[i] == 1) {
      i++;
    }  
    string += code.slice(openTagPosition, errors[i] + 1) + '</strong>';
    closeTagPosition =  errors[i] + 1;
  }
  string += code.slice(closeTagPosition, code.length) + '</strong>';
  return string;
}
