import { EventManager } from 'aurelia-framework';
import { TemplatingBindingLanguage } from 'aurelia-templating-binding';
import * as LogManager from 'aurelia-logging';

const logger = LogManager.getLogger('polymer');

function registerElement(eventManager, bindingLanguage, prototype) {
  let propertyConfig = { 'bind-value': ['change', 'input'] };

  function handleProp(propName, prop) {
    if (prop.notify) {
      propertyConfig[propName] = [`${ propName }-changed`, 'change', 'input'];
    }
  }

  Object.keys(prototype.properties).forEach(propName => handleProp(propName, prototype.properties[propName]));

  prototype.behaviors.forEach(behavior => {
    if (typeof behavior.properties !== 'undefined') {
      Object.keys(behavior.properties).forEach(propName => handleProp(propName, behavior.properties[propName]));
    }

    if (Polymer.IronSelectableBehavior && behavior === Polymer.IronSelectableBehavior) {
      propertyConfig.selected = ['iron-select', 'iron-deselect', 'iron-items-changed'];
    }
  });

  logger.debug(`Registering configuration for Polymer element ["${ prototype.is }]`);

  eventManager.registerElementConfig({
    tagName: prototype.is,
    properties: propertyConfig
  });
}

export function configure(aurelia) {
  logger.info('Initializing aurelia-polymer');

  aurelia.globalResources('./au-select-custom-attribute');

  if (!('Polymer' in window)) {
    logger.error('Polymer is not loaded');
    return;
  }

  let eventManager = aurelia.container.get(EventManager);
  let bindingLanguage = aurelia.container.get(TemplatingBindingLanguage);

  bindingLanguage.attributeMap['bind-value'] = 'bindValue';

  logger.debug('Performing initial Polymer binding');

  let registrations = Polymer.telemetry.registrations;
  registrations.forEach(prototype => registerElement(eventManager, bindingLanguage, prototype));

  let oldRegistrate = Polymer.telemetry._registrate.bind(Polymer.telemetry);

  Polymer.telemetry._registrate = prototype => {
    oldRegistrate(prototype);
    registerElement(eventManager, bindingLanguage, prototype);
  };
}