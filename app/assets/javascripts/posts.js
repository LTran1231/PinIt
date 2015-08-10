var autocompletePostForm = function(){
  $("#geocomplete").geocomplete({
    details: ".location-detail",
    detailsAttribute: "data-geo"
  });
}
