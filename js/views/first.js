define([
    'jquery',
    'backbone',
    'handlebars',
    'views/common',
    'text!views/templates/First.handlebars',
    'models/models'
], function($, Backbone, Handlebars, CommonViews, FirstTemplate, Models){
    var Content = Backbone.View.extend({
        template:        Handlebars.compile(FirstTemplate),
        el:             $("#content"),
        initialize:     function(opts){
            new Models();
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
