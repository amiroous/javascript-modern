# Promises 
References: 
[1](https://medium.com/@bluepnume/learn-about-promises-before-you-start-using-async-await-eb148164a9c8)
[2](https://medium.com/@bluepnume/even-with-async-await-you-probably-still-need-promises-9b259854c161)
[3](http://2ality.com/2016/10/async-function-tips.html)
[4](https://davidwalsh.name/promises)


[Back](../README.md)
<p></p><p></p>


### Promises (ES6)

- A promise is an special kind of javascript object that may produce a single value some time in the future
- A promise is an object which can be returned synchronously from an asynchronous function by one of the following three states:
    + `Pending` - until a Promise is fulfilled it is in pending state
    + `Fulfilled` - when the first handler is called the Promise is considered fulfilled with the value passed to that handler.
    + `Rejected` - if the second handler is called, the Promise is considered rejected with the value passed to that handler.



__Promise Pattern__

```javascript
const promisedData = new Promise((resolve, reject) => {
    
    // Do an async task and then...

    if(/* good condition */) {
        resolve('Success!');
    }
    else {
        reject('Failure!');
    }
});

promisedData
.then(() => { /* do something with the success result */ })
.catch(() => { /* do something with the error result :( */ });
```
<p></p>


```javascript
const fetchData = () => new Promise((resolve) => {
  setTimeout(() => resolve('Data Fetched Successfully.'), 700);
});

const displayData = () => {
    const data = fetchData()
        .then( data => console.log(data) );
};

displayData();
```
<p></p>

```javascript
const wait = ms => new Promise( resolve => setTimeout(resolve, ms) );

const dataPromise = new Promise((resolve, reject) => {
    console.log('Process Started ...')

    data = { success: true };

    setTimeout(() => {
        return typeof data !== "undefined" && (data !== null && data.constructor === Object) && Object.keys(data).length > 0
        ? resolve(data) 
        : reject(new Error('No Data Received!'));
    }, 700);
});  

dataPromise
    .then( data => console.log(data) )
    .catch(error => console.log(error.message) )
    .then( () => wait(1000) )
    .then( () => console.log('Process Finished.') );

wait(3000).then(() => console.log('Wait Works!'));
```
<p></p>


```javascript
const req1 = new Promise((resolve, reject) => { 
    // A mock async action using setTimeout
    setTimeout(() => { resolve('First Request!'); }, 3000);
});
const req2 = new Promise((resolve, reject) => { 
    // A mock async action using setTimeout
    setTimeout(() => { resolve('Second Request!'); }, 1000);
});

Promise.race([req1, req2])
.then((succeed) => {
    console.log('Then: ', succeed);
})
.catch((failed) => {
    console.log('Catch: ', failed);
});
```
<p></p>


### Promises (ES7): `async` & `await`

```javascript
const fetchData = () => new Promise((resolve) => {
  setTimeout(() => resolve('Data Fetched Successfully.'), 700);
});

const displayData = async () => {
    const data = await fetchData();
    console.log(data);
};

displayData();
```
<p></p>


- Every `async` function you write will return a promise
- Every single thing you `await` will ordinarily be a promise
- Access the data by calling `await`
- Catch the errors using `try ... catch`

#### Async/Await Pitfulls:
- Not awaiting
    + Not going to automatically error out!
    + You must await, or you’ll get a promise instead of the value you expect.
- awaiting multiple values
    + You can only await one thing at a time
    + Instead of `let [foo, bar] = await* [getFoo(), getBar()];` do `let [foo, bar] = await Promise.all([getFoo(), getBar()]);`
- Whole stack needs to be async
    + In order to call one of my async functions, ideally the caller itself should be an async function (convert from callbacks to async/await)
- Gotta remember to handle errors


```javascript
// Sync VS. Async
function user1() {
    setTimeout(function(){
        console.log(`First User Ready.`);
    }, 1000);
}

function user2() {
    setTimeout(function(){
        console.log(`Second User Ready.`);
    }, 1500);
}

function user3() {
    setTimeout(function(){
        console.log(`Third User Ready.`);
    }, 2000);
}

function getUsers() {

    user1();
    user2();
    user3();
}

getUsers(); // Works because we directly executing (loging) data once set time out is ready (instead of returning data)
// First User Ready.
// Second User Ready.
// Third User Ready.

// ES5 Sync
function user1() {
    setTimeout(function(){
        return `First User Ready.`;
    }, 1000);
}

function user2() {
    setTimeout(function(){
        return `Second User Ready.`;
    }, 1500);
}

function user3() {
    setTimeout(function(){
        return `Third User Ready.`;
    }, 2000);
}

function getUsers() {
    var user1 = user1();
    var user2 = user2();
    var user3 = user3();
    
    console.log(user1, user2, user3);
}

getUsers(); // Uncaught ReferenceError: user1 is not defined



// ES6 Sync
const user1 = () => {
    setTimeout(function(){
        return `First User Ready.`;
    }, 1000);
}

const user2 = () => {
    setTimeout(function(){
        return `Second User Ready.`;
    }, 1500);
}

const user3 = () => {
    setTimeout(function(){
        return `Third User Ready.`;
    }, 2000);
}

const getUsers = () => {
    const user1 = user1();
    const user2 = user2();
    const user3 = user3();
    
    console.log(user1, user2, user3);
}

getUsers(); // Uncaught ReferenceError: user1 is not defined


// ES6 Async
const user1 = () => new Promise( resolve => setTimeout(() => resolve(`First User Ready.`)  , 1000));
const user2 = () => new Promise( resolve => setTimeout(() => resolve(`Second User Ready.`) , 1000));
const user3 = () => new Promise( resolve => setTimeout(() => resolve(`Third User Ready.`)  , 1000));

const getUsers = async () => {
    console.log(await user1());
    console.log(await user2());
    console.log(await user3());
}

getUsers();
```






































```javascript

```
<p></p>




































