'use strict';

angular
    .module('editableTextDemo', ['gg.editableText'])
    .config(function (EditableTextHelperProvider) {
       // EditableTextHelperProvider.setWorkingText('blablabla');
        EditableTextHelperProvider.setWorkingText('<span class="fa fa-spin fa-spinner">Spinnnn</span>');
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

        $scope.myTitle="Boo World";

        $scope.validate=function validateContent(value){
            if (value.indexOf('red pinguins')==-1){
                alert('Title must contain red pinguins!');
                return null; //returning false in the on-change function will cancel the change and revert to the previous value
            }

            if (value.length>100) return value.substring(0,100)+'...'; //you can process the text by returning a different value

            return value;  //if we didn't need validation nor processing, return the value that was passed.
        };

        $scope.saveToServer=function saveContent(value){
            var dfd = $q.defer();
            $timeout(function () {
                var isOurServerAlive=(Math.random()<0.7); //simulate an unstable server :);
                if (isOurServerAlive) dfd.resolve(value);
                else dfd.reject(); //rejecting the promise will cancel any changes
            },5000);

            return dfd.promise;
        };

        $scope.testOnchange= function (value) {
            if (value.indexOf('$')!==-1) return false;
            return value;
        };
    });
