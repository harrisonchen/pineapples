var pineapples = angular.module('pineapples', []);

pineapples.controller('JuiceCtrl', function($scope) {
	$scope.juice = "PINEAPPLES!!!!";
});

pineapples.directive('juiceBox', ['PineappleService', function(PineappleService) {
	return {
		restrict: 'AE',
		scope: {
			searchTerm: '='
		},
		template: "<button class='pill-btn search-btn' ng-click='searchPineapples()'>Search!</button>" +
							"<div data-ng-show='searched'>" +
								"<h2>Results</h2>" +
								"<div class='juice-box'>" +
									"<ul>" +
										"<li ng-repeat='pineapple in pineapples track by $index'>" +
											"<h3>{{pineapple.title}}</h3>" +
											"<div class='recipe-img'>" +
												"<div class='overlay'></div>" +
												"<div class='star'>{{pineapple.social_rank}} <i class='fa fa-star fa-2x'></i></div>" +
												"<a ng-href='{{pineapple.source_url}}'><img ng-src='{{pineapple.image_url}}' /></a>" +
											"</div>" +
										"</li>" +
									"</ul>" +
								"</div>" +
							"</div>",
		controller: function($scope, $element) {
			$scope.searched = false;
			$scope.pineapples = [];

			$scope.searchPineapples = function() {
				PineappleService.getPineapples($scope.searchTerm)
				.then(function(response) {
					console.log($scope.searchTerm);
					$scope.searched = true;
					$scope.pineapples = [];
					var recipes = response.recipes;

					for(i in response.recipes) {
						var recipe = {};

						recipe["image_url"] = recipes[i].image_url;
						recipe["title"] = recipes[i].title;
						recipe["source_url"] = recipes[i].source_url;
						recipe["social_rank"] = Math.ceil(recipes[i].social_rank);
						recipe["publisher"] = recipes[i].publisher;

						$scope.pineapples.push(recipe);
						console.log(recipe);
					}
				});
			};
		},
		link: function(scope, element, attrs) {

		}
	};
}]);

pineapples.factory('PineappleService', ['$http', '$q', function($http, $q) {
	return {
		getPineapples: function(query) {
			var deferred = $q.defer();

      var req = {
        method: 'POST',
        url: 'http://food2fork.com/api/search?key=32f9c504981b7c8dc09c2bbd330a99b4&q=' + query,
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