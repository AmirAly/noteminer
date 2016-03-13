
noteMiner.controller("LoginController", function ($scope, $state,_util) {
    localStorage.clear();
	_util.checkServices('Testing');
    WL.init({
        client_id: '0000000048188A8C',
        redirect_uri: 'http://amirnoteapi.com/callback.html',
        scope: 'office.onenote_update',
        response_type: "token"
    });
    WL.ui({
        name: "signin",
        element: "signin",
        type: 'connect',
        onerror: log
    });
    WL.Event.subscribe("auth.login", onLogin);
    //WL.getLoginStatus(function (response) { alert("Your status is: " + response.status) });
    function log(_err) {
        console.log(_err);
    }
    function onLogin(session) {
        console.log(session);
        if (!session.error) {
            var _token = 'Bearer ' + session.session.access_token;
            localStorage.setItem('token', _token);
            $state.go('app.newnote');
        }
        else {
            document.getElementById("info").innerText =
                "Error signing in: " + session.error_description;
        }
    }

});
