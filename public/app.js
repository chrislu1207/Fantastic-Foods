angular.module('app', ['ngRoute'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/main.html',
        controller: 'foodCtrl'
      })
      .when('/addFood', {
        templateUrl: 'partials/addFood.html',
        controller: 'foodCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })

    .factory('Foods', function($http) {
      var getAll = function() {
        return $http({
          method: 'GET',
          url: '/api/foods'
        })
        .then(function(resp) {
          return resp.data;
        });
      };

      var addOne = function(food) {
        return $http({
          method: 'POST',
          url: '/api/foods',
          data: food
        })
        .catch(function(err) {
          window.alert('URL does not exist');
        });
      };

      var removeOne = function(food) {
        return $http({
          method: 'POST',
          url: '/api/rm',
          data: food
        }).catch(function(err) {
          window.alert('URL does not exist');
        });
      };

      return {
        getAll: getAll,
        addOne: addOne,
        removeOne: removeOne
      };
    })

  .controller('foodCtrl', function(Foods, $scope) {

    this.map = document.getElementById('map');
    $scope.data = {};

    Foods.getAll()
    .then(function(allFoods) {
      $scope.data.foods = allFoods;
    });

    $scope.getRandomRestaraunt = function() {
      $scope.randFood = $scope.data.foods[Math.floor(Math.random() * $scope.data.foods.length)];
      $scope.geocodeAddress($scope.randFood.location);
    };

    $scope.addRestaraunt = function(name, location, price) {
      var newFood = {
        name: name,
        location: location,
        price: price
      };
      Foods.addOne(newFood);
    };

    $scope.removeRestaraunt = function(index, food) {
      $scope.data.foods.splice(index, 1);
      Foods.removeOne(food);
    };

    $scope.geocodeAddress = function(address) {
      $scope.geocoder = new google.maps.Geocoder();
      $scope.geocoder.geocode({'address': address}, function(results, status) {
        if (status === 'OK') {
          this.map.setCenter(results[0].geometry.location);
          var marker = new google.maps.Marker({
            map: this.map,
            position: results[0].geometry.location
          });
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    };

  });







