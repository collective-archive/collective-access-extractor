'use strict';
module.exports = function(grunt) {
  // Show elapsed time after tasks run
  require("time-grunt")(grunt);

  // Load all Grunt tasks
  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    jasmine_node: {
      options: {
        forceExit: true,
        match: '.',
        matchall: false,
        extensions: 'js',
        specNameMatcher: 'spec',
      },
      all: ['spec/']
    }
  });

  grunt.registerTask('default', ['jasmine_node'])
}
