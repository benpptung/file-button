Example
=======


javascript
```
var filebutton = require('filebutton');
var request = require('superagent');

filebutton
  .create()
  .on('fileinput', function(fileinput){
  
    var req = request.post('/upload/')
    var files = fileinput.files;
    var file;
    
    for(var i = 0, len = files.length; i < len; ++i){
      var file = files[i];
      req.attach('ajaxfile-' + i, file, file.name);
    }
    
    req
      .on('progress', function(e){
      
        if (e.lengthComputable) {
        
        	// handle progress bar here
        }
      })
      .end(function(err, res) {
      
        if (res.ok) {
        
           // handle successful result here
        }
      });
    
  })
  .mount(document.getElementById('button'));

```

html
```
  <a id="button" >Upload</a>
  
  or
  
  <div id = "button">Upload</div>
  
  or
  
  <button id="button">Upload</button> // IE8 <button> won't work
```