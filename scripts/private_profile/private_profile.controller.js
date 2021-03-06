angular.module('app')
  .controller('PrivateProfileController', ['$scope', '$state', 'SitterManager', 'PopUp', '$materialDialog', 'PrivateProfileService', '$http', '$storage', function($scope, $state, SitterManager, PopUp, $materialDialog, PrivateProfileService, $http, $storage){

    // change this to call the database and pull in any information for the user
    var user = $storage.get('user');

    $scope.getUserInfo = SitterManager.GetAllUserInfo(user, function(user) {
      $scope.user = user;
    });

    $scope.setPetSitterInfo = PrivateProfileService.setPetSitterInfo;

    $scope.userPhoto = (function(){
      var user = SitterManager.GetStubData()[0];
      return user.photo;
    })();

    $scope.uploadImage = function(){
      console.log("placeholder");
    };

    $scope.addPet = function(e){
      PopUp.PopUpCall(e, './scripts/private_profile/private_profile.popup.html');
    };

    $scope.rating = 1;

    $scope.rateUser = function(e){
      $materialDialog({
        templateUrl: './scripts/components/navbar/navbar-popup-templates/rating_popup.tmpl.html',
        targetEvent: e,
        controller: ['$scope', '$hideDialog', 'Navbar', function($scope, $hideDialog, Navbar) {
          $scope.close = function() {
            $hideDialog();
          };
          $scope.submitRating = function(number){
            $scope.rating = number;
            $scope.close();
          };
        }]
      });       
    };


  }]);
