


var baseUrl = "http://localhost:8080";
//var baseUrl = "http://oneflow-dummy.azurewebsites.net";





require.config({
// The shim config allows us to configure dependencies for
// scripts that do not call define() to register a module
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        'jquery':     {
            exports: '$'
        },
        'handlebars': {
            exports: 'Handlebars'
        }
    },
    paths: {
        jquery: './lib/jquery-1.9.1.min',
        underscore: './lib/underscore-min',
        backbone: 'lib/backbone-min',
        backboneLocalstorage: 'lib/backbone-localstorage',
        handlebars: 'lib/handlebars',
        text: 'lib/text',
        common: './common',
        dateFormat: './lib/date.format',
        transit: './lib/jquery.transit'
    }
});

require(["router", "backbone"], function(Router, Backbone) {
    //init
    new Router();
    Backbone.history.start();
});

