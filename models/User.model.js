const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const albumSchema = new Schema({
	name: String,
  //name: { type: String } en caso que queramos hacer validaciones y requerimientos extra
});

const Album = mongoose.model("Album", albumSchema);

module.exports = Album;
