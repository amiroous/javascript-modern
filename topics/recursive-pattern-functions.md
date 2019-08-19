# [Recursive Pattern Functions](https://medium.com/dailyjs/functional-js-with-es6-recursive-patterns-b7d0813ef9e3)

[Back](../README.md)
<p></p><p></p>

#### Head
_Return the first item in an array_
```javascript
const head = ([x]) => x;
```
<p></p>

#### Tail
_Return all but the first item in an array._
```javascript
const tail = ([, ...xs]) => xs;
```
<p></p>

#### isDefined
```javascript
const isDefined = x => typeof x !== 'undefined';
```
<p></p>

#### isUndefined
```javascript
const isUndefined = x => !isDefined(x);
```
<p></p>

#### Copy
```javascript
const copy = array => [...array];
```
<p></p>

#### Length
```javascript
const length = ([x, ...xs], len = 0) => isDefined(x) ? length(xs, len + 1) : len;
```
<p></p>

#### Reverse
```javascript
const reverse = ([x, ...xs]) => isDefined(x) ? [...reverse(xs), x] : [];
```
<p></p>

#### First
_Returns a new array of first n items_
```javascript
const first = ([x, ...xs], n = 1) => isDefined(x) && n ? [x, ...first(xs, n - 1)] : [];
```
<p></p>

#### Last
_Returns a new array of last n items_
```javascript
const last = (xs, n = 1) => reverse(first(reverse(xs), n));
```
<p></p>

#### Slice
_Returns a new array with inserted value at given index_
```javascript
const slice = ([x, ...xs], i, y, curr = 0) => isDefined(x)
  ? curr === i
    ? [y, x, ...slice(xs, i, y, curr + 1)]
    : [x, ...slice(xs, i, y, curr + 1)]
  : [];
```
<p></p>

#### isArray
```javascript
const isArray = x => Array.isArray(x);
```
<p></p>

#### Flatten
_Combines nested arrays into a single array_
```javascript
const flatten = ([x, ...xs]) => isDefined(x)
    ? isArray(x) ? [...flatten(x), ...flatten(xs)] : [x, ...flatten(xs)]
    : [];
```
<p></p>

#### Swap
_Return a new array with 2 items swapped based on their index_
```javascript
const swap = (a, i, j) => (
  map(a, (x,y) => {
    if(y === i) return a[j]
    if(y === j) return a[i]
    return x
  })
);
```
<p></p>

#### Map
```javascript
const map = ([x, ...xs], fn) => isDefined(x) ? [fn(x), ...map(xs, fn)] : [];
```
<p></p>

#### Filter
```javascript
const filter = ([x, ...xs], fn) => isDefined(x) 
    ? fn(x)
        ? [x, ...filter(xs, fn)] : [...filter(xs, fn)]
    : [];
```
<p></p>

#### Reject
_The opposite of filter, returns an array that does not pass the filter function_
```javascript
const reject = ([x, ...xs], fn) => {
  if (isUndefined(x)) return []
  if (!fn(x)) {
    return [x, ...reject(xs, fn)]
  } else {
    return [...reject(xs, fn)]
  }
};
```
<p></p>

#### Partition
_Splits an array into two arrays. One whose items pass a filter function and one whose items fail_
```javascript
const partition = (xs, fn) => [filter(xs, fn), reject(xs, fn)];
```
<p></p>

#### Reduce
_applies a function against an accumulator and each element in the array (from left to right) to reduce it to a single value_
```javascript
const reduce = ([x, ...xs], fn, memo, i = 0) => isDefined(x)
    ? reduce(xs, fn, fn(memo, x, i), i + 1) : memo;
```
<p></p>

#### ReduceRight
```javascript
const reduceRight = (xs, fn, memo) => reduce(reverse(xs), fn, memo);
```
<p></p>

#### Partial
_Partially apply a function by filling in any number of its arguments_
```javascript
const partial = (fn, ...args) => (...newArgs) => fn(...args, ...newArgs);
```
<p></p>

#### SpreadArg
```javascript
const spreadArg = (fn) => (...args) => fn(args);
```
<p></p>

#### ReverseArgs
```javascript
const reverseArgs = (fn) => (...args) => fn(...reverse(args));
```
<p></p>

#### Pluck
_Extract property value from array. Useful when combined with the map function_
```javascript
const pluck = (key, object) => object[key];
```
<p></p>

#### Flow
_Each function consumes the return value of the function that came before_
```javascript
const flow = (...args) => init => reduce(args, (memo, fn) => fn(memo), init);
```
<p></p>

#### Compose
_The same as flow, but arguments are applied in the reverse order_
```javascript
const compose = (...args) => flow(...reverse(args))
```
<p></p>

#### Min
_Return the smallest number in an array_
```javascript
const min = ([x, ...xs], result = Infinity) => isDefined(x)
    ? x < result
        ? min(xs, x)
        : result
    : result;
```
<p></p>

#### Max
_Return the largest number in an array_
```javascript
const max = ([x, ...xs], result = -Infinity) => isDefined(x)
    ? x > result
        ? max(xs, x)
        : max(xs, result)
    : result;
```
<p></p>

#### Factorial
_Returns the factorial of a number_
```javascript
const factorial = (x, acum = 1) => x ? factorial(x - 1, x * acum) : acum;
```
<p></p>

#### Fibonacci
_Returns the Fibonacci number at the given place_
```javascript
const fib = x => x > 2 ? fib(x - 1) + fib(x - 2) : 1;
```
<p></p>

#### Quicksort
_Sort an array from smallest to largest_
```javascript
const quicksort = (xs) => length(xs)
  ? flatten([
    quicksort(filter(tail(xs), x => x <= head(xs))),
    head(xs),
    quicksort(filter(tail(xs), x => x > head(xs)))
  ])
  : [];
```
<p></p>

#### Using Reduction
```javascript
const reduce = ([x, ...xs], f, memo, i = 0) => isDefined(x)
    ? reduce(xs, f, f(memo, x, i), i + 1) : memo;

const reverse = xs => reduce(xs, (memo, x) => [x, ...memo], []);

const length = xs => reduce(xs, (memo, x) => memo + 1, 0);

const map = (xs, fn) => reduce(xs, (memo, x) => [...memo, fn(x)], []);

const filter = (xs, fn) => reduce(xs, (memo, x) => fn(x)
    ? [...memo, x] : [...memo], []);

const reject = (xs, fn) => reduce(xs, (memo, x) => fn(x)
    ? [...memo] : [...memo, x], []);

const first = (xs, n) => reduce(xs, (memo, x, i) => i < n
    ? [...memo, x] : [...memo], []);

const last = (xs, n) => reduce(xs, (memo, x, i) => i >= (length(xs) - n)
    ? [...memo, x] : [...memo], []);

const merge = spreadArg(xs => reduce(xs, (memo, x) => [...memo, ...x], []));

const flatten = xs => reduce(xs, (memo, x) => x
    ? isArray(x) ? [...memo, ...flatten(x)] : [...memo, x] : [], []);

const add = spreadArg(([x, ...xs]) => reduce(xs, (memo, y) => memo + y, x));

const divide = spreadArg(([x, ...xs]) => reduce(xs, (memo, y) => memo / y, x));

const multiply = spreadArg(([x, ...xs]) => reduce(xs, (memo, y) => memo * y, x));
```
<p></p>
