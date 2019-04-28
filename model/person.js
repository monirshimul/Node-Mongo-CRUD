var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/digital_identity");

var digital_identity_Schema = mongoose.Schema({
  name: String,
  email: String,
  phone: String
});

var Person = mongoose.model("Persons", digital_identity_Schema);

module.exports = Person;
