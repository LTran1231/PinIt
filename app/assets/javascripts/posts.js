var submitPost = (function(){

	var autoCompleteLocation = (function(geoCompleteField){
		var i = 0;
	  $(geoCompleteField).geocomplete({
		})
		.bind("geocode:result", function(event, result){
			$(geoCompleteField).val("");

			$('.added-address').html($('.added-address').html() + 
				"<i class='fa fa-map-marker'></i> " + result.adr_address + "  <a href='#' class='delete_location'>Delete</a><br>"
			)
			$('.location-logger').html($('.location-logger').html() + 
				"<br><input name='post[locations_attributes]["+i+"][address]' type='text' value='"+result.name+"'>" + 
				"<br><input name='post[locations_attributes]["+i+"][lat]' type='text' value='"+result.geometry.location.lat()+"'>" +
				"<br><input name='post[locations_attributes]["+i+"][lng]' type='text' value='"+result.geometry.location.lng()+"'>" 
			)
			i++;
		})
			
	});

	var contentEditor = (function(cssSelector){
		$(cssSelector).summernote({height: 300});
	});

	return {
		autoCompleteLocation: autoCompleteLocation,
		contentEditor: contentEditor,
		// addLocationFields: addLocationFields
	};

})();

