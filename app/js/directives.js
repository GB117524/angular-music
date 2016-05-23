'use strict';

/* Directives */

var musicApp = angular.module('musicDirectives', []);

musicApp.directive('chart', function() {
    return {
        restrict: 'A',
        scope: {
            value: '=' // '=' indicates 2 way binding
        },
        template: "<div> Now Playing : {{value}} </div>"
    };
});
