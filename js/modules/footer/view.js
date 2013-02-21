define([
    'jquery',
    'backbone',
    'handlebars',
    "text!modules/footer/template.handlebars"
], function($, Backbone, Handlebars, template){
    var Footer = Backbone.View.extend({
            template:       Handlebars.compile(template),
            el:             $("#footer"),
            initialize:     function(opts){
                this.render();
            },
            render:         function(){
                var that = this;
                that.$el.html(that.template());
                return this;
            }
        });

    return Footer;
});

