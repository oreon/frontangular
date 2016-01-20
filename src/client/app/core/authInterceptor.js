(function () {
    'use strict';

    var app = angular.module('app');

    app.factory('authInterceptor', ['$rootScope', '$q',  '$localStorage', '$injector' , 'toastr',   authInterceptor]);

    function authInterceptor($rootScope, $q,  $localStorage, $injector, toastr) {
        return {
            request: function (config) {
                config.headers = config.headers || {};
                if ($localStorage.token) {
                    console.log("sending token " + $localStorage.token);
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
