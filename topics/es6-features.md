# ES6 FEATURES

## ES6 Data Types:

### Primitive:
  * `string`
  * `number`
  * `boolean`
  * `null`
  * `undefined`
  * `symbol` (_A Symbol is a unique and immutable primitive value and may be used as the key of an Object property_)

- A data that is not an object and has no methods.
- All primitives are immutable (cannot be changed).
- Except for _null_ and _undefined_, all primitive values have object equivalents that wrap around the primitive values:
  * `String` Object for `string` primitive
  * `Number` Object for `number` primitive
  * `Boolean` Object for `boolean` primitive
  * `Symbol` Object for `symbol` primitive
- The wrapper's `valueOf()` method returns the primitive value.
- JavaScript automatically converts primitives to wrapper objects


### Object:
  * `Dates`
  * `Maths`
  * `Regular Expressions`
  * `Arrays`
  * `Functions`
  * `Objects`

- Is a collection of properties
- Is a mapping between keys and values.


### Find Type Of a Data

* `typeof`
  - _useless when it comes to distinguishing between different kinds of objects - which includes arrays and nulls_
```javascript
typeof String()                          // string
typeof Number()                          // number
typeof Boolean()                         // boolean
typeof null                              // object    
typeof undefined                         // undefined
typeof {}                                // object      
typeof []                                // object     
typeof function(){}                      // function   
```

* `instanceof`
  - _does not work with primitive values_
  - _cross-window Issues_
```javascript
String() instanceof String               // false
Number() instanceof Number               // false
Boolean() instanceof Boolean             // false
null instanceof Object                   // false
undefined instanceof Object              // false

/a/ instanceof RegExp                    // true
{} instanceof Object                     // true
[] instanceof Object                     // true
[] instanceof Array                      // true
new Date() instanceof Date               // true
function(){} instanceof Function         // true   
```

* `constructor` 
  - _fastest method_
  - _works with primitive values_
```javascript
new String().constructor === String      // true
new Number().constructor === Number      // true
new Boolean().constructor === Boolean    // true
```


* `Object.prototype.toString`
  - _its slow but work in most of cases_
  - _issue with different windows(as in popup window) in IE_
```javascript
Object.prototype.toString.call(new String())  // "[object String]"
Object.prototype.toString.call(new Number())  // "[object Number]"
Object.prototype.toString.call(new Boolean()) // "[object Boolean]"
Object.prototype.toString.call(null)          // "[object Null]"
Object.prototype.toString.call(undefined)     // "[object Undefined]"
Object.prototype.toString.call({})            // "[object Object]"
Object.prototype.toString.call([])            // "[object Array]"
Object.prototype.toString.call(new RegExp())  // "[object RegExp]"
Object.prototype.toString.call(new Date())    // "[object Date]"
Object.prototype.toString.call(function(){})  // "[object Function]"
```


## Metaprogramming Within ES6
_Reflection - finding out about and adjusting the structure and semantics of your application._

* `Symbols` are all about Reflection within implementation - you sprinkle them on your existing classes and objects to change the behaviour.
* `Reflect` is all about Reflection through introspection - used to discover very low level information about your code.
* `Proxy` is all about Reflection through intercession - wrapping objects and intercepting their behaviours through traps.


## `var`, `const`, `let`
- `const`: the identifier won’t be reassigned.
- `let`: the variable may be reassigned.
- `var`: the variable may or may not be reassigned, and the variable may or may not be used for an entire function. is function scope.

-  `var` is function scope, `const` and `let` are block scope (inside {}).
- You can update a `let` variable, but you cannot redeclare it twice in the same scope.
- `const` is not immutable! you could change the properties of a const variable.


## Arrow Function (Fat Arrow) `const myFunc = (vars) => { ... }`
- they have a concise syntax. 
- they have implicit returns. (if the only purpose of your arrow function is to return something, there is no need for the return keyword and curly brackets)
`const myFunc = (var1, var2) => var1 + var2`
- they don’t rebind the value of this when you use a arrow function inside of another function. (when you have an arrow function, it does not change the value of this. It inherits the value of this from the parent.)
- they are always anonymous functions. (you cannot name them however, you could put them in a variable)
`const myFunc = (vars) => { ... }`

