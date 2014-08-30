angular-editable-text
===================

A directive that lets you turn your title or text into an editable, good looking component that will match the style of what your text looks like.


**Requirements:** AngularJS 1.2+

## Installation:

1. include the module as a dependency of your app.

    ```js
    angular.module('myApp', ['gg.angular-editable-text'])
    ```
    
2. include the supplied CSS file angular-editable-text.css (or .min.css).



#### via bower:
```
$ bower install angular-editable-text
```


## Usage


#### Basic usage



## Why I created this
There are a couple projects similar to this out there, but none were ideal for me.  All implementations I've seen require that you maintain state on behalf of the loading bar.  In other words, you're setting the value of the loading/progress bar manually from potentially many different locations.  This becomes complicated when you have a very large application with several services all making independant XHR requests. It becomes even more complicated if you want these services to be loosly coupled.

Additionally, Angular was created as a highly testable framework, so it pains me to see Angular modules without tests.  That is not the case here as this loading bar ships with 100% code coverage.


**Goals for this project:**

1. Make it automatic
2. Unit tests, 100% coverage
3. Must work well with ngAnimate
4. Must be styled via external CSS (not inline)
5. No jQuery dependencies


## Configuration

#### Turn the spinner on or off:
The insertion of the spinner can be controlled through configuration.  It's on by default, but if you'd like to turn it off, simply configure the service:

```js
angular.module('myApp', ['angular-loading-bar'])
  .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
  }])
```

