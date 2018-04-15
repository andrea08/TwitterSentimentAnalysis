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
    // deploy
    const server = 'http://django-env.gqpastpgwd.eu-west-3.elasticbeanstalk.com/';

    this.$get = function ($q, $http, $rootScope) {
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
        const get_analysis = function (sentiment_query) {
            const url = server + 'tweet_sentiment/sentiment';
            const dfd = $q.defer();
            $http.post(url, sentiment_query).success(function (sentiment_data) {
                // Broadcast result of request
                $rootScope.$broadcast('$finishedRequest');
                dfd.resolve(sentiment_data);
            }).error(function (err) {
                const error = {type: 1, message: JSON.stringify(err), data: err};
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
        const get_tweets = function (tweet_query) {
            /**
             * Type of errors:
             * type 0 when there were no tweets found
             * type 1 when the response has an error status code
             */
            const url = server + 'tweet_sentiment/tweets';
            const dfd = $q.defer();
            $http.post(url, tweet_query).success(function (tweet_list) {
                if (tweet_list.tweets.length === 0 && tweet_list.number_found === 0) {
                    // Broadcast result of request
                    $rootScope.$broadcast('$finishedRequest');
                    dfd.reject({type: 0});
                } else {
                    // Broadcast result of request
                    $rootScope.$broadcast('$finishedRequest');
                    dfd.resolve(tweet_list);
                }
            }).error(function (err) {
                // Broadcast result of request
                const error = {type: 1, message: JSON.stringify(err), data: err};
                // Broadcast result of request
                $rootScope.$broadcast('$finishedRequest');
                dfd.reject(error);
            });
            return dfd.promise;
        };

        return {

            get_tweets: function (tweet_query) {
                return get_tweets(tweet_query);
            },
            get_analysis: function (sentiment_query) {
                return get_analysis(sentiment_query);
            }
        };
    };

});