
// $(function() {
// });

var myFirebaseRef = new Firebase("https://pinasyougo.firebaseio.com/");

var loginWithFacebook = function(){
  $('#dialog-login').on('click', '.btn-social', function(event){
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
      var user = authData.facebook;
      var provider = authData.provider;
      var uid = authData.uid;

      var request = $.ajax ({
        url: '/login_via_social_media',
        type: 'post',
        data: { user: user, provider: provider },
        beforeSend: function(xhr) {
          xhr.setRequestHeader('X-CSRF-Token', 
          $('meta[name="csrf-token"]').attr('content'))
        }

      })
      request.done(function(response){
        window.location.href = "users/"+ response.id + "/posts"
      })


    })
  })
};

var makeSomeAjAXCall = function(){
  return $.ajax({
    url: "action",
    method: "GET"
  });
}
var doSomeAJAX = function () {
  var promist = makeSomeAjAXCall();
  promise.done(function(){

  });
  return promise;
};
var whateve = function  () {
  var promise = doSomeAJAX();
  promise.fail(function(){})
  return promise
}

var promise = whateve();


var giveMe42 = function () {
  console.log("giveMe42 was called")
  return new Promise(function(resolve, reject){
  setTimeout(function(){
    resolve(42)
  }, 1000)
});

} 
giveMe42().then(function(answer){
  console.log("promise then callback was called ")
})
.catch(function(error){
  console.log('promise failed', error);
})

















