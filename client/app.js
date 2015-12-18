angular.module('places', [
  'places.finder',
  'ui.router'
])

.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('finder', {
        url: '/',
        views: {
          app: {
            templateUrl: './finder/finder.html',
            controller: 'FinderController',
          }
        }
      });

    $urlRouterProvider.otherwise('/');

  }
]);
