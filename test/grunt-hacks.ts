import * as grunt from "grunt";
module.exports = ()  => {

  this.loadParentNpmTasks = (grunt: IGrunt, pluginName: string) => {
    let oldDirectory = '';
    let climb: string = ''
    let directory: string;

    // search for the right directory
    directory = climb + 'node_modules/' + pluginName;
    while (continueClimbing(grunt, oldDirectory, directory)) {
      climb += '../';
      oldDirectory = directory;
      directory = climb + 'node_modules/' + pluginName;
    }

    // load tasks or return an error
    if (grunt.file.exists(directory)) {
      grunt.loadTasks(directory + '/tasks');
    } else {
      grunt.fail.warn('Tasks plugin ' + pluginName + ' was not found.');
    }
  }

  const continueClimbing = (grunt: IGrunt, oldDirectory: string, directory: string): boolean => {
    return !grunt.file.exists(directory) &&
      !grunt.file.arePathsEquivalent(oldDirectory, directory);
  }

};
