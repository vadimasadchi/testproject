define([
    'jquery',
    'backbone',
    'handlebars',
    "text!modules/menu/template.handlebars"
], function($, Backbone, Handlebars, template){
    var Menu = Backbone.View.extend({
            template:       Handlebars.compile(template),
            el:             $("#menu"),
            out:            false,
            initialize:     function(opts){
                this.render();
            },
            render:         function(){
                var that = this;
                that.$el.html(that.template());
                this.$el.find("#buttonNav").on("click",function(){
                    if(that.out){
                        that.slideIn();
                    } else{
                        that.slideOut();
                    }
                    that.out = !that.out;
                });
                return this;
            },
            slideOut: function(){
                this.$el.find(".menubox").animate({left: "0px"}, 250);
                this.$el.find("#buttonNav").animate({left: "125px"}, 250);
            },
            slideIn: function(){
                var that = this;
                this.$el.find(".menubox").animate({left: "-125px"}, 250,null,function(){
                    that.$el.find(".menubox").css("left", "");
                });
                this.$el.find("#buttonNav").animate({left: "0px"}, 250,null,function(){
                    that.$el.find("#buttonNav").css("left", "");
                });

            }
        });

    return Menu;
});

