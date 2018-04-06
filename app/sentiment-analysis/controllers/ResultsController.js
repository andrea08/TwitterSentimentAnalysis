'use strict';

/**
* @author: Maria Andrea Cruz Blandon
* Controller of the results view. This allow to load the analysis of a list of tweets. It uses RestFulAPI provider to request
* the analysis of a list of tweets. If there is not query and tweets list in the request that load this view the user is 
* redirected to home (When the user tries to load the view directly without following the process of search).
* If the response of the request is success then the analysis is load, in the case of percentages these are multiplicated 
* by 100, because that is the format used in easy-pie-chart. If the response is rejection then a error message is show.
* The user can return to home using the buttons ('go home' or 'new search')
*/
angular.module('app.sentimentAnalysis').controller('ResultsController', function ($scope, $state, $stateParams, RestFulAPI) {
	// Attributes of the controller. Values used to manage the visibility of components or values used in the view
	$scope.tweet_list = $stateParams.tweets;
	$scope.query = $stateParams.query;
	$scope.error_message = null;
	$scope.analysis = false;
	$scope.type_class = null;
	$scope.results = null;
	$scope.response = false;

	// Redirect if there is no tweet_list
	if($scope.tweet_list == null || $scope.query == null){
		$state.go('app.home');
	}else{

		if($scope.query[0] ==  '@'){
			$scope.type_class = "nickname";
		}else{
			$scope.type_class = "hashtag";
		}

		var sentiment_query = {tweets: $scope.tweet_list};

		RestFulAPI.get_analysis(sentiment_query).then(function(sentiment_data){
			$scope.analysis = true;
			$scope.results = sentiment_data;
			$scope.results.score.positive_percentage =  $scope.results.score.positive_percentage * 100;
			$scope.results.score.negative_percentage =  $scope.results.score.negative_percentage * 100;
			$scope.results.score.neutral_percentage =  $scope.results.score.neutral_percentage * 100;
			$scope.response = true;

		}, function(err){
			$scope.error_message = "Something went wrong :(";
			$scope.analysis = false;
			$scope.response = true;
		});
	}

	// Redirect to home
	$scope.change_search = function(){
		$state.go('app.home')
	}
});