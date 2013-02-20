define([
    'jquery',
    'backbone',
    'handlebars',
    'views/common',
    'text!views/templates/First.handlebars'
], function($, Backbone, Handlebars, CommonViews, FirstTemplate){
    var Content = Backbone.View.extend({
        template:        Handlebars.compile(FirstTemplate),
        el:             $("#content"),
        initialize:     function(opts){
            $("#tempstylesheet").attr("href", "css/first.css");
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
        First: Content
    }
});
