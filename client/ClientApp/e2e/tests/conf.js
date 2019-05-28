exports.config = {
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['base-spec.js']
};
