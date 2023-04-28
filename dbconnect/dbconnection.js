const mongoose = require('mongoose');
require("dotenv").config();


const dbconnection = async () => {
  try {
   
    mongoose.set('strictQuery', true);
    await mongoose.connect('mongodb+srv://mayank:d2SIPtnRpkuef0iv@webserver.6vsbgqn.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true},() => {
      console.log("db connection successful");
    });
  } catch (err) {
    console.log("DBconnection failed : "+err);
  }
};
module.exports = dbconnection;
