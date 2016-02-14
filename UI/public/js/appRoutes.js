var noteMiner = angular.module("noteMiner", ['ionic']).run(function ($templateCache, $http) {

    $http.get('templates/login.html', { cache: $templateCache });
    $http.get('templates/recentnotes.html', { cache: $templateCache });
    //$http.get('templates/viewpatient.html', { cache: $templateCache });
    //$http.get('templates/menu.html', { cache: $templateCache });
    //$http.get('templates/accounts.html', { cache: $templateCache });
    //$http.get('templates/addaccount.html', { cache: $templateCache }); 
    //$http.get('templates/addpatient.html', { cache: $templateCache });
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
        .state('app.search', {
            url: '/search',
            views: {
                'menuContent': {
                    templateUrl: 'templates/search.html'
                }
            }
        })

        .state('app.browse', {
            url: '/browse',
            views: {
                'menuContent': {
                    templateUrl: 'templates/browse.html'
                }
            }
        })

    //.state('recentnotes', {
    //    url: '/recentnotes',
    //    controller: "recentnotesController",
    //    templateUrl: 'templates/recentnotes.html'
    //})


    //  .state('app.playlists', {
    //      url: '/playlists',
    //      views: {
    //          'menuContent': {
    //              templateUrl: 'templates/playlists.html',
    //              controller: 'PlaylistsCtrl'
    //          }
    //      }
    //  })

    //.state('app.single', {
    //    url: '/playlists/:playlistId',
    //    views: {
    //        'menuContent': {
    //            templateUrl: 'templates/playlist.html',
    //            controller: 'PlaylistCtrl'
    //        }
    //    }
    //});
    //  // if none of the above states are matched, use this as the fallback
    //  $urlRouterProvider.otherwise('/app/playlists');

    //.state('recentnotes', {
    //    url: '/recentnotes',
    //    controller: "recentnotesController",
    //    templateUrl: 'templates/recentnotes.html'
    //})
    //.state('viewpatient', {
    //    url: '/viewpatient',
    //    controller: "viewpatientController",
    //    templateUrl: 'templates/viewpatient.html'
    //})
    //.state('menu', {
    //    url: '/menu',
    //    controller: "menuController",
    //    templateUrl: 'templates/menu.html'
    //})
    //.state('accounts', {
    //    url: '/accounts',
    //    controller: "accountsController",
    //    templateUrl: 'templates/accounts.html'
    //})
    // .state('addaccount', {
    //     url: '/addaccount',
    //     controller: "addaccountController",
    //     templateUrl: 'templates/addaccount.html'
    // })
    //.state('addpatient', {
    //    url: '/addpatient',
    //    controller: "addpatientController",
    //    templateUrl: 'templates/addpatient.html'
    //})

    ;

})
