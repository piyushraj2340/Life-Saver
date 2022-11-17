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

//model for bloods 
const blood = require('../models/blood');



// // model for the admin
// const admin = require('../models/admin');

const router = express.Router();

router.route('/blood-bank').get(async (req, res) => {
    try {
        // // request for the secrete token jwt and verify the authentication 
        // const token = req.headers.token;

        // // verify the token and get the document id
        // const { _id } = jwt.verify(token, SECRET_KEY);

        // // find the user detail in the data base 
        // const verifyUser = await user.findOne({ _id });

        const result = await bloodBank.find({ approvedStatus: true });

        const info = {
            status: true,
            message: "Result For Blood Bank!...",
            result
        }
        res.status(200).send(info);
        console.log(info);

        // if (verifyUser) {

        // } else {
        //     const info = {
        //         status: false,
        //         message: "Authentication Failed!..."
        //     }

        //     res.status(401).send(info);
        //     console.log(info);
        // }
    } catch (err) {
        const info = {
            status: false,
            message: "Something Went Wrong!..."
        }

        res.status(400).send(info);

        console.log(err);
    }
})


router.route('/blood-bank/:id').get(async (req, res) => {
    try {
        // // request for the secrete token jwt and verify the authentication 
        // const token = req.headers.token;

        // // verify the token and get the document id
        // const { _id } = jwt.verify(token, SECRET_KEY);

        // // find the user detail in the data base 
        // const verifyUser = await user.findOne({ _id });



        const { id } = req.params;

        console.log(id);

        const result = await bloodBank.findOne({ $and: [{ approvedStatus: true }, { _id: id }] });

        const info = {
            status: true,
            message: "Result For Blood Bank!...",
            result
        }
        res.status(200).send(info);
        console.log(info);

        // if (verifyUser) {

        // } else {
        //     const info = {
        //         status: false,
        //         message: "Authentication Failed!..."
        //     }

        //     res.status(401).send(info);
        //     console.log(info);
        // }
    } catch (err) {
        const info = {
            status: false,
            message: "Something Went Wrong!..."
        }

        res.status(400).send(info);

        console.log(err);
    }
})

router.route('/blood-camp').get(async (req, res) => {
    try {
        // // request for the secrete token jwt and verify the authentication 
        // const token = req.headers.token;

        // // verify the token and get the document id
        // const { _id } = jwt.verify(token, SECRET_KEY);

        // // find the user detail in the data base 
        // const verifyUser = await user.findOne({ _id });


        const result = await bloodCamp.find(req.body);

        const info = {
            status: true,
            message: "Result For Blood Camp!...",
            result
        }
        res.status(200).send(info);
        console.log(info);

        // if (verifyUser) {
        //     const result = await bloodCamp.find(req.body);

        //     const info = {
        //         status: true,
        //         message: "Result For Blood Camp!...",
        //         result
        //     }
        //     res.status(200).send(info);
        //     console.log(info);
        // } else {
        //     const info = {
        //         status: false,
        //         message: "Authentication Failed!..."
        //     }

        //     res.status(401).send(info);
        //     console.log(info);
        // }
    } catch (err) {
        const info = {
            status: false,
            message: "Something Went Wrong!..."
        }

        res.status(400).send(info);

        console.log(err);
    }
});


router.route('/bloods').get(async (req, res) => {
    try {
        // // request for the secrete token jwt and verify the authentication 
        // const token = req.headers.token;

        // // verify the token and get the document id
        // const { _id } = jwt.verify(token, SECRET_KEY);

        // // find the user detail in the data base 
        // const verifyUser = await user.findOne({ _id });

        const result = await blood.find();

        const info = {
            status: true,
            message: "Result For Blood!...",
            result
        }
        res.status(200).send(info);
        console.log(info);

        // if (verifyUser) {

        // } else {
        //     const info = {
        //         status: false,
        //         message: "Authentication Failed!..."
        //     }

        //     res.status(401).send(info);
        //     console.log(info);
        // }
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