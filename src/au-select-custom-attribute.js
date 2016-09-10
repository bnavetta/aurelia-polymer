import {DOM} from 'aurelia-framework';

export class AuSelectCustomAttribute {
  static inject = [DOM.Element];

  constructor(element) {
    element._updateItems = function() {
      const nodes = window.Polymer.dom(this).querySelectorAll(this.selectable || '*')
	  	.filter(this._bindFilterItem);
      this._setItems(nodes);
    };
  }
}
