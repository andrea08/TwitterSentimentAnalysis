'use strict';

angular.module('app.sentimentAnalysis').filter("epoch", function() {
    const format = {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    };

    return function(item) {
        return new Date(item * 1000).toLocaleString("en-US", format);
    };
});