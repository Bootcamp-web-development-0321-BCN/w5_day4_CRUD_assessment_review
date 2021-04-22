const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const purchaseSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId, //Este tipo de dato deberá ser una id de mongoDB
		ref: "User" //Este campo relacionará la id que guardamos con la colecccioń en la que buscará al hacer el populate
	},
	album: {
		type: Schema.Types.ObjectId,
		ref: "Album"
	}
});

const Purchase = mongoose.model("Purchase", purchaseSchema);

module.exports = Purchase;
