noteMiner.service('_util', function() {
    this.callAPI = function (_type,_url,_success,_error,_cashed) {
         $.ajax({
            url: 'https://www.onenote.com/api/v1.0/me/notes/pages?search=' + encodeURIComponent($scope.keyword),
            type: 'get',
            dataType: 'html',
            headers: { 'Authorization': _token },
            timeout: 120000,
            success: function (data) {
				if(_success)
					_success(data);
            },
            complete: function () {
                $ionicLoading.hide();
                console.log('complete');
            },
            error: function (request, status, err) {
                //handle authorization and refresh error
				//then you can call the error
				if(_error)
					_error();
            }
        });
    }
	this.checkServices = function(_txt)
    {
        alert(_txt);
    }
});