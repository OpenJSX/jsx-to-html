var htmlTags = require('html-tags');
var svgTags = require('svg-tags');

module.exports = require('babel-plugin-jsx/gen')({
  captureScope: true,
  builtins: htmlTags.concat(svgTags)
});