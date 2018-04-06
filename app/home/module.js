"use strict";

/**
* @author: Template
* Loads the home page, which allow search tweets by nickname or hashtag
*/
angular.module('app.home', ['ui.router'])
.config(function ($stateProvider) {

    $stateProvider
        .state('app.home', {
            url: '/home',
            data: {
                title: 'Search'
            },
            views: {
                "content@app": {
                    templateUrl: 'app/home/views/home.html',
                    controller: 'HomeController'
                }
            }
        })
});
