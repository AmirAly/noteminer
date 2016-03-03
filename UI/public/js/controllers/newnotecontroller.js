noteMiner.controller("newnoteController", function ($scope, $state, $ionicLoading, $ionicModal, $timeout, $ionicPopover) {

    $ionicPopover.fromTemplateUrl('templates/export.html', {
        scope: $scope,
    }).then(function (popover) {
        $scope.popover = popover;
    });

    $scope.exportPNG = function () {
        $scope.popover.hide();
    }

    $scope.exportCSV = function () {
        $scope.popover.hide();
    }

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
        nodes.add({ id: counter, label: $('#newNoteTxt').val().substring(0, 7) });
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
          { from: 1, to: 4 },
          { from: 4, to: 5 },
          { from: 4, to: 6 },
          { from: 4, to: 7 },
          { from: 2, to: 11 },
          { from: 2, to: 12 },
          { from: 2, to: 13 },
          { from: 13, to: 14 },
          { from: 3, to: 8 },
          { from: 3, to: 9 },
          { from: 3, to: 10 },
          { from: 7, to: 12 }
    ]);
    var nodes = new vis.DataSet([
  { id: 1, label: 'Notes' },
  { id: 2, label: 'Meetings' },
  { id: 3, label: 'Feature projects' },
  { id: 4, label: 'My Car' },
  { id: 5, label: 'Car installement' },
  { id: 6, label: 'Car Rental in ..' },
  { id: 7, label: 'Car Fix' },
  { id: 8, label: 'Carly.io' },
  { id: 9, label: 'Carly Landing page' },
  { id: 10, label: 'Carly Features' },
  { id: 11, label: 'IBM Meeting' },
  { id: 12, label: 'Transportation' },
  { id: 13, label: 'Agenda' },
  { id: 14, label: 'Next Meeting' },
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
        network.on("click", function (obj) {
            if(obj.nodes && obj.nodes.length >0)
            {
                $ionicModal.fromTemplateUrl('NoteView.html', {
                    scope: $scope,
                    animation: 'slide-in-up'
                }).then(function (modal) {
                    $scope.modal = modal;
                });
                $timeout(function () {
                    $scope.modal.show();
                }, 200);
            }
        })
    }
    $(document).ready(function () {
        DrawMap();
    });

});