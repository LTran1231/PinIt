
$(function(){
  // loginWithFacebook();
  firebase = "https://pinasyougo.firebaseio.com/";
  sessions.login(".dialog-login");
  autocompletePostForm();

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

  $(document).on('click', '.signin-link', function(event){
    event.preventDefault();

    $(".signin-signup li").removeClass('active');
    $(this).closest('li').addClass('active');

    $('#dialog-register').hide();
    $('.signin-wrapper').show();
  });

  $(document).on('click', ".signup-link", function(event){
    event.preventDefault();
    $(".signin-signup li").removeClass('active');
    $(this).closest('li').addClass('active');
    // $(".signup-popover").show();
    // $(".signin-popover").hide();

    $("#dialog-register").show();
    $(".signin-wrapper").hide();
  });

  $('.carousel').carousel({
      interval: 5000 //changes the speed
  })
});


var sendPostsCoordsToFB = function () {
  $.get('/posts_data').done(function (posts) {
    console.log(posts)
    // send data to firebase storage
    var list_coords = posts.reduce(function(object, coords, index) {
      object[index] = JSON.parse("[" + coords.join() + "]");
      return object;
    }, {});
    console.log(list_coords)
    // remove existing coords and add list
    base.remove();
    var firebaseCoords = base.push(list_coords);
    console.log(firebaseCoords)
  });
}



var setMarkers = function() {
  firebaseRef = new Firebase(firebase + "posts/");

  firebaseRef.on('child_added', function(snapshot){
    // var features = []
    for (var k in snapshot.val()) {
      // generate random color for the marker
      color = '#' + [
      (~~(Math.random() * 16)).toString(16),
      (~~(Math.random() * 16)).toString(16),
      (~~(Math.random() * 16)).toString(16)].join('');
      var postID = snapshot.val()  
      console.log(postID)
      var post = snapshot.val()  
      console.log(post)
      var postion = snapshot.val()[k];
      var marker = L.marker(postion, {
        draggable: true,
        icon: L.mapbox.marker.icon({
          'marker-color': color
        })
      }).addTo(map)
    }

  });
}
