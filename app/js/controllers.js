/* Controllers */

'use strict';

var musicApp = angular.module('musicApp', []);

// var bands = { artists : {
//     items: [
//         {name: 'Metallica'},
//         {name: 'Megadeth'},
//         {name: 'Royal Blood'}]
//
// }
//};

var bands = {};

musicApp.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}
]);

musicApp.run(function($rootScope){
   $rootScope.nowPlaying = {'artist' : {'#text' : 'Cool and the Gang'}};
});

musicApp.controller("SearchController", function($scope, $http){

    var searchCtrl = this;
    searchCtrl.searchResults = bands;

    searchCtrl.searchString = "";
    searchCtrl.searchHistory = [];


    this.findArtist = function(){
    var query = 'http://api.spotify.com/v1/search?q=' + this.searchString + '&type=artist';

     $http.get(query).success(function(response){
        window.alert(response.artists.items[5].name);
         searchCtrl.searchResults = response;
         searchCtrl.searchHistory.push(searchCtrl.searchString);
         searchCtrl.searchString = "";
     });
 };

});

musicApp.controller("Hello", function($scope,$http)
{
    $http.get('http://rest-service.guides.spring.io/greeting')
        .success(function(data) {
            $scope.greeting = data;
        });

});

musicApp.controller("AlertController", function(){
    this.alert = function()
    {
        window.alert("ALERT!");
    };
});

musicApp.controller("LastFmController", function($scope, $rootScope, $timeout, $http) {


//     this.nowPlayingManual = function () {
//         var apiKey = "f3b3f5f21a179582edf96ff2269d5754";
//     var user = "KingKudos";
//     var query = 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=' + user + '&api_key=' + apiKey + '&format=json';
//     $http.get(query).success(function (response) {
//         // window.alert(response.recenttracks.track[0].artist['#text']);
//         $rootScope.nowPlaying = response.recenttracks.track[0];
//         // window.alert($rootScope.nowPlaying.artist['#text']);
//     });
// }
    var nowPlayingPoll = function(){
            $timeout(function() {
                var apiKey = "f3b3f5f21a179582edf96ff2269d5754";
                var user = "KingKudos";
                var query = 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=' + user + '&api_key=' + apiKey + '&format=json';
                $http.get(query).success(function(response) {
                    // window.alert(response.recenttracks.track[0].artist['#text']);
                    $rootScope.value = response.recenttracks.track[0];
                    // window.alert($rootScope.nowPlaying.artist['#text']);
                });

                nowPlayingPoll();
            }, 1000);
        };
        nowPlayingPoll();




});

musicApp.controller('Ctrl1', function($scope, $rootScope, $timeout, $http) {
    $scope.value = 1;
    var poll = function() {
        $timeout(function() {
            var apiKey = "f3b3f5f21a179582edf96ff2269d5754";
            var user = "KingKudos";
            var query = 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=' + user + '&api_key=' + apiKey + '&format=json';
            $http.get(query).success(function(response) {
                $scope.value = response.recenttracks.track[0].artist['#text'];
                $rootScope.nowPlaying = response.recenttracks.track[0];
            });

            poll();
        }, 1000);
    };
    poll();
});

