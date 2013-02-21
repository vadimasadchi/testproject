define([
    'jquery',
    'backbone',
    'handlebars',
    "text!modules/productionHeader/template.handlebars"
], function($, Backbone, Handlebars, template){
    var Header = Backbone.View.extend({
            template:       Handlebars.compile(template),
            el:             $("#header"),
            initialize:     function(opts){
                $("#headercss").attr("href", "js/modules/productionHeader/style.css");
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