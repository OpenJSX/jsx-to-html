var runtime = require('../../index');
var emptyTags = require('empty-tags');
var assert = require('assert');

export var object = () => {
  let elem = runtime.render(
    <div
      style={ {
        color: 'black'
      } }
    ></div>
  );

  assert.equal(elem, '<div style="color: black;"></div>');
};

export var object_vendors = () => {
  let elem = runtime.render(
    <div
      style={ {
        mozOpacity: 1,
        webkitBorderRadius: '3px',
        msFilter: 'go away',
        oLink: 'dead'
      } }
    ></div>
  );

  let str = '<div style="-moz-opacity: 1; -webkit-border-radius: 3px;' +
    ' -ms-filter: go away; -o-link: dead;"></div>'

  assert.equal(elem, str);
};

export var string = () => {
  let elem = runtime.render(
    <div
      style="color: black"
    ></div>
  );

  assert.equal(elem, '<div style="color: black"></div>');
};