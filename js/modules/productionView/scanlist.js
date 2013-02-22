define([
    'jquery',
    'backbone',
    'handlebars',
    'dateFormat',
    'models/batches',
    'modules/menu/view',
    'text!modules/productionView/scanlist.handlebars',
    'text!modules/productionView/scanlistHeader.handlebars',
    'text!modules/productionView/slidePanel.handlebars'
], function($, Backbone, Handlebars, dateFormat, batches, Menu, scanlistTemplate, headerTemplate, slidePanelTemplate){

    var Header = Backbone.View.extend({
        template:       Handlebars.compile(headerTemplate),
        el:             $("#header"),
        initialize:     function(opts){
            this.render();
        },
        render:         function(){
            var that = this;
            that.$el.html(that.template());
            console.log("rendering header");
            
            return this;
        }
        
    });

    var SlidePanel = Backbone.View.extend({
        template:       Handlebars.compile(slidePanelTemplate),
        el:             $("#slide-panel-container"),
        initialize:     function(opts){
            console.log("rendering slide panel");
            this.render();
        },
        render:         function(){
            var that = this;
            that.$el.html(that.template());
            $("#slide-panel-button").click(this.toggleSlidePanel);
            
            return this;
        },
		toggleSlidePanel: function(){
			
			var slidePanel = $("#slide-panel");
			if (slidePanel.hasClass("shiftDown"))	{
				slidePanel.addClass("shiftUp");		
				slidePanel.removeClass("shiftDown");
				$('.slide-panel-overlay').fadeOut();	
						
			}	else	{
				slidePanel.addClass("shiftDown");		
				slidePanel.removeClass("shiftUp");		
				$('.slide-panel-overlay').fadeIn();
				$('#status-barcode').removeClass().addClass('basic').find('#scan-text').text('');
			}
		}
    });
    
    var Content = Backbone.View.extend({
        template:        	Handlebars.compile(scanlistTemplate),
        el:             	$("#content"),
        enteredBarcode:		"",
        barcodeHash:		{},
        initialize:     function(opts){
            $("#tempstylesheet").attr("href", "css/production.css?"+Math.random());
            this.header = new Header();
            this.menu = new Menu();
            this.slideMenu = new SlidePanel();
            
			$.ajaxSetup({
			    contentType : 'application/json',
			    processData : false
			});
		
			$.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
			    if (options.data){
			        options.data=JSON.stringify(options.data);
			    }
			});	
            
            
            
            var stationId = parseURL()['station-id'];
            this.loadBatches(stationId);
        },        
        render:         function(data){
            var that = this;
            that.$el.html(that.template(data));
            return this;
        },        
        loadBatches: function(stationId){

	        var view = this;
			var batches = new BatchesList({stationId:stationId});
			batches.fetch({
				success:function(collection){
					view.displayBatches(collection.toJSON());
				}
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
				view.barcodeHash[data[i].BatchScanNumber] = data[i];
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
			
			
			this.enableBarcodeScanning();
				
        },
		keyBackspace: function(){
			this.enteredBarcode = this.enteredBarcode.substr(0, this.enteredBarcode.length-1);
			$("#scan-text").html(this.enteredBarcode);	
		},
		keyNumeric: function(code){
			this.enteredBarcode = this.enteredBarcode + (code);
			$("#scan-text").html(this.enteredBarcode);
		},
		keyEnter: function(){
			//send the data to the server
			this.scanBarcode(this.enteredBarcode);
			//reset the value of the barcode
			this.enteredBarcode="";	
		},
		keySearch: function(){
			
		},
		keyClick: function(key){
		
			var view = this;
			var code = parseInt(key.attr("code"));
		
			console.log("code=", code);
		
			key.addClass("keypad-key-pressed");
			setTimeout(function(){
				key.removeClass("keypad-key-pressed")
			},100);
		
			if (code==11)					view.keyBackspace();
			if (code>=0 && code<10)			view.keyNumeric(code);
			if (code==13)					view.keyEnter();
			if (code==14)					/* keySearch(); */ view.keyEnter();
		
		},
        
		disableBarcodeScanning: function(){
			console.log("disableBarcodeScanning");
			$(document).off('keypress');
			$('#scantext').off('keypress');	
		},
		
		enableBarcodeScanning: function(){
		
			console.log("enableBarcodeScanning");
			
			var view = this;
		
			$("#scantext").keypress(function(event){
				if (event.which==13) {
					$(this).val("");
					scanBarcode(enteredBarcode);
				}
			});
		
			//remove backspace backpage
			$(document).keydown(function(e)	{
				if (e.which==8)		return false;
			});
				
			//only valid keys can be pressed Numberic + enter + backspace
		//	function keyClick(key){
		
			$(document).keyup(function(e)	{
		
				if (e.which==8)					view.keyClick($("[code='11']"));
				if (e.which>47 && e.which<58)	{
					key = $("[code='"+(e.which-48)+"']");
					view.keyClick(key);
				}
				if (e.which==13)				view.keyClick($("[code='13']"));
			});
			
		},
		scanBarcode: function(barcode)	{
		
			if (this.barcodeHash[barcode]==undefined)	{
				this.showBarcodeMessage(true, barcode, "Invalid Barcode");
				this.searchLog(barcode, false);
				return false;
			}
			
			var view = this;
			var batchdetailsid = this.barcodeHash[barcode].ID;
				
			//Make a call to the server to scan the barcdde
			var scanData = {
				"_method":"put",
				"machineid":"3000"
			}

			$.ajax({
				type:"PUT",
				dataType: "json",
				url: baseUrl+"/batchdetails/scan/"+batchdetailsid,
				data: scanData,
				headers:{
					"Content-Type": "application/json; charset=utf-8",
					"Accept": "application/json, text/javascript, */*"
				},
				success: function(data) {
					console.log(data);
					if (data.error!="")	{
						this.showBarcodeMessage(true, barcode, data.error);
					}	else	{
						
						view.searchLog(barcode, true);
						view.showBarcodeMessage(false, barcode, "Successfull Scan");
						view.deleteItem(barcode);
			
					}
			
				},
				error: function(error){
					view.showScanMessage("Unable to Scan Barcode");
					
				}
			});
			
		},
		deleteItem: function(barcode){
		
			console.log(barcode,"barcode",$("#barcode-"+barcode));
			var view = this;
		
			//Upon Successful return of data from the ajax call then remove it from the list	
			$("#barcode-"+barcode)
				.transition(
					{ 
						scale: [1, 0],
						duration: 500
					}
				);
/*
				.transition(
					{ 
						scale: [1, 0],
						duration: 500,
						complete: function() {

							//record the parent
							var parent = $(this).parent();

							//remove the element
							$(this).remove();	

							//recalculate the items remaining				
							var count = parent.find("h2 strong").html();
							count--;
							if (count==0)	{
								//hide the section
								parent.hide();
							}
							//set the new count of items
							var countEl = parent.find("h2 strong");
							countEl.html(count);
							//remove the group if 0
							if (count==0)	{
								parent.hide();
							}
	
							if (view.loadBatchIntervalId)	clearInterval(view.loadBatchIntervalId);
							view.loadBatchIntervalId = setInterval(view.loadBatches, 30000);
							view.loadBatches();

						}
					});
*/


		},
		searchLog: function(barcode, status) {
			var now = new Date();
			
			if (status) status = 'check'; else status = 'warring';
			
			var data = [{
				Time : now.format("HH:MM:ss"),
				ScanNo : barcode,
				Batch : $('#barcode-' + barcode + ' .itemBatch dd').text(),
				Status : status
			}];
//			$("#searchLogTemplate").tmpl(data).prependTo("#scan-log");
			
		},
		showBarcodeMessage: function(error, barcode, message) {
			$("#status-barcode").removeClass('basic');
			if (error)	{
				$("#status-barcode").addClass("error");
				$("#scan-icon").addClass("error");
				$("#scan-warn").addClass("error");
			}	else	{
				$("#status-barcode").removeClass("error");		
				$("#scan-icon").removeClass("error");
				$("#scan-warn").removeClass("error");
			}
			$("#scan-text").html(barcode);
			$("#status-text").html(message);
			
		},
		showScanMessage: function(message){
		
			$("#scan-display")
				.html(message)
				.css("display","inline")
				.animate({
					opacity: 1
				},3000,function(){
					$(this)
						.css("display","none")
						.css("opacity",1);
				});	
		}
		
    });

    return Content;
});


function parseURL()	{
	var vars = [], hash;
	    var q = document.URL.split('?')[1];
	        q = q.split('#')[0];
	    if(q != undefined){
	        q = q.split('&');
	        for(var i = 0; i < q.length; i++){
	            hash = q[i].split('=');
	            vars.push(hash[1]);
	            vars[hash[0]] = hash[1];
        }
	}	
	return vars;
}


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





