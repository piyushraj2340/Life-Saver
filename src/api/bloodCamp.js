// importing express 
const express = require('express');
const {SECRET_KEY} = require('../../config/keys');

// jwt web token is use to 
const jwt = require('jsonwebtoken');

// model for blood bank 
const bloodBank = require('../models/addBloodBank');

// model for the bloodBank user
const user = require('../models/user');

// model for blood camp
const bloodCamp = require('../models/bloodCamp');

// // model for the admin
// const admin = require('../models/admin');

const router = express.Router();

router.route('/add-blood-camp').post(async (req, res) => {
    try {
        // request for the secrete token jwt and verify the authentication 
        const token = req.headers.token;

        // verify the token and get the document id
        const { _id } = jwt.verify(token, SECRET_KEY);

        // find the user detail in the data base 
        const verify = await user.findOne({ _id });

        if (verify._id == _id) {

            const matchBloodBankId = await bloodBank.findOne({$and: [{_id: req.body.bloodBank.bloodBankId},{approvedStatus: true}]});

            if(matchBloodBankId) {

                const newBloodCamp = new bloodCamp(req.body);

                const result = await newBloodCamp.save();

                const info = {
                    status: true,
                    message: "Blood Donation Camp is Active!...",
                    result
                }
                res.status(200).send(info);
                console.log(info);
            } else {
                const info = {
                    status: false,
                    message: "Something Went Wrong!..."
                }
        
                res.status(400).send(info);
        
                console.log("Data not found!...");
            }

            
        } else {
            const info = {
                status: false,
                message: "Authentication Failed!..."
            }

            res.status(401).send(info);
            console.log(info);
        }
    } catch (err) {
        const info = {
            status: false,
            message: "Something Went Wrong!..."
        }

        res.status(400).send(info);

        console.log(err);
    }
})

module.exports = router;