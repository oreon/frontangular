(function () {
    'use strict';

    angular.module('angularDjangoRegistrationAuthApp', ['ngCookies',
                                                            'ngResource',
                                                            'ngSanitize',]);
    angular.module('app').requires.push('angularDjangoRegistrationAuthApp');

})();
