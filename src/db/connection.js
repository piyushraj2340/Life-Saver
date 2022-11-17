const mongoose = require('mongoose');
const {DB_PASS,DB_USER} = require('../../config/keys');

const DB = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.zps3ogs.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(DB,  {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connection to database is successful");
}).catch((err) => {
    console.log(`${err} : connection failed!....`);
});