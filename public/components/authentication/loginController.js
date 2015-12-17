(function() {
	'use strict';

	angular
		.module('app')
		.controller('loginController', loginController);

	function loginController(loginService, $rootScope, $location) {
		var vm = this;
		vm = {
			login = login
		};

		loginService.clearCredentials();	// Reset login status.

		function login() {
			vm.dataLoading = true;
			loginService.login(vm.username, vm.password, loadCreds);

			function loadCreds(response) {
				if (response.success) {
					loginService.setCredentials(vm.username, vm.password);
					$location.path('/');
				} else {
					vm.error = response.message;
					vm.dataLoading = false;
				}
			};
		};
	}
})();