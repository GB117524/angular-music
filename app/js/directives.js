'use strict';

/* Directives */

var musicApp = angular.module('musicDirectives', []);

musicApp.directive('NowPlaying', function() {
    return {
        restrict: 'A',
        scope: {
            value: '=' 
        },
        template: "<div> Now Playing : {{value}} </div>"
    };
});
