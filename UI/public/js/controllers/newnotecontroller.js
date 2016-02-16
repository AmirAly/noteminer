noteMiner.controller("newnoteController", function ($scope, $state, $ionicLoading, $ionicModal, $timeout) {

    $scope.text = 'newnoteController';
    var searchCounter = 0;
    $scope.searchNotes = function () {
        if (searchCounter == 0) {
            $scope.showMap = false;
            // loading
            $ionicLoading.show({
                templateUrl: 'templates/loader.html'
            });
            $timeout(function () {
                $ionicLoading.hide();
                $scope.showMap = true;
            }, 3000);
            searchCounter++;
        }
        else {
            $ionicModal.fromTemplateUrl('searchModal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
            });
            $timeout(function () {
                $scope.modal.show();
            }, 200);
        }

    }
    $scope.cancelSearch = function () {
        $scope.modal.hide();
    }
    $scope.search = function () {
        $scope.modal.hide();
        $scope.showMap = false;
        // loading
        $ionicLoading.show({
            templateUrl: 'templates/loader.html'
        });
        $timeout(function () {
            $ionicLoading.hide();
            $scope.showMap = true;
        }, 3000);
        searchCounter++;
    }

    $scope.showAddNoteModal = function () {
        $ionicModal.fromTemplateUrl('addNote.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });
        $timeout(function () {
            $scope.modal.show();
        }, 200);
    }

    $scope.cancelNewNote = function () {
        $scope.modal.hide();
    }
    $scope.saveNewNote = function () {
        $scope.modal.hide();
    }

    $scope.showSaveCurrentNoteModal = function () {
        $ionicModal.fromTemplateUrl('confirmSave.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });
        $timeout(function () {
            $scope.modal.show();
        }, 200);
    }

    $scope.cancelSaveNote = function () {
        $scope.modal.hide();
    }
    $scope.saveCurrentNote = function () {
        $scope.modal.hide();
    }

    //$scope.openModal = function () {
    //    $scope.modal.show();
    //};
    //$scope.closeModal = function () {
    //    $scope.modal.hide();
    //};
    ////Cleanup the modal when we're done with it!
    //$scope.$on('$destroy', function () {
    //    $scope.modal.remove();
    //});
    //// Execute action on hide modal
    //$scope.$on('modal.hidden', function () {
    //    // Execute action
    //});
    //// Execute action on remove modal
    //$scope.$on('modal.removed', function () {
    //    // Execute action
    //});

});