- Arrow functions don’t replace regular functions. 
When you need to hav keyword `this`:

  - click handlers
  ```javascript
  const button = document.querySelector('#myId');
  button.addEventListener('click', function() {
      console.log(this);
      this.classList.toggle('on');
  });
  ```
  - Object Methods
  ```javascript
  const person = {
      points: 1,
      score: function()  {
          this.points++;
      }
  }
  ```
  - Prototype Methods
  ```javascript
  class Car {
      constructor(make, colour) {
          this.make = make;
          this.colour = colour;
      }
  }
  const beemer = new Car('BMW', 'blue');
  const subie = new Car('Subaru', 'white');
  Car.prototype.summarize = function() {
      return `This car is a ${this.make} in the colour ${this.colour}`;  
  };
  ```
  - When you need an arguments Object
  ```javascript
  const orderChildren = function() {
      const children = Array.from(arguments);
      return children.map((child, i) => {
          return `${child} was child #${i + 1}`;
      })
      console.log(arguments);
  }
  ```

  - Arrow function with map() and filter()
  ```javascript
  const test = 'react';
  const winners = ['John', 'Jane', 'Matt', 'Lara'];
  const win = winners.map((winner, i) => ({name: winner, test, place: i+1}));

  const ages = [12,125,18,48,92,145,230,78,4];
  const old = ages.filter(age => age >= 80);
  ```
  - Default function arguments
  ```javascript
  const calcBill = (total, tax = 0.12, tip = 0.10) => total + (total*tax) + (total*tip);
  ```


## Template Literals (Strings)

```javascript
`My name is ${name}` instead of "My name is " + name 
```

```javascript
/* Tagged Template Exercise 1 */

const highlight = (strings, ...values) => {
  let str = '';
  strings.forEach((string, i) => {
    str += `${string} <b id="val_${i}" style="color: blue" contenteditable>${values[i] || ''}</b>`;
  });
  return str;
}

const name = "John Due";
const place = "United States"
const markup = highlight`Hi, My name is ${name} and am from ${place}.`;

document.getElementById('app').innerHTML = markup;
```

```javascript
/* Tagged Template Exercise 2 */

const dict = {
  HTML: 'Hyper Text Markup Language',
  CSS: 'Cascading Style Sheets',
  JS: 'JavaScript'
};

const addAbbreviations = (strings, ...values) => {
  const abbreviated = values.map(value => {
    if(dict[value]) {
      return `<abbr title="${dict[value]}">${value}</abbr>`;
    }
    return value;
  });
  
  return strings.reduce((sentence, string, i) => {
    return `${sentence}${string}${abbreviated[i] || ''}`;
  }, '');
}

const fName = 'John';
const lName = 'Doe';
const myIntro = addAbbreviations`Hello, my name is ${fName} ${lName} and I love to code ${'HTML'}, ${'CSS'} and ${'JS'}`;

const myBio = document.querySelector('body');
const p = document.createElement('p');
p.innerHTML = myIntro;
myBio.appendChild(p);
```

```javascript
/* Sanitizing User Data with Tagged Templates */

let sanitize = (strings, ...values) => {
  const dirty =  strings.reduce((prev, next, i) => `${prev}${next}${values[i] || ''}`, '');
  // return dirty;
  return DOMPurify.sanitize(dirty);
};

const dirtyInput = sanitize`I'm a dirty code! <a href="#" onClick="alert('You Hacked!');">Click me</a>`;

const html = `
  <h4>${dirtyInput}</h4>
`;

const output = document.body;
output.innerHTML = html;
```

## New String Methods
```javascript
.startsWith()
.endsWith()
.includes()
.repeat()
```
```javascript
/* Right Align */ 

const myArr = new Array('This', 'is', 'an', 'array', 'of', 'strings');

const leftPad = (str, length = 20) => {
  return `-> ${' '.repeat(length - str.length)}${str}`;
}

myArr.map((item) => console.log(leftPad(item)));
```

## Destructuring Objects
```javascript
const dude = {
  fname: 'John',
  lname: 'Doe',
  country: 'USA',
  city: 'Seattle',
  age: 37,
  links: {
    social: {
      facebook: 'FB URL ...',
      twitter: 'TW URL ...'
    },
    web: {
      blog: 'Blog URL ...'
    }
  }
};

// const fname = dude.fname;
// const blog = dude.links.web.blog;
const { fname, lname, age } = dude;
const { facebook, twitter } = dude.links.social;
const { blog:dudeBlog } = dude.links.web;
```

```javascript
/* Extend with Default Settings */

