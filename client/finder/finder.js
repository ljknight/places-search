angular.module('places.finder', [])

.controller('FinderController', ['$scope', '$window',
  function($scope, $window) {

    // Google Map & Places reference: https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder
    var map;

    function initMap() {
      // Map necessary for Places
      map = new google.maps.Map(document.getElementById('map'), {});
    }

    $scope.submit = function() {
      var request = {
        query: $scope.place
      };
      var service = new google.maps.places.PlacesService(map);
      service.textSearch(request, callback);
    };

    function callback(results, status) {
      $scope.results = results;
      // Force digest after AJAX response
      $scope.$apply();
    }

    // function processResults(results, status, pagination) {
    //   if (status !== google.maps.places.PlacesServiceStatus.OK) {
    //     return;
    //   } else {
    //     $scope.results = results;
    //     console.log($scope.results)
    //     createMarkers(results);

    //     if (pagination.hasNextPage) {
    //       var moreButton = document.getElementById('more');

    //       moreButton.disabled = false;

    //       moreButton.addEventListener('click', function() {
    //         moreButton.disabled = true;
    //         pagination.nextPage();
    //       });
    //     }
    //   }
    // }

  initMap();
  }
]);
