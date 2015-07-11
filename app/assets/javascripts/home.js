$(function() {
	// init('#map-canvas');
});

var map  = function () {
	
}


// var map = function() {
// 	// set markers on FB
// 	var setMarkers = function(map, coordinates) {
// 		// get user posts data using AJAX

// 		$.get('/location_posts').done(function (user) {
// 			console.log(user)
// 			var usersRef = "https://pinasyougo.firebaseio.com/users/";
// 			var provider = user.provider;
// 			var uid = user.uid;

// 			// var post = data.posts.forEach(function (post) {
// 			// 	return post;
// 			// }) 
// 			// var coords = [post.lat, post.log];

// 			// set data ref point in firebase
// 			var myFirebaseRef = new Firebase(usersRef+provider+"%3A"+uid+"/posts");
// 			var geoFire = new GeoFire(myFirebaseRef);
// 			var ref = geoFire.ref();  // ref === firebaseRef


// 			geoFire.set(init(coords).then(function() {
// 			  console.log("Provided keys have been added to GeoFire");
// 			}, function(error) {
// 			  console.log("Error: " + error);
// 			}));
// 	})
// 	}


 // var init = function(target){
 //    // Start cascade with getting location from client's browser
 //    navigator.geolocation.getCurrentPosition(function(position){
 //      // Save coords
 //      var coords = {
 //        lat: position.coords.latitude,
 //        lng: position.coords.longitude
 //      };
 //      // Save mapOptions
 //      var mapOptions = {
 //        center: coords,
 //        zoom: 13
 //      };
 //      // Initialize map
 //      var map = new google.maps.Map(document.getElementById(target), mapOptions);
 //      // When map is loaded, make DB query and add markers
 //      google.maps.event.addListener(map,'tilesloaded', function(){
 //        setMarkers(map,coords);
 //      });
 //    });
 //  };



// var map = (function(){
//   // Runs the calls to FB and sets markers
//   var setMarkers = function(map,coords) {
//     // AJAX to get user data
//     $.get('/user_data').done(function(user){
//       var family = "https://dazzling-fire-1448.firebaseio.com/families/"
//       // Set FB ref
//       var ref = new Firebase(family+user. family_id+"/locations");
//       ref.child(user.name).set(coords);
//       // Save markers for deletion
//       var markers = [];
//       // Listen for db changes and set markers
//       ref.on('value', function(snap){
//         // Delete all current markers
//         for(var i = 0; i < markers.length; i++){
//           markers[i].setMap(null)
//         };
//         markers = [];
//         // Iterate through all family locations
//         $.each(snap.val(),function(name,latlng){
//           // Create marker
//           var marker = new google.maps.Marker({
//             position: latlng,
//             map: map,
//             title: name
//           });
//           // Add to markers array
//           markers.push(marker)
//           // Init info window
//           var infowindow = new google.maps.InfoWindow({
//             content: '<div>'+name+'</div>'
//           });
//           // Add info window to marker
//           google.maps.event.addListener(marker, 'click', function(){
//             infowindow.open(map,marker);
//           });
//         });
//       });
//     });
//   };

