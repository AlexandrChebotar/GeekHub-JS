'use strict'

var templates = [`обратные кавычки
\`..
..\`  \`..\${}..\${..\${}..\${\` `,

`кавычки и экранирование
'.).' ".)." \`.{.\` "..
.." '..\\'..' '..'..' `,

`c ошибками
{.].} [."}.] (.'.}.) (.(..).\`.{.}.) {.{.[.].].}.} `,

`без ошибок
{..} [..] (..) '..' ".." \`..\` ` ]

templates.forEach(function(value) {showTemplate(value)});

function showTemplate(code){
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


