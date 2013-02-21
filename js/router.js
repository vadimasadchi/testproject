define([
    'jquery',
    'backbone'
], function($, Backbone){
    "use strict";

    return Backbone.Router.extend({
        routes: {
            '':  'index',
            "first":              "first",
            "second":            "second"
        },

        index:      function(){
            require([
                'modules/mainView/view'
            ], function(View){
                var view = new View();
            });
        },
        first:      function(){
            require([
                'modules/firstView/view'
            ], function(View){
                var view = new View();
            });
        },
        second:     function(){
            require([
                'modules/secondView/view'
            ], function(View){
                var view = new View();
            });
        }
    });

});

