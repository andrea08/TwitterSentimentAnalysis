'use strict';

angular.module('app.sentimentAnalysis').controller('ResultsController', function ($scope, $state, $stateParams, RestFulAPI) {
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

	$scope.$watch($scope.results, function(value){
		if(value != undefined & value != null){
			if ($.fn.easyPieChart) {
				console.log('There is funciton');
				console.log(value);

                    $('.easy-pie-chart').each(function() {
                    	console.log('find charts')
                        var $this = $(this),
                            barColor = $this.css('color') || $this.data('pie-color'),
                            trackColor = $this.data('pie-track-color') || 'rgba(0,0,0,0.04)',
                            size = parseInt($this.data('pie-size')) || 25;

                        
                        $this.easyPieChart({

                            barColor : barColor,
                            trackColor : trackColor,
                            scaleColor : false,
                            lineCap : 'butt',
                            lineWidth : parseInt(size / 8.5),
                            animate : 1500,
                            rotate : -90,
                            size : size,
                            onStep: function(from, to, percent) {
                                $(this.el).find('.percent').text(Math.round(percent));
                            }

                        });

                        $this = null;

                        });

                } // end if
		}
		
	})

	// Redirect to home
	$scope.change_search = function(){
		$state.go('app.home')
	}
});