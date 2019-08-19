# Scope 
References: 
[1](https://scotch.io/tutorials/understanding-scope-in-javascript)
[2](https://codeburst.io/javascript-learn-understand-scope-f53d6592c726)
[3](https://toddmotto.com/everything-you-wanted-to-know-about-javascript-scope/)
[4](https://css-tricks.com/javascript-scope-closures/)

[Back](../README.md)
<p></p><p></p>


### What is Scope?
- Scope refers to the current context of the code.
- Scope determines the lifespan, access, and visibility of variables, functions, and objects throughout the code.

### Scope Benefits
- __Security__: Variables and functions are only accessible where they are needed.
- __Reducing Namespace Collisions__: Namespace collisions occur when two or more variables share a common name.
  + If you declared your variables with `const` or `let`, you would receive an error whenever you a name collision happens
  + If you declare your variables with `var`, your second variable overwrites the first one after it is declared (hard to debug)
- __Code Reusability__: Correctly utilizing local scopes means more reusable code with fewer potential side-effects.


### [Scoping Conceptual Types](https://codeburst.io/js-scope-static-dynamic-and-runtime-augmented-5abfee6223fe)

#### 1. Static (Lexical) Scope
- In Static scoping, an identifier refers to its nearest (top-level) lexical environment.
- This identifier become a property of the program text (lexical environment) and unrelated to the run time call stack.
- In Static scoping, the compiler first searches in the current block, then in the surrounding blocks successively and finally in the global variables.
- The scope is determined when the code is compiled (`compile-time`)
- The word "static" relates to ability to determine the scope of an identifier during the parsing stage of a program (`compile-time`)
- If only by looking at the source code one can determine in which environment a binding is resolved, we are in static scope.
- Technically static scope is implemented by the concept of `closures`. And vice-versa, `closures` can naturally be implemented in languages with static scope, through the mechanism of capturing free-variables in lexical environments.
```javascript
var x = 10; // lexically defined in the global scope (that means at runtime it is resolved also in the global scope)
var y = 20; // lexically defined y
 
function foo() {
  console.log(x, y);
}
 
foo(); // 10, 20
 
function bar() {
  var y = 30; // shadows (changes within this scope) global y as defined with same name
  console.log(x, y); // 10, 30
  foo(); // 10, 20 (at the moment of foo function definition - compile time, the nearest lexical context with the y name — was the global context)
}
 
bar();
```

#### 2. Dynamic Scope
- We cannot determine at parsing stage (compile-time), to which value (in which environment) a variable will be resolved
- Variable is resolved not in the lexical environment, but rather in the dynamically formed global stack of variables
- After the scope (lifetime) of the variable is finished, the variable is removed (popped) from the stack
- That means, that for a single function we may have infinite resolution ways of the same variable name — depending on the context from which the function is called
- Each time a new function is executed, a new scope is pushed onto the stack. (`run-time`)
- A dynamically-scoped variable is resolved in the `environment of execution (run-time)`, rather than the `environment of definition (compile-time)` as we have in the static scope.
- Most of the modern languages do not use dynamic scope (_Perl support both_).
- One of the dynamic scope benefits is ability to apply the same code for different (mutable over the time) states of a system.
- If a `caller` defines an activation environment of a `callee`, we are in dynamic scope.
- in JavaScript `this` value is dynamically scoped, unless used in an arrow function. **IMPORTANT**


### Scope Types

#### 1. Global Scope
* Variables defined outside of a function or curly braces have Global scope.
* When you start writing JavaScript in a document, you are already in the Global scope.
* Variables inside the Global scope can be accessed and altered in any other scope.
* There is typically one global scope.

#### 2. Local Scope
* Variables defined inside a function have Local scope. 
* Any function defined within another function has a local scope which is linked to the outer function.
* Each function when defined creates its own (nested) local scope.
* Each function when invoked creates a new scope (different scope for every call of that function)
* Any locally scoped items are not visible in the global scope (unless exposed)

#### Local Scope has two different type:
* Function Scope
  - When you declare a variable in a function, you can access this variable only within the function. You can't get this variable once you get out of it.
* Block Scope
  - `if`, `switch`, conditions or `for` and `while` loops
  - When you declare a variable with const or let within a curly brace ({}), you can access this variable only within that curly brace.
  - The block scope is a subset of a function scope since functions need to be declared with curly braces (unless you're using arrow functions with an implicit return)
  - Block statements, unlike functions, don't create a new scope
  - `let` and `const` keywords support the declaration of local scope inside block statements

```javascript
const logName = function() { return this.__proto__.constructor.name; };

class Object {
    logName() { return this.__proto__.constructor.name; }
}

console.log("logName Scope:", logName()); // logName Scope: Window
console.log("object.logName Scope:", new Object().logName()); // object.logName Scope: Object
```

__Note:__

- Global scope lives as long as your application lives. Local Scope lives as long as your functions are called and executed.
- When a function is called in Strict Mode, the context will default to undefined.
- `Execution Context` refers to `scope` and not context
- when the JavaScript interpreter starts to execute the code, the context (scope) is by default set to be global. After that, each function call (invocation) would append its context to the execution context.
- Each function creates its own execution context.
- There can only be one global context but any number of function contexts.



### Execution Context
1. Creation Phase : _when a function is called but its code is not yet executed_

- Creation of the Variable (Activation) Object
    + When a function is called, the interpreter scans it for all resources including function arguments, variables, and other declarations.
    + Everything, when packed into a single object, becomes the the Variable Object

- Creation of the Scope Chain
    + When asked to resolve a variable, JavaScript always starts at the innermost level of the code nest and keeps jumping back to the parent scope until it finds the variable or any other resource it is looking for.

- Setting of the value of context (this)
  ```javascript
  executionContextObject = {
    'scopeChain': {}, // contains its own variableObject and other variableObject of the parent execution contexts
    'variableObject': {}, // contains function arguments, inner variable and function declarations
    'this': valueOfThis
  }
  ```

2. Execution Phase : _when values are assigned and the code is finally executed_


### Scope and `this`



### Function Hoisting and Scopes
  - function declaration : `function funcName() {};`
  - function expression : `funcName = function () {};`

  - Functions, when declared with a `function declaration`, are always hoisted to the top of the current scope.
  ```javascript
  welcome();
  function welcome() { console.log('Welcome!') };
  // is equivalent to 
  function welcome() { console.log('Welcome!') };
  welcome();
  ```

  - Functions, when declared with a `function expression`, are not hoisted to the top of the current scope.
  ```javascript
  welcome();
  var welcome = function() { console.log('Welcome!') };
  // is NOT equivalent to 
  function welcome() { console.log('Welcome!') };
  welcome();
  ```

  - Functions do not have access to each other's scopes when you define them separately, even though one function may be used in another. (we must return the variable and call the function that returns it to use the variable)

  - When a function is defined in another function, the inner function has access to the outer function's variables. This behavior is called `lexical scoping`. (outer function does not have access to the inner function's variables) like one-way glass.
    + Lexical Scope means that in a nested group of functions, the inner functions have access to the variables and other resources of their parent scope.
    + This means that the child functions are lexically bound to the execution context of their parents.
    ```javascript
    function grandfather() {
        var name = 'BigDaddy';
        // likes is not accessible here
        function parent() {
            // name is accessible here
            // likes is not accessible here
            function child() {
                // Innermost level of the scope chain
                // name is also accessible here
                var likes = 'Growing';
            }
        }
    }
    ```



### Closures

- The concept of closures is closely related to Lexical Scope

- A Closure is created when an inner function tries to access the scope chain of its outer function meaning the variables outside of the immediate lexical scope. (Whenever you create a function within another function, you have created a closure)

- The inner function is the closure. This closure is usually returned so you can use the outer function's variables at a later time.

- Closures contain their own scope chain, the scope chain of their parents and the global scope

- A closure can also access the variables of its outer function even after the function has returned

- When you return an inner function from a function, that returned function will not be called when you try to call the outer function. You must first save the invocation of the outer function in a separate variable and then call the variable as a function.
  ```javascript
  const Password = (code = 123) => {
      // code & displayCode are private variable/function and cant be accessed out of Passwrod scope directly
      const displayCode = () => { console.log(`Password Code: ${code}`) };
      return displayCode;
  }

  Password(456); // Nothing! You need to save returned value as a variable
  // Password.displayCode(); // TypeError, displayCode is private!

  const pass = Password(456); // the private displayCode saved into a variable and is within its scope now
  pass(); // Password Code: 456
  ```


#### Closures Usage:

1. __Control Side Effects__

  you create a function that activates the inner closure at your whim
  ```javascript
  const cookPizza = (type) => {
      console.log(`Start Cooking ${type} Pizza.`);
      setTimeout(() => console.log(`${type} Pizza is Serving ...`), 1000);
  };
  cookPizza('Pepperoni'); // Start cooking immediately and serving after 1 sec

  // VS.

  const cookPizza = (type) => {
      console.log(`Start Cooking ${type} Pizza.`);
      return () => {
          setTimeout(() => console.log(`${type} Pizza is Serving ...`), 1000);
      };
  };
  const servePizza = cookPizza('Pepperoni'); // Start cooking immediately but serving once needed
  servePizza(); // Start serving while needed!
  ```


2. __Create Private Variables__

  variables created in a function cannot be accessed outside the function. Since they can't be accessed, they are private variables.
  ```javascript
  const Password = (code = 123) => {
      // code is a  private variable and cant be accessed out of the function
      const displayCode = () => { console.log(`Password Code: ${code}`) };
      return { displayCode }; // by returning displayCode closure in new scope {} we expose its value only through displayCode
  }

  const pass = Password();
  // pass(); // TypeError: pass is not a function
  pass.displayCode(); // Password Code: 123
  ```


3. __Encapsulating functions__ 
 
  Encapsulating functions from the public (global) scope to private or protected saves them from vulnerable attacks. But in JavaScript, there is no such thing as public or private scope. However, we can emulate this feature using closures.
  ```javascript
  (function () {
    /* private scope */
  })();

  // OR

  (() => { /* private scope */ })()
  ```


4. __Module Pattern__

  Module Pattern__ allows us to scope our functions using both public and private scopes in an object (_One convention is to begin private functions with an underscore_)
  ```javascript
  const Module = (() => {

      this.name = 'Nice Module';

      _privateMethod = () => {
          console.log("Module._privateMethod Invoked Privately");
          return `Module._privateMethod returned "${this.name}"`;
      }

      publicMethod = () => {
          console.log("Module.publicMethod Invoked Publically");
          console.log(_privateMethod());
          console.log("Module.publicMethod Done.");
      }

      return {
          publicMethod // publicMethod: publicMethod
      }
  })();


  try {
      Module.publicMethod();
      Module._privateMethod();
  } catch(e) {
      console.error(`ERROR ACCESS PRIVATE:`);
      console.log(`${e.message}`);
  }

  /*
  Module.publicMethod Invoked Publically
  Module._privateMethod Invoked Privately
  Module._privateMethod returned "Nice Module"
  Module.publicMethod Done.
  ERROR ACCESS PRIVATE:
  Module._privateMethod is not a function
  */
  ```


5. __Immediately-Invoked Function Expression (IIFE)__

  This is a self-invoked anonymous function called in the context of window, meaning that the value of this is set window. This exposes a single global interface to interact with.
  ```javascript
  (function(window) {
      // do anything
  })(this);

  ((window) => {
      // do anything
  })(this);
  ```

> An IIFE encapsulates and secures your variables
```javascript
(function() { 
   // hoisted up but still inside the IIFE
   var button = '<button class="red-button">Close</button>';
})(); 

var button = $('button'); // sent to the global scope
```



#### Changing Context with `.call()`, `.apply()` and `.bind()`
- Call is slightly faster in performance than Apply.
- Call allows you pass the rest of the arguments one by one separated by a comma
- Apply allows you pass the the arguments as an array
- Bind allows you pass the rest of the arguments one by one separated by a comma BUT doesn't invoke the method by itself.

```javascript
function born(gender, name) {
    console.log(`${name} is a ${gender}`);
    console.log('ES : ', this, "\n\n");
};

const bornES6 = (gender, name) => {
    console.log(`${name} is a ${gender}`);
    console.log('ES6 : ', this, "\n\n");
};

const family = [
    {
        name: 'Jane',
        gender: 'Girl'
    },
    {
        name: 'John',
        gender: 'Boy'
    }
];

family.map((member) => {
    console.log('-----------------------------------------------\n\n');
    born.call( member, member.gender ,member.name );
    bornES6.call( member, member.gender ,member.name );
    console.log('===============================================\n\n');
    born.apply( member, [member.gender ,member.name] );
    bornES6.apply( member, [member.gender ,member.name] );
    console.log('-----------------------------------------------\n\n');
});
```

#### Scope-Safe Constructors
```javascript
function Person(name, age) {
	this.name = name;
	this.age = age;

	return !(this instanceof Person) && new Person(name, age);
}

const p = Person("myName", 35); // Accidentally missed the "new" keyword
p instanceof Person // true
```


#### Debugging scopes with DevTools
- add the `debugger` keyword in your code


#### Play Ground:
```javascript
/* ES5 Normal Function */
var getScope = function () {
  console.log(this.constructor.name); // this = global, [object Window]
};
getScope();

var myObject = {};
myObject.getScope = function () {
  console.log(this.constructor.name); // this = Object { myObject }
};
myObject.getScope();

console.log('* * * * *');

/* ES6 Fat Arrow Function */
const getScopeES6 = () => {
  console.log(this.constructor.name); // this = global, [object Window]
};
getScopeES6();

const myObjectES6 = {};
myObjectES6.getScopeES6 = () => {
  console.log(this.constructor.name); // this = global, [object Window]
};
myObjectES6.getScopeES6();

console.log('* * * * *');

/* Changing Context */
getScope.apply(this); // this = global, [object Window]
getScope.call(this); // this = global, [object Window]
getScope.bind(this)(); // this = global, [object Window]

getScope.apply(myObjectES6); // this = Object { myObject }
getScope.call(myObjectES6); // this = Object { myObject }
getScope.bind(myObjectES6)(); // this = Object { myObject }
```
































