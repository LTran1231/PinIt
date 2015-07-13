
$(function(){
  $("#geocomplete").geocomplete({
    details: ".details",
    detailsAttribute: "data-geo"
  });

  var base = new Firebase("https://pinasyougo.firebaseio.com/posts/");

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

  L.mapbox.accessToken = "pk.eyJ1IjoibHRyYW4xMjMxIiwiYSI6IjJhNThiNDcxZDczNWQwZTkwNjMxMThhNDE4ZGUyNTA2In0.obLVCvFCcLLDKdV0liwQRQ";
  map = L.mapbox.map('map', "ltran1231.mmfe4jdj").setView([45.706, 11.953], 2);

  base.on('child_added', function(snapshot){
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
        draggale: true,
        icon: L.mapbox.marker.icon({
          'marker-color': color
        })
      }).addTo(map)
      // addPoint(marker);

      // features.push(snapshot.val()[k]);
    }

  });

});
