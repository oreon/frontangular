/**
 * Authentication
 *
 */
(function() {
	'use strict';

	angular.module('app.core').factory('authenticationService', authenticationService);



	authenticationService.$inject = [ '$http' , '$window', '$localStorage'];



	/**
	 * @namespace Authentication
	 * @returns {Factory}
	 */
	function authenticationService( $http, $window, $localStorage) {
		/**
		 * @name Authentication
		 * @desc The Factory to be returned
		 */
		var Authentication = {
			getAuthenticatedAccount : getAuthenticatedAccount,
			isAuthenticated : isAuthenticated,
			login : login,
			logout : logout,
			register : register,
		//	setAuthenticatedAccount : setAuthenticatedAccount,
		//	unauthenticate : unauthenticate
		};

		return Authentication;

		function getAuthenticatedAccount() {
			if (!$localStorage.token) {
				return;
			}

            return $localStorage.username;
			//return JSON.parse($localStorage.username);
		}

		function isAuthenticated() {
			return getAuthenticatedAccount() != null;
		}



		function login(user) {

           return  $http
                .post('http://localhost:8000/api-token-auth/', user)
                .success(function (data, status, headers, config) {
                    //$window.sessionStorage.token = data.token;
					$localStorage.token = data.token
					$localStorage.user = data.user;


                    Authentication.userInfo = parseJwt(data.token)
                    console.log(Authentication.userInfo);

                    var encodedProfile = data.token.split('.')[1];
                    Authentication.profile = JSON.parse(url_base64_decode(encodedProfile));
					console.log(Authentication.profile);
                   // vm.welcome = 'Welcome ' + profile.firstName + ' ' + profile.lastName;
                })
                .error(function (data, status, headers, config) {
                    // Erase the token if the user fails to log in
                    //delete $window.sessionStorage.token;
					delete $localStorage.token;
					Authentication.user = {}
                    //vm.isAuthenticated = false;

                    // Handle login errors here
                    //vm.error = 'Error: Invalid user or password';
                    //vm.welcome = '';
                });
        }

        function logout() {
            Authentication.user = {}
			delete $localStorage.token;
           // delete $window.sessionStorage.token;
        };

        function parseJwt (token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse($window.atob(base64));
        }


        //this is used to parse the profile
        function url_base64_decode(str) {

            var output = str.replace('-', '+').replace('_', '/');
            switch (output.length % 4) {
                case 0:
                    break;
                case 2:
                    output += '==';
                    break;
                case 3:
                    output += '=';
                    break;
                default:
                    throw 'Illegal base64url string!';
            }
            return window.atob(output); //polyfill https://github.com/davidchambers/Base64.js
        }

		// //////////////////

		/**
		 * @name register
		 * @desc Try to register a new user
		 * @param {string}
		 *            username The username entered by the user
		 * @param {string}
		 *            password The password entered by the user
		 * @param {string}
		 *            email The email entered by the user
		 * @returns {Promise}
		 * @memberOf thinkster.authentication.services.Authentication
		 */
		function register(user) {
			return $http.post('http://localhost:8000/rest-auth/registration/', {
				username : user.username,
				password1 : user.password1,
				password2 : user.password2,
				email : user.email
			}) .success(function (data, status, headers, config) {
					user.password = user.password1;
					Authentication.login(user);
					//console.log(Authentication.profile);
				    toastr.success('Welcome ' + user.username + ', Thanks for registering');
			   })
			   .error(function (data, status, headers, config) {
				return (  data +  ' ' + status);
			   });


			/**
			 * @name registerSuccessFn
			 * @desc Log the new user in
			 */
			registerSuccessFn = function (data, status, headers, config) {
			    //user.password = user.password1;
				//Authentication.login(user);
			}

			/**
			 * @name registerErrorFn
			 * @desc Log "Epic failure!" to the console
			 */
			function registerErrorFn(data, status, headers, config) {
				return (  data +  ' ' + status);
			}
		}



	}
})();
