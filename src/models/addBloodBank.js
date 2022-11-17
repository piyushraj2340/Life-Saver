// mongoose is used to connect through the mongodb database
const mongoose = require('mongoose');

// validator is use to add validation so that we can accept the right data and then store into the database
const validator = require('validator');



// creating the schema for blood bank
const bloodBankSchema = new mongoose.Schema({
    // blood bank detail

    // user document _id
    userId: {
        type: String,
        required: true
    },
    bloodBankName: {
        type: String,
        unique: [true, "Blood Bank Name Already Register!..."],
        required: true,
    },
    hospitalName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ["Government", "Private", "Charitable"],
        required: true
    },
    ownerName: {
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
            if(value.toString().length != 10) {
                throw new Error("Invalid Phone!...");
            }
        }
    },
    licenseNo: { // here error
        type: Number,
        required: true,
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
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
            if(value.toString().length != 6) {
                throw new Error("Invalid PinCode!...");
            } 
        }
        
    },
    location: {
        lat: {
            type: Number,
           
        },
        lng: {
            type: Number,
        },
    },

    // about blood bank
    approvedStatus: {
        type: Boolean,
        required: true,
        default: false
    },
    website: {
        type: String,
    },
    noOfBeds: {
        type: Number,
    },
    description: {
        type: String,
    },
    noOfDonation: {
        type: Number
    }
});

// bloodBankSchema.methods.updateApprovedStatus = async function() {
//     try {
//         console.log("working");
//         this.approvedStatus = true;
//         await this.save();
//         return this.approvedStatus;
//     } catch (err) {
//         console.log(err);
//     }
// }

// bloodBank.pre('update', async function(next) {
//     if(this.approvedStatus) {
//         this.approvedStatus = false;
//     }
//     next();
// })


const bloodBank = new mongoose.model('bloodBank', bloodBankSchema);

module.exports = bloodBank;

// 