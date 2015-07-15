"use strict";

var fs = require('fs');
var path = require('path');
var babel = require('babel-core');
var plugin = require('../babel-plugin');
var Module = require('module');

var testsFolder = path.join(__dirname, 'entries');
var dir = fs.readdirSync(testsFolder);

var modulePaths = module.paths;

describe('dom tests', function() {
  dir.forEach(function(fileName) {
    var filePath = path.join(testsFolder, fileName);
    var file = fs.readFileSync(filePath, 'utf-8');

    testFile(file, filePath, fileName);

    function testFile(file, filePath, fileName) {
      var result = babel.transform(file, {
        plugins: [plugin],
        blacklist: ['react']
      });

      var mod = requireString(result.code, filePath, fileName);

      describe(fileName, function() {
        Object.keys(mod).forEach(function(key) {
          it(key, mod[key]);
        });
      });
    }
  });
});

function requireString(src, filePath, fileName) {
  var module = new Module(fileName);

  module.filename = filePath;
  module.paths = Module._nodeModulePaths(path.dirname(filePath));
  module._compile(src, filePath);

  return module.exports;
}
