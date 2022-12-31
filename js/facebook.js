

    // facebook button
    window.fbAsyncInit = function() {
        // FB JavaScript SDK configuration and setup
        FB.init({
          appId      : '498101595771604', // FB App ID
          cookie     : true,  // enable cookies to allow the server to access the session
          xfbml      : true,  // parse social plugins on this page
          version    : 'v3.2' // use graph api version 2.8
        });
        
        // Check whether the user already logged in
        FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                //display user data
                getFbUserData();
            }
        });
    };
    
    // Load the JavaScript SDK asynchronously
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    
    // Facebook login with JavaScript SDK
    function fbLogin() {
        FB.login(function (response) {
            if (response.authResponse) {
                // Get and display the user profile data
                getFbUserData();
            } else {
                document.getElementById('status').innerHTML = 'User cancelled login or did not fully authorize.';
            }
        }, {scope: 'email'});
    }
    
    // Fetch the user profile data from facebook
    function getFbUserData(){
        FB.api('/me', {locale: 'en_US', fields: 'id,first_name,last_name,email,link,gender,locale,picture'},
        function (response) {
            document.getElementById('fbLink').setAttribute("onclick","fbLogout()");
            document.getElementById('fbLink').innerHTML = 'Logout from Facebook';
            document.getElementById('status').innerHTML = '<p>Thanks for logging in, ' + response.first_name + '!</p>';
            document.getElementById('userData').innerHTML = '<h2>Facebook Profile Details</h2><p><img src="'+response.picture.data.url+'"/></p><p><b>FB ID:</b> '+response.id+'</p><p><b>Name:</b> '+response.first_name+' '+response.last_name+'</p><p><b>Email:</b> '+response.email+'</p><p><b>Gender:</b> '+response.gender+'</p><p><b>FB Profile:</b> <a target="_blank" href="'+response.link+'">click to view profile</a></p>';
        });
    }


//googel sing in function

    var googleUser = {};
    var startApp = function() {
      gapi.load('auth2', function(){
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        auth2 = gapi.auth2.init({
          client_id: '336416254136-iku81sq3h9pc395moa32771njh6aq5ld.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          // Request scopes in addition to 'profile' and 'email'
          //scope: 'additional_scope'
        });
        attachSignin(document.getElementById('customBtn'));
      });
    };
  
    function attachSignin(element) {
      console.log(element.id);
      auth2.attachClickHandler(element, {},
          function(googleUser) {
            document.getElementById('name').innerText = "Signed in: " +
                googleUser.getBasicProfile().getName();
          }, function(error) {
            alert(JSON.stringify(error, undefined, 2));
          });
    }

    // function onSuccess(googleUser) {
    //     console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    //   }
    //   function onFailure(error) {
    //     console.log(error);
    //   }
    //   function renderButton() {
    //     gapi.signin2.render('my-signin2', {
    //       'scope': 'profile email',
    //       'width': 240,
    //       'height': 50,
    //       'longtitle': true,
    //       'theme': 'dark',
    //       'onsuccess': onSuccess,
    //       'onfailure': onFailure
    //     });
    //   }

    // const clientLoad = new Promise(resolve => {
    //     gapi.load('auth2', () => {
    //       resolve(gapi.auth2.init({ client_id: '<your_client_id>' }));
    //     });
    //   });
      
    //   async function login() {
    //     const client = await clientLoad;
    //     const response = client.signIn().catch((e) => {
    //       // in case user closes the popup
    //       if (e.error === 'popup_closed_by_user') {
    //         return null;
    //       }
    //       throw e;
    //     });
      
    //     // handle your authentication flow with the token received
    //     console.log(response.getAuthResponse());
    //   }