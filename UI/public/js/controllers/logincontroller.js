﻿noteMiner.controller("LoginController", function ($scope, $state) {

    $scope.login = function () {
        $state.go('app.recentnotes');
    }
});

// local storage update 
//var updatedUser = localstorage.getObject('currentUser');
//updatedUser.FirstName = "eeeeee";
//localstorage.resetObject('currentUser', updatedUser);