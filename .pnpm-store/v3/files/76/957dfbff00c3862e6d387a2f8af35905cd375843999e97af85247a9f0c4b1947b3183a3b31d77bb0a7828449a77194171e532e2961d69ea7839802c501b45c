/*!
 * has-keys <https://github.com/jonschlinkert/has-keys>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var isPlainObject = require('is-plain-object');

module.exports = function hasKeys(obj, keys) {
  if (!isPlainObject(obj)) {
    throw new TypeError('has-keys expects an object.');
  }
  keys = Array.isArray(keys) ? keys : [keys];
  var len = keys.length;
  while (len--) {
    if (!(keys[len] in obj)) return false;
  }
  return true;
};
