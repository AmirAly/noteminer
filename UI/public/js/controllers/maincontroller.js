noteMiner.controller("MainController", function ($scope, $state, $ionicSideMenuDelegate) {

    $scope.text = 'MainController';
    $scope.toggleLeftSideMenu = function () {
        $ionicSideMenuDelegate.toggleLeft();
    };

    $scope.$watch(function () {
        return $ionicSideMenuDelegate.getOpenRatio();
    },
               function (ratio) {
                   if (ratio == 1) {
                       $scope.showMenu = true;
                   }
                   else {
                       $scope.showMenu = false;
                   }
               });

    $scope.newMap = function () {
        $state.go('app.newnote');
    }
});