const settings = {
  width: 300,
  color: 'black'
} // We also need to extend and add height, fontsize ...

const { width = 100, height = 100, color = 'white', fontsize = 18 } = settings;
/* :: width->300, height->100, color->black, fontsize->18 */
```

```javascript
/* Shorthanded Example! */

const { w: width = 400, h: height = 300 } = { w: 800 };
```

## Destructuring Arrays

```javascript
const person = ['Amir', 42, 'Front-End Engineer'];

// const name = person[0];
// const age = person[1];
// const job = person[2];
const [name, age, job] = person;
```

```javascript
const data = "JavaScript, Front-End, 3, 350";
// const toCurrency = (price) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
const [course, category, sku, price ] = data.split(',');
```

```javascript
// Using Rest Uperator (...)
const team = "Amir, Sara, John, Jane, Don";
const [manager, assistance, ...members] = team.split(',');

// manager -> "Amir"
// assistance -> "Sara"
// members -> [" John", " Jane", " Don"]
```

## Swapping Variables with Destructuring

```javascript
let leader = "The Beatles";
let follower = "Bee Gees";
[leader, follower] = [follower, leader];
```

## Destructuring Functions: Multiple Returns and Named Defaults

```javascript
/* Multiple Returns */

const convertCurrency = (amount) => {
  const converted = {
    USD: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount * 1),
    EUR: new Intl.NumberFormat('en-UK', { style: 'currency', currency: 'EUR' }).format(amount * 0.85),
    CAD: new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(amount * 1.3)
  }
  return converted;
};

// const result = convertCurrency(100);
// const USD = result.USD;
// const EUR = result.EUR;
// const CAD = result.CAD;
const {EUR, CAD, USD} = convertCurrency(100);
```

```javascript
/* Named Defaults */

const calcBill = ({total = 5, tax = 0.1, tip = 0.2} = {}) => {
  return total + total*tax + total*tip;
};

const res = calcBill();
const res = calcBill({total: 10});
const res = calcBill({tip: 0.5});
```

## [Iterables & Looping](http://exploringjs.com/es6/ch_iteration.html)
> An `iterable` is a data structure that wants to make its elements accessible to the public. It does so by implementing a method whose key is `Symbol.iterator`. A value doesn’t have to be an object in order to be iterable. 
```javascript
const arr = ['a', 'b', 'c'];
const iter = arr[Symbol.iterator]();
iter.next();
```

> The following values are iterable:
  - Arrays
  - Strings
  - Maps (_WeakMaps are not iterable._)
  - Sets
  - DOM Data Structures

> Closing iterators:
  - break *
  - continue *
  - throw
  - return


> Iterable computed data:
  - `entries()` returns an iterable over entries encoded as [key, value] Arrays. For Arrays, the values are the Array elements and the keys are their indices. For Sets, each key and value are the same the Set element.
  ```javascript
    const arr = ["a", "b", "c"];

    for (const item of arr) {
      console.log(item);
    }
    // "a" "b" "c"

    for (const item of arr.entries()) {
      console.log(item);
    }
    // [0, "a"] [1, "b"] [2, "c"]

    arr.forEach( (item, index) => console.log([index, item]));
    // [0, "a"] [1, "b"] [2, "c"]
  ```
  - `keys()` returns an iterable over the keys of the entries.
  - `values()` returns an iterable over the values of the entries.


### Iterate over Items & Iterate over indexes
  - `for`
  - `forEach`
    - _Array method (only for Arrays)_
    - _can't abort or stop the loop_
  - `for ... of`
    - _for-of only works with iterable values_
    - _you need a helper function if you want to iterate over plain objects_
    - _if a value is Array-like, you can convert it to an Array via `Array.from()`_
  - `for ... in`
    - _loop through properties of an object (any Object)_
    - _allows you to access the keys of the object but doesn’t provide reference to the values._

### Iterate over properties
```javascript
/*Define tool function*/
function objectEntries(obj) {
    let index = 0;

    // In ES6, you can use strings or symbols as property keys,
    // Reflect.ownKeys() retrieves both
    const propKeys = Reflect.ownKeys(obj);

    return {
        [Symbol.iterator]() {
            return this;
        },
        next() {
            if (index < propKeys.length) {
                const key = propKeys[index];
                index++;
                return { value: [key, obj[key]] };
            } else {
                return { done: true };
            }
        }
    };
}


