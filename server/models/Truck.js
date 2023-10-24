const { Schema, model } = require("mongoose");

const truckSchema = new Schema({
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