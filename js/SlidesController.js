angular.module('slidesApp')

.controller('PresentationCtrl', function ($scope, $location, $document) {

	'use strict';

	var activeSlide;

	$scope.slides = [];
	$scope.activeSlideNo = 1;

	$scope.prevSlide = function() {
		if ($scope.activeSlideNo > 1) {
			$scope.selectSlide($scope.slides[$scope.activeSlideNo - 2]);
		}
	};

	$scope.nextSlide = function() {
		if ($scope.activeSlideNo < ($scope.slides.length)) {
			$scope.selectSlide($scope.slides[$scope.activeSlideNo]);
		}
	};

	$scope.lastSlide = function() {
		$scope.selectSlide($scope.slides[$scope.slides.length - 1]);
	};

	$scope.firstSlide = function() {
		$scope.selectSlide($scope.slides[0]);
	};

	$scope.selectSlide = function (slide) {
		angular.forEach($scope.slides, function(slide) {
			slide.selected = false;
		});
		slide.selected = true;
		activeSlide = slide;
		$scope.activeSlideNo = activeSlide.no;
	};
	
	$scope.updateActiveSlide = function() {
		angular.forEach($scope.slides, function(slide) {
			slide.selected = false;
			if (slide.no === parseInt($scope.activeSlideNo, 10)) {
				activeSlide = slide;
			}
		});
		activeSlide.selected = true; 
	};

	$document.bind('keydown', function (event) {
		if (event.keyCode === 72 || event.keyCode === 38) { // ascii code for key h
			$scope.firstSlide();
		}
		if (event.keyCode === 74 || event.keyCode === 37) { // ascii code for key j || Pfeil links
			$scope.prevSlide();
		}
		if (event.keyCode === 75 || event.keyCode === 39) { // ascii code for key k || Pfeil rechts
			$scope.nextSlide();
		}
		if (event.keyCode === 76 || event.keyCode === 40) { // ascii code for key l
			$scope.lastSlide();
		}
		$scope.$apply();
	});

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
});

