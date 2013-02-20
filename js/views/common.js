define([
    'jquery',
    'backbone',
    'handlebars',
    "text!views/templates/Menu.handlebars",
    "text!views/templates/Header.handlebars",
    "text!views/templates/Footer.handlebars"
], function($, Backbone, Handlebars, MenuTemplate, HeaderTemplate, FooterTemplate){
    var Menu = Backbone.View.extend({
            template:       Handlebars.compile(MenuTemplate),
            el:             $("#menu"),
            initialize:     function(opts){
                this.render();
            },
            render:         function(){
                var that = this;
                that.$el.html(that.template());
                return this;
            }
        });
        Header = Backbone.View.extend({
            template:       Handlebars.compile(HeaderTemplate),
            el:             $("#header"),
            initialize:     function(opts){
                this.render();
            },
            render:         function(){
                var that = this;
                that.$el.html(that.template());
                return this;
            }
        }),
        Footer = Backbone.View.extend({
            template:       Handlebars.compile(FooterTemplate),
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

    return {
        Menu: Menu,
        Header: Header,
        Footer: Footer
    }
});

