// mongoose is used to connect through the mongodb database
const mongoose = require('mongoose');
const {SECRET_KEY} = require('../../config/keys');

// bcryptjs is used to hash the password [encrypt]
const bcryptjs = require('bcryptjs');

// jwt web token is use to 
const jwt = require('jsonwebtoken');

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "admin"
    },
    email: {
        type: String,
        unique: [true, "This email is already in used."],
        default: "support@lifesaver.com"
    },
    password: {
        type: String,
        default: SECRET_KEY
    },
    token: {
        type: String,
    }
});

//generating the token and save to data base
adminSchema.methods.generateAuthToken = async function() {
    try {
        this.token = jwt.sign({_id: this._id.toString()},SECRET_KEY);

        await this.save();
        return this.token;
    } catch (err) {
        console.log(err);
    }
}

//generating the token and save to data base
adminSchema.methods.hashAdminPassword = async function() {
    try {
        this.password = await bcryptjs.hash(this.password, 10);

        await this.save();
        return this.token;
    } catch (err) {
        console.log(err);
    }
}

// // hashing the passwords and save the hash passwords
// adminSchema.pre("init",async function () {
//     // if(this.isModified("password")) {
//         
//     // }
// })




const admin = new mongoose.model('admin', adminSchema);


module.exports = admin;