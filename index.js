var jsx = require('jsx-runtime');
var escape = require('escape-html');
var Tag = require('./lib/tag');
var hasOwn = Object.prototype.hasOwnProperty;

var renderer = jsx.register('HTML', {
  tags: {
    '*': {
      enter: function(tag, props) {
        return new Tag(escape(tag), props);
      },
      leave: function(parent, tag) {
        return parent;
      },
      child: function(child, parent) {
        if (child == null) return parent;

        if (child instanceof Tag) {
          parent.children.push(child);
        } else {
          child = escape(child + '');
        }

        return parent;
      },
      props: function(props) {
        return Object.keys(props)
          .map(mapProps).join(' ');
      }
    }
  },
  after: function(tag) {
    return tag.toString();
  }
});

module.exports = renderer;

function mapProps(key) {
  var val = key && props[key];

  if (!key || val == null) return '';
  if (val instanceof Tag) return '';

  if (key === 'className') key = 'class';
  else if (key === 'cssFor') key = 'for';
  else key = key.toLowerCase();

  if (key === 'style') {
    val = handleStyle(val);
  }

  if (typeof val === 'string') {
    // do nothing
  } else {
    val = JSON.stringify(val);
  }

  return escape(key) + '="' + escape(val) + '"';
}

function handleStyle(style) {
  if (typeof style === 'string') return style;

  var string = '';

  for (var key in style) {
    if (!hasOwn.call(style, key)) continue;

    key = key.replace(/[A-Z]/g, function(m) {
      return '-' + m.toLowerCase();
    });

    if (key.search(/moz-|webkit-|o-|ms-/) === 0) {
      key = '-' + key;
    }

    string += key + ': ' + val + ';';
  }

  return string;
}