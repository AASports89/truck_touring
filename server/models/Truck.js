const { Schema, model } = require("mongoose");

const truckSchema = new Schema({
    image: {
      type: String,
      required: true,
    },
    truckModel: {
        type: String,
        required: true,
    },
    rentalPrice: {
        type: Number,
        required: true,
    },
});

const Truck = model("Truck", truckSchema);

module.exports = Truck;