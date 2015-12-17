(function () {
	angular
		.module('app')
		.config(config)
		.run(run);

	function config($routeProvider) {
		$routeProvider
			.when('/login', {
				templateUrl: 'components/authentication/loginView.html',
				controller: 'loginController',
				controllerAs: 'vm'
			})
			.when('/', {
				templateUrl: 'components/home/homeView.html',
				controller: 'homeController',
				controllerAs: 'vm'
			})
			.otherwise({ redirectTo: '/login'} );
	}

	function run($rootScope, $location, $cookieStore, $http) {
		//	Keep user.
		$rootScope.globals = $cookieStore.get('globals') || {};
		if ($rootScope.globals.currentUser) {
			$http.defaults.headers.common['Authorization'] = 
				'Basic ' + $rootScope.globals.currentUser.authData;
		}

		$rootScope.$on('$locationChangeStart', function (event, next, current) {
            // Redirect to login page if not logged in.
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });
	}
})();