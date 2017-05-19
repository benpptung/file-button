'use strict';

const FileButton = require('../..');
const request = require('superagent');

FileButton
  .create()
  .on('fileinput', function(fileinput) {

    console.log('recieve fileinput event');

    var req = request.post('http://192.168.11.7:3000/upload');
    var files = fileinput.files;

    for(let i = 0, len = files.length; i < len; ++i) {
      let file = files[i];
      req.attach('ajaxfile-' + i, file, file.name);
    }

    req.end(function(err, res) {

      if (err) console.log(err);

      if (res.ok) {
        console.log('uploaded');
      }

    })

  })
  .mount(document.getElementById('upload-button'));
