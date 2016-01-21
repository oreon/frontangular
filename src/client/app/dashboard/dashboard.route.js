(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'dashboard',
                config: {
                    url: '/dashboard',
                    templateUrl: 'app/dashboard/dashboard.html',
                    controller: 'DashboardController',
                    controllerAs: 'vm',
                    title: 'dashboard',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-dashboard"></i> Dashboard'
                    }
                }
            },
            {
                state: 'index',
                config: {
                    url: '/',
                    templateUrl: 'app/login/login.html',
                    controller: 'LoginController',
                    controllerAs: 'vm',
                    title: 'Login',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-dashboard"></i> LOG IN'
                    }
                }
            },
            {
                state: 'register',
                config: {
                    url: '/register',
                    templateUrl: 'app/login/register.html',
                    controller: 'LoginController',
                    controllerAs: 'vm',
                    title: 'Register',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-dashboard"></i> LOG IN'
                    }
                }
            }

        ];
    }
})();
