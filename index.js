const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const StudentModel = require("./model/student.js");

app.use('/', express.static('public'));
//for parsing json input from angular
app.use(bodyParser.json());


// for creating 
app.post('/create-student', function(req, res) {
    let studentInfo = req.body;
    let newStudent = new StudentModel({
        name: studentInfo.name,
        age: studentInfo.age,
        nationality: studentInfo.nationality
    });

    newStudent.save(function(err, Student){
        if(err)
           res.render('show_message', {message: "Database error", type: "error"});
        else {
            res.json({
                student : Student
            });
        }
    });
});

// for retriving
app.post('/get-by-name', (req, res) => {
    StudentModel.findOne({name : req.body.name}, function(err, response) {
        if(!err){
            res.json({
                studentInfo : response
            });
        }
    });
});

// for updating
app.put('/update-student/:name', function(req, res) {
    StudentModel.findOneAndUpdate({name : req.params.name}, {age : parseInt(req.body.age)}, function(err, response) {
        if(err) {
            res.json({
                error : err
            });
        }
        else{
            res.json({
                result : `updated ${response.age}`
            });
        }
    });
});

app.delete('/delete-student/:name', function(req, res) {
    StudentModel.findOneAndRemove({name : req.params.name}, function(err, response) {
        if(err){
            res.send("error");
        }
        else {
            res.json({
                result : response
            });
        }
    });
});





app.listen(3000, (err, res) => {
    console.log("Server is up!!");
});