
var appView = Backbone.View.extend({
    initialize: function(){
        this.model = new ( Backbone.Model.extend( {} ) );
        this.model.on('change', this.render, this);
        this.on('spinner', this.showSpinner, this);
    },
    /*
    template: _.template('<figure>\
                              <img src="<%= attributes.url%>"/>\
                              <figcaption><%= attributes.name %></figcaption>\
                            </figure>'),
     */
    template : _.template(appViewTmpl),
    templateSpinner: spinnerTpl,
    //templateSpinner: '<img src="img/ajax-loader.gif"/>',


    loadFood: function(foodName){
        //이벤트를 발생시킨다.
        this.trigger('spinner');
        //closure를 이용해서 view사용
        var view = this;
        setTimeout( function(){
            view.model.set( view.collection.where({name:foodName})[0].attributes );
        }, 1000);
    },
    render: function(foodName){
        var foodHtml = this.template(this.model);
        $('body').html(foodHtml);
    },
    showSpinner: function(){
        $('body').html( this.templateSpinner);
    }
});
