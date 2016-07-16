# aurelia-polymer

This plugin configures [Aurelia](http://www.aurelia.io/) and [Polymer](https://www.polymer-project.org/)
to work with each other.

See [the Aurelia
documentation](http://aurelia.io/docs.html#/aurelia/framework/1.0.0-beta.1.1.3/doc/article/integrating-with-polymer)
for installation and usage instructions.

## Using with Webpack

If you're using webpack, you won't be able to use `aurelia-html-import-template-loader`, which means you won't be able
to load Polymer elements in your templates directly (see #18). Instead, it's suggested that you use
[vulcanize](https://github.com/Polymer/vulcanize) to bundle all the Polymer elements you use into one file that can
be loaded in `index.html`. The elements will still be available in your templates once loaded, but this avoids the syntax
issues that require the HTML import template loader.

## Building The Code

To build the code, follow these steps.

1. Ensure that [NodeJS](http://nodejs.org/) is installed. This provides the platform on which the build tooling runs.
2. From the project folder, execute the following command:

  ```shell
  npm install
  ```
3. Ensure that [Gulp](http://gulpjs.com/) is installed. If you need to install it, use the following command:

  ```shell
  npm install -g gulp
  ```
4. To build the code, you can now run:

  ```shell
  gulp build
  ```
5. You will find the compiled code in the `dist` folder, available in three module formats: AMD, CommonJS and ES6.

6. See `gulpfile.js` for other tasks related to generating the docs and linting.

## Running The Tests

To run the unit tests, first ensure that you have followed the steps above in order to install all dependencies and successfully build the library. Once you have done that, proceed with these additional steps:

1. Ensure that the [Karma](http://karma-runner.github.io/) CLI is installed. If you need to install it, use the following command:

  ```shell
  npm install -g karma-cli
  ```
2. Ensure that [jspm](http://jspm.io/) is installed. If you need to install it, use the following commnand:

  ```shell
  npm install -g jspm
  ```
3. Install the client-side dependencies with jspm:

  ```shell
  jspm install
  ```

4. You can now run the tests with this command:

  ```shell
  karma start
  ```
