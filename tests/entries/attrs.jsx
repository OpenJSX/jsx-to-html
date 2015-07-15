var runtime = require('../../index');
var emptyTags = require('empty-tags');
var assert = require('assert');

export var simple = () => {
  let elem = runtime.render(
    <div data-test="test"></div>
  );

  let str = '<div data-test="test"></div>';

  assert.equal(elem, str);
};

export var js_values = () => {
  let elem = runtime.render(
    <div
      data-boolean={ true }
      data-number={ 1 }
      data-string={ 'str' }
      data-object={ {} }
      data-array={ [1, 2, 3] }
    ></div>
  );

  let str = '<div data-boolean="true" data-number="1" data-string="str"' +
    ' data-object="{}" data-array="[1,2,3]"></div>';

  assert.equal(elem, str);
};

export var prop_vs_attr= () => {
  let elem = runtime.render(
    <div data-test="test" className="test" _prop={ true }></div>
  );

  let str = '<div data-test="test" class="test" _prop="true"></div>';

  assert.equal(elem, str);
};