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
  function bumpVerson(segment) {
    var file = 'package.json';
    var jpkg = grunt.file.readJSON(file);
    var verRegex = /(?:(\d+)\.)?(?:(\d+)\.)?(\*|\d+)/;
    var verStr = jpkg.version;
    var major = parseInt(verStr.replace(verRegex, '$1'), 10);
    var minor = parseInt(verStr.replace(verRegex, '$2'), 10);
    var build = parseInt(verStr.replace(verRegex, '$3'), 10);
    var save = false;
    if (segment === 'build') {
      build++;
      save = true;
    } else if (segment === 'minor') {
      minor++;
      build = 0;
      save = true;
    } else if (segment === 'major') {
      major++;
      minor = 0;
      build = 0;
      save = true;
    }
    if (save === true) {
      var newVer = major + '.' + minor + '.' + build;
      jpkg.version = newVer;
      grunt.file.write(file, JSON.stringify(jpkg, null, 2));
      return newVer;
    } else {
      return verStr;
    }
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
      dirs: ['scratch','dist', 'lib'],
      dist: ['dist'],
      scratch: ['scratch'],
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
      tsc: 'tsc',
      tsc_es: "tsc -p './tsconfig.es.json'",
      tsc_commonjs: "tsc -p './tsconfig.commonjs.json'"
    },

    remove_comments: {
      js_es: {
        options: {
          multiline: true, // Whether to remove multi-line block comments
          singleline: true, // Whether to remove the comment of a single line.
          keepSpecialComments: false, // Whether to keep special comments, like: /*! !*/
          linein: true, // Whether to remove a line-in comment that exists in the line of code, it can be interpreted as a single-line comment in the line of code with /* or //.
          isCssLinein: false // Whether the file currently being processed is a CSS file
        },
        cwd: 'scratch/es/',
        src: '**/*.js',
        expand: true,
        dest: 'scratch/nc/es'
      }
    },

    copy: {
      js_commonjs_index: {
        src: 'scratch/commonjs/build_include.js',
        dest: 'dist/commonjs/index.js',
      },
      js_commonjs_modules: {
        expand: true,
        cwd: 'scratch/commonjs/modules/',
        src: '**/*.js',
        dest: 'dist/commonjs/modules/',
      },
      js_es_index: {
        src: 'scratch/nc/es/build_include.js',
        dest: 'dist/es/index.js',
      },
      js_es_index_d: {
        src: 'scratch/es/build_include.d.ts',
        dest: 'dist/index.d.ts',
      },
      js_es_modules: {
        expand: true,
        cwd: 'scratch/nc/es/modules/',
        src: '**/*.js',
        dest: 'dist/es/modules/',
      },
      js_es_modules_d: {
        expand: true,
        cwd: 'scratch/es/modules/',
        src: '**/*.d.ts',
        dest: 'dist/modules/',
      }
    },
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
  grunt.registerTask('build_build', [
    'bumpBuild',
    'build_git'
  ]);
  grunt.registerTask('build_minor', [
    'bumpMinor',
    'build_git',
  ]);
  grunt.registerTask('build_major', [
    'bumpMajor',
    'build_git',
  ]);
  grunt.registerTask('build_git', [
    'env:build',
    'test',
    'gitver'
  ]);
  grunt.registerTask('envcheck', ['version_bump:build', 'env:dev', 'devtest']);
  grunt.registerTask('ver', function () {
    grunt.log.writeln('output from task ver');
    grunt.log.writeln("BUILD_VERSION:" + BUILD_VERSION);
    grunt.log.writeln("packageData.version:" + packageData.version);
  });
  // grunt.registerTask('test', [
  //   'clean:test',
  //   'nodeunit:test'
  // ]);
  grunt.registerTask('build', [
    'env:build',
    /*
     * Task clean: dirs
     * clean the folder out from any previous build
     */
    'clean:dirs',
    /*
     * Task tslint
     * check the ts files for any lint issues
     */
    'tslint',
    /*
     * Task shell: tsc
     * run tsc, outputs to /lib
     */
    'shell:tsc_es',
    'shell:tsc_commonjs',
    'remove_comments:js_es',
    'copy:js_commonjs_index',
    'copy:js_commonjs_modules',
    'copy:js_es_index',
    'copy:js_es_index_d',
    'copy:js_es_modules',
    'copy:js_es_modules_d',
    'clean:scratch'
  ]);
  // #region git
  grunt.registerTask('gitver', [
    'gitveradd',
    'gitvercommit',
    'gitvertag',
    'gitverpush'
  ]);

  grunt.registerTask('gitveradd', 'run git add', function () {
    var command = 'git add .';
    grunt.log.writeln("Executing command:" + command);
    var done = this.async();
    require('child_process').exec(command, function (err, stdout) {
      grunt.log.write(stdout);
      done(err);
    });
  });
  grunt.registerTask('gitvercommit', 'run git commit', function () {
    var command = 'git commit -m "' + process.env.VERSION + '"';
    grunt.log.writeln("Executing command:" + command);
    var done = this.async();
    require('child_process').exec(command, function (err, stdout) {
      grunt.log.write(stdout);
      done(err);
    });
  });
  grunt.registerTask('gitvertag', 'run git tag', function () {
    var command = 'git tag v' + process.env.VERSION;
    grunt.log.writeln("Executing command:" + command);
    var done = this.async();
    require('child_process').exec(command, function (err, stdout) {
      grunt.log.write(stdout);
      done(err);
    });
  });
  grunt.registerTask('gitverpush', 'run git push', function () {
    var command = 'git push origin && git push --tag';
    grunt.log.writeln("Executing command:" + command);
    var done = this.async();
    require('child_process').exec(command, function (err, stdout) {
      grunt.log.write(stdout);
      done(err);
    });
  });
  // #endregion
  // #region Version
  grunt.registerTask('bumpBuild', 'Bump version build level', function () {
    var ver = bumpVerson('build');
    grunt.log.writeln('Current Version', ver);
  });
  grunt.registerTask('bumpMinor', 'Bump version minor level', function () {
    var ver = bumpVerson('minor');
    grunt.log.writeln('Current Version', ver);
  });
  grunt.registerTask('bumpMajor', 'Bump version minor level', function () {
    var ver = bumpVerson('major');
    grunt.log.writeln('Current Version', ver);
  });
  // #endregion
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
    cmd += ' --out docs/grunt-build-include ./src --includes ./doc --mdPagesSourcePath ./doc/pagesmd --theme markdown-pages';
    require('child_process').exec(cmd, function (err, stdout) {
      grunt.log.write(stdout);
      done(err);
    });
  });
  grunt.registerTask('docs', [
    'clean:docs',
    'gen_docs'
  ]);
  // #endregion
  // #region Test
  grunt.registerTask('test', [
    'clean:test',
    'run_test',
    'clean:test'
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
