(function() {
	'use strict';

	angular
		.module('app')
		.factory('dataService', dataService);

	function dataService($http) {
		var beersBase = '/api/beers';
		var usersBase = '/api/users';

		var service = {
			getBeers = getBeers,
			getBeer = getBeer,
			addBeer = addBeer,
			updateBeer = updateBeer,
			deleteBeer = deleteBeer,
			addUser = addUser
		};
		return service;

		//	Methods
		function getBeers() {
			return $http.get(beersBase);
		};

		function getBeer(id) {
			return $http.get(beersBase + '/' + id);
		};

		function addBeer(beer) {
			return $http.post(beersBase, beer);
		};

		function updateBeer(beer)
			return $http.put(beersBase + '/' + beer.id, beer);
		};

		function deleteBeer(id) {
			return $http.delete(beersBase + '/' + id);
		};

		function addUser(user) {
			return $http.post(usersBase, user);
		};
	}

})();