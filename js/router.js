define([
    'jquery',
    'backbone',
    'views/common'
], function($, Backbone, cViews){
    "use strict";

    return Backbone.Router.extend({
        routes: {
            '':  'index',
            "first":              "first",
            "second":            "second"
        },

        index:      function(){
            require([
                'views/mainview'
            ], function(Views){
                var view = new Views.Main();
            });
        },
        first:      function(){
            require([
                'views/first'
            ], function(Views){
                var view = new Views.First();
            });
        },
        second:     function(){
            require([
                'views/second'
            ], function(Views){
                var view = new Views.Second();
            });
        }
    });

});

