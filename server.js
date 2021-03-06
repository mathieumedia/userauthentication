const express = require('express');
const colors = require('colors')
const app = express();

const { connect } = require("mongoose");
const connectDB = require("./config/db");

// Connect Database
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));


app.get('/', (req, res) => ({ msg: 'Welcome to  API' }));

// User Routes
app.use('/api/users', require('./routes/users_auth_routes/userController'))

// Auth Routes
app.use('/api/auth', require('./routes/users_auth_routes/authController'))

// Employee Routes
app.use('/api/employees', require('./routes/employeeRoutes/employeeController'))


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}`.cyan.underline.bold))