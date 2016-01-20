(function() {
    'use strict';

    angular
        .module('app.layout')
        .directive('htTopNav', htTopNav);

    /* @ngInject */
    function htTopNav () {
        var directive = {
            bindToController: true,
            controller: TopNavController,
            controllerAs: 'vm',
            restrict: 'EA',
            scope: {
                'navline': '='
            },
            templateUrl: 'app/layout/ht-top-nav.html'
        };

        TopNavController.$inject = [
        '$state','logger','authenticationService'];

        /* @ngInject */
        function TopNavController($state, logger, authenticationService) {
            var vm = this;

            activate();

            function activate() {
                vm.user = authenticationService.getAuthenticatedAccount();
            }


            vm.isAuthenticated = function(){
                return authenticationService.isAuthenticated();
            }

            vm.logout = function (){
                authenticationService.logout();
                $state.go('index')
            }

            vm.currentUser = function(){
                return authenticationService.getAuthenticatedAccount();
            }


        }

        return directive;
    }
})();
