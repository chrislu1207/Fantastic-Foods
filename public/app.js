var map;
var initMap = function($scope) {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      map.setCenter(initialLocation);
    });
  }
};

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

  .factory('foodFactory', function($http) {
    var getAll = function() {
      return $http({
        method: 'GET',
        url: '/api/foods'
      })
      .then(function(res) {
        return res.data;
      });
    };

    var addOne = function(food) {
      return $http({
        method: 'POST',
        url: '/api/foods',
        data: food
      })
      .catch(function(err) {
        console.log('Something went wrong');
      });
    };

    return {
      getAll: getAll,
      addOne: addOne
    };
  })

  .controller('foodCtrl', function() {

    this.data = {
      foods: [
        {
          name: 'Popsons',
          location: '998 Market St',
          price: '~$12'
        },
        {
          name: 'Katana-Ya',
          location: '430 Geary St',
          price: '~$15'
        },
        {
          name: 'Panda Express',
          location: '865 Market St',
          price: '~$10'
        }
      ]
    };

    this.getRandomRestaraunt = function() {
      this.randFood = this.data.foods[Math.floor(Math.random() * this.data.foods.length)];
    };

    this.addRestaraunt = function(name, location, price) {
      var newFood = {
        name: name,
        location: location,
        price: price
      };
      this.data.foods.push(newFood); 
    };

    this.removeRestaraunt = function(index) {
      this.data.foods.splice(index, 1);
    };

  });







