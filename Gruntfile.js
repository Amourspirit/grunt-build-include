(function () {
  "use strict";
  // Define your library strictly...
})();
module.exports = function (grunt) {
  var isWin = process.platform === "win32";
  var nodeMajor = _getNodeMajor();
  // #region Functions
  function _getNodeMajor() {
    // https://www.regexpal.com/?fam=108819
    var s = process.version;
    var major = s.replace(/v?(?:(\d+)\.)?(?:(\d+)\.)?(\*|\d+)/, '$1');
    return parseInt(major, 10);
  }

  // #endregion
  // #region grunt init config
  grunt.initConfig({
    // pkg: packageData,
    env: {
      dev: {
        NODE_ENV: 'development',
        VERSION: function () {
          var j = grunt.file.readJSON('package.json');
          this.pkg = j;
          return j.version;
        }
      },
      build: {
        NODE_ENV: 'production',
        VERSION: function () {
          var j = grunt.file.readJSON('package.json');
          this.pkg = j;
          return j.version;
        }
      }
    },
    clean: {
      dirs: ['scratch', 'tasks'],
      test: ['scratch/test'],
      docs: ['docs']
    },

    tslint: {
      options: {
        configuration: 'tslint.json'
      },
      plugin: ['src/**/*.ts']
    },

    shell: {
      tsc: 'tsc'
    },

    remove_comments: {
      js: {
        options: {
          multiline: true, // Whether to remove multi-line block comments
          singleline: true, // Whether to remove the comment of a single line.
          keepSpecialComments: false, // Whether to keep special comments, like: /*! !*/
          linein: true, // Whether to remove a line-in comment that exists in the line of code, it can be interpreted as a single-line comment in the line of code with /* or //.
          isCssLinein: false // Whether the file currently being processed is a CSS file
        },
        cwd: 'scratch/tasks/',
        src: '**/*.js',
        expand: true,
        dest: 'scratch/nc/'
      },
    },

    copy: {
      js: {
        expand: true,
        cwd: 'scratch/nc/',
        src: '**/*.js',
        dest: 'tasks/',
      },
      d_ts: {
        expand: true,
        cwd: 'scratch/tasks/',
        src: '**/*.d.ts',
        dest: 'tasks/',
      },
      docs_html: {
        expand: true,
        cwd: 'test/html',
        src: '**/*.html',
        dest: 'docs/',
      },
    }
  });
  // #endregion
  // Actually load this plugin's task(s).
  // In future versions of this plugin can most likley load past version of the this plugin.
  // That is it should be possible to use older version of this plugin as a dev dependacy and
  // then use the older version of the plugin to do replcements in the outputted *.d.ts files

  // #region grunt require and load npm task
  // Load all task at once
  // https://github.com/sindresorhus/load-grunt-tasks
  require('load-grunt-tasks')(grunt);
  // grunt.loadNpmTasks('grunt-env');
  // grunt.loadNpmTasks('grunt-remove-comments');
  // grunt.loadNpmTasks('grunt-contrib-nodeunit');
  // #endregion
  grunt.registerTask('default', [
    // 'build'
    'build_include'
  ]);

  grunt.registerTask('test_nouse', [
    'clean:test',
    'nodeunit:test'
  ]);
  grunt.registerTask('build', [
    'env:build',
    'clean:dirs',
    'tslint',
    'shell:tsc',
    'remove_comments:js',
    'copy:js',
    'copy:d_ts'
  ]);

  // #region docs
  grunt.registerTask('gen_docs', 'Build Docs', function () {
    var done = this.async();
    grunt.log.writeln('Building Docs');
    // var cmd = 'typedoc --out docs ./src --mode modules --theme minimal';
    var cmd;
    if (isWin === true) {
      cmd = 'node_modules\\.bin\\typedoc.cmd';
    } else {
      cmd = 'node_modules/.bin/typedoc';
    }
    // cmd += ' --out docs/grunt-build-include ./src --includes ./doc --options typedoc.json -theme pages-plugin';
    cmd += ' --out docs/grunt-build-include ./src --includes ./doc --options typedoc.json';
    require('child_process').exec(cmd, function (err, stdout) {
      grunt.log.write(stdout);
      done(err);
    });
  });
  grunt.registerTask('docs', [
    'clean:docs',
    'gen_docs',
    'copy:docs_html'
  ]);
  // #endregion

  // #region Test
  grunt.registerTask('test', [
    'clean:test',
    'run_test',
    // 'clean:test'
  ]);
  grunt.registerTask('run_test', 'run mocha', function () {
    var done = this.async();
    // exec works with $(which mocha) except on travis ci below nodejs version 8
    // exec $(which node) $(which mocha) works on all tested versions
    grunt.log.writeln("Node Major Version:", nodeMajor);
    var cmd = '';
    if (isWin === true) {
      cmd = 'npx mocha -r ts-node/register test/**/*.test.ts'; // '.\\node_modules\\.bin\\mocha.cmd';
    } else {
      if (nodeMajor <= 6) {
        cmd = '$(which node) $(which mocha) -r ts-node/register test/**/*.test.ts';
      } else {
        cmd = 'npx mocha -r ts-node/register test/**/*.test.ts';
      }

    }
    require('child_process').exec(cmd, function (err, stdout) {
      grunt.log.write(stdout);
      done(err);
    });
  });
  // #endregion
};
