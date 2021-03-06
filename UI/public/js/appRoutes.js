var noteMiner = angular.module("noteMiner", ['ionic']).run(function ($templateCache, $http) {

    $http.get('templates/login.html', { cache: $templateCache });
    $http.get('templates/recentnotes.html', { cache: $templateCache });
    $http.get('templates/allnotes.html', { cache: $templateCache });
    $http.get('templates/menu.html', { cache: $templateCache });
    $http.get('templates/loader.html', { cache: $templateCache });
    $http.get('templates/newnote.html', { cache: $templateCache });
});

noteMiner.config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router, which uses the concept of states.
    // Learn more here: https://github.com/angular-ui/ui-router.
    // Set up the various states in which the app can be.
    // Each state's controller can be found in controllers.js.
    $urlRouterProvider.otherwise('/login');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
     .state('login', {
         url: '/login',
         controller: "LoginController",
         templateUrl: 'templates/login.html'
     })

     .state('app', {
         url: '/app',
         abstract: true,
         templateUrl: 'templates/menu.html',
         controller: 'MainController'
     })
        .state('app.recentnotes', {
            url: '/recentnotes',
            views: {
                'menuContent': {
                    controller: "recentnotesController",
                    templateUrl: 'templates/recentnotes.html'
                }
            }

        })
        .state('app.newnote', {
            url: '/newnote',
            views: {
                'menuContent': {
                    controller: "newnoteController",
                    templateUrl: 'templates/newnote.html'
                }
            }
        })

        .state('app.allnotes', {
            url: '/allnotes',
            views: {
                'menuContent': {
                    controller: "allnotesController",
                    templateUrl: 'templates/allnotes.html'
                }
            }
        })
    ;

})
