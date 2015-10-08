var jsx = require('jsx-runtime');
var escape = require('escape-html');
var Tag = require('./lib/tag');
var Fragment = require('./lib/fragment');
var hasOwn = Object.prototype.hasOwnProperty;

var emptyTags = require('empty-tags').reduce(function(map, tag) {
  map[tag] = true;
  return map;
}, Object.create(null));

var renderer = jsx.register('HTML', {
  renderTo: function(target, result) {
    target.innerHTML = result + '';
  },

  fragment: function() {
    return new Fragment();
  },

  params: {
    renderType: 'individual',
    updateType: 'difference',
  },

  tags: {
    '*': {
      enter: function(tag, props) {
        if (escape(tag) !== tag) {
          throw new Error('Incorrect tag name: ' + tag);
        }

        return new Tag(tag, props);
      },
      leave: function(parent, tag) {
        return parent;
      },
      child: function(child, parent, index) {
        if (child == null) return parent;

        if (child instanceof jsx.Stream) {
          handleStream(child);
        } else {
          // child = handle(child);
          // parent.children.push(child);
          parent.children.push(handleChild(child));
        }

        return child;

        function handleStream(child) {
          var lastCount = 0;
          var update = function() {
            var update = child.get()
            var index = update[0];
            var removeCount = update[1];
            var items = update[2].map(handleChild);

            // if (lastCount) {
              [].splice.apply(parent.children, [index, removeCount].concat(items));
            // }
          }

          child.listen(update);
          update();
        }
      },
      props: function(props) {
        return Object.keys(props)
          .map(function(key) {
            return mapProps(key, key && props[key]);
          }).join(' ');
      },
      children: function(children, parent, tag) {
        if (typeof emptyTags[tag.toLowerCase()] !== 'undefined') {
          throw new Error('Tag <' + tag + ' /> cannot have children');
        }

        return children;
      }
    }
  }
});

module.exports = renderer;

function mapProps(key, val) {
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

    var val = style[key];

    key = key.replace(/[A-Z]/g, function(m) {
      return '-' + m.toLowerCase();
    });

    if (key.search(/moz-|webkit-|o-|ms-/) === 0) {
      key = '-' + key;
    }

    string += (string ? ' ' : '') + key + ': ' + val + ';';
  }

  return string;
}

function handleChild(child) {
  if (child instanceof Tag) {
    return child;
  } else {
    return escape(child + '');
  }
}