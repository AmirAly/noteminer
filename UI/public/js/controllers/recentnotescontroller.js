noteMiner.controller("recentnotesController", function ($scope, $state) {

    $scope.text = 'recentnotesController';
    $scope.allMaps = function () {
        $state.go('app.allnotes');
    }
    $scope.showMapDetails = function () {
        $state.go('app.newnote');
    }
});