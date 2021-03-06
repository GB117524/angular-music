/* Controllers */

'use strict';

var musicApp = angular.module('musicApp', ['jtt_youtube']);

musicApp.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}
]);

musicApp.directive('nowPlaying', function () {
    return {
        restrict: 'E',
        scope: {
            track: '=track'
        },
        templateUrl: 'now-playing.html'
    };
});

musicApp.directive('youTubeVideos', function () {
    return {
        restrict: 'E',
        scope: {
            track: '=track'
        },
        templateUrl: 'you-tube.html'
    };
});

musicApp.run(function ($rootScope) {
    $rootScope.nowPlaying = {};
});

musicApp.controller("GigLister", function ($scope, $http, $rootScope) {

    var gigSearch = this;
    gigSearch.searchString = $rootScope.nowPlaying.artist['#text'];

    $scope.tourDetails = {};


    $rootScope.watch('nowPlaying' , function ()
    {
        window.alert($rootScope.nowPlaying.artist['#text']);
        var query = "http://api.bandsintown.com/artists/" + $rootScope.nowPlaying.artist['#text'] + "/events.json?api_version=2.0&app_id=angular_music";

        $http.get(query).success(function (response){

            $scope.tourDetails = response;
                window.alert($scope.tourDetails);
        }
        )
    });

});

musicApp.controller("YouTubeSearch", function ($scope, $http, $rootScope, youtubeFactory) {
    var apiKey = 'AIzaSyAFJlvdxhCrCBdk_gCGM8xMaChU2d_weaM';
    var youTubeResult = this;
    youTubeResult.searchResults = {};
    $scope.searchResults = {};
    //docs: https://developers.google.com/youtube/v3/docs/search/list
    $rootScope.$watch('nowPlaying', function () {
        youtubeFactory.getVideosFromSearchByParams({
            q: $rootScope.nowPlaying.artist['#text'], // (optional) search string
            //location: "<SEARCH_LOCATION>", // (optional) The parameter value is a string that specifies latitude/longitude coordinates e.g. '37.42307,-122.08427'.
            //locationRadius: "<LOCATION_RADIUS>", // (optional) valid values e.g. '1500m', '5km', '10000ft', and '0.75mi' | default: '5000m'
            order: "relevance", // (optional) valid values: 'date', 'rating', 'relevance', 'title', 'videoCount', 'viewCount' | default: 'date'
            maxResults: "18",//"<MAX_RESULTS>", // (optional) valid values: 0-50 | default:
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
            key: apiKey
        }).then(function (_data) {
            //on success
            $scope.searchResults = _data.data;
            youTubeResult.searchResults = _data.data;

        }).catch(function (_data) {
                //on error
            }
        )
    });


});

musicApp.controller("WikiInfo", function ($scope, $http, $rootScope) {
    var apiKey = 'AIzaSyAFJlvdxhCrCBdk_gCGM8xMaChU2d_weaM';
    var wikiResults = this;
    youTubeResult.searchResults = {};
    $scope.searchResults = {};
    //docs: https://developers.google.com/youtube/v3/docs/search/list
    //window.alert($rootScope.nowPlaying.artist['#text']);
    $rootScope.$watch('nowPlaying', function () {
        var query = 'http://api.spotify.com/v1/search?q=' + this.searchString + '&type=artist';

        $http.get(query).success(function (response) {
            //window.alert(response.artists.items[5].name);
            searchCtrl.searchResults = response;
            searchCtrl.searchHistory.push(searchCtrl.searchString);
            searchCtrl.searchString = "";
        })
    })



});


musicApp.controller('NowPlayingUpdate', function ($scope, $rootScope, $timeout, $http) {

    $scope.loading = true;
    var poll;
    poll = function () {
        $timeout(function () {
            var apiKey = "f3b3f5f21a179582edf96ff2269d5754";
            var user = "KingKudos";
            var query = 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=' + user + '&api_key=' + apiKey + '&format=json&limit=1';
            //start spinner
            //$scope.loading = true;
            $http.get(query).success(function (response) {
                if (JSON.stringify($rootScope.nowPlaying) !== JSON.stringify(response.recenttracks.track[0])) {
                    $rootScope.nowPlaying = response.recenttracks.track[0];
                }

            })
                .catch(function () {
                    //error condition
                    window.alert("Can't receive now playing information");
                })
                .finally(function () {
                    //stop the spinner
                    $scope.loading = false;
                });

            poll();
        }, 1000);
    };
    poll();
});

