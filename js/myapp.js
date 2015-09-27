var myApp = angular.module('myApp', [
  // 'ngRoute'
  ]); 

myApp.config(['$routeProvider','$anchorScrollProvider',
  function($routeProvider, $anchorScrollProvider) {
    $anchorScrollProvider.disableAutoScrolling();
    $routeProvider.
     when('/videos', {
        templateUrl: 'views/video.html',
        controller: 'LoadingCtrl'
      }).
      when('/videos/:videoId/:next/:prev', {
        templateUrl: 'views/video.html',
        controller: 'loadedCtrl'
      }).
      when('/search/:search', {
        templateUrl: 'views/searchvideo.html',
        controller: 'searchingCtrl'
      }). 
      when('/search/:search/:videoId/:next/:prev', {
        templateUrl: 'views/searchvideo.html',
        controller: 'searchedCtrl'
      }). 
      otherwise({
        templateUrl: 'views/video.html',
        redirectTo: '/videos'
      });
  }]);

