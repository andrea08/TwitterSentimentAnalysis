'use strict';
/**
* @author: Maria Andrea Cruz Blandon
* Controller of home page. Validates if the search is by nickname or hashtag. Redirects to preview once the search
* is valid and the user click on Preview button. Trigger $finishedRequest event to load the page (hide spinner)
*/
angular.module('app.home').controller('HomeController', function ($scope, $state, $rootScope) {
	$rootScope.$broadcast('$finishedRequest'); 

	// Search value 
	$scope.query = ''

	/**
	* Validate if the search has the format and a proper value
	* @param form the form where the input belongs to
	*/
	$scope.change = function(form){

		if($scope.query[0] != '#' && $scope.query[0] != '@'){
			form.search_input.$setValidity("symbol", false);
		}else{
			form.search_input.$setValidity("symbol", true);
		}

		if($scope.query.indexOf(' ') > -1){
			form.search_input.$setValidity("single_word", false);
		}else{
			form.search_input.$setValidity("single_word", true);
		}

		if($scope.query.length == 1 ){
			form.search_input.$setValidity("required", false);
		}else{
			form.search_input.$setValidity("required", true);
		}		

		if($scope.query == ""){
			form.search_input.$setValidity("single_word", true);
			form.search_input.$setValidity("symbol", true);
			form.search_input.$setValidity("required", true);
		}

		$scope.initial = false;
	}

	$scope.search = function(){
		$state.go('app.preview', {query: $scope.query});
	}

});