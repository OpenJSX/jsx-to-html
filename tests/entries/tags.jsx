var runtime = require('../../index');
var emptyTags = require('empty-tags');
var assert = require('assert');

export var simple = () => {
  let elem = runtime.render(<div />);

  assert.equal(
    elem, '<div></div>'
  );
};

export var svg_tags = () => {
  let elem = runtime.render(
    <div>
      <svg></svg>
    </div>
  );

  let str = '<div><svg></svg></div>';

  assert.equal(elem, str);
};

export var foreign_tags = () => {
  let elem = runtime.render(
    <div>
      <svg>
        <foreignObject />
      </svg>
    </div>
  );

  let str = '<div><svg><foreignObject></foreignObject></svg></div>';

  assert.equal(elem, str);
};

export var custom_tags = () => {
  let elem = runtime.render(
    <div>
      <custom-tag></custom-tag>
    </div>
  );

  let str = '<div><custom-tag></custom-tag></div>';

  assert.equal(elem, str);
};

export var scope_tags = () => {
  var Scoped = function() {
    return <span></span>
  };

  let elem = runtime.render(
    <div>
      <Scoped />
    </div>
  );

  let str = '<div><span></span></div>';

  assert.equal(elem, str);
};

export var empty_tags = () => {
  emptyTags.forEach(function(tag, i) {
    var Empty = function() {
      return {
        tag: tag,
        children: [<div />],
        props: null
      }
    };

    assert.throws(function() {
      runtime.render(<Empty />);
    }, function(e) {
      if (e.message === 'Tag <' + tag + ' /> cannot have children') {
        return true;
      }
    }, 'Tag <' + tag + '> cannot have children, but it has');
  });
}

export var escale_tag_name = () => {
  assert.throws(function() {
    runtime.render({
      tag: '<div>',
      children: null,
      props: null
    });
  }, function(e) {
    if (e.message.indexOf('Incorrect tag name:') === 0) {
      return true;
    }
  });
};