define([
    'backbone'
], function(Backbone){
    var State = Backbone.Model.extend({
        url: "js/models/model.json",
        initialize: function(){
            this.deferred = this.fetch();
        }
    });
    return State;
});