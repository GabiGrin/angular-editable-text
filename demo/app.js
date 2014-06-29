'use strict';

angular
    .module('editableTextDemo', ['gg.editableText'])
    .config(function () {

    });

angular.module('editableTextDemo')
    .controller('MainCtrl', function ($scope, $timeout, $http, $q) {

        $scope.func = function (value) {
            return value+'1';

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
