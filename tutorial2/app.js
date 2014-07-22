//서버데이터 대용
var foodData = [
    {
        name:'test1',
        url:'img/img1.jpg'
    },
    {
        name:'test2',
        url:'img/img2.jpg'
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



var appView = Backbone.View.extend({
    template: _.template('<figure>\
                              <img src="<%= attributes.url%>"/>\
                              <figcaption><%= attributes.name %></figcaption>\
                            </figure>'),

    //배열에 첫번째 요소를 찾아서 모델로 지정
    //미리정의한 template에서 attribute의 url, name으로 매핑한다.
    render: function(foodName){
        var foodModel = this.collection.where({name:foodName})[0];
        var foodHtml = this.template(foodModel);
        $('body').html(foodHtml);
    }
});

$(document).ready( function(){
    app = new router;
    Backbone.history.start();
});