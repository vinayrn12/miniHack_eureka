var express     = require("express"),
    router      = express.Router({mergeParams: true}),
    passport    = require("passport"),
    User        = require("../models/user"),
    middleware  = require('../middleware/index');

router.get('/', function(req, res){
    res.render('landing');
});

router.get('/register', function(req, res){
    res.render('register');
})

router.get('/login', function(req, res){
    res.render('login');
})

router.get('/workout', middleware.isLoggedIn,function(req, res){
    res.render('workout');
});

router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash('error', err.message);
            res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to Fithub " + user.username);
            res.redirect("/workout");
        });
    });
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/workout",
    failureRedirect: "/login"
}), function(req, res){});

router.get("/logout", function(req, res){
    req.logOut();
    res.redirect("/");
});

router.get("/snake", function(req, res){
    res.render("snake");
});

module.exports = router;