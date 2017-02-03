/**
 * Created by User on 31.01.2017.
 */
import express from "express";
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
var user = require('./models/user');

const app = express();

app.use(cookieParser());//cookie

app.use(bodyParser.urlencoded({ extended: true }));// parse application/x-www-form-urlencoded
app.use(bodyParser.json());// parse application/json

var session = require('cookie-session');// use req.session as data store
app.use(session({keys: ['secret']}));

var passport = require('passport');// authentication middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);



app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/user', function (req, res) {
    res.send('user!');
});

app.post('/login', passport.authenticate(
    'local-login', {
        successRedirect: '/user',
        failureRedirect: '/login'
    },
    function(){
        console.log('passport.authenticate() succes');
    }
));

app.listen(3333, function () {
    console.log('Example app listening on port 3333!');
});
