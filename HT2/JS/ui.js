// Обработка WEB-интерфейса

'use strict'

function startValidating(event){
  var form = event.target.parentElement;
  var code = form.code.value;
  var errors = [];
  var resultOfValidation;
  if (errors = validate(code)) {
    code = formatCode(code, errors);
    resultOfValidation = 'invalid';
  } else {
    resultOfValidation = 'valid';
  }
  addResult(resultOfValidation, code);
}

function addResult(resultOfValidation, code) {
  var elResult = document.createElement('div');
  elResult.className = 'result ' + resultOfValidation;
  elResult.innerHTML = '<pre>' + code + '</pre>';
  var elFirstResult = document.getElementsByClassName('result')[0];
  document.body.insertBefore(elResult, elFirstResult);
  elResult.innerHTML = Icons[resultOfValidation] + elResult.innerHTML;
}

function clearResults() {
  var elResults = document.getElementsByClassName('result');
  for (var i = elResults.length; --i;) {
    elResults[i - 1].parentElement.removeChild(elResults[i - 1]);
  }
} 

var Icons = {
  valid: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACjSURBVDhPYxgFwxA4z3fvcJ7nlgTlUgacFrh1OS9w/w/Ee+vr65mgwuQBmGFAer/PTB8uqDB5YOAMs99vzwJlYgUkGQZU2OI8321d6KpQNqgQCiDJMFAMAQ1bBtKAzVCSDIMBoCHMTgvcl6AbSpZhMAAy1HmB2yKYoUC6h2zDYADs0vnuC8CGUmoYDIBdOt99HlUMgwFQRNnPt+eAcocNYGAAANpVdEJ1MIvoAAAAAElFTkSuQmCC">',
  invalid: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACmSURBVDhP7dNNDoIwEIbhOYjiIRASVkYg3H+vMdwB6Fb7kZkotT9Mt/omLNoOT+gC+kfm2pzMcD7yMthyqQ+mLwte+sPA1FaPuavvMRQYZjCLD+Dt72TQPs8Qumdmk/sC1nykxyQfmo1JDjDyk4dJjAq0wtkY8oHY42NdsSurUQdbAVz1vVfddqM+jI9IjcYwSYV+/nqxQUGTvx4CmryKDWgS+4WIXmFO3sZEYTYaAAAAAElFTkSuQmCC">'
};


