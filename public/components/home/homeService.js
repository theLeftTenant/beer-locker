(function() {
	'use strict';

	angular
		.module('app')
		.factory('homeService', homeService);

	function homeService() {
		var service = {
			helloBeer: helloBeer
		};

		return service;

		//	Methods
		function helloBeer() {
			return "Hello Beer!";
		}
	};
})();