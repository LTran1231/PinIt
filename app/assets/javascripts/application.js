// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require bootstrap-sprockets 
//= require turbolinks
//= require_tree .

$(function() {
	// fbLogin();
  // callingEditProfileForm();
	
});

var myRef = new Firebase("https://pinasyougo.firebaseio.com");
var authClient = new FirebaseSimpleLogin(myRef, function(error, user) {
  if (error) {
    // an error occurred while attempting login
    console.log(error);
  } else if (user) {
    // user authenticated with Firebase
    console.log("User ID: " + user.uid + ", Provider: " + user.provider);
  } else {
    // user is logged out
  }
});

var callingEditProfileForm = function(){
  $('header.container').on('click', 'li.edit-profile', function(event){
    event.preventDefault();
    var target = $(event.target);

      ('.profile-edit-div').show();
      debugger;

  })
}

// var modalTrigger = function(){
// 	$("#modal_trigger").leanModal({
// 	 	top : 200, 
// 	 	overlay : 0.6, 
// 	 	closeButton: ".modal_close" 
// 	});
// }
