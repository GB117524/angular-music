'use strict';

/* Directives */

var musicDirectives = angular.module('musicDirectives', []);

/* This doesn't seem to work */
musicDirectives.directive('nowPlaying', function() {
    return {
        restrict: 'E',
        scope: {
            track: '=track'
        },
        templateUrl: '../now-playing.html'
    };
});


