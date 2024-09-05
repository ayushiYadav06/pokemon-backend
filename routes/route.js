const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path"); // To handle file paths
const fs = require("fs"); // To check and create directory if not exists

const {
  addNewPokémon,
  getAllPokémon,
  updatePokémon,
  deletePokémon,
} = require("../controllers/controller");

// Define the local storage path
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../public/images/pokémons");
    // Check if directory exists, if not create it
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Append a timestamp to the original filename
    cb(null, Date.now() + "_" + file.originalname);
  },
});

// Initialize Multer with the storage configuration
const upload = multer({ storage: storage });

router.post("/uploadPokemonImage", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded",
    });
  }

  const filePath = `/images/pokémons/${req.file.filename}`; // Path for the saved image

  // Construct the full URL for accessing the image
  const fullUrl = `${req.protocol}://${req.get('host')}${filePath}`;

  res.json({
    success: true,
    message: "Image Uploaded Successfully",
    url: fullUrl, // Return the full URL to access the image
  });
});

router.post("/addNewPokemon", addNewPokémon);
router.get("/getAllPokemon", getAllPokémon);
router.put("/updatePokemon/:pokemonId", updatePokémon);
router.delete("/deletePokemon/:pokemonId", deletePokémon);

module.exports = router;