/* Use tool function */
const obj = { first: 'Jane', last: 'Doe' };

for (const [key,value] of objectEntries(obj)) {
    console.log(`${key}: ${value}`);
}
```


### `for ... of`
- We could use `for .. of` for any kind of situations with *Arrays* and iterable Objects(Symbol.iterator) (not plain  *Objects*)
- For accessing to array indexes we could use `Object.entries()`
  > `Object.entries()` method returns an array of a given object's own enumerable property [key, value] pairs
```javascript
/* for of */

// Object.entries() method returns an array of a given object's own enumerable property [key, value] pairs
const members = ['John', 'Sara', 'Jane', 'Walter'];

for (const [index, item] of members.entries()) {
  console.log(`${index} => ${item}`);
};
```

```javascript
/* We can't use arrow functions when we need to access `arguments` */
function add() {
  let total = 0;
  for(const num of arguments) {
    total += num;
  }
  return total;
}

`/* Run in Console */` add(1,2,3,4,5);
```

```javascript
/* Iterate Over NodeList */
/*
 document.querySelectorAll('p');
 pars.constructor.name = "NodeList"
 */

const ps = document.querySelectorAll('p');

ps.forEach(function(p) {
  p.addEventListener('click', function() {
    const prev = this.previousElementSibling;
    const next = this.nextElementSibling;
    
    if (prev) {
      prev.classList.remove('selected');
    }
    if (next) {
      next.classList.remove('selected');
    }
    this.classList.add('selected');
  });
});
```

```javascript

const ps = document.querySelectorAll('p');

ps.forEach(function(p) {
  
  p.addEventListener('click', function() {
    
    // Remove All Siblings Selected Class
    const selPs =  document.querySelectorAll('p.selected');
    [].forEach.call(selPs, function(el) {
        el.classList.remove("selected");
    });
   
    // const prev = this.previousElementSibling;
    // const next = this.nextElementSibling;
    // if (prev) {
    //   prev.classList.remove('selected');
    // }
    // if (next) {
    //   next.classList.remove('selected');
    // }
    // this.classList.add('selected');
  });
});

```


### `for ... in`

```javascript
const obj = {11: 'a', 22: 'b', 33: 'c'};

for (const x in obj) {
    console.log(x);
}
// "11" "22" "33"

const obj = {11: 'a', 22: 'b', 33: 'c'};

for (const x in obj) {
    console.log(obj[x]);
}
// "a" "b" "c"

```


> PLAYGROUND:
```javascript
const arr = ["One", "Two", "Three"];

Array.prototype.shuffle = function() {
  let i = this.length;
  let j;
  let temp;
  
  if (i === 0) return this;
  
  while (--i) {
    j = Math.floor( Math.random() * (i + 1) );
    temp = this[i];
    this[i] = this[j];
    this[j] = temp;
  }
  
  return this;
}; 

arr.shuffle(); // returns shuffled array!
```


### Loop Over Plain Object (Not an Iterable)
> We cant use `for-of` loop for plain objects as they are not an iterable.
> We can use `for-in` loop but it only returns object keys (not their values)

```javascript
/* Different Ways To Loop Over Plain Object */
const person = {
  name: 'John Doe',
  country: 'USA',
  age: 28
}

const callBack = (key, val) => console.log(key, val); 

/* for-in */
for (const key in person) {
  callBack( key, person[key] );
}

/* Object.keys() */
/* Object.keys() returns: an array of all of the keys */
for ( const prop of Object.keys(person) ) {
  callBack( prop, person[prop] );
}

/* Object.entries() */
/* Object.entries() returns: pairs of [key, value] */
/* Use its Polyfill for IE browsers */
for ( const prop of Object.entries(person) ) {
  callBack( prop[0], prop[1] );
}
```


### Array.from() & Array.of()
> prototype methods

- Array.from(): Create an Array from an Arrayish data (has length)
- Array.of(): Create an Array from all passed values

*Turn NodeList into an Array*
```javascript
const nodeList = document.querySelectorAll('dev');
const nodeListArray = Array.from(nodeList);

// nodeList.constructor.name => "NodeList"
// nodeListArray.constructor.name => "Array"

const contents = nodeList.map( node => node.textContent );
// nodeList.map is not a function

const contents = nodeListArray.map( node => node.textContent );
// Works!

