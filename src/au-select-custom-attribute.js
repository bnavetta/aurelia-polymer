import {customAttribute, inject} from 'aurelia-framework';

export class AuSelectCustomAttribute {
	constructor(element) {
		element._updateItems = function() {
		    var nodes = window.Polymer.dom(this).querySelectorAll(this.selectable || '*');
		    nodes = Array.prototype.filter.call(nodes, this._bindFilterItem);
		    this._setItems(nodes);
		}
	}	
}
