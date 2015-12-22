angular.module('app.employee').directive('employeesDirective', function () {
    return {
        restrict: 'E',
        scope: {
            employees: '=',
            tableParams: '='
        },
        templateUrl: 'app/employee/views/employeesTable.html'
    };
});