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
		if (parseInt($scope.activeSlideNo, 10) <= 0 || parseInt($scope.activeSlideNo, 10) > $scope.slides.length) {
			$scope.activeSlideNo = '1';
		}
		angular.forEach($scope.slides, function(slide) {
			slide.selected = false;
			if (slide.no === parseInt($scope.activeSlideNo, 10)) {
				activeSlide = slide;
			}
		});
		activeSlide.selected = true;
	};

	$document.bind('keydown', function (event) {
		//console.log(event.keyCode);
		// key code for key h
		if (event.keyCode === 72 || event.keyCode === 38) {
			$scope.firstSlide();
		}
		// key code for key j || Pfeil links || Fernbedienung links
		if (event.keyCode === 74 || event.keyCode === 37 || event.keyCode === 33) {
			$scope.prevSlide();
		}
		// key code for key k || Pfeil rechts || Fernbedienung rechts
		if (event.keyCode === 75 || event.keyCode === 39 || event.keyCode === 34) {
			$scope.nextSlide();
		}
		// ascii code for key l
		if (event.keyCode === 76 || event.keyCode === 40) {
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
