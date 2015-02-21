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
								"<ul>" +
									"<li ng-repeat='pineapple in pineapples track by $index'>" +
										"<h3>{{pineapple.title}}</h3>" +
									"</li>" +
								"</ul>" +
							"</div>",
		controller: function($scope, $element) {
			$scope.pineapples = [];

			PineappleService.getPineapples()
			.success(function(response) {
				for(pineapple in response) {
					var recipe = {};

					recipe["image_url"] = pineapple.image_url;
					recipe["title"] = pineapple.title;
					recipe["source_url"] = pineapple.source_url;
					recipe["social_rank"] = pineapple.social_rank;
					recipe["publisher"] = pineapple.publisher;

					$scope.pineapple.push(recipe);
				}
			});
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
        url: 'http://food2fork.com/api/search?key=32f9c504981b7c8dc09c2bbd330a99b4&q=shredded%20chicken',
        headers: {
        	'Access-Control-Allow-Origin': '*'
        }
      };

      $http(req)
      .success(function(response) {
      	console.log(response);

        deferred.resolve(response);
			});
		}
	};
}]);