/* All in One Shut */
/* Array.from() receives a second argument as map function */
const nodeListArray = Array.from(document.querySelectorAll('dev'), node => node.textContent);
```

*Turn `arguments` into an Array*
```javascript
function sumAll() {
  return Array.from(arguments).reduce( (prev,next) => prev + next, 0 );
};

sumAll(2,3,5); // 10



/* Array.of() */
Array.of('One', 'Two', 'Three'); // ["One", "Two", "Three"]
```


### Array.find() & Array.findIndex()
- Useful to find an object in a big array (as arrays dont have any key to call)

```javascript
const arr = [
  {
    "name": "John",
    "country": "Canada"
  },
  {
    "name": "Jane",
    "country": "USA"
  },
  {
    "name": "Joe",
    "country": "USA"
  }
];

// Get an object
const getPersonData = (name) => console.log( arr.find( person => person.name === name) );
getPersonData('Jane');
/*
  {
    "name": "Jane",
    "country": "USA"
  }
  */

// Get multiple objects
const getPersonData = (key, value) => console.log( arr.filter( person => person[key] === value) );
getPersonData('country', 'USA');
  /*
  {
    "name": "Jane",
    "country": "USA"
  }, {
    "name": "Joe",
    "country": "USA"
  }
  */

// Array.findIndex() : will return index of selected object in the large array (to CRUD on that)
```

### Array.some() & Array.every()

- Array.some()
  > tests whether at least one element in the array passes the test implemented by the provided function (as soon as first item passed, will return true)
- Array.every()
  > tests whether all elements in the array pass the test implemented by the provided function

```javascript
const ages = [37, 19, 24, 17, 12];
const isAdults = age => age >= 18;

const someAdult = ages.some(isAdults);
const allAdult = ages.every(isAdults);

console.log(`Some Adult: ${someAdult} | All Adult: ${allAdult}`);
// "Some Adult: true | All Adult: false"
```


### Spread Operator
> Takes every single item of an iterable (eg. Array, String, DomNode, arguments obj,Map, Set, ...) and apply it to the containing iterable (Array) and return result as a new array.

```javascript
const ar1 = ["one","two","three"];
const ar2 = ["five","six","seven"];
const result = [...ar1, "four",...ar2];
// result >> (7) ["one", "two", "three", "four", "five", "six", "seven"]
```

```javascript
// ES5
const main = ['One', 'Two', 'Three'];
const instance = main;
instance.push("New");
console.log(instance); // ["One", "Two", "Three", "New"]
console.log(main); // ["One", "Two", "Three", "New"] NO! Got Overridden!

const main = ['One', 'Two', 'Three'];
const instance = [].concat(main);
instance.push("New");
console.log(instance); // ["One", "Two", "Three", "New"]
console.log(main); // ["One", "Two", "Three"] Yes!


// ES6
const main = ['One', 'Two', 'Three'];
const instance = [...main];
instance.push("New");
console.log(instance); // ["One", "Two", "Three", "New"]
console.log(main); // ["One", "Two", "Three"] Yes!
```

> Array From Node Lists
```html
<div class="countries">
    <p>USA</p>
    <p>France</p>
    <p>Italy</p>
</div>
```
```javascript
const countriesNode = document.querySelectorAll('.countries > p');
const countriesArray = [...countriesNode];
// const countriesArray = Array.from(countriesNode);
const countryNames = countriesArray.map(country => country.textContent);

console.log(countryNames);
// USA France Italy
```

> Remove an object from an array of objects (useful in React)
```javascript
const countries = [
    {
      code: "USA",
      name: "United States Of America"
    },
    {
      code: "UK",
      name: "United Kingdom"
    },
    {
      code: "FR",
      name: "France"
    },
    {
      code: "ITL",
      name: "Italy"
    }
];

const countryCode = 'UK';
const countryIndex = countries.findIndex(country => country.code === countryCode);
const countriesUpdated = [...countries.slice(0, countryIndex), ...countries.slice(countryIndex + 1)];

console.log(countriesUpdated);
/*
0 : {code: "USA", name: "United States Of America"}
1 : {code: "FR", name: "France"}
2 : {code: "ITL", name: "Italy"}
*/
```

```javascript
const team = ["John", "Jane", "Joe"];
const newMembers = ["Jessica", "Jasmine"];

// team.push.apply(team, newMembers); // ES5
team.push(...newMembers); // ES6

