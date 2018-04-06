'use strict';

/**
* @author: Maria Andrea Cruz Blandon
* Provider which manage the requests sent to the Django RestFulAPI.
* methods available:
* get_tweets: Retrieve tweets of a query
* get_analysis: Retrieve the sentiment analysis of a list of tweets
* Both methods return a promise. This one can be successful in which case the tweets or the analysis is sent as result. Or it can 
* be rejection in which case a code for the type of error will be sent, particularly because in the case of tweets, one error is
* 'tweets no found' but the request response will be successful then it is necessary to identify this case.
*/
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

    var tweet_list = {
    	"number_found": 3,
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
            },
            {
                "author": "user_1",
                "date_time": '1522351047.353921',
                "content": "My first tweet :)!"
            }
    	]
    };

    var sentiment_data = {
    	"number_found":2,
    	"skipped":0,
    	"score":{
    		"positive_number":1,
    		"positive_percentage":0.5,
    		"negative_number":0,
    		"negative_percentage":0.0,
    		"neutral_number":1,
    		"neutral_percentage":0.5
    	}
    };

    // End of data >>>>>>>>>>>>>>>>>>>>


	this.$get = function($q, $http, $rootScope){
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
	    		// Broadcast result of request
                $rootScope.$broadcast('$finishedRequest'); 
				dfd.resolve(sentiment_data);
			}).error(function(err){
				var error = {type: 1, message: JSON.stringify(err), data: err};
				console.error(JSON.stringify(err));
				// Broadcast result of request
                $rootScope.$broadcast('$finishedRequest'); 
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
	    			// Broadcast result of request
                	$rootScope.$broadcast('$finishedRequest'); 
	    			dfd.reject(error);
	    		}else{
	    			// Broadcast result of request
                	$rootScope.$broadcast('$finishedRequest'); 
	    			dfd.resolve(tweet_list);
	    		}
	    	}).error(function(err){
	    			//Development purpose:
	    			// Broadcast result of request
                	$rootScope.$broadcast('$finishedRequest'); 
	    			dfd.resolve(tweet_list);
	    			/*var error = {type: 1, message: JSON.stringify(err), data: err};
	    			// Broadcast result of request
                	$rootScope.$broadcast('$finishedRequest');
	    			dfd.reject(error);*/
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