var _class, _temp;

import { DOM } from 'aurelia-framework';

export let AuSelectCustomAttribute = (_temp = _class = class AuSelectCustomAttribute {

  constructor(element) {
    element._updateItems = function () {
      const nodes = window.Polymer.dom(this).querySelectorAll(this.selectable || '*').filter(this._bindFilterItem);
      this._setItems(nodes);
    };
  }
}, _class.inject = [DOM.Element], _temp);