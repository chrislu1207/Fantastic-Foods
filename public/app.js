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

  .factory('foodFactory', function() {

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
      console.log(this.data.foods); 
    };

    this.addRestaraunt = function(name, location, price) {
      var newFood = {
        name: name,
        location: location,
        price: price
      };
      this.data.foods.push(newFood); 
    };

  });










