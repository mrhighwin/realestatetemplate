var todosRoutes = require('./todos/routes');
var propertiesRoutes = require('./properties/routes');
var mainRoutes = require('./main/main');
var passport = require('passport');
var passportLocal = require('passport-local');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var passport = require('passport');
var passportLocal = require('passport-local');
var bCrypt = require('bcrypt-nodejs');
var User = require('./db/db').User;

module.exports = function routes(app) {
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(expressSession({
        secret: process.env.SESSION_SECRET || 'secret',
        resave: false,
        saveUninitialized: false
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    passport.use('login', new passportLocal.Strategy({ passReqToCallback: true }, function(req, username, password, done) {
        User.findOne({'username' : username}, function (err, user) {
            //In case of any error, return using the done method
            if(err){
                return done(err);
            }
            //User exists but wrong password, log the error
            if(!user){
                console.log('User Not Found with username ' + username);
                return done(null, null);
            }

            if(!isValidPassword(user, password)){
                console.log('Invalid Password');
                return done(null, null);
            }

            console.log("Sign In Successfully!!!");
            return done(null, user);
        });
    }));

    passport.use('signup', new passportLocal.Strategy({ passReqToCallback: true }, function(req, username, password, done) {
        findOrCreateUser = function() {
            User.findOne({ 'username': username }, function(err, user) {
                //In canse of any error return 
                if (err) {
                    console.log('Error in SignUp ' + err);
                    return done(err);
                }
                //already exists
                if (user) {
                    console.log('User already exists');
                    done(null, null);
                } else {
                    //if there is no user with that email
                    //create the user
                    var newUser = new User();
                    //set the user's local credentials
                    newUser.username = username;
                    newUser.password = createHash(password);
                    newUser.list = [];
                    newUser.category = 'fruit';
                    newUser.propertyList = [];

                    //save the user
                    newUser.save(function(err) {
                        if (err) {
                            console.log("Error in Saving user " + err);
                            throw err;
                        }
                        console.log('User Registration Successful');
                        return done(null, newUser);
                    });
                }
            });
        };

        //Delay the excution of findOrCreateUser and execute
        //the method in the next tick of the event loop
        process.nextTick(findOrCreateUser);

    }));

    //Generate hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    };

    //Check If password match using hash
    var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    };

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    app.use('/todos', todosRoutes);
    app.use('/properties', propertiesRoutes);
    app.use('/', mainRoutes);
}