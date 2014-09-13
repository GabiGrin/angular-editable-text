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

