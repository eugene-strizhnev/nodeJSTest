/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var registration = require('./routes/registration/registration');
var login = require('./routes/login/login');
var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy
    , VKontakteStrategy = require('passport-vkontakte').Strategy;

passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    function (username, password, done) {

        console.log("we are in passport")
//        return done(null, "serialized user".toString());
        return done(null, false, "Bla")
    }
));

passport.use(new VKontakteStrategy({
        clientID: 4032650, // VK.com docs call it 'API ID'
        clientSecret: "Tcw8qeHRJMjo6d8kw0Hr",
        callbackURL: "http://localhost:3000/auth/vkontakte/callback"
    },
    function (accessToken, refreshToken, profile, done) {
//        User.findOrCreate({ vkontakteId: profile.id }, function (err, user) {
//            return done(err, user);
//        });
        return done(null, "serialized user".toString());
    }
));

passport.serializeUser(function (user, done) {
    done(null, 1);
});

passport.deserializeUser(function (id, done) {
    done(null, 1);
});

var app = express();

// all environments
app.configure(function () {
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(express.cookieParser('your secret here'));
    app.use(express.session());
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);

    app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
    app.use(express.static(path.join(__dirname, 'public')));
});
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

app.get('/registration', registration.registration);
app.get('/login', login.login);

app.post('/login', passport.authenticate('local'),
    function (req, res) {
        console.log("We are processing login request")
        res.send({
            status: "success"
        })
    });

app.post('/vklogin', passport.authenticate('vkontakte'),
    function (req, res) {
        console.log("We are processing login request")
        res.send({
            status: "success"
        })
    });

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