console.log(team); // ["John", "Jane", "Joe", "Jessica", "Jasmine"]
```


```javascript
const sayHello = (fName, lName) => `Hi ${fName} ${lName}`;

const people = ["John", "Doe"];

// console.log( sayHello(people[0], people[1]) );
console.log( sayHello(...people) );

// Hi John Doe
```

### Rest Param

```javascript
const converCurrency = (rate, ...amounts) => {
  return amounts.map(amount => rate * amount);
};

console.log( converCurrency(1.25, 10, 20, 30, 40) );
// [12.5, 25, 37.5, 50]
```

```javascript
const record = ["Jane Doe", "ID737", 1.2, 2.3, 3.4, 4.5];

const [name, id, ...records] = record;

console.log( name, id, records );
// Jane Doe ID737 [1.2, 2.3, 3.4, 4.5]
```


### Object Literal Upgrades

```javascript
const name = "Jane";
const country = "USA";
const age = 33;
const job = "Farmer";


/* ES5
const person = {
    name: name,
    country: country,
    age: age,
    job: job
};
*/

// ES6
const person = { name, country, age, job };

console.log(person); // {name: "Jane", country: "USA", age: 33, job: "Farmer"}
```


```javascript
/* ES5
  const modal = {
    create: function() { console.log(`Created: ${msg}`) },
    open: function() { console.log(`Opened: ${msg}`) },
    close: function() { console.log(`Closed: ${msg}`) }
  };
  */

// ES6
const modal = {
  create(msg="Test") { console.log(`Created: ${msg}`) },
  open(msg) { console.log(`Opened: ${msg}`) },
  close(msg) { console.log(`Closed: ${msg}`) }
};

modal.create("Booz");
```

```javascript
const invertColor = (color) => {
  return `#` + ("000000" + (0xFFFFFF ^ parseInt(color.substring(1),16)).toString(16)).slice(-6);
};

const key = "color";
const value = "#000000";

const component = {
  [key]: value,
  [`inverse-${key}`]: invertColor(value)
};

console.log(component);
// {color: "#000000", inverse-color: "#ffffff"}
```


```javascript
const keys = ["Size", "Color", "Price"];
const values = ["Medium", "Blue", "$30.00"];

/*
const product = {
  [keys[0]]: values[0],
  [keys[1]]: values[1],
  [keys[2]]: values[2]
};

{Size: "Medium", Color: "Blue", Price: "$30.00"}
*/


const product = {
  [keys.shift()]: values.shift(),
  [keys.shift()]: values.shift(),
  [keys.shift()]: values.shift()
};

// {Size: "Medium", Color: "Blue", Price: "$30.00"}
```


### AJAX (Asynchronous JavaScript and XML)
> AJAX is the method of exchanging data with a server, and updating parts of a web page – without reloading the entire page.

_Ajax should be used anywhere in a web application where small amounts of information could be saved or retrieved from the server without posting back the entire pages._

- `XMLHttpRequest`: (XHR, Object to interact with servers)
- `XML`: Extensible Markup Language (Markup Language to Define Data)
- `JSON`: JavaScript Object Notation (Markup Language to Define Data)

#### [XMLHttpRequest API](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)

##### XMLHttpRequest Constructor:
- XMLHttpRequest() 
`eg. new XMLHttpRequest()`

##### XMLHttpRequest Properties:

- `XMLHttpRequest.readyState` : Returns the state of the request.
    - 0	UNSENT :: Client has been created. open() not called yet.
    - 1	OPENED :: open() has been called.
    - 2	HEADERS_RECEIVED :: send() has been called, and headers and status are available.
    - 3	LOADING	:: Downloading; responseText holds partial data.
    - 4	DONE :: The operation is complete.
    
- `XMLHttpRequest.status` : Returns the status of the response of the request.
    Successful
        - 200 : OK
    Redirection
        - 301 : Moved Permanently
        - 302 : Moved Temporary
    Client Error
        - 401 : Unauthorized
        - 403 : Forbidden
        - 404 : Not Found
    Server Error
        - 500 : Internal Server Error
        - 503 : Service Unavailable
        - 504 : Gateway Timeout

- `XMLHttpRequest.response` : Returns the response's body. Its type is depend on  _XMLHttpRequest.responseType_

- `XMLHttpRequest.responseText` : Returns a DOMString that contains the response to the request *as text*.

##### XMLHttpRequest Event handlers:
- `onreadystatechange`
- `onabort` Gets invoked if the operation is canceled by the user.
- `onerror` Gets invoked if the operation fails to complete due to an error.
- `onload` Gets invoked when the operation is successfully completed.
- `onloadend` Gets invoked when the operation is completed for any reason; it will always follow a an abort, error, or load event.
- `onloadstart` Gets invoked exactly once when the operation begins.
- `onprogress` Gets invoked zero or more times, after the loadstart event, but before any abort, error, or load events occur.


##### XMLHttpRequest Methods:
- `XMLHttpRequest.open(method, url, async, user, password)` : Initializes a request from JavaScripts (Ignored for non-HTTP(S) URLs)
- `XMLHttpRequest.send(body)` : Sends the request
- `XMLHttpRequest.abort()` : Aborts the request if it has already been sent (readyState->4, status->0)
- `XMLHttpRequest.setRequestHeader(header, value)` : Sets the value of an HTTP request header
- `XMLHttpRequest.getResponseHeader(name)` : Returns the string containing the text of the specified header
- `XMLHttpRequest.getAllResponseHeaders()` : Returns all the response headers

> XMLHttpRequest
```javascript
const br = document.createElement("br");
const btnGetData = document.createElement('BUTTON');
btnGetData.appendChild( document.createTextNode("AJAX ME") );
const divDisplayData = document.createElement('display-data');
document.body.appendChild(btnGetData);
document.body.appendChild(br);
document.body.appendChild(divDisplayData);


