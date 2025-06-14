const dotenv = require("dotenv"); //any of these requires means we are importing them
dotenv.config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Chicken = require("./models/chicken");//importing my models


//This is not currently a dynamic code because the singular chicken is hardcoded.
app.post("/chicken-types", async (req, res) => { //this doesn't do anything until we trigger the code & we do that with postman
  
  // res.send("this will create a new chicken type"); //we invoke this function by using POSTMAN
  // TODO: Make this request dynamic so a user can use a tool such as postman
  // to send data to the API for saving in the database
  
  const newChicken = await Chicken.create({  //it should run this query and create a new database in our system
    name: "Anaconaaaaah", 
    color: "black", 
    flavourRating: 5, 
  });

  console.log(newChicken);
  res.json(newChicken);
});

app.get("/chicken-types", async (req, res) => {
  const chickens = await Chicken.find(); //find the Chicken model
  const chickensSayHi = chickens.map((c) =>  `Chicken ${c.name} says hi`);
  // const chickensAsHtml = `${chickens.map(c => c.name)}`//this creates a loop, but changing it up and not doing that. Simplifying it below
  const chickensAsHtml = `<p>${chickens[0].name}</p>`;

  // res.json(chickensSayHi); //creates chicken message of Anaconaaaaah
  // res.render(chickensAsHtml); //creates the whole html page but errors 500
  res.send(chickensAsHtml); //just shows the p tag with chicken name

  // const chickensAsHtml = `<p>${chickens[0].name}</p>`;

  // res.send(chickensSayHi);
});

app.listen(process.env.PORT, async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB Atlas");
  } catch (e) {
    console.error("A problem occured connecting", e);
  }
});


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