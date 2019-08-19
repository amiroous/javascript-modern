### Tips & Tricks 

[Back](../README.md)
<p></p><p></p>


#### Sort Numbers in Array (integer order) 
```javascript
[1, 100, 10, 15, 150].sort() // [1, 10, 100, 15, 150]
[1, 100, 10, 15, 150].sort((a, b) => a - b) // [1, 10, 15, 100, 150]
```
<p></p>

#### Replace in Strings (using RegExp)
```javascript
const txt = 'it all began near the year 2005, when the two users were made. john and jane were both humans.';
const newTxt = txt.replace(/\s/ig, '-');
const newTxtFun = txt.replace(/john|jane/ig, match => match.toUpperCase());
// it all began near the year 2005, when the two users were made. JOHN and JANE were both humans.
```
<p></p>

#### Remove Duplicated Elements (case insensitively)

> Strings
```javascript
const App = {
    removeDuplicates(str = '') {
        return str && [...str].reduce((sanitizedStr, currentCharacter) => {
            return new RegExp(currentCharacter, 'ig')
                .test( sanitizedStr )
                ? `${sanitizedStr}`
                : /^[a-zA-Z]+$/.test(currentCharacter)
                    ? `${sanitizedStr}${currentCharacter}`
                    : `${sanitizedStr}`;
        }, '');
    }
};

const sanitizedString = App.removeDuplicates('ThisSeems123Elements');
console.log(sanitizedString); // Thisemln
```

> Arrays
```javascript
const App = {
    removeDuplicates(arr) {
        return arr.reduce((uniqueArray, currentElement) => {
            return new RegExp(currentElement, 'ig')
                .test( uniqueArray.join('') )
                ? uniqueArray
                : [...uniqueArray, currentElement];
        }, []);
    }
};
const sanitizedArray = App.removeDuplicates(["A", 1, "r", 2, "C", "a", 2, "A", "B", "r", "a", "A", "l", "a", "k", "A", "z", "a", "m"]);
console.log(sanitizedArray); // ["A", 1, "r", 2, "C", "B", "l", "k", "z", "m"]
```
<p></p>

#### Happy Numbers
```javascript
const isHappyNum = (num) => {
	let sum = 0;
	num = (typeof num === "number") && num.toString();
	[...num].map(d => {
		sum += Math.pow(parseInt(d),2);
	});
	if (sum.toString().length === 1) {
		return sum === 1;
	}
	return isHappyNum(sum);
};

const findHappyNums = (min, max) => {
	let happies = [];
	for (let i = min ; i <= max ; i++) {
		isHappyNum(i) && happies.push(i);
	}
	return happies;
}
findHappyNums(1,100); //  [1, 7, 10, 13, 19, 23, 28, 31, 32, 44, 49, 68, 70, 79, 82, 86, 91, 94, 97, 100]
```
<p></p>

#### Get Prime Numbers in Range
```javascript
const arrayRange = (min, max) => {
    let arr = [];
    for (let i = min; i <= max; i++) {
        arr = [...arr, i];
    }
    return arr;
};

const isPrime = (num) => {
    if ( isNaN(num) || !isFinite(num) || num % 1 || num < 2 ) { return false; }
    for (let i = 2 ; i <= Math.sqrt(num) ; i++) { if (num%i==0) { return false; } }
    return true;
}

const getPrimes = (min, max) => {
    return arrayRange(min, max).filter(num => isPrime(num));
};

getPrimes(3,23); // [3, 5, 7, 11, 13, 17, 19, 23]
```
<p></p>

#### List First n Prime Numbers
```javascript
function next(g) {
    const n = g.next();
    if (n.done) throw n.value;
    return n.value;
}
function* list(zero, succ) {
    try {
        for (let v = zero; ; v = succ(v)) yield v;
    } catch (v) {}
}
function* take(n, g) {
    for (let i = 0; i < n; i++) yield next(g);
}
function* minus(as, bs) {
    const succ = ([a, b]) => [b < a ? a: next(as), a < b ? b : next(bs)];
    for (const [a, b] of list([null, null], succ)) if (a < b) yield a;
}

// infinite sieve
function* sieve(g) {
    const p = g.next().value;
    yield p;
    yield* sieve(minus(g, list(p, v => v + p)));
}
function* primes() {
    yield* sieve(list(2, v => v + 1));
}

for (const prime of take(30, primes())) {
    console.log(prime);
}
```
<p></p>

#### Shuffle Array Items
```javascript
let shuffle = (array) => array.map((a) => [Math.random(),a]).sort((a,b) => a[0]-b[0]).map((a) => a[1]);
```
<p></p>

#### Title Case
```javascript
let titleCase = (str) => str.toLowerCase().split(' ').map(word => word.replace(word[0], word[0].toUpperCase())).join(' ');
```
<p></p>

#### Fetch Data
```javascript
let fetchData = (api, query, method = 'get') => fetch(`${api}${query}`, {method: method})
    .then(response => response.json())
    .then(response => response)
    .catch(function(err) {
      console.log(err.message);
    });
    
// Usage:
fetchData(API, QUERY)
    .then(response => console.log(response));
```
<p></p>

#### Move Array Item
```javascript
let move = (array, element, movement) => {
  let index = array.indexOf(element);
  let newIndex = index + movement;
  if (newIndex < 0  || newIndex === array.length) return;
  let indexes = [index, newIndex].sort((a, b) => a - b);
  array.splice(indexes[0], 2, array[indexes[1]], array[indexes[0]]);
};
let moveUp = (array, element) => move(array, element, -1);
let moveDown = (array, element) => move(array, element, 1);
```
<p></p>








































