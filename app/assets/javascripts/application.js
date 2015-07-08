
//= require jquery
//= require jquery_ujs
//= require bootstrap-sprockets 
//= require turbolinks
//= require_tree .

$(function() {
  loginWithFacebook();
	// fbLogin();
  // callingEditProfileForm();
	// loginUser();
 //  registerNewUser();

});


var myFirebaseRef = new Firebase("https://pinasyougo.firebaseio.com/");

// login with social media
// returns a promise
// var auth = function(provider){
//   var deferred = $.Deferred();
//   myFirebaseRef.authWithOAuthPopup(provider, function(error, user) {
//   if (error) 
//     console.log('Authentication error: ', error);
//     deferred.reject(error);
//   if (user) 
//     console.log('User ' + user.id + ' authenticated via the ' + user.provider + ' provider!');
//     deferred.resolve(user);
//   })
//   return deferred.promise();
// };

var loginWithFacebook = function(){
  $('#dialog-login').on('click', '.bt-social', function(event){
    event.preventDefault();
    var $currentButton = $(event.target);
    var provider = $currentButton.attr('title');
    // var socialLoginPromise = auth(provider); 
   
    myFirebaseRef.authWithOAuthPopup(provider, function(error, authData) {
    
      if (error) 
        console.log("Login Failed!", error);
      else 
      // the access token will allow us to make Open Graph API calls
      myFirebaseRef.child("users").child(authData.uid).set({
        provider: authData.provider,
        name: authData.facebook.displayName

      })
      var user = authData;

      var request = $.ajax ({
        url: '/login_via_social_media',
        type: 'get',
        data: user

      })

      // $.get( "/login_via_social_media", function(user) {
      //   user

      //   debugger;
      //   $( "#"+ name).html( data );
      //   alert( "Load was performed." );
      // });
    })

  })
};





