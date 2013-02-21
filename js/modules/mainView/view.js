define([
    'jquery',
    'backbone',
    'handlebars',
    'modules/productionHeader/view',
    'modules/menu/view',
    'modules/footer/view',
    'text!modules/mainView/template.handlebars'
], function($, Backbone, Handlebars, Header, Menu, Footer, template){
    var Content = Backbone.View.extend({
        template:        Handlebars.compile(template),
        el:             $("#content"),
        initialize:     function(opts){
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