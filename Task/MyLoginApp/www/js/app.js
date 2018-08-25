// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngRoute', 'ngCordova', 'ngOpenFB'])

.run(function($ionicPlatform, ngFB) {
  ngFB.init({appId: 'YOUR_APP_ID'});
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs).
    // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
    // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
    // useful especially with forms, though we would prefer giving the user a little more room
    // to interact with the app.
    if (window.cordova && window.Keyboard) {
      window.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if (window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }
  });
})

.config(['$routeProvider', function($routeProvider){
  $routeProvider
  .when('/',{
    templateUrl: "../LoginPage.html",
    controller: "LoginController"
  })
  .when('/viewprofile', {
    templateUrl: '../ProfileView.html',
    controller: 'ProfileCtrl'
  })
  .otherwise({
    redirectTo: '/'
  })
}])
.controller('LoginController', function($scope, $ionicModal, $timeout, ngFB){
  $scope.fbLogin = function () {
    ngFB.login({scope: 'email'}).then(
        function (response) {
            if (response.status === 'connected') {
                //console.log('Facebook login succeeded');
                alert('Succeeded');
                window.location.href = "#viewprofile";
                //$scope.closeLogin();
            } else {
                alert('Facebook login failed');
            }
        });
};

})
.controller('ProfileCtrl', function ($scope, ngFB) {
  ngFB.api({
      path: '/me',
      params: {fields: 'id,name'}
  }).then(
      function (user) {
          $scope.user = user;
      },
      function (error) {
          alert('Facebook error: ' + error.error_description);
      });

      $scope.fbLogout = function(){
        alert("Logging out");

        ngFB.logout();
        window.location.href = "/";
      }
});