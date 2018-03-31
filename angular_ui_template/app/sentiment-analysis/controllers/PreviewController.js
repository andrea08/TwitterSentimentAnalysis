'use strict';

angular.module('app.sentimentAnalysis').controller('PreviewController', function ($scope, $stateParams, RestFulAPI, $state) {
	// Attributes of the controller

	$scope.query = $stateParams.query;
	$scope.twees = false;
	$scope.total_tweets = null;
	$scope.tweet_list = null;
	$scope.error_message = null;
	$scope.type_class = null;
	$scope.response = false;

	// Redirect if there is no query value
	if($scope.query == null){
		$state.go('app.home');
	}else{
		// There is a query value
		var tweet_query = {type: null, content: $scope.query};
		if($scope.query[0] ==  '@'){
			tweet_query.type = "nickname";
			$scope.type_class = "nickname";
		}else{
			tweet_query.type = "hashtag";
			$scope.type_class = "hashtag";
		}

		RestFulAPI.get_tweets(tweet_query).then(function(tweet_list){
			$scope.tweet_list = tweet_list.tweets;
			$scope.tweets = true;
			$scope.total_tweets = tweet_list.tweets.length;
			$scope.response = true;

		}, function(err){
			$scope.twees = false;
			$scope.total_tweets = null;
			$scope.tweet_list = null;
			$scope.response = true;

			if(err.type == 0){
				$scope.error_message = "Tweets not found :(";
			}else{
				$scope.error_message = "Something went wrong :(";
			}
		});
	}

	// Redirect to home
	$scope.change_search = function(){
		$state.go('app.home')
	}

	// Redirect to results
	$scope.analyse = function(){
		$state.go('app.results', {tweets: $scope.tweet_list, query: $scope.query});
	}

	

});