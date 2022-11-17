// mongoose is used to connect through the mongodb database
const mongoose = require('mongoose');

// validator is use to add validation so that we can accept the right data and then store into the database
const validator = require('validator');




// creating the schema for blood camp
const bloodCampSchema = new mongoose.Schema({
    // user 
    userId: {
        type: String,
        required: true
    },

    campName: {
        type: String,
        required: true,
    },
    bloodBankId: {
        type: String,
        require: true
    },
    organizerName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        validate(email) {
            if (!validator.isEmail(email)) {
                throw new Error("Invalid Email!...");
            }
        }
    },
    phone: {
        type: Number,
        required: true,
        unique: [true, "This phone is already in used."],
        validate(value) {
            if (value.toString().length != 10) {
                throw new Error("Invalid Phone!...");
            }
        }
    },
    date: {
        type: Date,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },

    // address of blood bank 
    state: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    pinCode: {
        type: Number,
        required: true,
        validate(value) {
            if (value.toString().length != 6) {
                throw new Error("Invalid PinCode!...");
            }
        }

    },
    location: {
        lat: {
            type: Number,
            required: true
        },
        lng: {
            type: Number,
            required: true
        },
    },
});


const bloodCamp = new mongoose.model('bloodCamp', bloodCampSchema);

module.exports = bloodCamp;