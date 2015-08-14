var autocompletePostForm = function(){
  $("#geocomplete").geocomplete({
    details: ".location-detail",
    detailsAttribute: "data-geo"
  })
  .bind("geocode:result", function(event, result){
		$("#geocomplete").val("");

		$('.location-logger').html($(".location-logger").html() + "<br> * " + result.formatted_address + "  <a href='#' class='delete_location'>Delete</a>");
		var url = location.pathname.replace("new", "")

		$.post(url, { location: { lat: result.geometry.location.lat(), lng: result.geometry.location.lng() }})
	})
};

