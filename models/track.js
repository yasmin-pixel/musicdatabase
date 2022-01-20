const mongoose = require("mongoose");

const trackSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
});

const Track = mongoose.model("Track", trackSchema);

module.exports = { Track };
