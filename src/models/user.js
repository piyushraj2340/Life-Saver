// mongoose is used to connect through the mongodb database
const mongoose = require('mongoose');

const {SECRET_KEY} = require('../../config/keys');

// bcryptjs is used to hash the password [encrypt]
const bcryptjs = require('bcryptjs');

// validator is use to add validation so that we can accept the right data and then store into the database
const validator = require('validator');

// jwt web token is use to 
const jwt = require('jsonwebtoken');


// creating the schema for user 
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
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
    email: {
        type: String,
        required: true,
        unique: [true, "This email is already in used."],
        validate(email) {
            if(!validator.isEmail(email)) {
                throw new Error("Invalid Email");
            }
        }
    },
    originalPassword: {
        type: String,
        required: true,
    },
    confirmPassword: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
    },
    gender: {
        type: String,
    },
    state: {
        type: String,
    },
    district: {
        type: String,
    },
    tokens:[{
        token:{
            type: String,
            required: true
        }
    }]
});

//generating the token and save to data base
userSchema.methods.generateAuthToken = async function() {
    try {
        const token = jwt.sign({_id: this._id.toString()},SECRET_KEY);
        this.tokens = this.tokens.concat({token});
        await this.save();
        return token;
    } catch (err) {
        console.log(err);
    }
}

// hashing the passwords and save the hash passwords
userSchema.pre("save",async function (next) {
    if(this.isModified("originalPassword")) {
        this.originalPassword = await bcryptjs.hash(this.originalPassword, 10);
        this.confirmPassword = this.originalPassword;
    }
    next();
})

const user = new mongoose.model('user',userSchema);

module.exports = user;