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
    template: _.template('data: <%= data %>' ),
    render:function(){
        this.$el.html( this.template( {data: JSON.stringify(this.collection.models)}));
    }
});


/*
*  view에 이벤트 바인딩 추가
* */
var appView = Backbone.View.extend({
    initialize: function(){
      this.model = new ( Backbone.Model.extend( {} ) );
       /*
       * on( event, actions, context)
       * */
      //model에 대해서
      this.model.on('change', this.render, this);
      //view에 대해서
      this.on('spinner', this.showSpinner, this);
    },
    template: _.template('<figure>\
                              <img src="<%= attributes.url%>"/>\
                              <figcaption><%= attributes.name %></figcaption>\
                            </figure>'),
    templateSpinner: '<img src="img/ajax-loader.gif"/>',

   /*
    render: function(foodName){
        var foodModel = this.collection.where({name:foodName})[0];
        var foodHtml = this.template(foodModel);
        $('body').html(foodHtml);
    }
    */
    loadFood: function(foodName){
      this.trigger('spinner');
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

$(document).ready( function(){
    app = new router;
    Backbone.history.start();
});