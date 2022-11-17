// importing express 
const express = require('express');

const {SECRET_KEY} = require('../../config/keys');

// bcryptjs for hashing the password 
const bcryptjs = require('bcryptjs');

// jwt web token is use to 
const jwt = require('jsonwebtoken');

// model for blood bank 
const bloodBank = require('../models/addBloodBank');

// model for the bloodBank user
const user = require('../models/user');

// model for the admin
const admin = require('../models/admin');

const router = express.Router();


// user right to the admin 
router.route('/get-user').post(async (req, res) => {
    try {
        // request for the secrete token jwt and verify the authentication 
        const token = req.headers.token;

        // verify the token and get the document id
        const { _id } = jwt.verify(token,SECRET_KEY);

        // find the user detail in the data base 
        const verify = await admin.findOne({ _id });

        if (verify._id == _id) {
            const result = await user.find();

            const info = {
                status: true,
                message: "Showing All User Detail!...",
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


// blood bank right to admin 
router.route('/get-blood-bank').post(async (req, res) => {
    try {
        // request for the secrete token jwt and verify the authentication 
        const token = req.headers.token;

        // verify the token and get the document id
        const { _id } = jwt.verify(token, SECRET_KEY);

        // find the user detail in the data base 
        const verify = await admin.findOne({ _id });

        if (verify._id == _id) {
            const result = await bloodBank.find({ approvedStatus: true });

            const info = {
                status: true,
                message: "Showing All Blood Bank",
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

// blood bank 
router.route('/get-pending-application').post(async (req, res) => {
    try {
        // request for the secrete token jwt and verify the authentication 
        const token = req.headers.token;

        // verify the token and get the document id
        const { _id } = jwt.verify(token, SECRET_KEY);

        // find the user detail in the data base 
        const verify = await admin.findOne({ _id });
        if (verify._id == _id) {
            const result = await bloodBank.find({ approvedStatus: false });

            const info = {
                status: true,
                message: "Showing Pending Application Of Blood Bank",
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


// approving the pending document by admin 
router.route('/approve-pending-application/:id').patch(async (req, res) => {
    try {
        // request for the secrete token jwt and verify the authentication 
        const token = req.headers.token;

        const {id} = req.params;


        // verify the token and get the document id
        const { _id } = jwt.verify(token, SECRET_KEY);

        // find the user detail in the data base 
        const verify = await admin.findOne({ _id });
        if (verify._id == _id) {


            const result = await bloodBank.findByIdAndUpdate({_id: id},{
                approvedStatus: true
            },{
                new : true , // using this option we can get the updated data in result 
                useFindAndModify : false
            });


            if(result) {
                const info = {
                    status: true,
                    message: "Application Approved Successfully!...",
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
                console.log(err);
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
});

router.route('/reject-pending-application/:id').delete(async (req, res) => {
    try {
        // request for the secrete token jwt and verify the authentication 
        const token = req.headers.token;

        const {id} = req.params;


        // verify the token and get the document id
        const { _id } = jwt.verify(token, SECRET_KEY);

        // find the user detail in the data base 
        const verify = await admin.findOne({ _id });
        if (verify._id == _id) {


            const result = await bloodBank.findByIdAndDelete({_id: id});


            if(result) {
                const info = {
                    status: true,
                    message: "Application Rejected Successfully!...",
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
                console.log(err);
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
});


// admin panel 
router.route('/login').post(async (req, res) => {
    try {
        // request the data from body and initialize into the variable 
        const { email, password } = req.body;

        // search for the result from the database using email 
        const result = await admin.findOne({ email });



        // compare the hash password bcryptjs.compare(textPass,hashPass) method
        const isPassMatch = await bcryptjs.compare(password, result.password);

        console.log(result.password);

        // if we get the user 
        if (isPassMatch) {

            // generate the jwt token 
            await result.generateAuthToken();

            const info = {
                status: true,
                message: "You Have Login Successful!...",
                result
            }

            res.status(200).send(info);
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
});

router.route('/activate').post(async (req, res) => {
    try {
        console.log(await admin.countDocuments());
        if (await admin.countDocuments() == 0) {
            const activeAdmin = new admin();
            await activeAdmin.generateAuthToken();
            await activeAdmin.hashAdminPassword();
            const result = await activeAdmin.save();

            const info = {
                status: true,
                message: "Admin Account Is Active!...",
                result
            }

            res.status(201).send(info);
            console.log(info);
        } else {
            const info = {
                status: false,
                message: "Admin Account Already Exit!...",
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