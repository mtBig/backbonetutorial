/*
 * subView 생성
 * 개별 UI이벤트를 처리하고 예시로 행, 목록내의 항목 등에 사용한다.
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



$(document).ready( function(){
    app = new router;
    Backbone.history.start();
});