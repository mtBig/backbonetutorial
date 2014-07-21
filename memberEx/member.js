var regName;
var regPwd;

//model
var User = Backbone.Model.extend({
    defaults:{
        name: null,
        pwd: null
    },

    initialize : function(){
        console.log("initialize user");
    }
});

//collection
var UserCollection = Backbone.Collection.extend({
    model: User,
    initialize:function(){
        console.log("init user collection");
        this.bind('add', function(model){ console.log('Add', model.get('id'), model); });
        this.bind('remove', function(el){ console.log('Remove', el.get('id'), el); });

    }
});

//view
var UserView = Backbone.View.extend({
    el: $('#divUser'),
    initialize: function(){
        var that = this;
        this.listeUsers  = new UserCollection();
        this.listUsers   = new UserCollection();

        this.listUsers.bind('add', function(model){
            that.addUserToList(model);
        });

        this.listUsers.bind('add', function(model){
            that.addLoginToList(model);
        });
    },
       events: {
           'click #cmdAddUser': 'cmdAddUser_Click',
           'click #login' : 'login'
       },

      cmdAddUser_Click : function(){
          var tmpUser = new User({
              name : $('#txtIdUser').val(),
              pwd  : $('#txtNomUser').val()
          });
          this.listeUsers.add(tmpUser);
      },
     login: function(){
         var tmplogin = new User({
             name: $('#txtIdUser').val(),
             pwd: $('#txtNomUser').val()
         });
         this.listUsers.add(tmplogin);
     },
    addUserToList  : function( model ){
        reg_name = model.get('name');
        reg_pass =  model.get('pwd');

        $("#listeUser").html('등록성공');
    },
    addLoginToList : function(model){
        if(model.get('name') == reg_name && model.get('pwd') == reg_pass)
        {
            $('#divUser').html("Login successfull");
        }else{
            $('#listeUser').html('fail login');
        }
    }
});

var userView = new UserView();
Backbone.history.start();