const mongoose = require("mongoose");

const quesSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    answers: {
        type: Array,
        required: true,
    },
    right: {
        type: String,
        required: true,
    }
});

module.exports = new mongoose.model("HardQuestion", quesSchema);