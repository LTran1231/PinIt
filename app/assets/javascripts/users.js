var sessions = (function () {
  // users FB reference
  var firebaseRef = new Firebase('https://pinasyougo.firebaseio.com/');

  var alertBox = $('#alert');

  var routeTo = function(route) {
    window.location.href = route;
  }

  var providerLogin = function(provider) {
    var deferred = $.Deferred();
    firebaseRef.authWithOAuthPopup(provider, function(err, user){
      if (err)
        console.log( "login failed" + err);
        deferred.reject(err);
      if (user) 
        console.log(user)
        deferred.resolved(user);
      console.log("login" + user);
    })
    return deferred.promise();
  };
  // when login success route user to their show page 
  // otherwise return error
  var handleAuthData = function(promise, route) {
    $.when(promise)
    .then(function(authData){
      routeTo(route);
    }, function (err) {
      console.log(err);
      showAlert({
        title: err.code,
        detail: err.message,
        className: 'alert-danger'
      });
    })
  };

  // append errors 
  var showAlert = function(opts) {
    var title = opts.title;
    var detail = opts.detail;
    var className = 'alert ' + opts.className;

    alertBox.removeClass().addClass(className);
    alertBox.children('#alert-title').text(title);
    alertBox.children('#alert-detail').text(detail);
  }

  // dealing with login, logout, register
  var login = (function(target) {

    $(target).on('click', 'a.btn-social', function(event) {
      event.preventDefault();

      var $currentButton = $(event.target);
      var provider = $currentButton.attr('title');
      providerLogin(provider);
      // console.log(socialLoginPromise)
          // $.post('/login_via_social_media' )
      firebaseRef.onAuth(function(authData){
        if (authData)
          console.log(authData)
          firebaseRef.child("users").child(authData.uid).set({
            provider: authData.provider,
            name: authData.facebook.displayName
        })
      handleAuthData(providerLogin(provider), location.origin);
      })
    })
  });
  return {
    login: login
  };
})();