const url = 'https://jsonplaceholder.typicode.com/user';


const displayData = (data) => {
  if(typeof data === "object") {
    divDisplayData.innerHTML = data.map(obj => obj.name).join(' <br/> ');
    console.log( data );
  } else if(typeof data === 'string') {
    divDisplayData.innerHTML = data;
    console.log( data );
  } else {
    console.log('No Data to Display!');
  }
};


const responseJSON = (xhr) => {
  return JSON.parse(xhr.responseText);
};


const fetchData = (url) => {

  const xhr = new XMLHttpRequest();

  xhr.open('GET', url, true);
  console.log(`Open: ${xhr.readyState}`);

  xhr.onloadstart = function () {
    console.log(`On Load Start: ${xhr.readyState}`);
  };

  xhr.onprogress = function () {
    console.log(`On Progress: ${xhr.readyState}`);
  };

  // Old Method
  /*
  xhr.onreadystatechange = function() {
    console.log(`Ready State: ${xhr.readyState}`); (Check all 4 States)
    if( this.readyState == 4 && this.status == 200 ) {
      const responseJSON = JSON.parse(this.responseText);
      displayData(responseJSON);
    }
  };
  */

  // Newer Method
  xhr.onload = function () {
    console.log(`On Load: ${xhr.readyState}`); // (Doesn't Check all 4 States, Just Waits for State 4)
    if( this.status === 200 ) {
      displayData( responseJSON(this) );
    } else if (this.status === 404) {
      displayData( "Document Not Found!" );
    }
  };

  xhr.onloadend = function () {
    console.log(`On Load End: ${xhr.readyState}`);
  };

  xhr.onerror = function (err) {
    console.log(`On Error: ${err}`);
  };

  xhr.send();

};


btnGetData.addEventListener('click', () => {
  fetchData(url);
});
```


#### [Fetch API](https://fetch.spec.whatwg.org/) & [Here](https://davidwalsh.name/fetch)



### Promises

> A promise represents the eventual result of an asynchronous operation.


##### Promise States
- `Pending` the asynchronous operation has not completed yet.
- `Fulfilled` the asynchronous operation has completed, and the promise has a value.
- `Rejected` the asynchronous operation failed, and the promise will never be fulfilled. has a reason that indicates why the operation failed.

```javascript
const wait = time => new Promise((resolve) => setTimeout(resolve, time));
console.log(`Time Elapsed: 0`);
wait(500)
  .then(() => console.log(`Time Elapsed: 500`))
  .then(() => {
    wait(500).then(() => console.log(`Time Elapsed: 1000`))
      .then(() => {
        wait(500).then(() => console.log(`Time Elapsed: 1500`));
      });
  });

// Time Elapsed: 0
// Time Elapsed: 500
// Time Elapsed: 1000
// Time Elapsed: 1500
```

```javascript
const postsPromise = fetch('https://jsonplaceholder.typicode.com/posts');

postsPromise
  .then(data => data.json())
  .then(data => console.log(data));
