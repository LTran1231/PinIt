var sessions = (function () {
  // users FB reference
  var firebaseRef = new Firebase('https://pinasyougo.firebaseio.com/');

  var alertBox = $('.alert');

  var routeTo = (function(route) {
    window.location.href = route;
  });

  // when login success route user to their show page 
  // otherwise return error
  var handleAuthData = (function(promise) {
    $.post("/login_via_social_media", { user: getProvider(promise), provider: promise.provider })
    .done(function(response){
      routeTo(location.origin);
    }, function (err) {
      console.log(err);
      showAlert({
        title: err.code,
        detail: err.message,
        className: 'alert-danger'
      });
    })
  });

  var getProvider = (function (authData) {
    switch(authData.provider) {
      case 'facebook':
        return authData.facebook;
      case 'google':
        return authData.google;
      case 'twitter':
        return authData.twitter;
    }
  });

  // append errors 
  var showAlert = (function(opts) {
    var title = opts.title;
    var detail = opts.detail;
    var className = 'alert ' + opts.className;

    alertBox.removeClass().addClass(className);
    alertBox.children('#alert-title').text(title);
    alertBox.children('#alert-detail').text(detail);
  });

  // dealing with login, logout, register
  var login = (function(target) {

    $(target).on('click', 'a.btn-social', function(event) {
      event.preventDefault();

      var $currentButton = $(event.target);
      var provider = $currentButton.attr('title');
      firebaseRef.authWithOAuthPopup(provider, function(error, authData){
        if (error)
          console.log(error);
        if (authData)
          console.log(authData)
          firebaseRef.child("users").child(authData.uid).set({
            provider: authData.provider,
            name: getProvider(authData).displayName
        })
      handleAuthData(authData);
      })
    })
  });
  return {
    login: login
  };
})();










