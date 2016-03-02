noteMiner.controller("newnoteController", function ($scope, $state, $ionicLoading, $ionicModal, $timeout) {
    var _token = localStorage.getItem('token');
    if (_token && _token != null && _token.length > 0) {
    }
    else {
        $state.go('app.login');
    }
    $scope.text = 'newnoteController';
    var searchCounter = 0;
    $scope.keyword = '';
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
        $ionicLoading.show({
            templateUrl: 'templates/loader.html'
        });
        $.ajax({
            url: 'https://www.onenote.com/api/v1.0/me/notes/pages?search=' + encodeURIComponent($scope.keyword),
            type: 'get',
            dataType: 'html',
            headers: { 'Authorization': _token },
            timeout: 120000,
            success: function (data) {
                clearPages();
                var found = JSON.parse(data).value;
                for (var i = 0 ; i < found.length; i++) {
                    var note = found[i];
                    console.log(note)
                    try {
                        var border = 1;
                        console.log($scope.keyword);
                        if (note.title.toLowerCase().indexOf($scope.keyword.toLowerCase()) > -1) {
                            border = 6;
                        }
                        nodes.add({
                            id: note.id, label: note.title, nodeType: 'page', shape: 'square', size: 20, color: '#ffeeee', font: {
                                color: '#222',
                                size: 10, // px
                                face: 'arial'
                            },
                            borderWidth: border
                        });
                        edges.add({ from: note.parentSection.id, to: note.id })

                    }
                    catch (ex) {
                        nodes.update({
                            id: note.id, label: note.title, nodeType: 'page', shape: 'square', size: 20, color: '#ffeeee', font: {
                                color: '#222',
                                size: 10, // px
                                face: 'arial'
                            },
                            borderWidth: 5
                        })
                    }

                }
            },
            complete: function () {
                $ionicLoading.hide();
                console.log('complete');
            },
            error: function (request, status, err) {
                console.log(err);
            }
        });
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
    $scope.NoteBody = '';
    $scope.NoteTitle = '-';
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
    var network;
    function viewNode(_node) {
        var inNode = getNode(_node.nodes[0]);
        if (inNode.nodeType == 'section')
            addSectionPages(inNode);
        else if ((inNode.nodeType == 'page'))
            viewPage(inNode);
    }
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
            height: '800px',
            physics: {
                maxVelocity: 5,
            }
        };
        network = new vis.Network(container, data, options);
        network.on("click", function (obj) {
            if (obj.nodes && obj.nodes.length > 0) {
                viewNode(obj);
            }
        })
    }
    function getNode(_id) {
        for (var property in nodes._data) {
            if (nodes._data.hasOwnProperty(property)) {
                if (property == _id)
                    return nodes._data[property];
            }
        }
    }
    function clearPages() {
        for (var property in nodes._data) {
            if (nodes._data.hasOwnProperty(property)) {
                var n = nodes._data[property];
                if (n.nodeType == 'page')
                    nodes.remove(n.id);
            }
        }
    }
    function viewPage(_page) {
        $.ajax({
            url: 'https://www.onenote.com/api/v1.0/me/notes/pages/' + _page.id + '/content',
            type: 'get',
            headers: { 'Authorization': _token },
            timeout: 120000,
            success: function (data) {
                var pages = data.value;
                var title = data.split('<title>')[1].split('</title>')[0];
                $scope.NoteBody = data;
                $scope.NoteTitle = title;
                $ionicModal.fromTemplateUrl('NoteView.html', {
                    scope: $scope,
                    animation: 'slide-in-up'
                }).then(function (modal) {
                    $scope.modal = modal;
                });
                $timeout(function () {
                    $scope.modal.show();
                }, 200);
            },
            complete: function () {
                $ionicLoading.hide();
            },
            error: function (request, status, err) {
                console.log(err);
            }
        });

    }
    function addSectionPages(_sec) {
        $.ajax({
            url: 'https://www.onenote.com/api/v1.0/me/notes/sections/' + _sec.id + '/pages',
            type: 'get',
            headers: { 'Authorization': _token },
            timeout: 120000,
            success: function (data) {
                var pages = data.value;
                for (var i = 0 ; i < pages.length; i++) {
                    var page = pages[i];
                    nodes.add({
                        id: page.id, label: page.title, nodeType: 'page', shape: 'square', size: 20, color: '#ffeeee', font: {
                            color: '#222',
                            size: 10, // px
                            face: 'arial'
                        },
                    });
                    edges.add({ from: _sec.id, to: page.id })
                }
                //DrawMap();
            },
            complete: function () {
                $ionicLoading.hide();
            },
            error: function (request, status, err) {
                console.log(err);
            }
        });
    }
    $(document).ready(function () {
        initMap();
    });
    function initMap() {
        $ionicLoading.show({
            templateUrl: 'templates/loader.html'
        });

        $.ajax({
            url: 'https://www.onenote.com/api/v1.0/me/notes/notebooks?$expand=sections',
            type: 'get',
            dataType: 'html',
            headers: { 'Authorization': _token },
            timeout: 120000,
            success: function (data) {
                var books = JSON.parse(data).value;
                for (var i = 0 ; i < books.length; i++) {
                    var book = books[i];
                    nodes.add({ id: book.id, label: book.name, nodeType: 'book', size: 50, shape: 'database', borderWidth: 5 });
                    for (var s = 0 ; s < book.sections.length; s++) {
                        var section = book.sections[s];
                        nodes.add({
                            id: section.id, label: section.name, nodeType: 'section', shape: 'circle', size: 30, color: '#903050', font: {
                                color: '#fff',
                                size: 10, // px
                                face: 'arial'
                            },
                        });
                        edges.add({ from: book.id, to: section.id })
                    }
                }
                DrawMap();
            },
            complete: function () {
                $ionicLoading.hide();
            },
            error: function (request, status, err) {
                console.log(err);
            }
        });
    }
    var edges = new vis.DataSet([

    ]);
    var nodes = new vis.DataSet([

    ]);
});