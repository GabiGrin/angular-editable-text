/**
 * Created by Gabriel Grinberg on 6/13/14.
 */

(function () {
    'use strict';
    angular.module('gg.editableText')
        .directive('editableText', function () {
            return {
                scope: {
                    editableText: '=',
                    editMode: '@',
                    onChange: '&'
                },
                template: '<span>' +
                    '<input ng-show="isEditing" ng-blur="isEditing=false;" ng-model="editingValue"/>' +
                    '<span ng-hide="isEditing || isWorking" ng-click="isEditing=true" >{{editingValue}}</span>' +
                    '<span class="fa fa-spinner fa-spin text-muted" ng-show="isWorking">Working, please wait..</span>' +
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
                                    scope.isWorking=true;
                                    editPromise.then(function (value) {
                                        scope.editableText = scope.editingValue = value;
                                        scope.isWorking=false;
                                    }, function () {
                                        scope.editingValue = scope.editableText;
                                        scope.isWorking=false;
                                    });
                                }
                                else if (editPromise) scope.editableText = scope.editingValue = editPromise;
                                else scope.editableText = scope.editingValue;
                            }
                        }
                    });

                    scope.$watch('editingValue', function (newVal) {
                    });
                }
            }
        });
})();
