'use strict';

angular.module('app.sentimentAnalysis').provider('RestFulAPI', function () {
	/**
	* This provider will send the request to the Django RestFulAPI, and process the responses as well.
	*/
	// dev
	let server= 'http://127.0.0.1:8000/';

	var data = {
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


	this.$get = function($q, $http){
		var get_analysis = function(data){
			var url = server + 'tweet_sentiment/sentiment';
	    	var deffered = $q.defer();
	    	$http.post(url, data).success(function(res){
		 		console.log('Good');				
				console.log(res)
				deffered.resolve('Hey');
			}).error(function(err){
				console.error('Bad')
				console.error(JSON.stringify(err));
				console.log(err);
				deffered.reject(err);
			});
			return deffered.promise;
	    };
		return {
			
			list: function(){
				get_analysis(data);
				return ['a', 'b','c'];
			}
		}
	}

});