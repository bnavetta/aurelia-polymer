'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.configure = configure;

var _aureliaFramework = require('aurelia-framework');

var _aureliaTemplatingBinding = require('aurelia-templating-binding');

function registerElement(eventManager, bindingLanguage, prototype) {
  var propertyConfig = { 'bind-value': ['change'] };

  function handleProp(propName, prop) {
    if (prop.notify) {
      propertyConfig[propName] = ['change'];
    }
  }

  Object.keys(prototype.properties).forEach(function (propName) {
    return handleProp(propName, prototype.properties[propName]);
  });

  prototype.behaviors.forEach(function (behavior) {
    if (typeof behavior.properties != 'undefined') {
      Object.keys(behavior.properties).forEach(function (propName) {
        return handleProp(propName, behavior.properties[propName]);
      });
    }
  });

  eventManager.registerElementConfig({
    tagName: prototype.is,
    properties: propertyConfig
  });
}

function configure(aurelia) {
  var eventManager = aurelia.container.get(_aureliaFramework.EventManager);
  var bindingLanguage = aurelia.container.get(_aureliaTemplatingBinding.TemplatingBindingLanguage);
  var observerLocator = aurelia.container.get(_aureliaFramework.ObserverLocator);

  bindingLanguage.attributeMap['bind-value'] = 'bindValue';

  var registrations = Polymer.telemetry.registrations;
  registrations.forEach(function (prototype) {
    return registerElement(eventManager, bindingLanguage, prototype);
  });
  observerLocator.getArrayObserver(registrations).subscribe(function (changes) {
    changes.forEach(function (change) {
      if (change.type === "splice" && change.addedCount > 0) {
        for (var i = 0; i < change.addedCount; i++) {
          var prototype = change.object[change.index + i - 1];
          registerElement(eventManager, bindingLanguage, prototype);
        }
      }
    });
  });
}