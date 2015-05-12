'use strict';

/**
 * Detect if safari browser on windows
 * @returns {boolean}
 */

exports.isWinSafari = function(){

  var ua = navigator.userAgent.toLowerCase();
  var support;

  // browser detection for windows safari
  // black berry safari might also has issue
  support =  !!(~ua.indexOf("windows") &&
      ~ua.indexOf("safari/") &&
      !~ua.indexOf("chrome"));

  exports.isWinSafari = function(){return support};
  return support;
};

/**
 * Detect if file input support multiple select feature
 * @returns {boolean}
 */

exports.multipleFiles = function(){
  var input = document.createElement('input');
  var support;

  input.type = 'file';
  support = 'multiple' in input && !this.isWinSafari();
  exports.multipleFiles = function(){ return support};
  return support;
};
