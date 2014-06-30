'use strict';

angular
    .module('editableTextDemo', ['gg.editableText'])
    .config(function (EditableTextHelperProvider) {
        EditableTextHelperProvider.setWorkingText('blablabla');
    });

angular.module('editableTextDemo')
    .controller('MainCtrl', function ($scope, $timeout, $http, $q) {

        $scope.func = function (value) {

            var d = $q.defer();
            $timeout(function () {
                if (value.indexOf('b') == -1) {
                    alert('must have b');
                    d.reject();
                }
                else d.resolve(value);
            },1500);

            return d.promise;
        }
    });
