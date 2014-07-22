/*
* 이벤트 바인딩을 하는 이유
*
*  데이터 로딩과  뷰 랜더링의 의존성 제거
*  없으면 로딩시  뷰 랜더링함수를 로딩함수에 콜백으로 전달해야 한다.
*
*  바인딩을 쓰면 로딩함수 호출 후  리스너를 통해 이벤트가 트리거되어 뷰를 변경할 수 있다.
 */

//서버데이터 대용
var foodData = [
    {
        name:'test1',
        url:'img/img1.png'
    },
    {
        name:'test2',
        url:'img/img2.png'
    }
];

//라우터를 인스턴스화할 변수
var app;

//collection선언
var Foods = Backbone.Collection.extend({

});

//라우터 선언
/*   컬렉션을 초기화하고
*  요청에 따라서 home뷰와 appView를 로딩함.
 *
* */
var router = Backbone.Router.extend({
    routes:{
        '': 'home',
        'foods/:foodName': 'loadFood'
    },
    initialize: function(){
        var foods = new Foods();
        foods.reset(foodData);
        this.homeView = new homeView( {collection: foods});
        this.appView = new appView({collection:foods});
    },
    home:function(){
        this.homeView.render();
    },
    loadFood: function(foodName){
       // this.appView.render(foodName);
        //view에서 render를 함
        this.appView.loadFood(foodName);
    }
});

var homeView = Backbone.View.extend({
    el:'body',
    listEl:'.foods-list',
    cartEl:'.cart-box',
    template: _.template('Apple data: \
        <ul class="foods-list">\
        </ul>\
        <div class="cart-box"></div>'),
    //template: _.template('data: <%= data %>' ),
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


var appView = Backbone.View.extend({
    initialize: function(){
      this.model = new ( Backbone.Model.extend( {} ) );
      this.model.on('change', this.render, this);
      this.on('spinner', this.showSpinner, this);
    },
    template: _.template('<figure>\
                              <img src="<%= attributes.url%>"/>\
                              <figcaption><%= attributes.name %></figcaption>\
                            </figure>'),
    templateSpinner: '<img src="img/ajax-loader.gif"/>',


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

//subView
var foodItemView = Backbone.View.extend({
    tagName: 'li',
    template: _.template('\
             <a href="#foods/<%=name%>" target="_blank">\
            <%=name%>\
            </a>&nbsp;<a class="add-to-cart" href="#">buy</a>\
            '),
    events:{
        'click .add-to-cart': 'addToCart'
    },
    render: function(){
        this.$el.html( this.template( this.model.attributes ));
    },
    addToCart: function(){
        this.model.collection.trigger('addToCart', this.model );
    }

});


$(document).ready( function(){
    app = new router;
    Backbone.history.start();
});