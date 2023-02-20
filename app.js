const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const auth = require('./Api/auth/router');
const profile =require('./Api/profile/router')

 
const app = express();
 
app.use(express.json());
 
app.use(bodyParser.json());
 
app.use(bodyParser.urlencoded({
    extended: true
}));
 

app.use(cors());
app.use('/api', auth);
app.use('/api/profile', profile);



 
// Handling Errors
app.use((err, req, res, next) => {
    // console.log(err);
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
        message: err.message,
    });
});
 
app.listen(3000,"192.168.3.6",() => console.log('Server is running on port- http://127.0.0.1:3000/api/'));