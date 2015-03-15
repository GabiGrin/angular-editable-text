angular-editable-text
===================

##Overview
Angular-editable-text is a directive that lets you turn your title or text into an editable, good looking component that will match the style of what your text looks like.
It supports 2-way-data-binding, of course, and methods for validating and saving the text after changing, also via promises.
An input that inherits the text's style is created - no content editable usage, to theoretically there is support for older browsers.

##Demo
[Here](http://gabigrin.github.io/angular-editable-text/)

## Why I created this
Before creating this, I researched other libraries that seem to be fit for the job, but found that they are either too simple for my use cases, or simply do not look good, and do not keep true to your styling (for example, add an input instead of letting you edit your own content).


## Installation:
1. install using bower (or by getting the min.js and min.css files from dist library)
    ```
    $ bower install angular-editable-text
    ```
2. include angular-editable-text.min.js & angular.editable-text.min.css in your project
3. include the module as a dependency of your app.
    ```
    angular.module('myApp', ['gg.editableText'])
    ```
4. you are ready to use angular-editable-text!



## Usage


#### Basic:

To allow a line of text, for example, a title of your article editor, to be edited, simply add the "editable-text" attribute set to the relevant property on your model:

HTML:
```
<h1 editable-text="myTitle"></h1>
```

Inside yourController.js:
```
$scope.myTitle='My Initial Title';
```

This will make your title editable on click. Note that whatever was inside your HTML tag will be transcluded and won't be affected by the dynamic editing part.

### Placeholder:
```
<h1 editable-text="myText" placeholder="your placeholder text">
```


Also, a "is-placeholder" class will be added so you can style it your own way (#2)

Credit goes to @mmaday!

#### Validating processing, and server requests
To validate content, process it or send it to your server, you can pass a function as the "on-change" attribute, with *value* as its parameter, as following: 


**Validation and processing example:**
HTML:
```
<h1 editable-text="myTitle" on-change="validate(value)"></h1>
```

yourController.js:
```
$scope.validate=function validateContent(value){
if (value.indexOf('red pinguins')==-1){
alert('Title must contain red pinguins!');
return false; //returning false in the on-change function will cancel the change and revert to the previous value
}

if (value.length>30) return value.substring(0,100)+'...'; //you can process the text by returning a different value

return value;  //if we didn't need validation nor processing, return the value that was passed.
}
```


**Async request example:**
The on-change function can also return a promise, specially helpful for async calls. You must resolve the promise with the value you want, or reject it to cancel any changes.

HTML:
```
<h1 editable-text="myTitle" on-change="saveToServer(value)"></h1>
```

yourController.js:
```
$scope.saveToServer=function saveContent(value){
  var dfd = $q.defer();
$timeout(function () {
              var isOurServerAlive=(Math.random()<0 .7) //simulate an unstable server :);
              if (isOurServerAlive) dfd.resolve(value);
              else dfd.reject(); //rejecting the promise will cancel any changes
            },1500);

	return d.promise;
}
```

While the promise is being resolved, a default text - "Working..." will show. In the configuration section you can learn how to change it.


#### Edit mode control
Sometimes you will need to manually invoke edit mode for a specific component, or to know when a component is being edited. For this purpose, you can bind the attribute "edit-mode" to a property in your model that will be bound 2-ways to the edit mode of a text item.

HTML:
```
<h2 editable-text="myTitle" edit-mode="isEditing"></h2>

<span ng-show="isEditing">The above h2 tag is being edited right now!</span> <!-- this will show only when the above component is in edit mode -->
<label for="editControl">
<input ng-model="isEditing" type="checkbox" id="editControl">
Toggle editing
</label>
```

yourController.js:
```
$scope.myTitle="My Title";
$scope.$watch('isEditing',function(isEditing){
if (isEditing) console.log('My title is being edited!');
});
```






## Configuration

To use a different template for the "working.." that shows when a promise is waiting to be resolved, you can inject EditableTextHelperProvider to a config block as following (here I'm using a FontAwesome spinner instead):
```
  .module('editableTextDemo', ['gg.editableText'])
    .config(function (EditableTextHelperProvider) {
      EditableTextHelperProvider.setWorkingText('<span class="fa fa-spin fa-spinner"></span>');
    });
```

