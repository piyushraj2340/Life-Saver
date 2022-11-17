// hiding the private information from public using dotenv
require('dotenv').config(); 

// express is use to create the nodeJS server 
const express = require('express');  

// importing the database file and make a connection through the database 
require("./db/connection");

// cookieParser help us to add the cookie to the web browser
const cookieParser = require('cookie-parser');

// path module help us to work with absolute and relative path using some methods.
const path = require('path');


const port = process.env.PORT || 8000;


// authentication for the user  
// const auth = require('./middleware/auth');

// calling the express method to get all the functionality 
const app = express();

// static web page path right not not implemented 
// const staticPath = path.join(__dirname, "../public");
// app.use(express.static(staticPath));

// using the middleware json , cookieParser and urlencoded
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));

// require the route path 
const admin = require('./api/admin');
const userWeb = require('./router/user');
const userAPI = require('./api/user');
const bloodBank = require('./api/bloodBank');
const bloodCamp = require('./api/bloodCamp');
const blood = require('./api/blood');
const search = require('./api/search');
const router = require('./router/route');


// defining the first level route path 
app.use('/admin',admin);
app.use('/web/user',userWeb); 
app.use('/api/user',userAPI); 
app.use('/blood-bank',bloodBank);
app.use('/blood-bank',bloodCamp);
app.use('/blood-bank',blood);
app.use('/search',search);
app.use('',router);


// if no such path found the display 404 not found error 
// app.get("*", (req,res) => {
//     res.status(404).send("404 error");
// });


if(process.env.NODE_ENV == "production") {
    const path = require('path');
    app.use(express.static('public/build'));
    app.get('/',(req,res) => {
        res.sendFile(path.resolve(__dirname,'public','index.html'))
    })
}



app.listen(port,() => {
    console.log(`Listing to port: ${port}`);
});



// created server
// schema done 

// to be done 

// certificate 
// donor and voluntary portal 
// admin panel 
// 

