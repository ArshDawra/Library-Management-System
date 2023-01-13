const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const clientRoutes = require('./routes/clientRoutes');
const adminRoutes = require('./routes/adminRoutes');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const morgan = require('morgan');

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(
    session({
        key:'user_sid',
        secret: process.env.SECRET,
        resave:false,
        saveUninitialized:false,
        cookie:{
            expires:100000
        }
    })
)

app.get('/',(req,res) =>{
    res.send('Home Page');
});

app.use('/client',clientRoutes);
app.use('/admin',adminRoutes);

mongoose.connect(process.env.DB_LINK).then(() => console.log("MongoDB connected successfully"))
	.catch((err) => console.log(`MongoDB connection failed: ${err}`));
    
app.listen(PORT);



