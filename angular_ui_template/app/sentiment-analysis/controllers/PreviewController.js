'use strict';

angular.module('app.sentimentAnalysis').controller('PreviewController', function ($scope, $stateParams, RestFulAPI, $state) {
	$scope.query = $stateParams.query;

	

	// Redirect if there is no query value
	if($scope.query == null){
		$state.go('app.home');
	}else{
		// There is a query value
		
		$scope.list = RestFulAPI.list();
	}

	

});