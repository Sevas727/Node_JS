/**
 * Created by User on 01.02.2017.
 */
var LocalStrategy = require('passport-local').Strategy;
var User          = require('../models/user');

module.exports = function(passport) {

    passport.serializeUser(function(user, done){
        console.log('user.id',user.id);
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done){
        console.log('deserializeUser id',id);
      /*
      User.findById(id, function(err, user){
            done(err, user);
        });
      */
    });

/*
    passport.use('local-signup', new LocalStrategy({
            usernameField: 'name',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, email, password, done){
            process.nextTick(function(){
                User.findOne({'local.username': email}, function(err, user){
                    if(err)
                        return done(err);
                    if(user){
                        return done(null, false, req.flash('signupMessage', 'That email already taken'));
                    } else {
                        var newUser = new User();
                        newUser.local.username = email;
                        newUser.local.password = password;

                        newUser.save(function(err){
                            if(err)
                                throw err;
                            return done(null, newUser);
                        })
                    }
                })

            });
        }));
*/

    passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, email, password, done){
            console.log('local-login from config');
            console.log('email',email,'password',password);

        //    name: 'John',
        //        password: 'Hancock',
        //        email: 'test@gmail.com'

            process.nextTick(function(){
                User.findAll({
                    where: {
                        email: email,
                        password: password
                    }
                }).then(function (user) {
                    console.log(user);
                    return done(null, user);
                }).catch((err) => {
                    console.log(err);
                    return done(err);
                });
                /*
                User.findOne({ 'local.username': email}, function(err, user){
                    if(err)
                        return done(err);
                    if(!user)
                        return done(null, false, req.flash('loginMessage', 'No User found'));
                    if(user.local.password != password){
                        return done(null, false, req.flash('loginMessage', 'inavalid password'));
                    }
                    return done(null, user);

                });
                */
            });
        }
    ));


};