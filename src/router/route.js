// import the express module 
const express = require('express');

// calling the Router functionality to create the router 
const router = express.Router();

// importing the middleware authentication 
const auth = require('../middleware/auth');


// router.get('/',async (req,res) => {
//     res.send("Welcome to the home page");
// });

// router.get('/home', async (req,res) => {
//     res.send("Welcome to the home page");
// });


// router.get('/about', async (req,res) => {
//     res.send('Welcome to the about page');
// });

// router.get('/sign-us', async (req,res) => {
//     res.send("Welcome to the sign-up page");
// });


// router.get('/sign-in',  async (req,res) => {
//     res.send("Welcome to the sign-in page");
// });


// router.get('/log-out', async(req,res) => {
//     res.send("successfully logout!...");
// });


router.get('/profile', auth,  async (req, res) => {
    try {
        if(req.user) {
            const info = {
                status: true,
                message: "Showing profile data",
                result: req.user
            }
    
            res.status(201).send(info);
        } else {
            const info = {
                status: false,
                message: "Authentication failed",
            }
    
            res.status(201).send(info);
        }
    } catch (err) {
        const info = {
            status : false,
            message: "Something Went Wrong!..."
        }
        res.status(404).send(info);
        console.log(err);
    }
});

// router.get('/dashboard', async (req, res) => {
//     res.send("Welcome to the dashboard page");
// });

router.get('/auth', auth , async (req, res) => {
    try {
        if(req.user) {
            const info = {
                status: true,
                message: "Authentication Successfully!..",
            }
    
            res.status(201).send(info);
        } else {
            const info = {
                status: false,
                message: "Authentication failed!...",
            }
    
            res.status(201).send(info);
        }
    } catch (err) {
        const info = {
            status : false,
            message: "Something Went Wrong!..."
        }
        res.status(404).send(info);
        console.log(err);
    }
});

router.get('/logout', (req, res) => {
    try {
        res.clearCookie('auth');
        const info = {
            status: true,
            message: "Logout Successfully!...",
        }

        res.status(200).send(info);
    }
    catch (error) {
        const info = {
            status : false,
            message: "Something Went Wrong!..."
        }
        res.status(404).send(info);
        console.log(err);
    }
});

module.exports = router;