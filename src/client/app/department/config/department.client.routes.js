(function() {
    'use strict';

    angular
        .module('app.department')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'listDepartment',
                config: {
                    url: '/department',
                    templateUrl: 'app/department/views/list.html',
                    controller: 'DepartmentController',
                    controllerAs: 'vm',
                    title: 'List Departments',
                    settings: {
                        nav: 3,
                        content: '<i class="fa fa-folder-open"></i> Departments'
                    }
                }
            },
            {
                state: 'createDepartment',
                config: {
                    url: '/department//',
                    templateUrl: 'app/department/views/edit.html',
                    controller: 'DepartmentController',
                    controllerAs: 'vm',
                    title: 'Create Department'
                }
            },
            {
                state: 'viewDepartment',
                config: {
                    url: '/department/:id',
                    templateUrl: 'app/department/views/view.html',
                    controller: 'DepartmentController',
                    controllerAs: 'vm',
                    title: 'View Department'
                }
            },
            {
                state: 'editDepartment',
                config: {
                    url: '/department/:id/edit',
                    templateUrl: 'app/department/views/edit.html',
                    controller: 'DepartmentController',
                    controllerAs: 'vm',
                    title: 'Edit Department'
                }
            }
        ];
    }
})();
