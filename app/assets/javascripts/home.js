
var map = (function(){
  // Runs the calls to FB and sets markers
  var setMarkers = function(map, coordinates) {
//    // get posts data using AJAX
   $.get('/posts_data').done(function (posts) {
     console.log(posts)
     // send posts data to firebase storage
     var myFirebaseRef = new Firebase("https://pinasyougo.firebaseio.com/posts/");

      myFirebaseRef.push(posts);

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




