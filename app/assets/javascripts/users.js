
// $(function() {


//   // Runs the calls to FB and sets markers
//   // get posts data using AJAX
//   $.get('/posts_data').done(function (posts) {
//     console.log(posts)
//     // send posts data to firebase storage
//     var markerRef = new Firebase("https://pinasyougo.firebaseio.com/posts/");
//     // var geoFire = new GeoFire(markerRef);
//     // var ref = geoFire.ref();  // ref === firebaseRef

// //     usersRef.push(user).then(function(response) {
// //     var key = response.key;
// //     var coords = [lon, lat];
// //     geoFire.set(key, coords, function(success){
// //          console.log('User and geofire object has been created');
// //     });
//     var list_coords = posts.reduce(function(object, coords, index) {
//       object[index] = JSON.parse("[" + coords.join() + "]");
//       return object;
//     }, {});
//     console.log(list_coords)
//     // remove existing coords and add list
//     markerRef.remove();
//     var firebaseCoords = markerRef.push(list_coords);
//       //   markers = [];
//         // Iterate through all family locations

//         firebaseCoords.on('child_', function(snap){
//         // Delete all current markers
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


//       // Save mapOptions
//       var mapOptions = {
//         center: coords,
//         zoom: 13
//       };
//       // Initialize map
//       // var map = L.mapbox.map(document.getElementById(target)).setView([16.805, -172.969], 2)
//       var map = new google.maps.Map(document.getElementById('map'), mapOptions);
//     //   var map = L.mapbox.map(document.getElementById(target), "ltran1231.mmfe4jdj")
//     // .setView([16.805, -172.969], 2);


//       // When map is loaded, make DB query and add markers
//       google.maps.event.addListener(map,'tilesloaded', function(){
//         setMarkers(map,coords);
//       })
// });
// // load the map canvas in the #map block
// // map.on('ready', function(){
// //   // add a new marker on the map
// //   var marker = L.marker([latitude,longitude]).addTo(map)
// //   // update the marker position
// //   marker.setLatLng([latitude,longitude])
// // })

// // var map = L.mapbox.map(document.getElementById('map')).setView([16.805, -172.969], 2);


