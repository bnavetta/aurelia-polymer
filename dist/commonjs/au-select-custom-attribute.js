'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuSelectCustomAttribute = undefined;

var _class, _temp;

var _aureliaFramework = require('aurelia-framework');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AuSelectCustomAttribute = exports.AuSelectCustomAttribute = (_temp = _class = function AuSelectCustomAttribute(element) {
  _classCallCheck(this, AuSelectCustomAttribute);

  element._updateItems = function () {
    var nodes = window.Polymer.dom(this).querySelectorAll(this.selectable || '*').filter(this._bindFilterItem);
    this._setItems(nodes);
  };
}, _class.inject = [_aureliaFramework.Element], _temp);