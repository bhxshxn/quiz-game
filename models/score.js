const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
    diff: {
        type: String,
        required: true,
    },
    score: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
});

module.exports = new mongoose.model("Score ", scoreSchema);