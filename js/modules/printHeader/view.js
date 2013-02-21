define([
    'jquery',
    'backbone',
    'handlebars',
    "text!modules/printHeader/template.handlebars"
], function($, Backbone, Handlebars, template){
        var Header = Backbone.View.extend({
            template:       Handlebars.compile(template),
            el:             $("#header"),
            initialize:     function(opts){
                this.render();
            },
            render:         function(){
                var that = this;
                that.$el.html(that.template());
                return this;
            }
        });

    return Header;
});

