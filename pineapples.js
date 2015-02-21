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
										"<a ng-href='{{pineapple.source_url}}''><h3>{{pineapple.title}}</h3></a>" +
										"<img ng-src='{{pineapple.image_url}}' />" +
									"</li>" +
								"</ul>" +
							"</div>",
		controller: function($scope, $element) {
			$scope.pineapples = [];

			PineappleService.getPineapples()
			.then(function(response) {
				var recipes = response.recipes;
				console.log(recipes);
				for(i in response.recipes) {
					var recipe = {};

					recipe["image_url"] = recipes[i].image_url;
					recipe["title"] = recipes[i].title;
					recipe["source_url"] = recipes[i].source_url;
					recipe["social_rank"] = recipes[i].social_rank;
					recipe["publisher"] = recipes[i].publisher;

					$scope.pineapples.push(recipe);
					console.log(recipe);
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

			return deferred.promise;
		}
	};
}]);