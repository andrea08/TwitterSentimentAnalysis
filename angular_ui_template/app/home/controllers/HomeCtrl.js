'use strict';

angular.module('app.home').controller('HomeController', function ($scope) {
	// Search value 
	$scope.search = ''

	/**
	* Validate if the search has the format and a proper value
	* @param form the form where the input belongs to
	*/
	$scope.change = function(form){

		if($scope.search[0] != '#' && $scope.search[0] != '@'){
			form.search_input.$setValidity("symbol", false);
		}else{
			form.search_input.$setValidity("symbol", true);
		}

		if($scope.search.indexOf(' ') > -1){
			form.search_input.$setValidity("single_word", false);
		}else{
			form.search_input.$setValidity("single_word", true);
		}

		if($scope.search.length == 1 ){
			form.search_input.$setValidity("required", false);
		}else{
			form.search_input.$setValidity("required", true);
		}		

		if($scope.search == ""){
			form.search_input.$setValidity("single_word", true);
			form.search_input.$setValidity("symbol", true);
			form.search_input.$setValidity("required", true);
		}

		$scope.initial = false;
	}

});