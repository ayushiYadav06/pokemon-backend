const PokémonModel = require("../models/model");

exports.addNewPokémon = async (req, res) => {
  try {
    const { title, description, breed, image } = req.body;
    if (!title || !description || !breed) {
      return res.status(400).send({
        success: false,
        message: "Please provide all fields",
      });
    }
    const newPokémon = new PokémonModel({
      title,
      description: description,
      breed: breed,
      image: image,
    });
    await newPokémon.save();
    return res.status(200).send({
      success: true,
      message: "New Pokémon Added successfully",
      newPokémon,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while adding new Pokémon",
      error,
    });
  }
};

exports.getAllPokémon = async (req, res) => {
  try {
    const pokémons = await PokémonModel.find({});
    if (!pokémons) {
      return res.status(200).send({
        success: false,
        message: "No Pokémons found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "All Pokémon list",
      data: pokémons,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in getting all Pokémons",
      error,
    });
  }
};

exports.updatePokémon = async (req, res) => {
  try {
    const { pokemonId } = req.params;
    const { title, description , breed, image } = req.body;
    const updatedPokémon = await PokémonModel.findByIdAndUpdate(
      { _id: pokemonId },
      { title, description,breed, image }
    );
    await updatedPokémon.save();
    return res.status(200).send({
      success: true,
      message: "Pokémon updated successfully.",
      updatedPokémon,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: true,
      messaage: "Error while updating Pokémon",
      error,
    });
  }
};

exports.deletePokémon = async (req, res) => {
  try {
    const { pokemonId } = req.params;
    const pokémon = await PokémonModel.findByIdAndDelete(pokemonId);
    if (pokémon) {
      return res.status(200).send({
        success: true,
        message: "Pokémon deleted successfully.",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while deleting Pokémon",
      error,
    });
  }
};
