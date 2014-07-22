var View  = Backbone.Layout.extend({
    template:'#view',
    events:{
        "click": "wrapElement" ,
        "mouseenter": "insertElement",
        "mouseleave": "removeElement"
    },
    wrapElement: function() {
        this.$el.wrap("<b>");
    },
    insertElement: function() {
        this.insertView(new DisplayView()).render();
    },

    removeElement: function() {
        // Removes the inserted DisplayView.
        this.removeView("");
    }

});

var DisplayView = Backbone.View.extend({
    manage: true,

    template: "#display"
});


var layout = new Backbone.Layout({
    el: '.main',
    template:'#layout'   ,
    views:{
        'p': new View()
    }
});

layout.render();