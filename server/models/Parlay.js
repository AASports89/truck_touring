const { Schema, model } = require('mongoose');
const Game = require('./Game');
const dateFormat = require('../utils/dateFormat');

const parlaySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: false,
    },
    games: [
        {
            type: Schema.Types.ObjectId,
            ref: "Game"
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

const Parlay = model('Parlay', parlaySchema);

module.exports = Parlay;