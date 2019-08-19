# Generators 
References: [1](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators), [2](https://codeburst.io/what-are-javascript-generators-and-how-to-use-them-c6f2713fd12e)

[Back](../README.md)
<p></p><p></p>


> __Generators__ are functions that you can use to control the iterator. They can be suspended and later resumed at any time.
	- it does not ring immediately
	- we can get the next value in only when we really need it

```javascript
/* Iterating Using Loop */
for (let i = 0; i <= 5; i++) {
    console.log(i);
}
// immediately return 0 -> 1 -> 2 -> 3 -> 4



/* Iterating Using Generator */
function * sequence(from, to) {
    for (let i = from; i <= to; i++) {
        yield from++;
    }
}
// OR
let sequence = function * (from, to) {
    while(from <= to) {
        yield from++;
    }
}

let loopState = sequence(0, 5);
console.log( loopState.next() ); // {value: 0, done: false}
console.log( loopState.next() ); // {value: 1, done: false}
console.log( loopState.next() ); // {value: 2, done: false}
console.log( loopState.next() ); // {value: 3, done: false}
console.log( loopState.next() ); // {value: 4, done: false}
console.log( loopState.next() ); // {value: 5, done: false}
console.log( loopState.next() ); // {value: undefined, done: true}
```
<p></p>


> __Yield__ returns a value only once, and the next time you call the same function it will move on to the next yield statement.
	- we always get the object as output.
	- It always has two properties `value` and `done`.
	- after you reach the first return statement the generator will finish it’s job

> Yield delegator
	- Yield with asterisk can delegate it’s work to another generator. This way you can chain as many generators as you want.
	- yield by default is `undefined` but if we will pass any value and just calls yield it will return us our passed value.

```javascript
let sequence = function * (from, to) {
    while(from <= to) {
        yield* sequenceX10(from++);
    }
}

let sequenceX10 = function * (i) {
    yield i * 10;
}

const loopState = sequence(0, 5);
console.log( loopState.next() ); // {value: 0, done: false}
console.log( loopState.next() ); // {value: 10, done: false}
console.log( loopState.next() ); // {value: 20, done: false}
console.log( loopState.next() ); // {value: 30, done: false}
console.log( loopState.next() ); // {value: 40, done: false}
console.log( loopState.next() ); // {value: 50, done: false}
console.log( loopState.next() ); // {value: undefined, done: true}
```
<p></p>

> __next()__ gives us the next output object every time we call it.
> __return()__ will ignore any code in the generator function that you have. But will set the value based on a passed argument and set done to be true. Any calls next() after return() will return done-object.
> __throw()__ throws the error. We can handle it using try — catch.









































