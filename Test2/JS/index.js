window.onload = function() {

  var form = document.getElementsByTagName('form')[0];
  form.addEventListener('change', onChangeFunction);
  form.addEventListener('submit', onSubmitFunction);

  function onChangeFunction(event) {
    var inputElem = event.target;
    var functionName = 'validate' + inputElem.getAttribute('name');
    catchErr(eval(functionName), inputElem);
  }

  function onSubmitFunction(event) {
    var errors;
    var form = event.target;
    var elements = form.querySelectorAll('input[name]');
    for (var i = 0; i < elements.length; i++) {
      var functionName = 'validate' + elements[i].getAttribute('name');
      if (catchErr(eval(functionName), elements[i])) {
        errors = true;
      }
    }
    if (!errors) {
      form.submit();
    }
    event.preventDefault();
    return false;
  }


  function validateEmail(inputElem) {
    var email = inputElem.value;
    var quoted = false, local, domain;
    for (var i = 0; i < email.length; i++) {
      if (email[i] == '"') {
        quoted = quoted == false ? true : false;
      }
      if (email[i] == '@' && quoted == false && email[i - 1] != '\\' ) {
        local = email.slice(0, i);
        domain = email.slice(i + 1);
        break;
      }
    }
    if (!local || !domain) {
      throw new FormError('Email must be like local@domain');
    }
    var regexpDomain = /^(yandex\.(com|ru|ua|by|md|kz|uz|com\.tr)|gmail.com)$/i;
    if (!regexpDomain.test(domain)) {
      throw new FormError('Allows only emails from domains gmail.com, yandex.com, yandex.ua etc.');
    }
    var regexpLocal = /^(?:\"(.+)\"|[-a-z0-9!#$%&'*+/=?^_`{|}~]+(\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*)$/i;
    if (!regexpLocal.test(local)) {
      throw new FormError('Username is not valid');
    }
    inputElem.className = 'valid';
    addDescription(inputElem, '');
  }

  function validatePassword(inputElem) {
    var password = inputElem.value;
    if (!password ||  password.length < 7) {
      throw new FormError('Password must be more than 6 characters');
    }
    checkPasswordDifficulty(password, inputElem);
    inputElem.className = 'valid';
  }

  function checkPasswordDifficulty(password, inputElem) {
    var regexpSymbols = /[-~`'"!?@#$%^&*()_+={}[\]:;<>./|]/;
    if (regexpSymbols.test(password)) {
      addDescription(inputElem, 'Strong password', 'valid');
    } else {
      addDescription(inputElem, 'Weak password');
    }
  }

  function validatePasswordConfirm(inputElem) {
    var password = inputElem.value;
    var comparedPassword = document.querySelector('input[name="Password"]').value;
    if (password != comparedPassword) {
      throw new FormError('Passwords are not the same');
    }
    inputElem.className = 'valid';
    addDescription(inputElem, '');
  }

  function addDescription(inputElem, text, type) {
    var elem = inputElem.nextElementSibling;
    if (!elem) {
      elem = document.createElement('span');
      inputElem.insertAdjacentElement('afterend', elem);
    } 
    elem.innerHTML = text;
    if (type) {
      elem.className = type;
    } else {
      elem.className = '';
    }
  }
  
  function catchErr(func, elem) {
    try {
      func(elem);
    }
    catch (e) {
      if (e.type == 'FormError') {
        elem.className = 'error';
        addDescription(elem, e.message, 'error');
        return true;
      } else {
        throw e;
      }
    }
  }

  function FormError(message) {
    var error = new Error(message);
    error.type = 'FormError';
    return error;
  }
};


