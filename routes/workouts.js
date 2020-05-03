var express         = require("express"),
    FullBodyWorkout = require('../models/fullBody'),
    DailyWorkout    = require('../models/dailyWorkout'),
    router          = express.Router({mergeParams: true});

router.get('/fullbodyworkout', function(req, res){
    FullBodyWorkout.find({}, function(err, workout){
        if(err){
            console.log(err);
        }else{
            res.render("workouts/fullBodyWorkout",{workout: workout});
        }
    });
});

router.get('/dailyworkout', function(req, res){
    DailyWorkout.find({}, function(err, workout){
        if(err){
            console.log(err);
        }else{
            res.render("workouts/listOfMuscles",{workout: workout});
        }
    });
});

router.get("/dailyworkout/:id", function(req, res){
    DailyWorkout.findById(req.params.id, function(err, foundworkout){
        if(err){
            console.log(err);
        }else{
            res.render("workouts/muscleSpecificWorkout", {workout: foundworkout});
        }
    });
});

router.get('/quotes', function(req, res){
        res.render("quotes");
})

module.exports = router;