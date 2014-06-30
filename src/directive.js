/**
 * Created by Gabriel Grinberg on 6/13/14.
 */

(function () {
    'use strict';
    angular.module('gg.editableText')
        .directive('editableText', function (EditableTextHelper) {
            return {
                scope: {
                    editableText: '=',
                    editMode: '@',
                    onChange: '&'
                },
                transclude: true,
                template: '<span>' +
                    '<input ng-show="isEditing" ng-blur="isEditing=false;" ng-model="editingValue"/>' +
                    '<span ng-hide="isEditing || isWorking" class="original-text" ng-click="isEditing=true" >{{editingValue}} </span>' +
                    '<span ng-hide="isEditing" ng-transclude></span>' +
                    '<span ng-show="isWorking" class="' + EditableTextHelper.workingClassName + '">' + EditableTextHelper.workingText + '</span>' +
                    '</span>',
                link: function (scope, elem) {
                    var input = elem.find('input');

                    scope.editingValue = scope.editableText;

                    elem.addClass('gg-editable-text');

                    scope.$watch('isEditing', function (val, oldVal) {
                        var editPromise;
                        elem[val ? 'addClass' : 'removeClass']('editing');
                        if (val) input[0].focus();
                        else {
                            if (scope.onChange && val !== oldVal) {
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
                                else scope.editableText = scope.editingValue;
                            }
                        }
                    });

                    scope.$watch('editableText', function (newVal) {
                        scope.editingValue = newVal;
                    });
                }
            }
        });
})();
