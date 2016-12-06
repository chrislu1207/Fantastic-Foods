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

  .controller('foodCtrl', function() {

    this.map = document.getElementById('map');

    this.data = {
      foods: [
        {
          name: 'Popsons',
          location: '998 Market St, San Francisco CA',
          price: '~$12'
        },
        {
          name: 'Katana-Ya',
          location: '430 Geary St, San Francisco CA',
          price: '~$15'
        },
        {
          name: 'Panda Express',
          location: '865 Market St, San Francisco CA',
          price: '~$10'
        },
        {
          name: 'Show Dogs',
          location: '1020 Market St, San Francisco CA',
          price: '~$10'
        },
        {
          name: 'Tu Lan',
          location: '8 6th St, San Francisco CA',
          price: '~$13'
        }
      ]
    };

    this.getRandomRestaraunt = function() {
      this.randFood = this.data.foods[Math.floor(Math.random() * this.data.foods.length)];
      this.geocodeAddress(this.randFood.location);
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

    this.geocodeAddress = function(address) {
      this.geocoder = new google.maps.Geocoder();
      this.geocoder.geocode({'address': address}, function(results, status) {
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







