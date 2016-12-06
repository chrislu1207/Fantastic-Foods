var map;
var initMap = function($scope) {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 18
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      map.setCenter(initialLocation);
    });
  }
};