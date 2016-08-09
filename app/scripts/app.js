(function(){
  function config($stateProvider, $locationProvider){
    $locationProvider
      .html5Mode({
        enabled: true,
        requireBase: false
      })
    
    $stateProvider
      .state('landing',{
        url: '/',
        controller: 'LandingCtrl',
        templateUrl: '/templates/landing.html'      
      })
  }
  
  angular
//    .module('connect4', ['ui.router', 'underscore'])
//    .module('connect4', ['ui.router', 'ui.bootstrap', 'angular.filter'])
//    .module('connect4', ['ui.router', 'ui.bootstrap'])
//    .module('connect4', ['ui.router', 'ui.bootstrap', 'underscore'])
    .module('connect4', ['ui.router', 'ui.bootstrap'])
    .config(config) 
//    .factory('_', [$window, function($window){
//      return $window._;
//    }])
    .constant('_', window._);
})();