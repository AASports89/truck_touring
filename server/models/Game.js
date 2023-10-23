const { Schema, model } = require("mongoose");

const gameSchema = new Schema({
    homeTeam: {
        type: String,
        required: true,
        unique: true,
    },
    awayTeam: {
        type: String,
        required: true,
        unique: true,
    },
    homeOdd: {
        type: Number,
        required: true,
    },
    awayOdd: {
        type: Number,
        required: true,
    },
});

const Game = model("Game", gameSchema);

module.exports = Game;