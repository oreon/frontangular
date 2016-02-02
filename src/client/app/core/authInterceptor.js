(function () {
    'use strict';

    var app = angular.module('app');

    app.factory('authInterceptor', ['$rootScope', '$q',  '$localStorage', '$injector' , 'toastr',   authInterceptor]);

    function authInterceptor($rootScope, $q,  $localStorage, $injector, toastr) {
        return {
            request: function (config) {
                config.headers = config.headers || {};
                if ($localStorage.token) {
                   // console.log("sending token " + $localStorage.token);
                    config.headers.Authorization = 'Bearer ' + $localStorage.token;
                }else{
                   // if(typeof $injector != "undefined")

                  //      $injector.get('$state').go('index');
                }
                return config;
            },
            responseError: function (rejection) {
                console.log(rejection);
                var msg = rejection.data + ': ' + rejection.config.url;

                 if (rejection.status === 403) {
                    if (!$localStorage.token){
                        toastr.error("Please log in !");
                         if(typeof $injector != "undefined")
                            $injector.get('$state').go('index');
                         return $q.reject(rejection);
                    }
                 }

                toastr.error(msg);


                if (rejection.status === 401) {
                    $injector.get('$state').go('index');

                    //$window.location = '/auth';
                    // handle the case where the user is not authenticated
                }
                return $q.reject(rejection);
            }
        };
    }

    app.config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    });
})();


/*

 .config(['$httpProvider', function ($httpProvider) {
        //enable cors
        $httpProvider.defaults.useXDomain = true;

        $httpProvider.interceptors.push(['$location', '$injector', '$q', function ($location, $injector, $q) {
            return {
                'request': function (config) {

                    //injected manually to get around circular dependency problem.
                    var AuthService = $injector.get('Auth');

                    if (!AuthService.isAuthenticated()) {
                        $location.path('/login');
                    } else {
                        //add session_id as a bearer token in header of all outgoing HTTP requests.
                        var currentUser = AuthService.getCurrentUser();
                        if (currentUser !== null) {
                            var sessionId = AuthService.getCurrentUser().sessionId;
                            if (sessionId) {
                                config.headers.Authorization = 'Bearer ' + sessionId;
                            }
                        }
                    }

                    //add headers
                    return config;
                },
                'responseError': function (rejection) {
                    if (rejection.status === 401) {

                        //injected manually to get around circular dependency problem.
                        var AuthService = $injector.get('Auth');

                        //if server returns 401 despite user being authenticated on app side, it means session timed out on server
                        if (AuthService.isAuthenticated()) {
                            AuthService.appLogOut();
                        }
                        $location.path('/login');
                        return $q.reject(rejection);
                    }
                }
            };
        }]);
    }]);

  */
