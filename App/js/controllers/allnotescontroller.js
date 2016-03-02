noteMiner.controller("allnotesController", function ($scope, $state) {

    $scope.text = 'allnotesController';
    $scope.showMapDetails = function () {
        $state.go('app.newnote');
    }
});

function filter() {
        $('#dvNoResult').addClass('hide');
        var phrase = $('#txtSearchMap').val();
        var count = 0;
        $('.filterable .dvNoteName span').each(function () {
            if ($(this).html().toLowerCase().indexOf(phrase) < 0) {
                $(this).parent().parent().parent().hide();
            }
            else {
                $(this).parent().parent().parent().show(200);
                count++;
            }
        });
        if (count == 0) {
            $('#dvNoResult').removeClass('hide');
        }
    }