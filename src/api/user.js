// importing express 
const express = require('express');

// bcryptjs for hashing the password 
const bcryptjs = require('bcryptjs');

// importing the user model
const user = require('../models/user');

// import the router functionality to create the router 
const router = express.Router();


router.route('/sign-up')
    .post(async (req, res) => {
        try {
            // creating the new user document 
            const newUser = new user(req.body);

            // generating the secrete jwt token for further authentication
            await newUser.generateAuthToken();

            // saving the new user document into the database
            const result = await newUser.save();

            const info = {
                status: true,
                message: "User Registration Successful!...",
                result
            }

            res.status(201).send(info);

        } catch (err) {
            const info = {
                status : false,
                message: "Something Went Wrong!..."
            }
            res.status(404).send(info);
            console.log(err);
        }
    });

router.route('/sign-in').post(async (req, res) => {
    try {
        // request the data from body and initialize into the variable 
        const {email,password} = req.body;

        // search for the result from the database using email 
        const result = await user.findOne({email});

        // compare the hash password bcryptjs.compare(textPass,hashPass) method
        const isPassMatch = await bcryptjs.compare(password, result.originalPassword);

        // if we get the user 
        if (isPassMatch) {

            // generate the jwt token 
            await result.generateAuthToken();

            const info = {
                status : true,
                message: "You Have Login Successful!...",
                result
            }

            res.status(201).send(info);
            console.log(info);
        }
        else {
            const info = {
                status: false,
                message: "Login Input Incorrect!..."
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


// router.route('/user').get(async (req, res) => {
//     try {
//         const result = await user.find();
//         res.status(200).send(result);
//     } catch (err) {
//         res.status(400).send(`${err} : can't fetch the data`)
//     }
// });

// router.route('/email/:email')
//     .get(async (req, res) => {
//         const email = req.params.email;
//         console.log(email);
//         try {
//             const result = await user.findOne({ email });
//             res.status(200).send({ email: result.email });
//         } catch (error) {
//             res.status(400).send({ email: "not found" });
//         }
//     });

// router.route('/phone/:phone')
//     .get(async (req, res) => {
//         const phone = req.params.phone;
//         try {
//             const result = await user.findOne({ phone });
//             res.status(200).send({ phone: result.phone });
//         } catch (error) {
//             res.status(400).send({ phone: "not found" });
//         }
//     });



module.exports = router;