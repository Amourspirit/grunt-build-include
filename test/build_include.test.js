var expect = require("chai").expect;
var fs = require('fs');
var mkdirp = require('mkdirp');
var grunt = require("grunt");
var cp = require("child_process");

// #region functions
function callGruntfile(filename, whenDoneCallback) {
  var command, options;
  command = "grunt --gruntfile " + filename + " --no-color";
  options = { cwd: 'test/' };
  cp.exec(command, options, whenDoneCallback);
}

function callNpmInstallAndGruntfile(filename, whenDoneCallback) {
  var command, options;
  command = "npm install";
  options = { cwd: 'test/' };
  cp.exec(command, {}, function (error, stdout, stderr) {
    callGruntfile(filename, whenDoneCallback);
  });
}

function contains(where, what) {
  var index = where.toString().indexOf(what);
  return index > -1;
}

function containsWarning(buffer, warning) {
  return contains(buffer, 'Warning: Plugin failed: ' + warning);
}
// #endregion

describe('Build include class', function() {
  it('should', function(done) {
    callGruntfile('gruntfile-simple.js', function (error, stdout, stderr) {
      expect(error).to.be.null;
      expect(stdout).to.not.be.null;
      done();
    });
  });
});