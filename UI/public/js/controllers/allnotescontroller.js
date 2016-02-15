noteMiner.controller("allnotesController", function ($scope, $state) {

    $scope.text = 'allnotesController';
    $scope.search = function () {
        $state.go('app.newnote');
    }
});