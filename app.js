// set up require express, mongoose, and any needed
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);      //strictQuery warn on mongo
const Campground = require('./models/campground');
// end

mongoose.connect('mongodb://localhost:27017/yelp-camp');      

// check if there is an error on database when connecting
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));   // check if there is an error
db.once("open", () => {
    console.log("Database connected");                              // else if successed print this
});
//end

// express set up
const app = express();

app.set('view engine', 'ejs');      //set view engine to ejs
app.set('views', path.join(__dirname, 'views'));        //set path for 'views' folder
// end

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/makecampground', async (req, res) => {
    const camp = new Campground({
        title: 'Maros',
        price: 'FREE'
    });
    await camp.save();
    res.send(camp);
})


app.listen(3000, () => {
    console.log('Listening to 3000')
})