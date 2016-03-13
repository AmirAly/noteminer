var oauthAuthorizeUrl = 'https://login.live.com/oauth20_authorize.srf',
    oauthTokenUrl = 'https://login.live.com/oauth20_token.srf',
    clientId = '0000000048188A8C',
    clientSecret = 'ewzsi9Deb6DlsFaXoB7vrjVKeB1dgyQH',
    redirectUrl = 'http://amirnoteapi.com/callback.html';
var authCode = getParameterByName('code');
if (authCode) {
    // Request an access token from the auth code
    requestAccessTokenByAuthCode(authCode,
        function (responseData) {
            $('body').append('Loging you to your OneNote Account');
            var accessToken = responseData['access_token'],
                refreshToken = responseData['refresh_token'],
                expiresIn = responseData['expires_in'];
            if (accessToken && refreshToken && expiresIn) {
                // Save the access token on a session. Using cookies in this case:
                localStorage.setItem('access_token', accessToken);
                localStorage.setItem('refresh_token', refreshToken);
                $('body').append('We Made it');
                $('body').append(accessToken);
            } else {
                $('body').append('Handeling this error');
            }
        });
} else {
    // Handle an error passed from the callback query params
    var authError = getParameterByName('error');
    $('body').append('Handeling this error');
}
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// Helper function to create an encoded url query string from an object
function toQueryString(obj) {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}

/**
 * Obtain a Live Connect authorization endpoint URL based on configuration.
 * @returns {string} The authorization endpoint URL
 */
function getAuthUrl() {
    var scopes = ['wl.signin', 'wl.basic', 'wl.offline_access'];
    var query = toQueryString({
        'client_id': clientId,
        'scope': scopes.join(' '),
        'redirect_uri': redirectUrl,
        'display': 'page',
        'locale': 'en',
        'response_type': 'code'
    });
    return oauthAuthorizeUrl + "?" + query;
}

/* Live Connect API request sender */
function requestAccessToken(data, callback) {
    //$.post({
    var q = _.extend({
        'client_id': clientId,
        'client_secret': clientSecret,
        'redirect_uri': redirectUrl
    }, data);
    var subm = toQueryString(q);
    console.log('4');
    $.ajax({
        url: oauthTokenUrl,
        type: 'POST',
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        data: subm,
        timeout: 120000,
        beforeSend: function () {
        },
        success: function (data) {
            console.log(data);
            callback(JSON.parse(data));
        },
        complete: function () {
            console.log(data);
        },
        error: function (request, status, err) {
            console.log(status);
            console.log(err);
        }
    });
}

/**
 * @callback accessTokenCallback
 * @param {object} Response data parsed from JSON API result
 */

/**
 * Request an access token by supplying an authorization code.
 * @param {string} authCode The authorization code
 * @param {accessTokenCallback} callback The callback with response data
 */
function requestAccessTokenByAuthCode(authCode, callback) {
    requestAccessToken({ 'code': authCode, 'grant_type': 'authorization_code' }, callback);
};

/**
 * Request an access token by supplying a refresh token.
 * @param {string} refreshToken The refresh token
 * @param {accessTokenCallback} callback The callback with response data
 */
function requestAccessTokenByRefreshToken(refreshToken, callback) {
    requestAccessToken({ 'refresh_token': refreshToken, 'grant_type': 'refresh_token' }, callback);
};