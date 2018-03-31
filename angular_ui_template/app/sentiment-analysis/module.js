"use strict";

/**
* @author: Maria Andrea Cruz Blandon
* Allow to communicate with Django RestFulAPI to get tweets and then after the sentiment analysis of those tweets.
* Preview view receives as parameter the value of the query
* Results view recives as parameter the list of tweets to be analyzed and the query used to retrieved those tweets.
*/
angular.module('app.sentimentAnalysis', ['ui.router'])
.config(function ($stateProvider) {

    $stateProvider
        .state('app.preview', {
            url: '/preview',
            data: {
                title: 'Preview'
            },
            views: {
                "content@app": {
                    templateUrl: 'app/sentiment-analysis/views/preview.html',
                    controller: 'PreviewController'
                }
            },
            params: {
                query: null
            }
        })
        .state('app.results', {
            url: '/results',
            data: {
                title: 'Analysis'
            },
            views: {
                "content@app": {
                    templateUrl: 'app/sentiment-analysis/views/results.html',
                    controller: 'ResultsController'
                }
            },
            params: {
                tweets: null,
                query: null
            }
        })
});
