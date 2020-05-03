const mongoose      = require('mongoose');

var fullBodyWorkourSchema = new mongoose.Schema({
    name: String,
    url: String,
    image: String
});
var FullBodyWorkout = mongoose.model('FullBodyWorkout', fullBodyWorkourSchema);

module.exports = FullBodyWorkout;
