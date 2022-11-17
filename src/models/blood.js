// mongoose is used to connect through the mongodb database
const mongoose = require('mongoose');


const bloodSchema = new mongoose.Schema({
    lastUpdate: {
        type: Date,
        required: true
    },
    bloodBankId: {
        type: String,
        required: true,
        unique: [true, "Blood Already Added into The Blood Bank"],
    },
    a_positive: {
        type: Number,
        required: true,
        default: 0,
    },
    a_negative: {
        type: Number,
        required: true,
        default: 0
    },
    b_positive: {
        type: Number,
        required: true,
        default: 0
    },
    b_negative: {
        type: Number,
        required: true,
        default: 0
    },
    o_positive: {
        type: Number,
        required: true,
        default: 0
    },
    o_negative: {
        type: Number,
        required: true,
        default: 0
    },
    ab_positive: {
        type: Number,
        required: true,
        default: 0
    },
    ab_negative: {
        type: Number,
        required: true,
        default: 0
    }
});

const blood = new mongoose.model('blood', bloodSchema);

module.exports = blood;