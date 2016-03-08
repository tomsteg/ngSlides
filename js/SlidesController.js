angular.module('slidesApp')

.controller('PresentationCtrl', ['$scope', '$location', function ($scope, $location) {

	'use strict';

	var activeSlide;

	$scope.slides = [];

	$scope.prevSlide = function() {
		var activeSlideNo = activeSlide.no;
		if (activeSlideNo > 1) {
			$scope.selectSlide($scope.slides[activeSlideNo - 2]);
		}
	};

	$scope.nextSlide = function() {
		var activeSlideNo = activeSlide.no;
		if (activeSlideNo < ($scope.slides.length)) {
			$scope.selectSlide($scope.slides[activeSlideNo]);
		}
	};

	$scope.selectSlide = function (slide) {
		angular.forEach($scope.slides, function(slide){
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
		total = $scope.slides.push(slide);
		slide.no = total;
		if ($scope.slides.length === 1 || parseInt($location.search().slideNo, 10) === slide.no) {
			$scope.selectSlide(slide);
		}
	};

	this.getTotal = function () {
		return $scope.slides.length;
	};
}]);

