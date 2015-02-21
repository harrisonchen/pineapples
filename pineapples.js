var pineapples = angular.module('pineapples', []);

pineapples.controller('JuiceCtrl', function($scope) {
	$scope.juice = "PINEAPPLES!!!!";
});

pineapples.directive('juiceBox', ['PineappleService', function(PineappleService) {
	return {
		restrict: 'AE',
		scope: {

		},
		template: "<h2>Results</h2>" +
							"<div class='juice-box'>" +
							"</div>",
		controller: function($scope, $element) {
			PineappleService.getPineapples();
		},
		link: function(scope, element, attrs) {

		}
	};
}]);

pineapples.factory('PineappleService', ['$http', '$q', function($http, $q) {
	return {
		getPineapples: function() {
			var deferred = $q.defer();

      var req = {
        method: 'POST',
        url: 'http://food2fork.com/api/search?key=32f9c504981b7c8dc09c2bbd330a99b4&q=shredded%20chicken'
      };

      $http(req)
      .success(function(response) {
      	console.log(response);

        deferred.resolve(data);
			});
		}
	};
}]);