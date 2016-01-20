(function () {
    'use strict';

   angular.module('app')
        .controller('LoginController',  LoginController);

     LoginController.$inject = [
        '$state','logger','authenticationService'];
  

    function LoginController($state, logger, authenticationService) {
        var vm = this;

        vm.activate = activate;
        vm.isAuthenticated = false;
        //vm.callRestricted = callRestricted;
        //vm.logout = logout;
        vm.message = '';
        vm.submit = submit;
        vm.user = {};
        vm.welcome = '';

        activate();

        function activate() {
        }
        
        function submit() {
            authenticationService.login(vm.user).success(function  (data){
                $state.go('dashboard', {});
            }).error( function (data){
                vm.error = 'Error: Invalid user or password';
            });
            
        }

        
    }
})();