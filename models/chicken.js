const mongoose = require("mongoose"); //package needed to create a model, so require it

const chickenSchema = new mongoose.Schema({ //defining the Schema
  name: { type: String, required: true, unique: true }, // now have to define the keys and datatypes for a chicken 
  color: { type: String, required: true },
  flavourRating: { type: Number, min: 0, max: 10, required: true },
});

const Chicken = mongoose.model("Chicken", chickenSchema); //need to export the model
// creating the model

module.exports = Chicken; //need to export the model
