/**
 * Created by Gabriel_Grinberg on 6/13/14.
 */


(function(){
 'use strict';
 angular.module('gg.editableText',[]);


})();

/**
 * Created by Gabriel Grinberg on 6/13/14.
 */

(function () {
  'use strict';
  angular.module('gg.editableText')
    .directive('editableText', ['EditableTextHelper', function (EditableTextHelper) {
      return {
        scope: {
          editableText: '=',
          editMode: '=',
          placeholder: '@',
          onChange: '&'
        },
        transclude: true,
        template: '<span ng-class="{\'is-placeholder\': placeholder && !editingValue}">' +
        '<input ng-show="isEditing" ng-blur="isEditing=false;" ng-keypress="($event.which === 13) && (isEditing = false)" ng-model="editingValue" placeholder="{{placeholder}}"/>' +
        '<span ng-hide="isEditing || isWorking" class="original-text" tabindex="0" ng-click="isEditing=true" ng-focus="isEditing=true;">{{placeholder ? (editingValue ? editingValue : placeholder) : editingValue}}</span>' +
        '<span ng-hide="isEditing" ng-transclude></span>' +
        '<span ng-show="isWorking" class="' + EditableTextHelper.workingClassName + '">' + EditableTextHelper.workingText + '</span>' +
        '</span>',
        link: function (scope, elem, attrs) {
          var input = elem.find('input'),
            lastValue;

          scope.isEditing = !!scope.editMode;

          scope.editingValue = scope.editableText;

          elem.addClass('gg-editable-text');

          scope.$watch('isEditing', function (val, oldVal) {
            var editPromise, inputElm = input[0];
            if (attrs.editMode !== undefined) {
              scope.editMode = val;
            }
            elem[val ? 'addClass' : 'removeClass']('editing');
            if (val) {
              inputElm.focus();
              inputElm.selectionStart = inputElm.selectionEnd = scope.editingValue ? scope.editingValue.length : 0;
              //fix for FF
            }
            else {
              if (attrs.onChange && val !== oldVal && scope.editingValue != lastValue) {
                //accept promise, or plain function..
                editPromise = scope.onChange({value: scope.editingValue});
                if (editPromise && editPromise.then) {
                  scope.isWorking = true;
                  editPromise.then(function (value) {
                    scope.editableText = scope.editingValue = value;
                    scope.isWorking = false;
                  }, function () {
                    scope.editingValue = scope.editableText;
                    scope.isWorking = false;
                  });
                }
                else if (editPromise) scope.editableText = scope.editingValue = editPromise;
                else scope.editingValue = scope.editableText;
              }
              else scope.editableText = scope.editingValue;
            }
          });

          scope.$watch('editMode', function (val) {
            scope.isEditing = !!val;
          });

          scope.$watch('editableText', function (newVal) {
            lastValue = newVal;
            scope.editingValue = newVal;
          });
        }
      }
    }]);
})();

/**
 * Created by Gabriel_Grinberg on 6/29/14.
 */
'use strict';
(function () {
    angular.module('gg.editableText')
        .provider('EditableTextHelper', function () {

            var workingText = 'Working..',
                workingClassName = '';

            this.setWorkingText = function (text) {
                workingText = text;
                return this;
            };

            this.setWorkingClassName = function (name) {
                workingClassName = name;
                return this;
            };

            this.$get = function () {
                return {
                    workingText: workingText,
                    workingClassName: workingClassName
                }
            };

        });
})();

