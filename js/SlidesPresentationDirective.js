angular.module('slidesApp')

.directive('presentation', function () {

	'use strict';

	return {
		restrict: 'E',
		scope: true,
		controller: 'PresentationCtrl',
		transclude: true,
		templateUrl: 'templates/presentation.html'
	};
});

