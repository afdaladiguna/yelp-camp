// set up require express, mongoose, and any needed
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);      //strictQuery warn on mongo
const cities = require('./cities');
const { places, descriptors }= require('./seedHelpers');
const Campground = require('../models/campground');
// end

mongoose.connect('mongodb://localhost:27017/yelp-camp');      

// check if there is an error on database when connecting
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));   // check if there is an error
db.once("open", () => {
    console.log("Database connected");                              // else if successed print this
});
//end

const sample = (array) => array[Math.floor(Math.random() * array.length)];




const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i=0; i<50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            price: 10000,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam adipisci minima recusandae dolore, nihil nemo dolorem consequuntur natus repellat inventore error dolores culpa reiciendis dicta iure deserunt alias dignissimos voluptate? Corporis optio adipisci fugit deserunt similique ad! Ipsam explicabo sed sint sequi perferendis, qui praesentium assumenda, magni deserunt quis ipsum eaque. Nihil atque animi voluptatem molestiae vel sit blanditiis? Ipsa.'
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close;
});