const express           = require('express'),
      mongoose          = require('mongoose'),
      indexRoutes       = require('./routes/index'),
      passport          = require('passport'),
      localStrategy     = require('passport-local'),
      bodyParser        = require('body-parser'),
      app               = express(),
      workoutRoutes     = require('./routes/workouts'),
      middleware        = require('./middleware/index'),
      flash           = require("connect-flash"),
      User              = require('./models/user');

mongoose.connect("mongodb+srv://vinay:vinay12@cluster0-a67ci.mongodb.net/test", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(flash());

app.use(require("express-session")({
    secret: "I am a god",
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use('/', indexRoutes);
app.use('/workout', middleware.isLoggedIn,workoutRoutes);

var port = process.env.PORT || 12345;
app.listen(port, function(){
    console.log("The server is listening...");
});
