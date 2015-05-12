'use strict';

/**
 * Module dependencies
 */

var root = window,
    document = window.document;
var support = require('./support');

/**
 *
 * @param {HTMLElement} elm
 * @param styles
 * @returns {HTMLElement}
 * @public
 */
exports.css = function(elm, styles){
  var i;
  for(i in styles){
    if(styles.hasOwnProperty(i)) elm.style[i] = styles[i];
  }
  return elm;
};



var wrapper = function(standard, fallback) {
  return function (el, event_name, listener, use_capture) {

    event_name = event_name.replace(/\s+/, ' ').split(' ');
    if (event_name.length == 1 ) event_name = event_name[0];

    if (typeof event_name == 'string') bindEvent(standard, fallback, el, event_name, listener, use_capture);
    if (Array.isArray(event_name)) {
      for(var i = 0, len = event_name.length; i < len; i++) {
        bindEvent(standard, fallback, el, event_name[i], listener, use_capture);
      }
    }
  }
};

var bindEvent = function(standard, fallback, el, event_name, listener, use_capture) {
  if (el[standard]) {
    el[standard](event_name, listener, use_capture);
  } else if (el[fallback]) {
    el[fallback]('on' + event_name, listener)
  }
};

/**
 * @param {HTMLElement} el
 * @param {String} event_name
 * @param {Function} listener
 * @param {Boolean} use_capture
 * @public
 */

exports.listenTo = wrapper('addEventListener', 'attachEvent');

/**
 * @param {HTMLElement} el
 * @param {String} event_name
 * @param {Function} listener
 * @param {Boolean} use_capture
 * @public
 */

exports.unListenTo = wrapper('removeEventListener', 'detachEvent');

exports.isObject = function(obj) {
  return obj === Object(obj);
};


var styles = {
  position: 'absolute',
  top: 0,
  right: 0,
  // no left to make the button starting from the right
  margin: 0,
  padding: 0,
  opacity: 0,
  cursor: 'pointer'
};

/**
 * Return a file input with styling
 * @param {Object} options
 * @return {HTMLInputElement}
 * @public
 */

exports.fileinput = function(options) {

  var defaults = {
    multiple: true,
    accept: null,
    fieldName: 'ajaxfile'
  };

  var input = document.createElement('input');

  // set up options
  if (exports.isObject(options)) {
    options.multiple = typeof options.multiple == 'boolean' ? options.multiple : defaults.multiple;
    options.accept = typeof options.accept == 'string' ? options.accept : defaults.accept;
    options.fieldName = typeof options.fieldName == 'string' ? options.fieldName : defaults.fieldName;
  }
  else {
    options = defaults;
  }

  // set up fileinput
  if (options.multiple && support.multipleFiles()) input.setAttribute('multiple', 'multiple');
  if (options.accept) input.setAttribute('accept', options.accept);
  input.type = 'file';
  input.name = options.fieldName + '-0';
  exports.css(input, styles);

  // enlarge the file input button
  if (typeof input.style.transform == 'string'){
    input.style.transform = "scale(30)";
    input.style.transformOrigin = "99% 50%";
  }
  else {
    if (typeof input.style.msTransform == 'string'){
      // fix IE9, IE10 double click to open window problem, because
      // IE only the file input button could use, the value input is double click required
      input.style.msTransform = "scale(30)";
      input.style.msTransformOrigin = "99% 50%";
    }
    else if (typeof input.style.webkitTransform == 'string') {
      input.style.webkitTransform = "scale(30)";
      input.style.webkitTransformOrigin = "99% 50%";
    }
    else if (typeof input.mozTransform == 'string') {
      input.style.mozTransform = "scale(30)";
      input.style.mozTransformOrigin = '99% 50%';
    }
    else {
      input.style.fontSize = '208px';
    }
  }

  return input;
};