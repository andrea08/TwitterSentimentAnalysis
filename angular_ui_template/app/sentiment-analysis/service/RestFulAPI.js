'use strict';

angular.module('app.sentimentAnalysis').provider('RestFulAPI', function () {
	/**
	* This provider will send the request to the Django RestFulAPI, and process the responses as well.
	*/
	// dev
	let server= 'http://127.0.0.1:8000/';

	// Start of data >>>>>>>>>>>>>>>>>>
	// Dummi data. For development

	var sentiment_query_dev = {
        "tweets": [
            {
                "author": "gossminn",
                "date_time": '1522351047.353921',
                "content": "Hello world! I love organic cookies!"
            },
            {
                "author": "gossminn",
                "date_time": '1522351047.353921',
                "content": "I hate studying!"
            }
        ]
    };

    var tweet_query_dev = {
    	"type": "hashtag",
    	"content": "#Dancing"
    };

    // End of data >>>>>>>>>>>>>>>>>>>>


	this.$get = function($q, $http){
		/**
		* Request to retrieve the sentiment analysis of a set of tweets.
		* sentiment_query = {tweets: [{author: "nickname", data_time:"time", content:"tweet"} , <tweet> ..]}
		* sentiment_data = {number_found: int, skipped: int, score: {positive_number: <int>, 
		* positive_percentage: <float>, negative_number: <int>, negative_percentage: <float>, 
		* neutral_number: <int>, neutral_percentage: <float>}}
		* @param sentiment_query
		* return a promise with the response of the request. This can be a sentiment_data if the response is success, or
		* an error either in the client side or server side.
		*/
		var get_analysis = function(sentiment_query){
			var url = server + 'tweet_sentiment/sentiment';
	    	var dfd = $q.defer();
	    	$http.post(url, sentiment_query).success(function(sentiment_data){
				dfd.resolve(sentiment_data);
			}).error(function(err){
				var error = {type: 1, message: JSON.stringify(err), data: err};
				console.error(JSON.stringify(err));
				dfd.reject(error);
			});
			return dfd.promise;
	    };

	    /**
	    * Request the tweets based on a tweet_query.
	    * tweet_query = {type: "hashtag"|"nickname", content:"<query>"}
	    * @param tweet_query
	    * return a promise with the response of the request. This can be a list of the tweets retrieve,
	    * an empty list if there were no tweets, or an error either in the client side or server side.
	    */
	    var get_tweets = function(tweet_query){
	    	/**
	    	* Type of errors:
	    	* type 0 when there were no tweets found
	    	* type 1 when the response has an error status code
	    	*/

	    	var url = 'tweet_sentiment/tweets';
	    	var dfd = $q.defer();
	    	$http.post(url, tweet_query).success(function(tweet_list){
	    		if(tweet_list.tweets.length == 0 && tweet_list.number_found == 0){
	    			var error = {type: 0, message: "Tweets no found", data: tweet_list};
	    			dfd.reject(error);
	    		}else{
	    			dfd.resolve(tweet_list);
	    		}
	    	}).error(function(err){
	    			var error = {type: 1, message: JSON.stringify(err), data: err};
	    			dfd.reject(error);
	    	});
	    	return dfd.promise;
	    }

		return {
			
			get_tweets: function(tweet_query){
				if(tweet_query == null){
					// Test purpose
					tweet_query = tweet_query_dev;
				}
				return get_tweets(tweet_query);
			},
			get_analysis: function (sentiment_query) {
				if(sentiment_query == null){
					// Test purpose
					sentiment_query = sentiment_query_dev;
				}
				return get_analysis(sentiment_query);
			}
		}
	}

});