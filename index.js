const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const PersonModel = require("./model/person.js");

// enabling cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/", express.static("public"));
//for parsing json input from angular
app.use(bodyParser.json());

app.get("/getPerson", async function(req, res) {
  res.json(await PersonModel.find({}));
});

// for creating
app.post("/create-person", function(req, res) {
  let personInfo = req.body;
  let newPerson = new PersonModel({
    name: personInfo.name,
    email: personInfo.email,
    phone: personInfo.phone
  });

  newPerson.save(function(err, Person) {
    if (err)
      res.render("show_message", { message: "Database error", type: "error" });
    else {
      res.json({
        person: Person
      });
    }
  });
});

// for retriving
app.post("/get-by-name", (req, res) => {
  PersonModel.findOne({ name: req.body.name }, function(err, response) {
    if (!err) {
      res.json({
        personInfo: response
      });
    }
  });
});

// for updating
app.put("/update-person/:name", function(req, res) {
  PersonModel.findOneAndUpdate(
    { name: req.params.name },
    { phone: parseInt(req.body.phone) },
    function(err, response) {
      if (err) {
        res.json({
          error: err
        });
      } else {
        res.json({
          result: `updated ${response.phone}`
        });
      }
    }
  );
});

app.delete("/delete-person/:name", function(req, res) {
  PersonModel.findOneAndRemove({ name: req.params.name }, function(
    err,
    response
  ) {
    if (err) {
      res.send("error");
    } else {
      res.json({
        result: response
      });
    }
  });
});

app.listen(3002, (err, res) => {
  console.log("Server is up!!");
});
