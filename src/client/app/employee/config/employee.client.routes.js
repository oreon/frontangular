(function() {
    'use strict';

    angular
        .module('app.employee')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'listEmployee',
                config: {
                    url: '/employee',
                    templateUrl: 'app/employee/views/list.html',
                    controller: 'EmployeeController',
                    controllerAs: 'vm',
                    title: 'List Employees',
                    settings: {
                        nav: 3,
                        content: '<i class="fa fa-folder-open"></i> Employees'
                    }
                }
            },
            {
                state: 'viewEmployee',
                config: {
                    url: '/employee/:id',
                    templateUrl: 'app/employee/views/view.html',
                    controller: 'EmployeeController',
                    controllerAs: 'vm',
                    title: 'View Employee'
                }
            },
            {
                state: 'editEmployee',
                config: {
                    url: '/employee/:id/edit',
                    templateUrl: 'app/employee/views/edit.html',
                    controller: 'EmployeeController',
                    controllerAs: 'vm',
                    title: 'Edit Employee'
                }
            }
        ];
    }
})();
