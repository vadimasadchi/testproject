define([
    'jquery',
    'backbone',
    'handlebars',
    'dateFormat',
    'models/stations',
    'modules/menu/view',
    'text!modules/productionView/template.handlebars',
    'text!modules/productionView/header.handlebars',
    'text!modules/productionView/footer.handlebars'
], function($, Backbone, Handlebars, dateFormat, stationModel, Menu, template, headerTemplate, footerTemplate){

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
        
        	// module css link here        	
			$("#tempstylesheet").attr("href", "css/production.css");

            this.header = new Header();
            this.menu = new Menu();
            this.footer = new Footer();
            
			this.loadStations();

        },
        loadStations: function(){

	        var view = this;
			var stations = new StationsList();
			stations.fetch({
				success:function(collection){
					view.renderStationList(collection);
				}
			});

        },
        renderStationList: function(data){
        	
            var view = this;
            view.$el.html(view.template({stations:data.toJSON()}));

            return this;
        }
    });

    return Content;
});

