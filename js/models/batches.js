var BatchModel = Backbone.Model.extend({
	defaults: {
		BatchNo: '',
		BatchScanNumber: '',
		ClientName: '',
		ID: '',
		MachineName: '',
		ProductName: '',
		Quantity: '',
		SLA: '',
		ScanStatus: '',
		Status: '',
		Type: '',
		machineId: ''	
	}
});

var BatchesList = Backbone.Collection.extend({
    model: BatchModel,
	initialize: function(props){
		this.stationId = props.stationId;
	},
  	url:function(){
  		console.log(baseUrl);
		return  baseUrl+'/batchdetails/machine/'+this.stationId;
	},
	setStationId:function(stationId){
		this.stationId = stationId;
	},
    parse: function(response) {
	    return response.values;
	}
});