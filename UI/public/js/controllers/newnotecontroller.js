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
                //$scope.showMap = true;
                DrawMap();
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
            //$scope.showMap = true;
            DrawMap();
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
    $scope.newNoteTxt = '';
    $scope.saveNewNote = function () {
        $scope.modal.hide();
        nodes.add({ id: counter, label: $('#newNoteTxt').val().substring(0,7) });
        edges.add({ from: 1, to: counter });
        //network = new vis.Network(container, data, options);
        counter++;
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
    var counter = 6;
    var edges = new vis.DataSet([
          { from: 1, to: 3 },
          { from: 1, to: 2 },
          { from: 2, to: 4 },
          { from: 2, to: 5 }
    ]);
    var nodes = new vis.DataSet([
  { id: 1, label: 'Spanish' },
  { id: 2, label: 'Sound cloud ..' },
  { id: 3, label: 'Skype' },
  { id: 4, label: 'Node 4' },
  { id: 5, label: 'Node 5' }
    ]);
    var network
    function DrawMap() {
        // create an array with edges
        

        // create a network
        var container = document.getElementById('graphDiv');
        var data = {
            nodes: nodes,
            edges: edges
        };
        var options = {
            width: '100%',
            height: '800px'
        };
        network = new vis.Network(container, data, options);
    }

});