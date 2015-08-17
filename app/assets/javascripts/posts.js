var submitPost = (function(){

	var autoCompleteLocation = (function(geoCompleteField){
		var i = 0;
	  $(geoCompleteField).geocomplete({
		})
		.bind("geocode:result", function(event, result){
			$(geoCompleteField).val("");

			$('.added-address').html($('.added-address').html() + 
				"<div class='pin-marker-"+i+"'><i class='fa fa-map-marker'></i> " + result.adr_address + "  <a href='#' class='delete_location'>Delete</a><br></div>"
			)
			$('.location-logger').html($('.location-logger').html() + 
				"<div class='pin-marker-"+i+"'><br><input name='post[locations_attributes]["+i+"][address]' type='text' value='"+result.name+"'>" + 
				"<br><input name='post[locations_attributes]["+i+"][lat]' type='text' value='"+result.geometry.location.lat()+"'>" +
				"<br><input name='post[locations_attributes]["+i+"][lng]' type='text' value='"+result.geometry.location.lng()+"'></div>" 
			)
			i++;
		})
			
	});

	var contentEditor = (function(cssSelector){
		$(cssSelector).summernote({height: 300});
		$(cssSelector).code($('textarea').text());
	});

	var deletePin = (function(cssSelector){
		$('.added-address').on('click', cssSelector, function(event){
			event.preventDefault();
			$target = $(event.target);
			var getClassName = $target.closest('div').attr('class');
			$target.closest('.field').find('.'+getClassName).remove();
		})
	});

	return {
		autoCompleteLocation: autoCompleteLocation,
		contentEditor: contentEditor,
		deletePin: deletePin 
	};

})();

