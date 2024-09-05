const express = require("express");
const cors = require("cors");
require("./mongoDb/mongodb");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const app = express();
const pokémonRoute = require("./routes/route");
const path = require("path");

app.use(express.json());

// Enable CORS
app.use(cors());

// Set up static file serving
app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.use("/pokemon", pokémonRoute);

app.listen(PORT, () => {
  console.log(`Server is running on PORT => ${PORT}`);
});
