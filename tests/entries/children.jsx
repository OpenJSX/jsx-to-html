var runtime = require('../../index');
var emptyTags = require('empty-tags');
var assert = require('assert');

export var simple_text = () => {
  let elem = runtime.render(
    <div>
      text
    </div>
  );

  assert.equal(elem, '<div>text</div>');
};

export var escape_text = () => {
  let elem = runtime.render(
    <div>{ '<span>\'"&</span>' }</div>
  );

  assert.equal(elem, '<div>&lt;span&gt;&#39;&quot;&amp;&lt;/span&gt;</div>');
};

export var array_child = () => {
  let elem = runtime.render(
    <div>
      { [<span />, 'Hello', <input />] }
    </div>
  );

  assert.equal(elem, '<div><span></span>Hello<input></input></div>');
}

export var jsvalues_text = () => {
  let elem = runtime.render(
    <div>
      { true }
      { 1 }
      { 'str' }
      { {} }
      { [1, 2, 3] }
    </div>
  );

  var str = '<div>true1str[object Object]123</div>';

  assert.equal(elem, str);
}