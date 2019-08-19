# RegExp 
References: 
[1](https://medium.com/factory-mind/regex-tutorial-a-simple-cheatsheet-by-examples-649dc1c3f285)

[Back](../README.md)
<p></p><p></p>

A regular expression is an object that describes a pattern of characters.
```javascript
// Create using constructor
const pattern = new RegExp(pattern, attributes);
const pattern = /pattern/attributes;
```

#### Testing RegExps

__.test()__

_runs a search for a match between a RegExp and a String, returns `true` or `false` (no data)_
```javascript
RegExpObject.test( string );

/reg/i.test( 'This Is A RegExp' ); // true
```
<p></p>

__.match()__

_runs a search for a match between a RegExp and a String, returns an `array` with the matches, or simply `null` if there are none_
_match with a global regular expression will return an array of all found matches_
```javascript
string.match(RegExpObject);

'This Is A RegExp'.match(/i/ig); // ["i", "I"]
```
<p></p>

__.exec()__

_runs a search for a match between a RegExp and a String, returns an `array` with the matches, or simply `null` if there are none_
_exec with a global regular expression is meant to be used in a loop, otherwise it only returns an array with first match details_
```javascript
RegExpObject.exec( string );

/s/ig.exec('This Is A RegExp'); // ["s", index: 3, input: "This Is A RegExp", groups: undefined]
```
<p></p>

__.search()__

_runs a search for a match between a RegExp and a String, return the `index` value of where the match was found (-1 in not found)_
```javascript
string.search(RegExpObject);

'This Is A RegExp'.search(/i/ig); // 2
```
<p></p>

__.split()__

_will cut your string into two (or more) pieces, returns a new array_
```javascript
string.split(separator [, limit]);

'This Is A RegExp'.split(/s/g); // ["Thi", " I", " A RegExp"]
```
<p></p>







































