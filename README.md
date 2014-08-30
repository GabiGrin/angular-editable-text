angular-editable-text
===================

##Overview
Angular-editable-text is a directive that lets you turn your title or text into an editable, good looking component that will match the style of what your text looks like.
It supports 2-way-data-binding, of course, and methods for validating and saving the text after changing, also via promises.

## Installation:
1. install using bower (or by getting the min.js and min.css files from dist library)
    ```
    $ bower install angular-editable-text
    ```
2. include angular-editable-text.min.js & angular.editable-text.min.css in your project
3. include the module as a dependency of your app.
    ```
    angular.module('myApp', ['gg.angular-editable-text'])
    ```
4. you are ready to use angular-editable-text!



## Usage


#### Basic:

To allow a line of text, for example, a title of your article editor, to be edited, simply add the "editable-text" attribute set to the relevant property on your model:
HTML:
```
<h1 editable-text="model.myTitle"></h1>
```

The initial value of the title will be what



## Why I created this
Before creating this, I researched other libraries that seem to be fit for the job, but found that they are either too simple for my use cases, or simply do not look good, and do not keep true to your style.



## Configuration

#### Turn the spinner on or off:
The insertion of the spinner can be controlled through configuration.  It's on by default, but if you'd like to turn it off, simply configure the service:

```js
angular.module('myApp', ['angular-loading-bar'])
  .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
  }])
```

