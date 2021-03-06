// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('VibrationsCtrl', function($scope, $ionicPopup, $ionicModal, $cordovaVibration, $timeout){
    $scope.vibrations = [
        {
            name: 'Foo',
            duration: 800
        },
        {
            name: 'Bar',
            duration: 240
        },
        {
            name: 'Baz',
            duration: 499
        }
    ];

    $scope.listConfig = {
        showDelete: false
    };

    $scope.delete = function(item) {
        $scope.vibrations.splice($scope.vibrations.indexOf(item), 1);
    };


    $scope.vibration = {
        name: '',
        duration: ''
    };

    $ionicModal.fromTemplateUrl('create.html', function(modal) {
        $scope.createModal = modal;
    }, {
        focusFirstInput: true,
        scope: $scope
    });

    $scope.new = function() {
        $scope.createModal.show();
    };
        
    $scope.close = function() {
        $scope.createModal.hide();
    };

    $scope.create = function(vibration) {
        if (!vibration.name || !vibration.duration) {
            $ionicPopup.alert({
                title: 'Validation Error',
                template: 'Please enter name and duration'
            });
            return;
        }
        $scope.vibrations.push(angular.copy(vibration));
        $scope.createModal.hide();
        vibration.name = vibration.duration = '';
    };

    $scope.vibrate = function(vibration) {
        var duration = parseInt(vibration.duration);
        var alert = $ionicPopup.alert({
            title: 'Vibrations',
            template: vibration.name
        });
        $timeout(function(){
            alert.close();
        }, duration);
        $cordovaVibration.vibrate(duration);
    };
});
