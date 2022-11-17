// importing express 
const express = require('express');
const {SECRET_KEY} = require('../../config/keys');

// jwt web token is use to 
const jwt = require('jsonwebtoken');

// model for blood bank 
const bloodBank = require('../models/addBloodBank');

// model for the bloodBank user
const user = require('../models/user');


const router = express.Router();

// adding new data will goes into the admin account 
// new blood bank --->>> admin page ---->> approved or rejected 

// any changes make to approved by the admin 
// any change --->>> admin page ---->>> approved or rejected


router.route('/add-blood-bank')
.post(async (req,res) => {
    try {
        // request for the secrete token jwt and verify the authentication 
        const token = req.headers.token;

        // verify the token and get the document id
        const {_id} = jwt.verify(token,SECRET_KEY);

        // find the user detail in the data base 
        const verify = await user.findOne({_id});

        // checking for the user 
        if(verify._id == _id) {
            const data = req.body;
            data.userId = _id;

            console.log(data);

            const addBank = new bloodBank(data);
            const result = await addBank.save();

            const info = {
                status: true,
                message: "New Blood Bank Added For Review!...",
                result
            }

            res.status(201).send(info);
            console.log(info);
        } else {
            const info = {
                status: false,
                message: "Authentication Failed!...",
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
.patch(async (req, res) => {
    try {
        
    } catch (error) {
        
    }
})
.get(async (req, res) => {
    try {
        
    } catch (error) {
        
    }
})
.delete(async (req, res) => {
    try {
        
    } catch (error) {
        
    }
});

module.exports = router;
