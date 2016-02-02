angular.module('app.employee').directive('employeesDirective', function () {
    return {
        restrict: 'E',
        scope: {
            employees: '=',
            tableParams: '='
        },
        templateUrl: 'app/employee/views/employeesTable.html',
        
        link: function (scope, elem, attrs) {
            var nameList = ['Pierre', 'Pol', 'Jacques', 'Robert', 'Elisa'], familyName = ['Dupont', 'Germain', 'Delcourt', 'bjip', 'Menez'];
            function createRandomItem() {
                var
                    firstName = nameList[Math.floor(Math.random() * 4)],
                    lastName = familyName[Math.floor(Math.random() * 4)],
                    age = Math.floor(Math.random() * 100),
                    email = firstName + lastName + '@@whatever.com',
                    balance = Math.random() * 3000;

                return {
                    firstName: firstName,
                    lastName: lastName,
                    age: age,
                    email: email,
                    balance: balance
                };
            }

            scope.employees = [];
            for (var j = 0; j < 10; j++) {
                console.log("adding employee" + j)
                scope.employees.push(createRandomItem());
            }
            ///scope.dataset = [].concat(scope.rowCollection);
        }
        
    };
});