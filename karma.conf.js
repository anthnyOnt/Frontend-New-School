module.exports = function(config) {
    config.set({
      // base path that will be used to resolve all patterns (eg. files, exclude)
      basePath: '',
  
      // frameworks to use
      frameworks: ['jasmine'],
  
      // list of files / patterns to load in the browser
      files: [
        'src/**/*.spec.ts'  // Asegúrate de que tus pruebas estén en esta ruta
      ],
  
      // preprocess matching files before serving them to the browser
      preprocessors: {
        'src/**/*.spec.ts': ['webpack', 'sourcemap']
      },
  
      // test results reporter to use
      reporters: ['progress', 'kjhtml'], // Asegúrate de tener configurado karma-jasmine-html-reporter
  
      // web server port
      port: 9876,
  
      // enable / disable colors in the output (reporters and logs)
      colors: true,
  
      // level of logging
      logLevel: config.LOG_INFO,
  
      // enable / disable watching file and executing tests whenever any file changes
      autoWatch: true,
  
      // start these browsers
      browsers: ['Chrome'],
  
      // Continuous Integration mode
      singleRun: false,
  
      // Concurrency level
      concurrency: Infinity
    });
  };
  