const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const clientRoutes = require('./routes/clientRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

const PORT = 3000;

app.use(express.json());

app.get('/',(req,res) =>{
    res.send('Home Page');
});

app.use('/client',clientRoutes);

app.use('/admin',adminRoutes);

mongoose.connect(process.env.DB_LINK).then(() => console.log("MongoDB connected successfully"))
	.catch((err) => console.log(`MongoDB connection failed: ${err}`));
    
app.listen(PORT);



