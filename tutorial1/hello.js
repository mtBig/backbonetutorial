//Model
var Hello = Backbone.Model.extend({
    initialize : function(){
        this.name = 'myname'
    }
});

//Collection
var HelloCollection = Backbone.Collection.extend({
    model : Hello
});

