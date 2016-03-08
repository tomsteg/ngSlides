angular.module('slidesApp')

.directive('slide', function () {

	'use strict';

	return {
		require: '^presentation',
		restrict: 'E',
		scope: true,
		link: function ($scope, element, attrs, reqCtrl) {
			reqCtrl.addSlide($scope);
			$scope.getTotal = reqCtrl.getTotal;
		},
		transclude: true,
		replace: true,
		templateUrl: 'templates/slide.html'
	};
});
