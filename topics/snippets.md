# Snippets


[Back](../README.md)
<p></p><p></p>

### DOM Ready Method
```ecmascript 6
// DOM Ready Event Handler
const ready = (fn) => {
    if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
};

// Create APP Class (Object) (Includes Attributes & Methods)
const APP = {};

APP.Script = () => {
    console.log( document.querySelector('body') );
};

// Call APP Object
ready(APP.Script);
```

### Ajax
```javascript
const xhr = new XMLHttpRequest();
xhr.open("GET", "https://jsonplaceholder.typicode.com/users", true);
xhr.onload = function() {
	if(this.status === 200) {
		console.log( JSON.parse(this.responseText) );
	}
};
xhr.send();
```

### Simple Promise
```javascript
const myPromise = new Promise((resolve, reject) => {
	setTimeout(() => resolve("My Promise Resolved."), 1000);
	setTimeout(() => reject(Error("My Promise Rejected!")), 2000);
});
myPromise
	.then( result => console.log(result) )
	.catch( err => console.log(err) );
```

### Simple Fetch
```javascript
const posts = fetch('https://jsonplaceholder.typicode.com/posts');
posts
	.then(dataPromise => dataPromise.json())
	.then(dataJson => console.log(dataJson));
```

### Functional Fetch
```javascript
const posts = fetch('https://jsonplaceholder.typicode.com/posts');
// posts
// 	.then(dataPromise => dataPromise.json())
// 	.then(dataJson => console.log(dataJson));

const getPostById = (id) => {
	return new Promise((resolve, reject) => {
		const post = posts.then(posts => posts.json()).then(postsJson => postsJson.find(post => post.id === id));
		if (post) {
            resolve(post);
        } else {
            reject(Error('No Post Founded!'));
        }
	});
};
getPostById(1).then(post => console.log(post));
```

### Happy Numbers
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
```
