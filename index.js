var jsx = require('jsx-runtime');
var escape = require('escape-html');
var Tag = require('./tag');

var renderer = jsx.register('HTML', {
  '*': {
    enter: function(tag, props) {
      return new Tag(tag, props);
    },
    leave: function(parent, tag) {
      return parent.toString();
    },
    child: function(child, parent) {
      if (child == null) return parent;

      if (typeof child === 'string') {
        child = escape(child);
      }

      parent.children.push(child);
      return parent;
    },
    props: function(props) {
      return Object.keys(props).map(function(key) {
        var val = key && props[key];

        if (!key || val == null) return '';
        if (val instanceof Tag) return '';

        if (typeof val === 'string') {
          val = JSON.stringify(val);
          val = val.slice(1, val.length - 2);
        } else {
          val = JSON.stringify(val);
        }

        return key + '="' + escape(val) + '"';
      }).join(' ');
    }
  }
});

module.exports = renderer;