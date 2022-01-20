const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
});

const Album = mongoose.model("Album", albumSchema);

module.exports = { Album };
