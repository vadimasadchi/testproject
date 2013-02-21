define([
    'jquery',
    'backbone',
    'handlebars',
    'modules/printHeader/view',
    'modules/menu/view',
    'modules/footer/view',
    'text!modules/secondView/template.handlebars'
], function($, Backbone, Handlebars, Header, Menu, Footer, template){
    var Content = Backbone.View.extend({
        template:        Handlebars.compile(template),
        el:             $("#content"),
        initialize:     function(opts){
            $("#tempstylesheet").attr("href", "css/second.css");
            this.header = new Header();
            this.menu = new Menu();
            this.footer = new Footer();
            this.render();
        },
        render:         function(){
            var that = this;
            that.$el.html(that.template());
            var slide = that.$el.find("#slide");
            slide.on('click', function(){
                if(slide.hasClass("hided")){
                    that.slidedown();
                } else{
                    that.slideup();
                }
                slide.toggleClass("hided");
            });
            return this;
        },
        slideup: function(){
            this.$el.find("#inner").animate({height: '0px'}, 500);
            this.$el.find("#slide").find("img").attr("src", "images/down.png");
        },
        slidedown: function(){
            var inner = this.$el.find("#inner");
            inner.animate({height: inner.prop('scrollHeight')}, 500);
            this.$el.find("#slide").find("img").attr("src", "images/up.png");
        }
    });
    return Content;
});