
$(function(){

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
  
  L.mapbox.accessToken = "pk.eyJ1IjoibHRyYW4xMjMxIiwiYSI6IjJhNThiNDcxZDczNWQwZTkwNjMxMThhNDE4ZGUyNTA2In0.obLVCvFCcLLDKdV0liwQRQ";
  pinItMapBox = "ltran1231.mmfe4jdj"

  map = L.mapbox.map(document.getElementById("map"), pinItMapBox, {
    // zoomControl: false
  }).setView([45.706, 11.953], 2)

  
  map.dragging.disable();
  map.touchZoom.disable();
  map.doubleClickZoom.disable();
  map.scrollWheelZoom.disable();

  Map.sendPostsCoordsToFB('/pins');
  Map.setMarkers();


  // $('.carousel').carousel({
  //     interval: 10000 //changes the speed
  // })
  
  Search.autoComplete('#_search_Geocomplete');

});

var Map = (function(){

  var sendPostsCoordsToFB = (function (getRoute) {
    $.get(getRoute).done(function (pinsData) {
      // fbPostsRef.remove();
      var firebaseCoords = fbPostsRef.set(pinsData);
    })
  });

  var setMarkers = (function() {
    var markers = new L.MarkerClusterGroup();
    fbPostsRef.on("child_added", function(snap) {

      for(var k in snap.val()){
        var color = '#' + [
        (~~(Math.random() * 16)).toString(16),
        (~~(Math.random() * 16)).toString(16),
        (~~(Math.random() * 16)).toString(16)].join('');

        postID = k;
        var content = getPostData("/post_data");

        var postion = snap.val()[k].coords;
        var marker = L.marker(postion, {
          draggable: false,
          icon: L.mapbox.marker.icon({
            'marker-symbol': 'post',
            'marker-color': color
          }),
          content: content
        })

        marker.bindPopup(content));
        markers.addLayer(marker);

      }
    })
    map.addLayer(markers);  
  });

  var getPostData = (function(route) {
    $.get(route, {postID: postID}).done(function(data){
      // console.log(data);
      title: data.title;


    })
  })


  return {
    sendPostsCoordsToFB: sendPostsCoordsToFB,
    setMarkers: setMarkers,
    // featureLayer: featureLayer
  }
})();

var Search = (function(){
  var autoComplete = (function(cssForm){
    $(cssForm).geocomplete({

    })
    .bind("geocode:result", function(event, result){
      lat = result.geometry.location.lat(); 
      lng = result.geometry.location.lng();
      map.setView(new L.LatLng(lat, lng), 10);
      $(cssForm).val("");

      submitForm();

    })
    // Trigger geocoding request.


  });
  // console.log(center);
    
  var submitForm = (function(){
    var url = '/search';
    $.post(url, {lat: lat, lng: lng}).done(function(data){
      console.log(data);
    })
  })


  return {
    autoComplete: autoComplete,
    submitForm: submitForm,
  }

})();






