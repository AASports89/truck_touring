const { Schema, model } = require('mongoose');
const Truck = require('./Truck');
const dateFormat = require('../utils/dateFormat');

const reservationSchema = new Schema({
    date: {
        type: Date,
        required: true,
        unique: false,
    },
    trucks: [
        {
            type: Schema.Types.ObjectId,
            ref: "Truck"
        },
    ],
    win_choice: [
        {
            type: Number,
            required: true,
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
});

const Reservation = model('Reservation', reservationSchema);

module.exports = Reservation;