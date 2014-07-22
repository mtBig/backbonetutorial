
//작성중
var appleData = [
    {
        name:'test1',
        url:'img/img1.jpg'
    },
    {
        name:'test2',
        url:'img/img2.jpg'
    }
];

var app;

var router = Backbone.Router.extend({
    routes:{
        '': 'home',
        'foods/:foodName': 'loadApple'
    },
    initialize: function(){
        var apples = new Apples();
        apples.reset(appleData);
        this.homeView = new homeView( {collection: apples});
        this.appView = new appView({collection:apples});
    },
    home:function(){
        this.homeView.render();
    },
    loadApple: function(foodName){
        this.appView.render(foodName);
    }
});

var homeView = Backbone.View.extend({
    el:'body',
    template: _.template('data: <%= data %>' ),
    render:function(){
        this.$el.html( this.template( {data: JSON.stringify(this.collection.models)}));
    }
});

var Apples = Backbone.Collection.extend({

});

var appView = Backbone.View.extend({
    template: _.template('<figure>\
                              <img src="<%= attributes.url%>"/>\
                              <figcaption><%= attributes.name %></figcaption>\
                            </figure>'),
    render: function(foodName){
        var appleModel = this.collection.where({name:foodName})[0];
        var appleHtml = this.template(appleModel);
        $('body').html(appleHtml);
    }
});

$(document).ready( function(){
    app = new router;
    Backbone.history.start();
});