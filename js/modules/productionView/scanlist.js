define([
    'jquery',
    'backbone',
    'handlebars',
    'dateFormat',
    'modules/menu/view',
    'text!modules/productionView/scanlist.handlebars',
    'text!modules/productionView/header.handlebars'
], function($, Backbone, Handlebars, dateFormat, Menu, scanlistTemplate, headerTemplate){

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
        template:        Handlebars.compile(scanlistTemplate),
        el:             $("#content"),
        initialize:     function(opts){
            $("#tempstylesheet").attr("href", "css/production.css?"+Math.random());
            this.header = new Header();
            this.menu = new Menu();
            
            var stationId = 3000;

            this.loadBatches(stationId);
        },
        loadBatches: function(stationId){

			var baseUrl = "http://oneflow-dummy.azurewebsites.net";
//			var baseUrl = "http://localhost:8080";

			var url = baseUrl+"/batchdetails/machine/"+stationId;
			var view = this;
			
			$.getJSON(url, function(data) {	
				view.displayBatches(data.values);
			}).error(function(){

			});

        },
        displayBatches: function(data){
        
        	var view = this;

			var now = new Date();
			now = now.format("HH:MM:ss");
		
			if (data==null)	data = [];
		
			var redData = [];
			var amberData = [];
			var greenData = [];
		
			data.sort(function(a,b){		
				return a.DueIn - b.DueIn;
			})
			for (i in data) {
			
		//		console.log(data[i].BatchScanNumber);
		//		barcodeHash[data[i].BatchScanNumber] = data[i];
				data[i].ProductName = data[i].ProductName.replace("PhotoBox - ","");
				data[i].ProductName = data[i].ProductName.replace("PB - ","");
			
				data[i].DueIn = getDueMins(data[i].SLA);
				data[i].DueInNice = getDueInNice(data[i].DueIn);
				data[i].DueInHours = getDueInHours(data[i].DueIn);
				data[i].DueInMins = getDueInMins(data[i].DueIn);
		//		data[i].estimatedTime = machineTimes[data[i].MachineId] * data[i].Quantity;
		
				if (data[i].DueIn<0)			redData.push(data[i])
				else if (data[i].DueIn<120)		amberData.push(data[i]);
				else							greenData.push(data[i]);		
				
			}
			redData.sort(function(a,b){		
				return a.DueIn - b.DueIn;
			})
			amberData.sort(function(a,b){		
				return a.DueIn - b.DueIn;
			})
			greenData.sort(function(a,b){		
				return a.DueIn - b.DueIn;
			})
			
			$("#itemGroupOverdue div.item").remove();
			$("#itemGroupDue div.item").remove();
			$("#itemGroup div.item").remove();
		
		//	var displayCount = globalDisplayCount;
			var displayCount = 100;
		
			if (redData.length>displayCount)		{
				redData = redData.slice(0, displayCount);
				displayCount = 0;
			}	else	{
				displayCount = displayCount - redData.length;		
			}
		
			if (amberData.length>displayCount)		{
				amberData = amberData.slice(0, displayCount);
				displayCount=0;
			}	else	{
				displayCount = displayCount - amberData.length;		
			}
		
			if (greenData.length>displayCount)		{
				greenData = greenData.slice(0, displayCount);
				displayCount = 0;
			}	else	{
				displayCount = displayCount - greenData.length;		
			}

			
			view.render({
				redCount:redData.length,
				amberCount:amberData.length,
				greenCount:greenData.length,
				redItems:redData,
				amberItems:amberData,
				greenItems:greenData
			});
		
			if (redData.length>0)	$("#itemGroupOverdue").show();
			else					$("#itemGroupOverdue").hide();
			if (amberData.length>0)	$("#itemGroupDue").show();
			else					$("#itemGroupDue").hide();
			if (greenData.length>0)	$("#itemGroup").show();
			else					$("#itemGroup").hide();		
				
        },
        render:         function(data){
            var that = this;
            that.$el.html(that.template(data));
            return this;
        }
    });

    return Content;
});





function getDueMins(date)	{

	ps = date.split(" ");
	dps = ps[0].split("/");
	tps = ps[1].split(":");
	
	duedate = new Date(dps[2],dps[1]-1,dps[0], tps[0],tps[1],tps[2]);
	nowdate = new Date();
	totalmins = Math.floor((duedate - nowdate)/1000/60);

	return totalmins;	
}



function getDueInNice(totalmins)	{

	var ago = "";
	if (totalmins<0) {
		totalmins = -totalmins;
		ago = " - ";
	}

	duehours = Math.floor(totalmins/60);
	duemins = Math.floor(totalmins % 60);

	return ago+duehours+"h "+duemins+"m";	
}

function getDueInHours(totalmins)	{

	var ago = "";
	if (totalmins<0) {
		totalmins = -totalmins;
		ago = " - ";
	}

	duehours = Math.floor(totalmins/60);

	return duehours;
}

function getDueInMins(totalmins)	{

	var ago = "";
	if (totalmins<0) {
		totalmins = -totalmins;
		ago = " - ";
	}

	duemins = Math.floor(totalmins % 60);

	return duemins;	
}


