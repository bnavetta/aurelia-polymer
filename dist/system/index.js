'use strict';

System.register(['aurelia-framework', 'aurelia-templating-binding', 'aurelia-logging'], function (_export, _context) {
  "use strict";

  var EventManager, TemplatingBindingLanguage, LogManager, logger;

  function registerElement(eventManager, bindingLanguage, prototype) {
    var propertyConfig = { 'bind-value': ['change', 'input'] };

    function handleProp(propName, prop) {
      if (prop.notify) {
        propertyConfig[propName] = [propName + '-changed', 'change', 'input'];
      }
    }

    Object.keys(prototype.properties).forEach(function (propName) {
      return handleProp(propName, prototype.properties[propName]);
    });

    prototype.behaviors.forEach(function (behavior) {
      if (typeof behavior.properties !== 'undefined') {
        Object.keys(behavior.properties).forEach(function (propName) {
          return handleProp(propName, behavior.properties[propName]);
        });
      }

      if (Polymer.IronSelectableBehavior && behavior === Polymer.IronSelectableBehavior) {
        propertyConfig.selected = ['iron-select', 'iron-deselect', 'iron-items-changed'];
      }
    });

    logger.debug('Registering configuration for Polymer element ["' + prototype.is + ']');

    eventManager.registerElementConfig({
      tagName: prototype.is,
      properties: propertyConfig
    });
  }

  function configure(aurelia) {
    logger.info('Initializing aurelia-polymer');

    aurelia.globalResources('./au-select-custom-attribute');

    if (!('Polymer' in window)) {
      logger.error('Polymer is not loaded');
      return;
    }

    var eventManager = aurelia.container.get(EventManager);
    var bindingLanguage = aurelia.container.get(TemplatingBindingLanguage);

    bindingLanguage.attributeMap['bind-value'] = 'bindValue';

    logger.debug('Performing initial Polymer binding');

    var registrations = Polymer.telemetry.registrations;
    registrations.forEach(function (prototype) {
      return registerElement(eventManager, bindingLanguage, prototype);
    });

    var oldRegistrate = Polymer.telemetry._registrate.bind(Polymer.telemetry);

    Polymer.telemetry._registrate = function (prototype) {
      oldRegistrate(prototype);
      registerElement(eventManager, bindingLanguage, prototype);
    };
  }

  _export('configure', configure);

  return {
    setters: [function (_aureliaFramework) {
      EventManager = _aureliaFramework.EventManager;
    }, function (_aureliaTemplatingBinding) {
      TemplatingBindingLanguage = _aureliaTemplatingBinding.TemplatingBindingLanguage;
    }, function (_aureliaLogging) {
      LogManager = _aureliaLogging;
    }],
    execute: function () {
      logger = LogManager.getLogger('polymer');
    }
  };
});