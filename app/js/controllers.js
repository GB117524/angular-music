/* Controllers */

'use strict';

var musicApp = angular.module('musicApp', ['jtt_youtube']);

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

musicApp.controller("YouTubeSearch", function ($scope,$http, $rootScope)
{
    var apiKey= 'AIzaSyAFJlvdxhCrCBdk_gCGM8xMaChU2d_weaM';
    //docs: https://developers.google.com/youtube/v3/docs/search/list
    youtubeFactory.getVideosFromSearchByParams({
        q: $rootScope.nowPlaying.artist['#text'], // (optional) search string
        //location: "<SEARCH_LOCATION>", // (optional) The parameter value is a string that specifies latitude/longitude coordinates e.g. '37.42307,-122.08427'.
        //locationRadius: "<LOCATION_RADIUS>", // (optional) valid values e.g. '1500m', '5km', '10000ft', and '0.75mi' | default: '5000m'
        order: "relevance", // (optional) valid values: 'date', 'rating', 'relevance', 'title', 'videoCount', 'viewCount' | default: 'date'
        //maxResults: "<MAX_RESULTS>", // (optional) valid values: 0-50 | default: 5
        //publishedAfter: "<PUBLISHED_AFTER>", // (optional) RFC 3339 formatted date-time value (1970-01-01T00:00:00Z)
        //publishedBefore: "<PUBLISHED_AFTER>", // (optional) RFC 3339 formatted date-time value (1970-01-01T00:00:00Z)
        //regionCode: "<REGION_CODE>", // (optional) ISO 3166-1 alpha-2 country code
        //relevanceLanguage: "<RELEVANCE_LANGUAGE>", // (optional) ISO 639-1 two-letter language code
        safeSearch: "none", // (optional) valid values: 'moderate','none','strict' | defaut: 'moderate'
        //videoEmbeddable: "<VIDEO_EMBEDDABLE>", // (optional) valid values: 'true', 'any' | default: 'true'
        //videoLicense: "<VIDEO_LICENSE>", // (optional) valid values: 'any','creativeCommon','youtube'
        //videoSyndicated: "<VIDEO_SYNDICATED>", // (optional) restrict a search to only videos that can be played outside youtube.com. valid values: 'any','true' | default: 'any'
        //fields: "<FIELDS>", // (optional) Selector specifying which fields to include in a partial response
        //pageToken: "<PAGE_TOKEN>", // (optional)
        //part: "<PART>", // (optional) default: 'id,snippet'
        key: apiKey,
    }).then(function (_data) {
        //on success
        var returnString = '<img src=\"' + _data.items[0].snippet.thumbnails.high.url + '\" alt=\"' + _data.items[0].snippet.title + '">';
        return returnString;

    }).catch(function (_data) {
        //on error
    });

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



musicApp.controller('NowPlayingUpdate', function($scope, $rootScope, $timeout, $http) {
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

