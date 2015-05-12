module.exports = [
  {
    name: 'test',
    nature: 'js',
    files: [
      './legacy.js',
      'expect.js'
    ],
    browserify: {
      exposes: 'legacy.js:filebutton, expect.js'
    }
  },
  {
    name: 'test',
    nature: 'css',
    files: [
      'node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss',
      'node_modules/mocha/mocha.css'
    ]
  },
  {
    name: 'mocha',
    nature: 'js',
    files: 'node_modules/mocha/mocha.js'
  }
];
