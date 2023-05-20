//define environment variables
require('dotenv').config();
//grab app dependencies
const express = require('express'),
    app = new express(),
    expressLayout = require('express-ejs-layouts'),
    adminRoutes = require('./routes/admin.js'),
    loginRoute = require('./routes/login.js'),
    mongoose = require('mongoose'),
    cookieParser = require('cookie-parser'),
    authentication = require('./app/Middleware/authentication.js'),
    port = process.env.PORT || 3000;

//define view engine
app.set('view engine', 'ejs');
app.use(expressLayout);
//cookieparser
app.use(cookieParser());
//static assets middleware
app.use(express.static(__dirname + '/public'));
//database connection
(async function () {
    try {
        mongoose.connect(process.env.DB_URL)
        mongoose.set('strictQuery', true)
        const db = mongoose.connection
        if (db) {
            console.log('Connection Success');
        }
    } catch (err) {
        console.log(err.message)
    }
}
)();
//set express url.encoded middleware
app.use(express.urlencoded({ extended: true }));
//define app routes
app.use('/admin', authentication.authentication, adminRoutes);
app.use('/login', loginRoute);
//server running
app.listen(port, () => {
    console.log(`Server Running on :${port}`);
})