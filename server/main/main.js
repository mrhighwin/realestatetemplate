var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../db/db').User;

router.post('/login', passport.authenticate('login'), function(req, res) {
    console.log('user log in successful');
    // res.redirect('/user');
    res.send({
        isAuthenticated: req.isAuthenticated(),
        user: req.user //user is passport shit. you get it from user.name
    });
});

router.post('/signup', passport.authenticate('signup'), function(req,res){
    console.log('authenticated? : ' + req.isAuthenticated());
    console.log(req.user);
    //start from here. pass information back to user
    //and keep following the strategy of the post

    res.send({
        isAuthenticated: req.isAuthenticated(),
        user:req.user 
    });
});

router.get('/logout', function(req, res) {
    req.logout();
    res.send({
        isAuthenticated: req.isAuthenticated(),
        user: req.user //user is passport shit. you get it from user.name
    });
});

router.get('/checkuservalid/:username', function (req,res) {
    console.log("The passed in Param is " + req.params.username);

    User.find({username: req.params.username}, function (err, data) {
        if(err)
            console.log(err);
        else
            res.send(data);
    });
});

router.post('/addlist/:listid', function(req, res){
    User.findOne({username: req.user.username}, function(err, doc){
        doc.propertyList.push(req.params.listid);
        doc.save();
    });

    res.send({user: req.user});
});


module.exports = router;