```

```javascript
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => resolve('Resolved'), 500);
  setTimeout(() => reject(Error('Rejected')), 1000);
});

myPromise
  .then( data => console.log( data ) )
  .catch( err => console.log( err ) );
```


> Fetch & Promise (Promises & Data with Relationship)
```javascript
const users = fetch('https://jsonplaceholder.typicode.com/users');
const posts = fetch('https://jsonplaceholder.typicode.com/posts');

const getPostById = (id) => {
  return new Promise((resolve, reject) => {
    const post = posts
      .then(posts => posts.json())
      .then(postsJSON => postsJSON.find(post => post.id === id));

    if (post) {
      resolve(post);
    } else {
      reject(Error('No Post Was Found!'));
    }
  });
};

const getAuthor = (post) => {
  return new Promise((resolve, reject) => {
    const author = users
      .then(author => author.json())
      .then(authorJSON => authorJSON.find( user => user.id === post.userId ));

    if (author) {
      post.author = author;
      resolve(post);
    } else {
      reject(Error('No Author Was Found!'));
    }
  });
};

getPostById(37)
  .then(post => getAuthor( post ))
  .then(post => console.log( post ))
  .catch(err => console.error(err));
```

> Promise All: 
returns a single Promise that resolves when all of the promises in the iterable argument have resolved or when the iterable argument contains no promises. It rejects with the reason of the first promise that rejects.
```javascript
const weather = new Promise(resolve => {
  setTimeout(() => {
    resolve({ city: "San Diego", temp: 23 });
  }, 2000);
});

const tweets = new Promise(resolve => {
  setTimeout(() => {
    resolve(["First tweet", "Second tweet"]);
  }, 300);
});

Promise
  .all([weather, tweets])
  .then(responses => {
    const [weatherData, tweetsData] = responses;
    console.log(weatherData, tweetsData);
  });
```


```javascript
const albums = fetch('https://jsonplaceholder.typicode.com/albums');
const photos = fetch('https://jsonplaceholder.typicode.com/photos');

Promise
  .all([albums, photos])
  .then(responses => {
    return Promise.all(responses.map(res => res.json()))
  })
  .then(responses => {
    console.log(responses);
  });
```


##### Symbols

> ES6 Metaprogramming
> - **Symbols** are all about Reflection within implementation - you sprinkle them on your existing classes and objects to change the behaviour.
> - **Reflect** is all about Reflection through introspection - used to discover very low level information about your code.
> - **Proxy** is all about Reflection through intercession - wrapping objects and intercepting their behaviours through traps.

- Symbols are a new JS primitive
- Symbols are completely unique (useful to prevent naming collisions)
- Symbols are not enumerable (can not loop over them)

```javascript
const myTeam = {
	"doe": { name: "John Doe" },
	"doe": { name: "Jane Doe" }
}
console.log(myTeam); // "doe": { name: "Jane Doe" } only last one!


const myTeam = {
	[Symbol("doe")]: { name: "John Doe" },
	[Symbol("doe")]: { name: "Jane Doe" }
}
console.log(myTeam); // OK
```


```javascript
const myTeam = {
	[Symbol("doe")]: { name: "John Doe" },
	[Symbol("doe")]: { name: "Jane Doe" }
}

for (const member in myTeam) {
    console.log(member); // Oops!
}

Object.getOwnPropertySymbols(myTeam).map(member => console.log(myTeam[member])); // Ok
```


##### Import & Export
- Default Export:
```javascript
// Create it
const apiKey = 'key123';
export default apiKey;

// Call it
import apiKey from './config';
// or even
import anyNameYouLike from './config';
```

- Namespaced Export:
```javascript
// Create it
export const apiKey = 'key123';

// Call it
import { apiKey } from './config';
// or even
import { apiKey as anyNameYouLike } from './config';
```





### Helpful Notes:

##### Sort Numbers in Array
```javascript
[1, 100, 10, 15, 150].sort() // [1, 10, 100, 15, 150]
[1, 100, 10, 15, 150].sort((a, b) => a - b) // [1, 10, 15, 100, 150]
```

##### Replace in Strings:
```javascript
const txt = 'it all began near the year 2005, when the two users were made. john and jane were both humans.';
const newTxt = txt.replace(/\s/ig, '-');
const newTxtFun = txt.replace(/john|jane/ig, match => match.toUpperCase());
```

