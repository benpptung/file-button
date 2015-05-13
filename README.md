Example
=======


#####javascript
```
var filebutton = require('file-button');
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

#####html

```
<a id="button" >Upload</a>
```
  
  or
```  
<div id = "button">Upload</div>
```
  
  or
```  
<button id="button">Upload</button> // IE8 won't work
```

#Test

> $ npm test

# Basic

```
var filebutton = require('file-button');

filebutton
  .create() // create the instance
  .on('fileinput', listener) // listen to the event `fileinput`
  .mount(el); // mount the view on the button

```

# API

### FileButton.create([options])

A `file-button` can be initiated by invoking the `.create()` method. For example.

```
var filebutton = require('file-button');

filebutton.create();
```

The `file-button` instance is also an Event-Emitter using [component-emitter](https://github.com/component/emitter).

options : {Object}

- multiple: {Boolean}, default to true
- accept: {String}, default to null
- fieldName: {String}, default to 'ajaxfile'

### Event: 'fileinput'

Emitted each time the file input value is changed. The `fileinput` element will be removed from the DOM Tree and emitted to the listener.

### Event: 'destroyed'

Emitted after the instance is destroyed.

### filebutton.mount({HtmlElement})

Mount the view on an element. For example, a bootstrap button 

```
<a class="btn btn-lg btn-primary">Upload</a>
```

### filebutton.enable()

Enable the file input button.

### filebutton.disable()

Disable the file input button.

### filebutton.destroy()

Destroy the file input button. A `destroyed` event will be emitted.





















