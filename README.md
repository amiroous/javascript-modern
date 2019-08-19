# MODERN JAVASCRIPT


#### Table Of Content
- [Snippets](topics/snippets.md#snippets)
- [Scope](topics/scope.md#scope)
- [ES6 Features](topics/es6-features.md#es6-features)
- [Tips & Tricks](topics/tips-&-tricks.md#tips-&-tricks)
- [Recursive Pattern Functions](topics/recursive-pattern-functions.md#recursive-pattern-functions)
- [RegExp](topics/regexp.md#regexp)
- [Generators](topics/generators.md#generators)
- [Promises](topics/promises.md#promises)
- [Design Patterns](topics/design-patterns/README.md)


---

### Understanding JavaScript 
[1](https://www.codementor.io/mukuljainx/what-is-javascript-and-how-it-works-under-the-hood-8bqkes6r2)
[2](https://www.youtube.com/watch?v=8aGhZQkoFbQ)

__JavaScript: Single Threaded__
> JavaScript is a single-threaded programming language, which means it has a single Call Stack. Therefore it can do one thing at a time.

__Call Stack__
> The Call Stack is a data structure which records basically where in the program we are.

__JavaScript Engine__
> A program which interprets and executes JavaScript code. A popular example of a JavaScript Engine is Google’s V8 engine.

__Prototype Based__
> JavaScript is prototype-based with first-class functions.

__First-class Functions__
> Meant that function can be stored in variables and then can be passed around.

__High Order Functions__
> Means that function can take other function as input and return a function as output.

__JavaScript is Multi-Paradigm__
> Means, you can program in with various coding styles like OOP or Functional or mix of both.

__Performance__ [...](https://medium.com/reloading/javascript-start-up-performance-69200f43b201)
> Start-up performance matters. A combination of slow parse, compile and execution times can be a real bottleneck for pages that wish to boot-up quickly.



## How JavaScript Engine, Evaluates The Code
[1](https://hackernoon.com/execution-context-in-javascript-319dd72e8e2c)


### JavaScript Code Evaluates Phases

> - __Compiled Languages__ are those who compiles the human understandable language (programming languages) to machine readable language before you run the program __at build-time__.
>   - compiled language applications can run directly once they are compiled

> - __Interpreted Languages__ are also human readable languages (programming languages) and needs a translation down to machine languages to get executed, but this translation is done __at run-time__.   
>   - you always need the interpreter installed in your environment, before you run any interpreted language

> - __JIT (Just In Time)__
>   - compile the code just before the execution
>   - The most important differences between a compiled and an interpreted language is; the compiled one takes a longer time to prepare itself to start executing, as it has to take care of lexing the entire codebase, making awesome optimizations etc. In the other hand an interpreted language starts executing in no time but doesn’t do any optimization of code.
>   - The modern JavaScript engines have JIT (they have a compiler).
>   - In JavaScript if a certain piece of code is run more than once, it’s called warm. 
    When a function starts gets warmer, JIT sends it for compilation and saves the compiled code with a version. 
    From next time if the same code is executed, it skips the translation and directly executes the compiled code. This speeds up the performance.
     
__JavaScript, Compiled or Interpreted?__
> JavaScript execution looks complicated and kind of hybrid, but its more __interpreted language__.
1. JavaScript code needs a tool (JS engine) installed in your machine (node, browser) to get executed. 
    This is what interpreted languages want. Compiled language products are free to be executed directly.
2. Hoisting etc are not like code modification. There is no intermediate code for that. 
    It’s just the way JS interpreter handle things. (concept of execution context and not code modification)
3. JIT is the only point which can raise questions on JavaScript being an interpreted language. 
    But JIT is not a full fledged compiler, it also compiles just before the execution.



__Software Program Development Stages__

1. Compile Time (Build-Time)
    > the programming code is converted to executable code for machine
    - Compile Time possible errors:
        - Syntax errors
        - Typechecking errors
        - Compiler crashes (Rarely)
        
2. Execution Time (Run-Time)
    > the executable code is running by machine
    - Run Time possible errors (referred as Exceptions):
        - Division by zero
        - Dereferencing a null pointer
        - Running out of memory
        - Trying to open a file that isn't there
        - Trying find a web page and discovering that an alleged URL is not well formed


__Notes__    
> - As a general rule for building high-performance applications, everything that can be done at buildtime should not be done at runtime.


---


### Inheritance 
[1](https://medium.com/javascript-scene/master-the-javascript-interview-what-s-the-difference-between-class-prototypal-inheritance-e4cd0a7562e9),
[2](https://medium.com/javascript-scene/the-heart-soul-of-prototypal-oo-concatenative-inheritance-a3b64cb27819),
[3](https://medium.com/javascript-scene/3-different-kinds-of-prototypal-inheritance-es6-edition-32d777fa16c9)
> Inheritance is fundamentally a code reuse mechanism: A way for different kinds of objects to share code.   
The way that you share code matters because if you get it wrong, it can create a lot of problems


##### 1. Class Inheritance
> - Classes inherit from classes and create subclass relationships: hierarchical class taxonomies.   
- Instances are typically instantiated via __constructor__ functions with the `new` keyword.   
- The ES6 `class` keyword desugars to a constructor function. (_type of a class is function_)
- In JavaScript, class inheritance is implemented on top of prototypal inheritance (that does not mean that it does the same thing)

__Class Inheritance Issues__
> - The solution to all of following issues is to favor object composition over class inheritance.
- Class inheritance creates parent/child object taxonomies as a side-effect.
- The tight coupling problem (class inheritance is the tightest coupling available in _OO Design Pattern_)
- When you inherit from a class, you get everything, even if you don’t want it. 
- The fragile base class problem
- Inflexible hierarchy problem
- The duplication by necessity problem (due to inflexible hierarchies, new use cases are often shoe-horned in by duplicating, rather than adapting existing code)
- The Gorilla/Banana problem (What you wanted was a banana, but what you got was a gorilla holding the banana, and the entire jungle)

```javascript
class Human {
    
	constructor(firstName, lastName) {
        this.firstName = firstName,
        this.lastName = lastName,
        this.fullName = function() {
            return `${this.firstName} ${this.lastName}`;
        }
    }
}

var person1 = new Human("Jane", "Doe");
var person2 = new Human("John", "Doe");

console.log(Human.prototype);
console.log(person1.__proto__);
console.log(Object.is(Human.prototype, person1.__proto__)); // true
```

##### 2. Prototypal Inheritance 

__Prototype__ [...](https://hackernoon.com/prototypes-in-javascript-5bba2990e04b)
> When a function is created in JavaScript, JavaScript engine adds a prototype property to the function. 
    This prototype property is an object (called as prototype object) has a constructor property by default. 
    constructor property points back to the function on which prototype object is a property. 
    We can access the function’s prototype property using the syntax functionName.prototype.

> ___Prototype object of the constructor function is shared among all the objects created using the constructor function.___

> Instant Creation By: Constructors (`new` keyword) 
[1](https://medium.com/@SunnyB/javascript-prototypal-inheritance-constructors-vs-oloo-d90c482aaa55)
[2](https://hackernoon.com/object-create-in-javascript-fa8674df6ed2)
[3](https://hackernoon.com/object-create-in-javascript-fa8674df6ed2)
```javascript
function Human(firstName, lastName) {
	this.firstName = firstName,
	this.lastName = lastName,
	this.fullName = function() {
		return `${this.firstName} ${this.lastName}`;
	}
}

var person1 = new Human("Jane", "Doe");
var person2 = new Human("John", "Doe");

console.log(Human.prototype);
console.log(person1.__proto__);
console.log(Object.is(Human.prototype, person1.__proto__)); // true
```


> Instant Creation By: Object Linking to Other Objects - OLOO (`Object.create()`)
> - `Object.create()` is a static method on the Object prototype.
> - `Object.create()` creates a new object with the prototype set to a certain object.
> - `Object.create()` is more natural to the prototype model (_comparing with constructor model_)

```javascript
var Human = {
	init(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
		return this; // important to be able Object.create().init();
	},
	fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
};

var person1 = Object.create(Human).init("Jane", "Doe");
console.log(Human.isPrototypeOf(person1)); // true
console.log(person1); // {firstName: "Jane", lastName: "Doe"}
console.log(person1.fullName()); // Jane Doe


var person2 = Object.create(Human, {
	"firstName": {value: "John"},
	"lastName": {value: "Doe"}
});

console.log(person2); // {firstName: "John", lastName: "Doe"}
```



__Prototype Object__
> As prototype object is an object, we can attach properties and methods to the prototype object. 
    Thus, enabling all the objects created using the constructor function to share those properties and methods.

> New property can be added to the constructor function’s prototype property using either the dot notation or square bracket notation
```javascript
Human.prototype.age = null;
```


- A prototype is a working object instance. Objects inherit directly from other objects.  
- Instances may be composed from many different source objects, allowing for easy selective inheritance and a flat Prototype delegation hierarchy.    
- Class taxonomies are NOT an automatic side-effect of prototypal OO  
- Instances are typically instantiated via factory functions, object literals, or `Object.create()`. 

__Prototypal OO Types__
1. Concatenative Inheritance
    - The process of inheriting features directly from one object to another by copying the source objects properties.
    - Since ES6, this feature has a convenience utility in JavaScript called `Object.assign()`
    - Concatenative inheritance is the secret sauce that enables object composition in JavaScript
    - jQuery, Underscore, Lodash, and the ES6 `Object`, contain a utility that serves the purpose of concatenative inheritance.
2. Prototype Delegation
    - The ability to “share the behavior”, or delegate property lookup from the target object to some already existing object properties
    - In JavaScript, an object may have a link to a prototype for delegation.
    - If a property is not found on the object, the lookup is delegated to the delegate prototype, 
    which may have a link to its own delegate prototype, 
    and so on up the chain until you arrive at `Object.prototype`, which is the root delegate.
    - This is the prototype that gets hooked up when you attach to a `Constructor.prototype` and instantiate with `new`
    (You can also use `Object.create()`)
    - You can even mix this technique with concatenation in order to flatten multiple prototypes to a single delegate, 
    or extend the object instance after creation.
3. Functional Inheritance
    - In JavaScript, any function can create an object.
    - When that function is NOT a constructor (NOR `class`), it’s called a __factory function__.
    - Functional inheritance works by producing an object from a factory, 
    and extending the produced object by assigning properties to it directly (using concatenative inheritance)
    - Most of the time, composition is achieved using factory functions: functions which exist to create object instances.


#### Combine Constructor/Prototype
1. Problem with constructor: Every object has its own instance of the function
2. Problem with the prototype: Modifying a property using one object reflects the other object also

To solve above both problems, we can define all the object specific properties inside the constructor and all shared properties and methods insdie the prototype


#### Function Composition [...](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-function-composition-20dfb109a1a0)
> Function composition is the process of combining two or more functions to produce a new function. 
Composing functions together is like snapping together a series of pipes for our data to flow through.

`const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);`


---


### Execution Context (EC) 
> the environment in which JavaScript code is executed

#### Execution Context Types:

A. Global Execution Context (GEC)
> Default execution context in which JS code start it’s execution when the file __first loads in the browser__.
> - JavaScript engine wraps `executing code` within `execution context` at `execution time` (run-time)
> - Execution Contexts is a JavaScript object ``executionContextObj``
> - if the code is executing in strict mode value of `this` is `undefined` otherwise it is `window` object
> - Global execution context cannot be more than one because only one global environment is possible for JS code execution 
> - Global execution context's variables/functions are accessible by everywhere to everything in the code.
> - By Global we mean code or variable __not inside a function__!
> - Global Execution Context will create 3 things behind the scene for code:   
        1. Global Object (in browser is `window`)   
        2. special variable called `this`   
        3. Outer environment (in Global there wouldn't be any outer env)   

B. Functional Execution Context (FEC)
> Functional execution context is defined as the context created by the __execution of code inside a function__.
> - Each function has it’s own execution context (It can be more than one)
> - Functional execution context have access to all the code of global execution context
> - While executing global execution context code, if JS engine finds a function call, it creates a new functional execution context for that function

C. Eval
> Execution context inside eval function



#### Execution Context Stack (ECS)
> Execution context stack is a stack data structure to store all the execution stacks created while executing the JS code

- __Global Execution Context__ is present by default in execution context stack and it is at the bottom of the stack.
- While executing global execution context code, if JS engines finds a function call, it creates __Functional Execution Context__ of that function and pushes that function execution context on top of execution context stack.
- JS engine executes the function whose execution context is at the top of the execution context stack.
- Once all the code of the function is executed, JS engines pop’s out that function’s execution context and start’s executing the function which is below it.



#### Execution Context Creation Phases [...](https://hackernoon.com/execution-context-in-javascript-319dd72e8e2c)
> JavaScript engine creates the execution context in the following two phases 


##### 1. Creation Phase
> When the code loads in the browser, JS engine will enter the compilation phase to create the execution objects.
> In the compilation phase JS engine will handle only the declarations, it does not bother about the values. 

1. Creates the Activation object or the variable object   
    > Activation object is a special object in JS which contain all the variables, function arguments and inner functions declarations information.
2. Creates the scope chain
    > Once the activation object gets created, JS engine initializes the scope chain 
    which is a list of all the variables objects inside which the current function exists.  
    This also includes the variable object of global execution context.  
    Scope chain also contains the current function variable object.
3. Determines the value of this
    > After the scope chain, JavaScript engine initialize the value of `this`.
4. Setup Memory Space for Variables and Functions (Assignment)
    
##### 2. Execution Phase
> As further there is no code, JS engine will now enter the execution phase and will scan the function again
> Here, JS engine will update the variable value and will execute the code.

1. Assign Values
2. Assign References to Functions
3. Execute Code 



#### Hoisting
> Hoisting is Javascript’s default behavior of moving __variable and function declarations__ to the top of their containing scope.   
> _In real fact, just before the code is executed, it goes through a compiler, 
during this phase called lexing, scope gets defined and the variable and function declarations are moved to the top of their scope. 
If they are defined inside a function, they are moved to the top of this function, and if they are outside a function, to the top of the global scope._

> _Before your written code begin executed line by line, the JavaScript has already set aside memory space 
for the variables and functions you've created in the entire code. (so those variables and functions are existed in memory), 
however it doesn't know about their value and therefore will set a placeholder for them (default values)._

__Hoisting Only Declarations__   
JavaScript only hoists variable and function declarations (not Assignments, Initializations or Expressions)

__The Declaration Comes Before the Assignment (Initializations | Expressions)__   
The declaration comes before the assignment: only variable and function declarations are hoisted, 
while the assignments are left in place, just where they were written in the code.    

__Functions Before Variables__  
functions are hoisted first, and then variables.

__Best Practice__   
- Declare all of your variables at the top of their scope (at the top of the global scope or at the top of the function scope)
- Put all your functions, if you can, also at the top of their scope.
- Try to initialize variables when you declare them. This will provide cleaner code and help avoid undefined variables.


__In JavaScript functions are first class objects__ _a function is a regular object of type function._   
> __Functions Definition & Behavior__ [1](https://dmitripavlutin.com/6-ways-to-declare-javascript-functions/)
> - Function Declaration (Hoisted) `function x10(num) { return num * 10 }`
> - Function Expression: _functions that is assigned to a variable_ (Not Hoisted) `var x10Var = function x10(num) { return num * 10 }` `x10 = (num) => { return num * 10 }` `(function x10(num) { return num * 10 })() // IIFE`
> - Function Call `x10(3)`

> __Arrow Functions__
> - Arrow functions mostly behave like function expressions.
> - Arrow functions lexically bind the current `this` value.
> - Arrow functions do not create their own execution context, but takes it lexically (contrary to function expression or function declaration, which create own this depending on invocation)
> - `arguments` object is not available in the arrow function

---

## Data Types:

### 1 Primitive:
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


### 2 Object:
  * `Dates`
  * `Maths`
  * `Regular Expressions`
  * `Arrays`
  * `Functions`
  * `Objects`

- Is a collection of properties
- Is a mapping between keys and values.


### Find Type Of a Data

#### `typeof`
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

#### `instanceof`
  - _does not work with primitive values_
  - _cross-window Issues_
```javascript
String() instanceof String;               // false
Number() instanceof Number;               // false
Boolean() instanceof Boolean;             // false
null instanceof Object;                   // false
undefined instanceof Object;              // false

/a/ instanceof RegExp;                    // true
{} instanceof Object;                     // true
[] instanceof Object;                     // true
[] instanceof Array;                      // true
new Date() instanceof Date;               // true
function(){} instanceof Function;         // true   
```

#### `constructor` 
  - _fastest method_
  - _works with primitive values_
```javascript
new String().constructor === String;      // true
new Number().constructor === Number;      // true
new Boolean().constructor === Boolean;    // true
```


#### `Object.prototype.toString`
  - _its slow but work in most of cases_
  - _issue with different windows(as in popup window) in IE_
```ecmascript 6
Object.prototype.toString.call(new String());  // "[object String]"
Object.prototype.toString.call(new Number());  // "[object Number]"
Object.prototype.toString.call(new Boolean()); // "[object Boolean]"
Object.prototype.toString.call(null);          // "[object Null]"
Object.prototype.toString.call(undefined);     // "[object Undefined]"
Object.prototype.toString.call({});            // "[object Object]"
Object.prototype.toString.call([]);            // "[object Array]"
Object.prototype.toString.call(new RegExp());  // "[object RegExp]"
Object.prototype.toString.call(new Date());    // "[object Date]"
Object.prototype.toString.call(function(){});  // "[object Function]"
```

### Notes

__`Not Defined` vs. `undefined`__
- If you call a variable before define it by name, JS engine throws `ReferenceError: <VAR> is not defined`
- If you call a variable before assign it a value, JS engine automatically assign `undefined` value to it.
    - `undefined` is a value for variable and is different than not defined.

