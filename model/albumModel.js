const mongoose = require("mongoose");

const { Schema } = mongoose;

const albumSchema = new Schema({
  name: { type: String },
  artist: { type: String },
  title: { type: String },
  genre: { type: String },
  info: { type: String },
  year: { type: String },
  label: { type: String },
  tracks: { type: Number },
  cover: { type: String },
});

module.exports = mongoose.model("Album", albumSchema);
