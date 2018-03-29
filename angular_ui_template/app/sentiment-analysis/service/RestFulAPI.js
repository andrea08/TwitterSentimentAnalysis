'use strict';

angular.module('app.sentimentAnalysis').provider('RestFulAPI', function () {
	/**
	* This provider will send the request to the Django RestFulAPI, and process the responses as well.
	*/
	// dev
	let server= 'http://127.0.0.1:8000/tweet_sentiment/sentiment'


	this.$get = function(){
		return {
			list: function(){
				return ['a', 'b','c'];
			}
		}
	}

});