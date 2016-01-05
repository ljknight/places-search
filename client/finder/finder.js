angular.module('places.finder', [])

.controller('FinderController', ['$scope', '$window', '$state',
  function($scope, $window, $state) {

    var place;
    var placeID;
    var placeName;
    var infoWindow = new google.maps.InfoWindow({maxWidth: 175});
    var service;
    var bounds;
    var map;
    $scope.results = [];

    var initMap = function() {
      // Default to SF
      var mapOptions = {
          center: {
            lat: 37.783542,
            lng: -122.408943
          },
          zoom: 13
        };

      map = new google.maps.Map(document.getElementById('map'), mapOptions);
    };

    $scope.submit = function() {
      $scope.results = [];
      bounds = new google.maps.LatLngBounds();
      
      var request = {
        query: $scope.place
      };
      
      service = new google.maps.places.PlacesService(map);
      service.textSearch(request, processResults);
      initMap();
    };

    var formatType = function(input, index) {
      var type = input.types[0];
      
      type = type.charAt(0).toUpperCase() + type.slice(1);
      type = type.replace(/[_]/g, " "); 

      $scope.results[index].type = type;
    };

    var createStars = function(input, index) {
      var val = Math.floor(input.rating);
      var stars = '';

      for (var i = 0; i < val; i++) {
        stars += '★';  
      }

      while (stars.length < 5) {
        stars += '☆';
      }

      $scope.results[index].stars = stars;
    };

    var processResults = function(results, status, pagination) {
      if (status !== google.maps.places.PlacesServiceStatus.OK) {
        return;
      } else {
        for (var i = 0; i < results.length; i++) {
          $scope.results.push(results[i]);
          $scope.results[i].count = i+1;
          formatType(results[i], i);
          createStars(results[i], i);
          // Force digest to render list
          $scope.$apply();
          createMarkers(results[i]);
        }
      }
    };

    var createMarkers = function(place) {
      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
      });

      google.maps.event.addListener(marker, 'click', function() {
        service.getDetails(place, function(result, status) {
          if (status !== google.maps.places.PlacesServiceStatus.OK) {
            console.error(status);
            return;
          }
          infoWindow.setContent(result.name);
          infoWindow.open(map, marker);
        });
      });
      bounds.extend(place.geometry.location);
      map.fitBounds(bounds);
    };
  
  // Loads map on state change
    $scope.$on('$stateChangeSuccess', function() {
      initMap();
    });

  }
]);
