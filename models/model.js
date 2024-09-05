const mongoose = require("mongoose");

const pokémonModel = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  breed: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const pokémonSchema = mongoose.model("Pokemon", pokémonModel);
module.exports = pokémonSchema;
