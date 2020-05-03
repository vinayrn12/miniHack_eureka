const mongoose      = require('mongoose');

var workoutInfoSchema = new mongoose.Schema({
    name       : String,
    url        : String
});


var dailyBodyWorkourSchema = new mongoose.Schema({
    muscle: String,
    exercises: [workoutInfoSchema],
    image: String
});
var DailyWorkout = mongoose.model('DailyWorkout', dailyBodyWorkourSchema);

module.exports = DailyWorkout;
