'use strict';

angular.module('app.sentimentAnalysis').controller('PreviewController', function ($scope, $stateParams) {
	$scope.query = $stateParams.query;
});