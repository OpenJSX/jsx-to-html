## HTML and XML builder for JSX-IR

### Install

```npm install jsx-to-html```

### Usage

**Note:** Do not forget to install ```jsx-runtime``` before using builder

```javascript
var toHTML = require('jsx-to-html');
// ...
var html = toHTML(jsxTree);

element.innerHTML = html;
```
