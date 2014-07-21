var app;
var router = Backbone.Router.extend({
    routes: {
        '': 'index',
        'home': 'home',
        'another': 'another'
    },
    initialize: function(){

    },

    index: function(){
       this.indexView = new IndexView;
        this.indexView.render();
    },

    another: function(){
      this.listView = new ListView;
     this.listView.render();
    },
    home: function(){
        this.homeView = new homeView;
        this.homeView.render();
    }

});

var IndexView = Backbone.View.extend({
    el:'div',

    render : function(){
        this.$el.append("<h2> hello backbone </h2>");
    }
});

var homeView = Backbone.View.extend({
    el: 'div',

    render: function(){
        this.$el.html('');
        this.$el.append("<h1>My home</h1>");
    }
});

var ListView = Backbone.View.extend({
    el: 'div',
    render: function(){
        this.$el.html('');
        this.$el.empty();
        this.$el.append("<h1>My List</h1>");
    }
});

$(document).ready(function(){
    app = new router;
    Backbone.history.start();
})

