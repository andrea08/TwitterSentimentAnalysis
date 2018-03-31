"use strict";


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
