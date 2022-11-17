// importing express 
const express = require('express');

const {SECRET_KEY} = require('../../config/keys');

// jwt web token is use to 
const jwt = require('jsonwebtoken');

// model for blood bank 
const bloodBank = require('../models/addBloodBank');

// model for the bloodBank user
const user = require('../models/user');

const blood = require('../models/blood');



// // model for the admin
// const admin = require('../models/admin');

const router = express.Router();

router.route('/add-bloods').post(async (req, res) => {
    try {
        // request for the secrete token jwt and verify the authentication 
        const token = req.headers.token;

        // verify the token and get the document id
        const { _id } = jwt.verify(token, SECRET_KEY);

        // find the user detail in the data base 
        const verifyUser = await user.findOne({ _id });
        const verifyBloodBank = await bloodBank.findOne({ userId: _id });

        if (verifyUser && verifyBloodBank && verifyBloodBank._id == req.body.bloodBankId) {
            const newBlood = new blood(req.body);
            const result = await newBlood.save();

            const info = {
                status: true,
                message: "Blood Detail Added Into The Database",
                result
            }
            res.status(200).send(info);
            console.log(info);
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
});

router.route('/update-bloods').post(async (req, res) => {
    try {
        // request for the secrete token jwt and verify the authentication 
        const token = req.headers.token;

        // verify the token and get the document id
        const { _id } = jwt.verify(token, SECRET_KEY);

        // find the user detail in the data base 
        const verifyUser = await user.findOne({ _id });
        const verifyBloodBank = await bloodBank.findOne({ userId: _id });

        if (verifyUser && verifyBloodBank) {
            const result = await blood.updateOne({bloodBankId: verifyBloodBank._id},{
                $set: req.body
            },{
                new : true , // using this option we can get the updated data in result 
                useFindAndModify : false
            });

            const info = {
                status: true,
                message: "Blood Detail Added Into The Database",
                result
            }
            res.status(200).send(info);
            console.log(info);
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
});

module.exports = router;