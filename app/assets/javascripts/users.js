var Sessions = (function () {
  // users FB reference
  var firebaseRef = new Firebase('https://pinasyougo.firebaseio.com/');

  alertBox = $('.sessions-error-messages');

  var routeTo = (function(route) {
    window.location.href = route;
  });

  var btnListener = (function(cssLink, cssHide, cssShow){
    $(document).on('click', cssLink, function(event){
      event.preventDefault();
      $('.sessions-error-messages').empty();
      $(".signin-signup li").removeClass('active');
      $(this).closest('li').addClass('active');

      $(cssHide).hide();
      $(cssShow).show();
    })
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
  var loginViaThirdParty = (function(target) {

    $(target).on('click', 'i.social', function(event) {
      event.preventDefault();

      var $currentButton = $(event.target);
      var provider = $currentButton.attr('title');
      firebaseRef.authWithOAuthPopup(provider, function(error, authData){
        if (error)
          console.log(error)
        if (authData)
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
    btnListener: btnListener,
    loginViaThirdParty: loginViaThirdParty,
    getErrorMsg: getErrorMsg
  };

})();










