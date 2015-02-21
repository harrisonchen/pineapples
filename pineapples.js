var pineapples = angular.module('pineapples', []);

pineapples.controller('JuiceCtrl', function($scope) {
	$scope.juice = "PINEAPPLES!!!!";
});

pineapples.directive('juiceBox', [function() {
	return {
		restrict: 'AE',
		scope: {

		},
		template: "<h2>Results</h2>" +
							"<div class='juice-box'>" +
							"</div>",
		controller: function($scope, $element) {

		},
		link: function(scope, element, attrs) {

		}
	};
}]);