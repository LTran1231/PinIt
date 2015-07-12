
var map = (function(){
  // Runs the calls to FB and sets markers
  var setMarkers = function(map, coordinates) {
//    // get user posts data using AJAX
   $.get('/user_data').done(function (user) {
     console.log(user)
     var usersRef = "https://pinasyougo.firebaseio.com/users/";
     var provider = user.provider;
     var uid = user.uid;

     var myFirebaseRef = new Firebase(usersRef+provider+"%3A"+uid+"/posts");

      myFirebaseRef.child(user.name).set({
         lat: 37.7841336,
         lng: -122.3957437
      });

      // Save markers for deletion
      var markers = [];
      // Listen for db changes and set markers
      myFirebaseRef.on('value', function(snap){
        // Delete all current markers
        for(var i = 0; i < markers.length; i++){
          markers[i].setMap(null)
        };
        markers = [];
        // Iterate through all family locations
        $.each(snap.val(),function(name,latlng){
          // Create marker
          var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: name
          });
          // Add to markers array
          markers.push(marker)
          // Init info window
          var infowindow = new google.maps.InfoWindow({
            content: '<div>'+name+'</div>'
          });
          // Add info window to marker
          google.maps.event.addListener(marker, 'click', function(){
            infowindow.open(map,marker);
          });
        });
      });
    });
  };

 var init = function(target){
    // Start cascade with getting location from client's browser
    navigator.geolocation.getCurrentPosition(function(position){
      // Save coords
      var coords = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      // Save mapOptions
      var mapOptions = {
        center: coords,
        zoom: 13
      };
      // Initialize map
      var map = new google.maps.Map(document.getElementById(target), mapOptions);
      // When map is loaded, make DB query and add markers
      google.maps.event.addListener(map,'tilesloaded', function(){
        setMarkers(map,coords);
      });
    });
  };
  return {
    init: init
  };
})();

$(function() {
  map.init('map-canvas');
});




