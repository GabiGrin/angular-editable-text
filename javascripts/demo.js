/**
 * Created by Gabriel_Grinberg on 8/30/14.
 */
'use strict';
angular.module('demo', ['gg.editableText'])
    .controller('demoCtrl', function ($scope, $q, $timeout) {

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

        $scope.validateLength = function (value) {
            return (value.length < 10) ? false : value;
        };

        $scope.censorship = function (value) {
            var curses = ['fuck', 'shit', 'bitch', 'ass', 'bastard', 'asshole', 'dick', 'pussy', 'darn', 'crap', 'fag', 'slut'];
            var arr = value.split(' ');
            angular.forEach(arr, function (word, idx) {
                var found = false;
                angular.forEach(curses, function (curse) {
                    if (!found && word.toLowerCase().indexOf(curse.toLowerCase()) !== -1) {
                        found = true;
                    }
                });

                if (found) {
                    arr[idx] = word.replace(/./g, '*');
                }
            });

            return arr.join(' ');
        };

        $scope.enthusiastic = function (value) {
            if (!value.match(/.*!/)) {
                value += '!';
            }
            return value;
        };

        $scope.saveToServer = function (value) {
            var dfd = $q.defer();

            //2-7 secs delay
            var rand = (parseInt(Math.random() * 5) + 2) * 1000;

            $timeout(function () {

                //simulate a 70% chance of success
                if (Math.random() > 0.3) {
                    dfd.resolve(value);
                }
                else {
                    dfd.reject();
                    alert('Request failed!');
                }

            },rand);

            return dfd.promise;
        };

        $scope.validateServer = function (value) {
            var dfd = $q.defer();

            //2-7 secs delay
            var rand = (parseInt(Math.random() * 3) + 1) * 1000;

            $timeout(function () {

                //simulate a 70% chance of success
                if (!value.match(/\d/)) {
                    dfd.resolve(value);
                }
                else {
                    dfd.reject();
                    alert('No digits allowed..');
                }

            },rand);

            return dfd.promise;
        }


    });


angular.module('demo2', ['gg.editableText'])
    .config(function (EditableTextHelperProvider) {
        EditableTextHelperProvider.setWorkingText('<span class="fa fa-spinner fa-spin"></span> Saving..')

    })
    .controller('demoCtrl2', function ($scope, $q, $timeout) {
        $scope.save= function (value) {
            var dfd=$q.defer();

            $timeout(function () {
                dfd.resolve(value);
            },3500);

            return dfd.promise;
        }
    });


angular.
    bootstrap(document.getElementById("demo2"), ['demo2']);
