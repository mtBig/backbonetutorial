
//작성중
var appleData = [
    {
        name:'test1',
        url:'img/test1.jpg'
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
        'apples/:appleName': 'loadApple'
    },
    initialize: function(){
        var apples = new Apples();
        apples.reset(appleData);
        this.homeView = new homeView( {collection: apples});
        this.appleView = new appleView({collection:apples});
    },
    home:function(){
        this.homeView.render();
    },
    loadApple: function(appleName){
        this.appleView.render(appleName);
    }
});