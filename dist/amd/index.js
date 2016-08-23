define(['exports', 'aurelia-framework', 'aurelia-templating-binding', 'aurelia-logging'], function (exports, _aureliaFramework, _aureliaTemplatingBinding, _aureliaLogging) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var LogManager = _interopRequireWildcard(_aureliaLogging);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  var logger = LogManager.getLogger('polymer');

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

    var eventManager = aurelia.container.get(_aureliaFramework.EventManager);
    var bindingLanguage = aurelia.container.get(_aureliaTemplatingBinding.TemplatingBindingLanguage);

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
});