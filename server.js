const express = require('express');
const mongoose = require('mongoose');

const session = require('express-session');
const User = require('./models/Customer'); 

const app = express();

// Serves static files from the 'public' directory
app.use(express.static('public'));

// create connection to the db
const port = 9000;
const url= "mongodb://127.0.0.1:27017";

// Connect to MongoDB
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
const con= mongoose.connection;

// Middleware to parse JSON request bodies
app.use(express.json());

// Event listeners for MongoDB connection
	try{
		con.on('open', () => {
		console.log('connected');
		})
	}catch(error){
		console.log("ERROR:"+error);
	}

// Define routes
const storerouter= require("./routes/authRoutes");
app.use('/', storerouter);

// Start the server
app.listen(port, () => {
	console.log('server started');
	})
