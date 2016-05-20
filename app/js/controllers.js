'use strict';

var musicApp = angular.module('musicApp', []);



// musicApp.controller("bandListCtrl", function($scope){
//
//     $scope.bands = [
//         {'name': 'Metallica',
//         'genre': 'thrash'},
//         {'name': 'Royal Blood',
//             'genre': 'rock'},
//         {'name': 'Prodegy',
//             'genre': 'dance'},
//         {'name': 'Megadeth',
//             'genre': 'thrash'}
//     ];
//
//
//
// });

var bands = { artists : {
    items: [
        {name: 'Metallica'},
        {name: 'Megadeth'},
        {name: 'Royal Blood'}]

}

};

musicApp.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}
]);

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
/* Controllers */
