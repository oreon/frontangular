
angular.module('app.skill').directive('skillsDirective', function () {
    return {
        restrict: 'E',
        scope: {
            skills: '=',
            tableParams: '='
        },
        templateUrl: 'app/skill/views/skillTable.html'
    };
});
