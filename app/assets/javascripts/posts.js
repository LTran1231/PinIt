var autocompletePostForm = function(){
  $("#geocomplete").geocomplete({
    details: ".details",
    detailsAttribute: "data-geo"
  });
}

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