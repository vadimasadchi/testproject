var baseUrl = "http://localhost:8080";

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
    url:baseUrl+'/machines/Production',
    parse: function(response) {
	    return response.values;
	}
});
