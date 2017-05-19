'use strict';

const STATUS_CODES = require('http').STATUS_CODES;
const join = require('path').join;
const fs = require('fs');
const express = require('express');
const logger = require('morgan');
const Busboy = require('busboy');
const debug = require('debug')('example:server');

var app = express();

// app setup

app.use(logger('dev'));
app.use(express.static(join(__dirname, 'public')));
app.post('/upload', function(req, res) {

  debug('route /upload called');

  var busboy = new Busboy({headers: req.headers});

  busboy.on('file', function(fieldname, file, filename) {

    debug('receive file');

    let saveTo = join(__dirname, 'uploaded', filename);

    file.pipe(fs.createWriteStream(saveTo));
  });

  busboy.on('finish', _=> {

    debug('file uploaded');
    res.end()
  });

  req.pipe(busboy);
});

/*app.post('/upload-multipart', function(req, res) {

  debug('multipart route recieve file');

});*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.end();
});


module.exports = app;
