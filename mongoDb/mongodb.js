const mongoose = require("mongoose");
require("dotenv").config();

const MongoDb = () => {
  mongoose
    .connect(process.env.MONGODB)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.log(error);
      console.log("Failed to connect to MongoDB");
    });
};

module.exports = MongoDb();
