define([
    'jquery',
    'backbone',
    'handlebars',
    'modules/menu/view',
    'text!modules/firstView/template.handlebars',
    'text!modules/firstView/header.handlebars',
    'text!modules/firstView/footer.handlebars'
], function($, Backbone, Handlebars, Menu, template, headerTemplate, footerTemplate){
    var Footer = Backbone.View.extend({
        template:       Handlebars.compile(footerTemplate),
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
    var Header = Backbone.View.extend({
        template:       Handlebars.compile(headerTemplate),
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
    var Content = Backbone.View.extend({
        template:        Handlebars.compile(template),
        el:             $("#content"),
        initialize:     function(opts){
            $("#tempstylesheet").attr("href", "css/first.css");
            this.header = new Header();
            this.menu = new Menu();
            this.footer = new Footer();
            this.render();
        },
        render:         function(){
            var that = this;
            that.$el.html(that.template());
            return this;
        }
    });

    return Content;
});
