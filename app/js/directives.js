'use strict';

/* Directives */

var musicDirectives = angular.module('musicDirectives', []);

musicDirectives.directive('nowPlaying', function() {
    return {
        restrict: 'E',
        scope: {
            track: '=track'
        },
        templateUrl: '../now-playing.html'
    };
});


