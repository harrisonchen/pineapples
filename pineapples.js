var pineapples = angular.module('pineapples', ['ngCookies']);

pineapples.controller('JuiceCtrl', function($scope) {
	$scope.juice = "PINEAPPLES!!!!";
});

pineapples.directive('juiceBox', ['$cookieStore', 'PineappleService', function($cookieStore, PineappleService) {
	return {
		restrict: 'AE',
		scope: {
			searchTerm: '='
		},
		template: "<div class='bookmarks' ng-click='getBookmarks()'><i class='fa fa-bookmark fa-2x'></i></div>" +
							"<button class='pill-btn search-btn' ng-click='searchPineapples()'>Search!</button>" +
							"<div data-ng-show='searched || bookmarkTab'>" +
								"<h2 ng-hide='bookmarkTab'>Results</h2>" +
								"<h2 ng-show='bookmarkTab'>Bookmarks</h2>" +
								"<div class='juice-box'>" +
									"<ul>" +
										"<li ng-repeat='pineapple in pineapples track by $index'>" +
											"<h3>{{pineapple.title}}</h3>" +
											// "<a ng-click='goToRecipe(pineapple.source_url)'>" +
												"<div class='recipe-img'>" +
													"<div class='overlay'></div>" +
													"<div class='star' ng-click='addBookmark(pineapple)'><i class='fa fa-bookmark fa-2x'></i></div>" +
													"<img ng-src='{{pineapple.image_url}}' />" +
												"</div>" +
											// "</a>" +
										"</li>" +
									"</ul>" +
								"</div>" +
							"</div>",
		controller: function($scope, $element) {
			$scope.bookmarks = [];
			$scope.bookmarkTab = false;
			$scope.searched = false;
			$scope.pineapples = [];

			$scope.searchPineapples = function() {
				PineappleService.getPineapples($scope.searchTerm)
				.then(function(response) {
					$scope.bookmarkTab = false;
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
					}
				});
			};

			$scope.goToRecipe = function(url) {
				chrome.tabs.create({
					url: url
				});
			};

			$scope.getBookmarks = function() {
				$scope.bookmarkTab = true;
				$scope.bookmarks = $cookieStore.get('pineapple-chrome-app-bm');
				console.log($scope.bookmarks);
				$scope.pineapples = $scope.bookmarks;
			};

			$scope.addBookmark = function(recipe) {
				if($cookieStore.get('pineapple-chrome-app-bm')) {
					$scope.bookmarks = $cookieStore.get('pineapple-chrome-app-bm');
					$scope.bookmarks.unshift(recipe);
					$scope.bookmarks = $cookieStore.put('pineapple-chrome-app-bm', $scope.bookmarks);
				}
				else {
					$scope.bookmarks.unshift(recipe);
					$scope.bookmarks = $cookieStore.put('pineapple-chrome-app-bm', $scope.bookmarks);
				}
			}
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