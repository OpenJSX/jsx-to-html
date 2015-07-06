## HTML and XML renderer for JSX-IR

### Install

```npm install jsx-renderer-html```

### Usage

**Note:** Do not forget to install ```jsx-runtime``` before using renderer

There are two equivalent ways:

```javascript

var renderer = require('jsx-renderer-html');

// ...

var string = renderer.render(jsxTree);

```
or
```javascript
var jsx = require('jsx-runtime');
// ...
var string = jsx.render(jsxTree, 'html');
```
