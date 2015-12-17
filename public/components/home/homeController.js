(function() {
	'use strict';

	angular
		.module('app')
		.controller('homeController', homeController);

	function homeController() {
		var vm = this;
		vm.getBeers = getBeers;

		function getBeers() {
			//return factory method results
		};
	}
})();