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
  if (typeof styles.opacity == "number" && typeof elm.style.opacity !== 'string'){
    // for IE
    // cannot use typeof to detect elm.filters
    styles.filter = 'alpha(opacity=' + Math.round(100 * styles.opacity) + ')';
  }
  for(i in styles){
    if(styles.hasOwnProperty(i)) elm.style[i] = styles[i];
  }
  return elm;
};

/**
 * Listen to change event
 * @param {HTMLElement} el
 * @param {Function} fn
 * @public
 */

exports.listenTo = function(el, fn) {
  el.addEventListener ? el.addEventListener('change', fn) : el.attachEvent('onchange', fn);
};

/**
 * Unlisten to change event
 * @param {HTMLElement} el
 * @param fn
 * @public
 */

exports.unListenTo = function(el, fn) {
  el.removeEventListener ? el.removeEventListener('change', fn) : el.detachEvent('onchange', fn);
};

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
  input.name = options.fieldName;
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