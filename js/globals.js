define([
    'underscore',
    'models/models'
], function(_, Models){
    var Globals = {
        init: {},
        cache:[],
        load : function(resource){
            var that = this;
            _.extend(that.init, resource);
        },
        get : function(name, initParams){
            if (!cache[name]) {
                cache[name] = new init[name](initParams);
                /*cache[name].deferred = cache[name].fetch();
                cache[name].deferred.done(function(res, status){
                    cache[name].trigger('fetch', res, status);
                });*/
            }
            return cache[name];
        }
    }
    Globals.load(Models);
    return Globals;
});