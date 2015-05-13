'use strict';

var Emitter = require('component-emitter');

var utils = require('./utils'),
    css = utils.css,
    listenTo = utils.listenTo,
    unListenTo = utils.unListenTo,
    isObject = utils.isObject,
    fileinput = utils.fileinput;

/**
 *
 * @param {Object} options
 * @return {FileButton}
 * @publics
 */
exports.create = function(options) {
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
  this._enabled = true;
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
  this._el = css(el, {position: 'relative', overflow: 'hidden'});
  this._render();
  return this;
};

/**
 * Disable the button
 * @return {FileButton}
 */

FileButton.prototype.disable = function() {
  if (!this._enabled || !this._el) return this;
  this._fileinput.style.display = 'none';
  this._enabled = false;
  return this;
};

/**
 * Enable the button
 * @return {FileButton}
 */

FileButton.prototype.enable = function() {
  if (this._enabled || !this._el) return this;
  this._fileinput.style.display = '';
  this._enabled = true;
  return this;
};

/**
 * Destroy the button
 */

FileButton.prototype.destroy = function() {
  if (!this._onFileChange) return;
  if (this._fileinput) unListenTo(this._fileinput, this._onFileChange);
  if (this._fileinput.parentNode) this._fileinput.parentNode.removeChild(this._fileinput);
  this._onFileChange = null;
  this._el = null;
  this._enabled = null;
  this.emit('destroyed');
  this.off();
};

/**
 * Insert File Input inside the element
 * @private
 */

FileButton.prototype._render = function() {
  if (this._fileinput) unListenTo(this._fileinput, this._onFileChange);

  this._fileinput = fileinput(this._options);
  this._el.appendChild(this._fileinput);
  listenTo(this._fileinput, this._onFileChange);
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