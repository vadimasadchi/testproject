var StationModel = Backbone.Model.extend({
	urlRoot: baseUrl+'/machines/Production',
	defaults: {
		BarcodeID: '',
		ID: '',
		Name: '',
		PDFDropFolder: "",
		PrintType: "",
		StatusId: '',
		jdfDropFolder: "",
		productiontime: '',
	}
});

var StationsList = Backbone.Collection.extend({
    model: StationModel,
  	url:function(){
  		console.log(url);
		return  baseUrl+'/machines/Production?'+Math.random();
	},
    parse: function(response) {
	    return response.values;
	}
});

