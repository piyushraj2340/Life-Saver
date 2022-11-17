// jsonwebtoken to generate secret
const {SECRET_KEY} = require('../../config/keys');

const jwt = require('jsonwebtoken');


// import the model for user 
const userModel = require('../models/user');


const auth = async (req, res, next) => {
    try {
        // request to the browser for the cookies 
        const token = req.cookies.auth;

        // verify the jwt token and return the document id 
        const verifyUser = jwt.verify(token, SECRET_KEY);

        // find the right user from the database 
        const user = await userModel.findOne({ _id: verifyUser._id });

        // verify the user and call the next() method to validate the authentication
        if (user) {
            req.token = token;
            req.user = user;
            next();

        } else {
            next();
            console.log("not Working");
        }
    } catch (err) {
        next();
        console.log(err);
    }

}



module.exports = auth;