'use strict';

var Emitter = require('component-emitter');

var utils = require('./utils'),
    css = utils.css,
    listenTo = utils.listenTo,
    unListenTo = utils.unListenTo,
    isObject = utils.isObject,
    fileinput = utils.fileinput;

exports.options = function(options) {
  return new FileButton(options);
};

function FileButton(options) {
  this._options = isObject(options) ? options : {};

  // key nodes
  this._el = null;
  this._fileinput = null;

  // listener
  this._onFileChange = onFileChange.bind(this);

  // states
  this._enabled = false;
}

/**
 * Mixin
 */
Emitter(FileButton.prototype);

/**
 * Mount FileButton instance on a DOM element
 * @param {HTMLElement} el
 * @return {FileButton}
 * @public
 */
FileButton.prototype.mount = function(el) {
  if (this._el) return;
  // if el is button, IE8 won't work
  this._el = css(el, {position: 'relative', overflow: 'hidden'});
  this._enabled = true;
  this._render();
  return this;
};

FileButton.prototype.disable = function() {
  if (!this._enabled || !this._el) return;
  this._fileinput.style.display = 'none';
  return this;
};

FileButton.prototype.enable = function() {
  if (this._enabled || !this._el) return;
  this._fileinput.style.display = '';
  return this;
};

/**
 * Insert File Input inside the element
 * @private
 */

FileButton.prototype._render = function() {
  if (this._fileinput) unListenTo(this._fileinput, 'change', this._onFileChange);

  this._fileinput = fileinput(this._options);
  this._el.appendChild(this._fileinput);
  listenTo(this._fileinput, 'change', this._onFileChange);
};

/**
 * listeners
 */

/**
 * @private
 */

var onFileChange = function() {
  if (!this._fileinput) return;
  var fileinput = this._fileinput.parentNode.removeChild(this._fileinput);
  this.emit('fileinput', fileinput);
  this._render();
};