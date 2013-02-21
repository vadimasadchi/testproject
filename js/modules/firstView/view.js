define([
    'jquery',
    'backbone',
    'handlebars',
    'modules/productionHeader/view',
    'modules/menu/view',
    'modules/footer/view',
    'text!modules/firstView/template.handlebars',
    'models/models'
], function($, Backbone, Handlebars, Header, Menu, Footer, template, Models){
    var Content = Backbone.View.extend({
        template:        Handlebars.compile(template),
        el:             $("#content"),
        initialize:     function(opts){
            new Models();
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
