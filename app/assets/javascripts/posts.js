

var submitPost = (function(){

	var autoCompleteLocation = (function(geoCompleteField){
		var i = 0;
	  $(geoCompleteField).geocomplete({
		})
		.bind("geocode:result", function(event, result){
			$(geoCompleteField).val("");

			$('.added-address').html($('.added-address').html() + 
				"<br>" + result.adr_address + "  <a href='#' class='delete_location'>Delete</a>"
			)
			$('.location-logger').html($('.location-logger').html() + 
				// "<br>" + result.adr_address + "  <a href='#' class='delete_location'>Delete</a>" +
				"<br><input name='post[locations_attributes]["+i+"][address]' type='hidden' value='"+result.name+"'>" + 
				"<br><input name='post[locations_attributes]["+i+"][lat]' type='hidden' value='"+result.geometry.location.lat()+"'>" +
				"<br><input name='post[locations_attributes]["+i+"][lng]' type='hidden' value='"+result.geometry.location.lng()+"'>" 
			)
			i++;
		})
			
	});

	// var addLocationFields = (function(btnSelector){
	// 	$(btnSelector).on('click', function(event){
	// 		event.preventDefault();
	// 		$('.location-logger').append($(".location-detail"));
	// 	})
	// });

	// var postFormData = (function(formSelector){
	// 	$(formSelector).on('submit', function(event){
	// 		event.preventDefault(); 
	// 		$target = $(event.target)
	// 		var url = $target.attr('action')

	// 		$.post(url, ($(this).serialize()))
	// 	})
	// });

	return {
		autoCompleteLocation: autoCompleteLocation,
		// postFormData: postFormData,
		// addLocationFields: addLocationFields
	};

})();

