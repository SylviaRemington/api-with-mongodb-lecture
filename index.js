const dotenv = require("dotenv"); //any of these requires means we are importing them
dotenv.config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Chicken = require("./models/chicken");//importing my models

app.post("/chicken-types", async (req, res) => { //this doesn't do anything until we trigger the code & we do that with postman
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

// app.listen(process.env.PORT, async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI);
//     console.log("Connected to MongoDB Atlas");
//   } catch (e) {
//     console.error("A problem occured connecting", e);
//   }
// });


//THIS WAS WRITTEN EARLY ON IN THE LECTURE & THEN CHANGED
// app.listen(process.env.PORT, () =>
//   console.log(`App is listening on port ${process.env.PORT}`)
// );

//connecting to the database when we start the api
//adding a try and a catch, and also adding async function:
app.listen(process.env.PORT, async () => {//app starts and we try to connect to the database
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB Atlas'); //if works and connects, this will be the message
  } catch (e) { //if doesn't work and doesn't connect, this will be the error message below
    console.error('A problem occurred connecting', e);

  }
});