noteMiner.controller("newnoteController", function ($scope, $state, $ionicLoading,$timeout) {

    $scope.text = 'newnoteController';

    $scope.searchNotes = function () {
        $scope.showMap = false;
        // loading
        $ionicLoading.show({
            templateUrl: 'templates/loader.html'
        });
        $timeout(function () {
            $ionicLoading.hide();
            $scope.showMap = true;
        }, 3000);
    }
    
});