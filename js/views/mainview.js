define([
    'jquery',
    'backbone',
    'handlebars',
    'views/common',
    'text!views/templates/Main.handlebars',
    'views/templates/ttt'
], function($, Backbone, Handlebars, CommonViews, MainTemplate, ttt){
    var Content = Backbone.View.extend({
        template:        Handlebars.compile(MainTemplate),
        el:             $("#content"),
        initialize:     function(opts){
            this.header = new CommonViews.Header();
            this.menu = new CommonViews.Menu();
            this.footer = new CommonViews.Footer();
            this.render();
        },
        render:         function(){
            var that = this;
            that.$el.html(that.template());
            return this;
        }
    });
    return {
        Main: Content
    }
});