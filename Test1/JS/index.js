/*
1) Create a class called Person with the following conditions.
Attributes: name, age, DNI, sex (M for male, F for female), weight and height.
Every attribute, except DNI, will have default values according to its type (0 for numbers, empty string for String, etc..). Sex will be male by default.
*/

function Person(name, age, sex, weight, height) {
  this.name = name || '';
  this.age = age || 0;
  this.sex = sex || 'M';
  this.weight = weight || 0;
  this.height = height || 0;

  this.createDNI();
}

/*
2) Create the following constructors:
A constructor with default values.
A constructor with name, age and sex as parameters (other values by default).
A constructor with all attributes received as parameters.
*/

Person.createWithDefaults = function() {
  var person = new Person();
  return person;
};
Person.createWithNameAgeSex = function(name, age, sex) {
  var person = new Person(name, age, sex);
  return person;
};
Person.createWithAllParameters = function(name, age, sex, weight, height) {
  var person = new Person(name, age, sex, weight, height);
  return person;
};

/*
3) Create the following methods:
 
calculateIMC()
 
This method will calculate if the person is in its ideal weight. Use this formula to calculate it: (weight in KG)/(height^2  in Mts.).
If the result is less than 20, the function will return -1.
If the result is a number between 20 and 25 (included), means that the person is under its ideal weight and the function must return 0.
If the result is a number above 25 means the person is overweight and the function must return 1.

isAdult()
Will return 1 if the person is 18 or above and 0 if it’s not.
checkSex(sex)
Will check if the value for sex is correct or not. If it’s not, will set sex as M by default.
toString()
Returns all the information from the object.
createDNI()
Will create an 8 figure random number and assign it to DNI attribute. This function will be called when the object is created.
Create SET methods for every parameter but DNI.
*/

Person.prototype.calculateIMC = function() {
  var imc = this.weight / (this.height * this.height);
  if (imc < 20) {
    return -1;
  } else if (imc > 25) {
    return 1;
  } else {
    return 0;
  }
};
Person.prototype.isAdult = function() {
  if (this.age < 18) {
    return 0;
  }
  return 1;
};
Person.prototype.checkSex = function(sex) {
  if (this.sex != 'M' && this.sex != 'W') {
    this.sex = 'M';
  }
};
Person.prototype.toString = function() {
  var string = '';
  for (var prop in this) {
    if (this.hasOwnProperty(prop)) {
      string += prop + ': ' + this[prop] + '; ';
    }
  }
  return string;
};
Person.prototype.createDNI = function() {
  this.DNI = Math.floor(Math.random() * 90000000 + 10000000);
};
Person.prototype.setName = function(name) {
  this.name = name;
};
Person.prototype.setAge = function(age) {
  this.age = age;
};
Person.prototype.setSex = function(sex) {
  this.sex = sex;
};
Person.prototype.setWeight = function(weight) {
  this.weight = weight;
};
Person.prototype.setHeight = function(height) {
  this.height = height;
};

/*
4) Create a runnable class that executes the following:
Asks the user for name, age, sex, weight and height. NOTE: no need to create an interface, you can just set the values in variables to use for creating the following objects.
Create 3 objects of class Person as follows:
First one will have the previous asked values.
Second one will have all of the previous asked values BUT weight and height.
Third one will have all values by default. Use SET methods to assign the values to the attributes.
For each object check if the person is in its ideal weight, overweight or underweight.
For each object check if the person is an adult.
Finally show all the information of each object.
*/

function Test() {
  this.askedValues = [
    {
      name: 'Mark',
      age: 15,
      sex: 'M',
      weight: 70,
      height: 1.8
    },
    {
      name: 'Leon',
      age: 45,
      sex: 'M',
      weight: 120,
      height: 1.7
    },
    {
      name: 'Eva',
      age: 25,
      sex: 'W',
      weight: 45,
      height: 1.65
    }
  ];
  this.createMethods = [
    function() {
      var person = Person.createWithAllParameters(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
      return person;
    },
    function() {
      var person = Person.createWithNameAgeSex(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
      person.setWeight(arguments[3]);
      person.setHeight(arguments[4]);
      return person;
    },
    function() {
      var person = Person.createWithDefaults(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
      person.setName(arguments[0]);
      person.setAge(arguments[1]);
      person.setSex(arguments[2]);
      person.setWeight(arguments[3]);
      person.setHeight(arguments[4]);
      return person;
    }
  ];
  this.persons = [];
  
  this.run = function() {
    for (var i = 0; i < this.createMethods.length; i++) {
      var person = this.createMethods[i](this.askedValues[i].name, this.askedValues[i].age, this.askedValues[i].sex, this.askedValues[i].weight, this.askedValues[i].height);
      this.persons.push(person);
    }
    for (var i = 0; i < this.persons.length; i++) {
      switch (this.persons[i].calculateIMC()) {
        case -1:
          console.log('person' + i + '  is underweight');
          break;
        case 0:
         console.log('person' + i + '  in it\'s ideal weight');
          break;
        case 1:
        console.log('person' + i + '  is overweight');
         break;
      }
    }
    for (var i = 0; i < this.persons.length; i++) {
      if (this.persons[i].isAdult()) {
        console.log('person' + i + '  is adult');
      } else {
        console.log('person' + i + '  is not adult');
      }
    }
    for (var i = 0; i < this.persons.length; i++) {
      console.log('person' + i + '  information: ' + this.persons[i]);
    }
  }
}

var test = new Test;
test.run();










