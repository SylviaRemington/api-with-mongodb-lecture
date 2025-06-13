const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Chicken = require("./models/chicken");

app.post("/chicken-types", async (req, res) => {
  res.send("this will create a new chicken type");
  // TODO: Make this request dynamic so a user can use a tool such as postman
  // to send data to the API for saving in the database
  const newChicken = await Chicken.create({
    name: "Anacona",
    color: "black",
    flavourRating: 5,
  });

  console.log(newChicken);
  res.json(newChicken);
});

app.get("/chicken-types", async (req, res) => {
  const chickens = await Chicken.find();
  const chickensAsHtml = `<p>${chickens[0].name}</p>`;

  res.send(chickensAsHtml);
});

app.listen(process.env.PORT, async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB Atlas");
  } catch (e) {
    console.error("A problem occured connecting", e);
  }
});
