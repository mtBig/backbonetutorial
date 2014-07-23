var homeView = Backbone.View.extend({
    el:'body',
    listEl:'.foods-list',
    cartEl:'.cart-box',
    /*
    template: _.template('food data: \
        <ul class="foods-list">\
        </ul>\
        <div class="cart-box"></div>'),
        */

    //template: _.template('data: <%= data %>' ),

    template: _.template(homeViewTpl),

    //초기화 추가
    initialize: function(){
        this.$el.html( this.template);
        this.collection.on('addToCart', this.showCart, this);
    },

    showCart: function( foodModel ){
        $(this.cartEl).append( foodModel.attributes.name + '<br/>');
    },

    render:function(){
        view  = this;
        this.collection.each( function( food ){
            var appSubView = new foodItemView({model:food});
            appSubView.render();
            $(view.listEl).append(appSubView.$el);
        });
        // this.$el.html( this.template( {data: JSON.stringify(this.collection.models)}));
    }
});

