
// var myFirebaseRef = new Firebase("https://pinasyougo.firebaseio.com/");

// // login with social media
// // returns a promise
// var auth = function(provider){
// 	var deferred = $.Deferred();
// 	myFirebaseRef.authWithOAuthPopup(provider, function(error, user) {
//   if (error) 
//     console.log('Authentication error: ', error);
//   	deferred.reject(error);
//   if (user) 
//     console.log('User ' + user.id + ' authenticated via the ' + user.provider + ' provider!');
//   	deferred.resolve(user);
// 	})
// 	return deferred.promise();
// };

// route to the specified route if sucessful
// if there is an error, show the alert
// var handleAuthResponse = function(promise, route) {
// 	$.when(promise)
// 	.then(function(authData) {
// 		window.location.href = '#/' + route;
// 	}, function(error) {
// 		console.log(error);

// 		showAlert({
// 			title: error.code,
// 			detail: error.message,
// 			className: 'alert-danger'
// 		})
// 	})
// };

// var showAlert = function(opts) {
// 	// var title = opts.title;
// 	var detail = opts.detail;
// 	var className = 'alert' + opts.className;

// 	alertBox.removeClass().addClass(className);
// 	alertBox.children('#alert-title').text(title);
// 	alertBox.children('#alert-detail').text(detail);
// }

// var loginWithFacebook = function(){
// 	$('#dialog-login').on('click', '.bt-social', function(event){
// 		event.preventDefault();
// 		var $currentButton = $(event.target);
// 		var provider = $currentButton.attr('title');
// 		var socialLoginPromise;	

// 		socialLoginPromise = auth(provider);
// 		handleAuthResponse(socialLoginPromise, '/users/show');	


// 	})
// };


// var registerNewUser = function(){
// 	$('#opener-register').on('click', function(){
// 		$('#dialog-login').dialog("open");
// 	});

// }
// var registerNewUser = function(){
// 	$('#dialog-register').on('submit', function(event){
// 		event.preventDefault();
// 		auth.createUser(email, password, function(error, user) {
// 		  if (error === null) 
// 		    console.log("User created successfully:", user);
// 		  else 
// 		    console.log("Error creating user:", error);
// 		})
// 		auth.login('password', {
// 			email: '<email@domain.com>',
// 			password: '<password>'
// 		});
// 	})
// };

