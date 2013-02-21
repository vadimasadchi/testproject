define([
    'jquery',
    'backbone',
    'handlebars',
    'dateFormat',
    'modules/menu/view',
    'text!modules/productionView/template.handlebars',
    'text!modules/productionView/scanlist.handlebars',
    'text!modules/productionView/header.handlebars',
    'text!modules/productionView/footer.handlebars'
], function($, Backbone, Handlebars, dateFormat, Menu, template, scanlistTemplate, headerTemplate, footerTemplate){

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
    
    
    var ScanList = Backbone.View.extend({
        template:       Handlebars.compile(scanlistTemplate),
        el:             $("#content"),
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

			var baseUrl = "http://oneflow-dummy.azurewebsites.net";
			
			var view = this;
		
			$.getJSON(baseUrl+"/machines/Production", function(data) {

				if (data.error!="")	{
					alert("Unable to Load Stations");			
				}	else	{
					view.renderStationList(data.values);
				}
			
			}).error(function(error){
				alert("Unable to Load Stations");
			});
	        
        },
        renderStationList: function(data){
            var view = this;
            view.$el.html(view.template({stations:data}));

            $(".station-link").click(function(){
	            var stationId = $(this).attr("machine-id");
            	view.loadStation(stationId);
            });

            return this;
        }
    });

    return Content;
});

