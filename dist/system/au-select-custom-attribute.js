'use strict';

System.register(['aurelia-framework'], function (_export, _context) {
  "use strict";

  var Element, _class, _temp, AuSelectCustomAttribute;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaFramework) {
      Element = _aureliaFramework.Element;
    }],
    execute: function () {
      _export('AuSelectCustomAttribute', AuSelectCustomAttribute = (_temp = _class = function AuSelectCustomAttribute(element) {
        _classCallCheck(this, AuSelectCustomAttribute);

        element._updateItems = function () {
          var nodes = window.Polymer.dom(this).querySelectorAll(this.selectable || '*').filter(this._bindFilterItem);
          this._setItems(nodes);
        };
      }, _class.inject = [Element], _temp));

      _export('AuSelectCustomAttribute', AuSelectCustomAttribute);
    }
  };
});