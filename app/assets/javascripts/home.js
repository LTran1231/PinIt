
$(function(){
  // loginWithFacebook();
  firebase = "https://pinasyougo.firebaseio.com/";
  fbPostsRef = new Firebase(firebase + "posts/");

  Sessions.btnListener('.signin-link', '#dialog-register', '.signin-wrapper');
  Sessions.btnListener('.signup-link', '.signin-wrapper', '#dialog-register');
  Sessions.loginViaThirdParty(".dialog-login");
  Sessions.getErrorMsg(".signin-wrapper form");
  Sessions.getErrorMsg("#dialog-register form");
  
  submitPost.autoCompleteLocation('#geocomplete');
  submitPost.contentEditor('.summernote-post-editor');
  submitPost.deletePin('.delete_location');
  
  sendPostsCoordsToFB();
  
  L.mapbox.accessToken = "pk.eyJ1IjoibHRyYW4xMjMxIiwiYSI6IjJhNThiNDcxZDczNWQwZTkwNjMxMThhNDE4ZGUyNTA2In0.obLVCvFCcLLDKdV0liwQRQ";
  map = L.mapbox.map(document.getElementById("map"), "ltran1231.mmfe4jdj", {
    zoomControl: false
  }).setView([45.706, 11.953], 2);
  
  map.dragging.disable();
  map.touchZoom.disable();
  map.doubleClickZoom.disable();
  map.scrollWheelZoom.disable();

  setMarkers();

  // $('.carousel').carousel({
  //     interval: 10000 //changes the speed
  // })
});


var sendPostsCoordsToFB = function () {
  $.get('/posts_data').done(function (pinsData) {
    console.log(pinsData);
    // send data to firebase storage
    // var list_coords = posts.reduce(function(object, coords, index) {
    //   object[index] = JSON.parse("[" + coords.join() + "]");
    //   return object;
    // }, {});
    // console.log(list_coords)
    // remove existing coords and add list
    fbPostsRef.remove();
    var firebaseCoords = fbPostsRef.set(pinsData);

    // console.log(firebaseCoords)
  });
}



var setMarkers = function() {
  var count = 0;
  fbPostsRef.on("child_added", function(snap) {
    count++;
    // console.log("added", snap.key());
    for(var k in snap.val()){
      color = '#' + [
      (~~(Math.random() * 16)).toString(16),
      (~~(Math.random() * 16)).toString(16),
      (~~(Math.random() * 16)).toString(16)].join('');

      var postion = snap.val()[k].coords;
      var marker = L.marker(postion, {
        draggable: false,
        icon: L.mapbox.marker.icon({
          'marker-color': color
        })
      }).addTo(map)
    }  
  });

  // fbPostsRef.on('child_added', function(snapshot){
  //   // var features = []
  //   console.log(snapshot);

  //   for (var k in snapshot.val()) {
  //     // generate random color for the marker
      
  //     var postID = snapshot.val()  
  //     console.log(postID)
  //     var post = snapshot.val()  
  //     console.log(post)
  //     var postion = snapshot.val()[k];
  //     var marker = L.marker(postion, {
  //       draggable: true,
  //       icon: L.mapbox.marker.icon({
  //         'marker-color': color
  //       })
  //     }).addTo(map)
  //   }

  // });
}
