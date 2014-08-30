/**
 * Created by Gabriel_Grinberg on 8/30/14.
 */
'use strict';
angular.module('demo', ['gg.editableText'])
    .controller('demoCtrl', function ($scope) {

        $scope.myTitle = 'I\'m an Editable Title!';

        $scope.validateNoColor = function (value) {
            var colors = ['red', 'green', 'blue', 'yellow', 'orange', 'purple'],
                valid = true;
            angular.forEach(colors, function (color) {
                if (value.toLowerCase().indexOf(color) !== -1) {
                    alert('Color ' + color + ' is not allowed!');
                    valid = false;
                }
            });

            return valid ? value : false;
        };

        $scope.validateLength= function (value) {
          return (value.length < 10)? false:value;
        }
    });
