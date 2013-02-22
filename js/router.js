define([
    'jquery',
    'backbone'
], function($, Backbone){
    "use strict";

    return Backbone.Router.extend({
        routes: {
            '':  'index',
            "first":		"first",
            "second":		"second",
            "dashboard":	"dashboard",
            "production":	"production",
            "scanlist":		"scanlist"
        },

        index:      function(){
            require([
                'modules/mainView/view'
            ], function(View){
                var view = new View();
            });
        },
        dashboard:      function(){
            require([
                'modules/dashboardView/view'
            ], function(View){
                var view = new View();
            });
        },
        production:     function(){
            require([
                'modules/productionView/view'
            ], function(View){
                var view = new View();
            });
        },
        scanlist:     function(){
            require([
                'modules/productionView/scanlist'
            ], function(View){
                var view = new View();
            });
        }
    });

});

