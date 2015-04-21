/* global angular */

(function () {

	'use strict';

	angular.module('slidesApp', [])

	.controller('PresentationCtrl', ['$scope', function ($scope) {

		var slides = [],
			activeSlide;

		$scope.prevSlide = function() {
			var activeSlideNo = activeSlide.no;
			if (activeSlideNo > 1) {
				$scope.selectSlide(slides[activeSlideNo - 2]);
			}
		};

		$scope.nextSlide = function() {
			var activeSlideNo = activeSlide.no;
			if (activeSlideNo < (slides.length)) {
				$scope.selectSlide(slides[activeSlideNo]);
			}
		};

		$scope.selectSlide = function (slide) {
			angular.forEach(slides, function(slide){
				slide.selected = false;
			});
			slide.selected = true;
			activeSlide = slide;
		};
		 
		$scope.handleKeys = function (event) {
			if (event.which === 74) { // for key j
				$scope.prevSlide();
			}
			if (event.which === 75) { // for key k
				$scope.nextSlide();
			}
		};

		this.addSlide = function (slide) {
			var total;
			if (slides.length === 0) {
				$scope.selectSlide(slide);
			}
			total = slides.push(slide);
			slide.no = total;
		};

		this.getTotal = function () {
			return slides.length;
		};
	}])

	.directive('presentation', function () {
		return {
			restrict: 'E',
			scope: true,
			controller: 'PresentationCtrl',
			transclude: true,
			templateUrl: 'templates/presentation.html'
		};
	})

	.directive('slide', function () {
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
})();
