'use strict';

var grunt = require('grunt');
var cp = require("child_process");
var command;
var options;

function callGruntfile(filename, whenDoneCallback) {
  var command, options;
  command = "grunt --verbose --gruntfile " + filename + " --no-color";
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

exports.plugin_tester = {
  setUp: function (done) {
    // setup here if necessary
    done();
  },
  pass: function (test) {
    test.expect(3);
    callGruntfile('gruntfile-pass.js', function (error, stdout, stderr) {
      test.equal(error, null, "Command should not fail.");
      test.equal(stderr, '', "Standard error stream should be empty.");

      test.ok(contains(stdout, 'Plugin worked correctly.'), "It was supposed to pass.");
      test.done();
    });
  },
  /* fail_1: function (test) {
    test.expect(3);
    callGruntfile('gruntfile-fail-complete.js', function (error, stdout, stderr) {
      test.equal(error.message, 'Command failed: ', "Command should have failed.");
      test.equal(stderr, '', "Standard error stream should be empty.");

      test.ok(containsWarning(stdout, 'complete failure'), "It was supposed to pass.");
      test.done();
    });
  },
  fail_2: function (test) {
    test.expect(3);
    callGruntfile('gruntfile-fail-partial.js', function (error, stdout, stderr) {
      test.equal(error.message, 'Command failed: ', "Command should have failed.");
      test.equal(stderr, '', "Standard error stream should be empty.");

      test.ok(containsWarning(stdout, 'partial failure'), "It was supposed to pass.");
      test.done();
    });
  } */
};