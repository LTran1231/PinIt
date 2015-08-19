var sessions = (function () {
  // users FB reference
  var firebaseRef = new Firebase('https://pinasyougo.firebaseio.com/');

  var routeTo = (function(route) {
    window.location.href = route;
  });

  // when login success route user to their show page 
  // otherwise return error
  var handleAuthData = (function(promise) {
    $.post("/login_via_social_media", { user: getProvider(promise), provider: promise.provider })
    .done(function(response){
      routeTo(location.origin);
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

  // dealing with login, logout, register
  var login = (function(target) {

    $(target).on('click', 'i.social', function(event) {
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

  var getErrorMsg = (function(cssSelector){
    $(cssSelector).on('submit', function(event){
      event.preventDefault();
      var $target = $(event.target);
      var url = $target.attr('action');
      var data = $target.serialize();
      $.post(url, data ).done(function(response){
        routeTo(location.origin);
      }).fail(function(error){
        $('.sessions-error-messages').empty().append(error.responseText);
      })
    })
  });

  return {
    login: login,
    getErrorMsg: getErrorMsg
  };

})();










