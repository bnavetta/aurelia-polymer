import {EventManager, ObserverLocator} from 'aurelia-framework';
import {TemplatingBindingLanguage} from 'aurelia-templating-binding';
import * as LogManager from 'aurelia-logging';

const logger = LogManager.getLogger('polymer');

function registerElement(eventManager, bindingLanguage, prototype) {
  var propertyConfig = {'bind-value': ['change', 'input']}; // Not explicitly listed for all elements that use it

  function handleProp(propName, prop) {
    if (prop.notify) {
      propertyConfig[propName] = ['change', 'input'];
    }
  }

  Object.keys(prototype.properties)
    .forEach(propName => handleProp(propName, prototype.properties[propName]));

  prototype.behaviors.forEach(behavior => {
    if (typeof behavior.properties != 'undefined') {
      Object.keys(behavior.properties)
        .forEach(propName => handleProp(propName, behavior.properties[propName]));
    }
  });

  logger.debug("Registering configuration for Polymer element [" + prototype.is + "]");

  eventManager.registerElementConfig({
    tagName: prototype.is,
    properties: propertyConfig
  });
}

export function configure(aurelia){
  let eventManager = aurelia.container.get(EventManager);
  let bindingLanguage = aurelia.container.get(TemplatingBindingLanguage);
  // let observerLocator = aurelia.container.get(ObserverLocator);

  bindingLanguage.attributeMap['bind-value'] = 'bindValue';

  logger.debug("Performing initial Polymer binding");

  let registrations = Polymer.telemetry.registrations;
  registrations.forEach(prototype => registerElement(eventManager, bindingLanguage, prototype));

  let oldRegistrate = Polymer.telemetry._registrate.bind(Polymer.telemetry);

  Polymer.telemetry._registrate = prototype => {
    oldRegistrate(prototype);
    registerElement(eventManager, bindingLanguage, prototype);
  };

  // observerLocator.getArrayObserver(registrations).subscribe(changes => {
  //   changes.forEach(change => {
  //     if (change.type === "splice" && change.addedCount > 0) {
  //       for (let i = 0; i < change.addedCount; i++) {
  //         let prototype = change.object[change.index + i - 1];
  //         registerElement(eventManager, bindingLanguage, prototype);
  //       }
  //     }
  //   });
  // });
}
