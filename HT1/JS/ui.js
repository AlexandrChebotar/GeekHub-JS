// Обработка WEB-интерфейса

function previewConstructions(event){
  var form = event.target.parentElement;
  checkRadio();
  testSwitchConstruction = createTestSwitch(+form.cases.value);
  testIfConstruction = createTestIf(+form.cases.value);
  addPreview();
}

function startTesting(event){
  var form = event.target.parentElement;
  checkRadio();
  testSwitchConstruction = createTestSwitch(+form.cases.value);
  testIfConstruction = createTestIf(+form.cases.value);
  addPreview();
  runTest(+form.runs.value);
  addResult() ;
}

function checkRadio(){
  switch (+form.execute.value) {
    case 1:
      code = '';
      break;
    case 2:
      code = 'var d = new Date(); console.log(d.toLocaleString("ru") + " run: " + j + " case: " + i);';
      break;
    case 3:
      code = form.code.value;
      break;
  }
}

function addPreview() {
  if (!(constructionsPreview = document.getElementById('constructionsPreview'))) {
    var elPreview = document.createElement('p');
    elPreview.innerHTML = 'Constructions:';
    elPreview.id = 'constructionsPreview';
    document.body.appendChild(elPreview);
  }
  if (elSwitchConstruction = document.getElementById('switchConstruction')) {
    elSwitchConstruction.innerHTML = testSwitchConstruction;
  } else {
    var elSwitchConstruction = document.createElement('div');
    elSwitchConstruction.id = 'switchConstruction';
    elSwitchConstruction.innerHTML = testSwitchConstruction;
    document.body.appendChild(elSwitchConstruction);
  }
  if (elIfConstruction = document.getElementById('ifConstruction')) {
    elIfConstruction.innerHTML = testIfConstruction;
  } else {
    var elIfConstruction = document.createElement('div');
    elIfConstruction.innerHTML = testIfConstruction;
    elIfConstruction.id = 'ifConstruction';
    document.body.appendChild(elIfConstruction);
  }
}
  
function addResult() {
  if (elResult = document.getElementById('result')) {
    elResult.innerHTML = 'Result: switch = ' + switchTime + 'ms; if = ' + ifTime + 'ms';
  } else {
    var elResult = document.createElement('div');
    elResult.id = 'result';
    elResult.innerHTML = 'Result: switch = ' + switchTime + 'ms; if = ' + ifTime + 'ms';
    elPreview = document.getElementById('constructionsPreview');
    document.body.insertBefore(elResult, elPreview);
  }
}

















