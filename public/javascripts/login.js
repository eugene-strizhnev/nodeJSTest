/**
 * Created by Yevhen_Strizhnev on 30.11.13.
 */
requirejs.config({
    paths: {
        'jquery': [
            'http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min',
            'lib/jquery/jquery-2.0.3.min'
        ],
        'underscore': [
            'lib/underscore/underscore-min'
        ],
        'backbone': [
            'lib/backbone/backbone-min'
        ],
        'bootstrap': [
            'lib/bootstrap/bootstrap'
        ]
    },
    shim: {
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'bootstrap': {
            deps: ['jquery']
        }
    }
});

require(['bootstrap', 'backbone'], function () {

    Backbone.Model.authentication = Backbone.Model.extend({
        defaults: {
            username: "",
            password: "",
            rememberMe: false,
            loginFailed: false,
            loginAccepted: false
        },
        url: "vklogin"
    });

    var LoginView = Backbone.View.extend({
        model: new Backbone.Model.authentication(),
        el: $("#authorizationForm"),
        events: {
            "click #loginButton": "login"
        },
        login: function () {
            this.model.save(
                {
                    username: this.$el.find("#inputEmail").val(),
                    password: this.$el.find("#inputPassword").val()
                }, {
                    success: function (model, response) {
                        if (response["status"] == "success") {
                            window.location = "/";
                        }
                    },
                    error: function (model, xhr) {
                        alert(xhr.getResponseHeader("WWW-Authenticate"))
                    }
                })
        }
    })
    new LoginView()

    Backbone.history.start();

})