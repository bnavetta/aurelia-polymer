import {configure} from '../../src/index';

class ConfigStub {
  globalResources(...resources) {
    this.resources = resources;
  }
}

describe('aurelia-polymer plugin configuration', () => {
  let mockedConfiguration;

  beforeEach(() => {
    mockedConfiguration = new ConfigStub();
    configure(mockedConfiguration);
  });

  it('should register the au-select custom attribute', () => {
    expect(mockedConfiguration.resources).toContain('./au-select-custom-attribute');
  });

});
