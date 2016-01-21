(function() {
    'use strict';

    angular
        .module('angularDjangoRegistrationAuthApp')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
            		state: 'main', config: {
                    url:'/',
                    templateUrl: 'app/auth/views/main.html',
                    controller: 'MainCtrl',
                    resolve: {
                      authenticated: ['djangoAuth', function(djangoAuth){
                        return djangoAuth.authenticationStatus();
                      }],
                    }
                  }
            	},
                  {
            		state: 'register', config: { url:'/register',
                    templateUrl: 'app/auth/views/register.html',
                    resolve: {
                      authenticated: ['djangoAuth', function(djangoAuth){
                        return djangoAuth.authenticationStatus();
                      }],
                    }
                  	}
            	},
                  {
            		state: 'passwordReset', config: { url:'/passwordReset',
                    templateUrl: 'app/auth/views/passwordreset.html',
                    resolve: {
                      authenticated: ['djangoAuth', function(djangoAuth){
                        return djangoAuth.authenticationStatus();
                      }],
                    }
                  	}
            	},
                  {
            		state: 'passwordResetConfirm', config: { url:'/passwordResetConfirm/:firstToken/:passwordResetToken',
                    templateUrl: 'app/auth/views/passwordresetconfirm.html',
                    resolve: {
                      authenticated: ['djangoAuth', function(djangoAuth){
                        return djangoAuth.authenticationStatus();
                      }],
                    }
                  	}
            	},
                  {
                    state: 'login', config: { url:'/login',

                    templateUrl: 'app/auth/views/login.html',
                    resolve: {
                      authenticated: ['djangoAuth', function(djangoAuth){
                        return djangoAuth.authenticationStatus();
                      }],
                    }
                  	}
            	},
                  {
                    state: 'verifyEmail', config: { url:'/verifyEmail/:emailVerificationToken',
                    templateUrl: 'app/auth/views/verifyemail.html',
                    resolve: {
                      authenticated: ['djangoAuth', function(djangoAuth){
                        return djangoAuth.authenticationStatus();
                      }],
                    }
                  	}
            	},
                  {
            		state: 'logout', config: { url:'/logout',
                    templateUrl: 'app/auth/views/logout.html',
                    resolve: {
                      authenticated: ['djangoAuth', function(djangoAuth){
                        return djangoAuth.authenticationStatus();
                      }],
                    }
                  	}
            	},
                  {
            		state: 'userProfile', config: { url:'/userProfile',
                    templateUrl: 'app/auth/views/userprofile.html',
                    resolve: {
                      authenticated: ['djangoAuth', function(djangoAuth){
                        return djangoAuth.authenticationStatus();
                      }],
                    }
                  	}
            	},
                  {
            		state: 'passwordChange', config: { url:'/passwordChange',
                    templateUrl: 'app/auth/views/passwordchange.html',
                    resolve: {
                      authenticated: ['djangoAuth', function(djangoAuth){
                        return djangoAuth.authenticationStatus();
                      }],
                    }
                  	}
            	},
                  {
            		state: 'restricted', config: { url:'/restricted',
                    templateUrl: 'app/auth/views/restricted.html',
                    controller: 'RestrictedCtrl',
                    resolve: {
                      authenticated: ['djangoAuth', function(djangoAuth){
                        return djangoAuth.authenticationStatus();
                      }],
                    }
                  	}
            	},
                  {
            		state: 'authRequired', config: { url:'/authRequired',
                    templateUrl: 'app/auth/views/authrequired.html',
                    controller: 'AuthrequiredCtrl',
                    resolve: {
                      authenticated: ['djangoAuth', function(djangoAuth){
                        return djangoAuth.authenticationStatus(true);
                      }],
                    }
                  	}
            	},
        ];
    }
})();





