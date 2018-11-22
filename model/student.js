var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_school_db');

var studentSchema = mongoose.Schema({
    name: String,
    age: Number,
    nationality: String
});

var Student = mongoose.model("Students", studentSchema);

module.exports = Student;