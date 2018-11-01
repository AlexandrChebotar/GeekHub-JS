// Движок тестирования

var code = '';
var switchTime;
var ifTime;

function createTestSwitch(numberOfCases){
  var testSwitchConstruction = 'switch (i) {\n';
  for (let i = 0; i < numberOfCases; i++){
    testSwitchConstruction += '    case ' + i + ' : \n        ' + code + '\n        break;\n'
  }
  testSwitchConstruction += '    default: \n        ' + code + '\n}';
  testSwitch = new Function('j', 'for (let i = 0; i < ' + numberOfCases + '; i++) { ' + testSwitchConstruction + ' }');
  return testSwitchConstruction;
}

function createTestIf(numberOfCases){
  var testIfConstruction = '';
  for (let i = 0; i < numberOfCases; i++){
    testIfConstruction += 'if (i == ' + i + ') {\n   ' + code + ' \n} else ';
  }
  testIfConstruction += '{ \n    ' + code + ' \n}';
  testIf = new Function('j', 'for (let i = 0; i < ' + numberOfCases + '; i++) { ' + testIfConstruction + ' }');
  return testIfConstruction;
}

function runTest(numberOfRuns){
  console.time('switch');
  var start = new Date();
  for (var i = 0; i < numberOfRuns; i++) {
    testSwitch(i);
  }
  console.timeEnd('switch');
  var end = new Date();
  switchTime = end - start;
  
  console.time('if');
  start = new Date();
  for (var i = 0; i < numberOfRuns; i++) {
    testIf(i);
  }
  console.timeEnd('if');
  end = new Date();
  ifTime = end - start;
  console.log('alternative count: \n switch = ' + switchTime + 'ms \n if = ' + ifTime + 'ms');
}

