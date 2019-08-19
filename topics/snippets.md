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

