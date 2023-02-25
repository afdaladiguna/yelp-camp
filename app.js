// set up require express, mongoose, and any needed
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);      //strictQuery warn on mongo
const methodOverride = require('method-override');
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
app.set('views', path.join(__dirname, 'views'));    //set path for 'views' folder

app.use(express.urlencoded({ extended: true}));     //to parse req.body
app.use(methodOverride('_method'));     //allows form to do any methdo eg. PUT PATCH DELETE
// end

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/campgrounds', async(req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });

})

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new')
})

app.post('/campgrounds', async(req, res) => {
    const campground = new Campground(req.body);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
    // res.send(req.body);
})

app.get('/campgrounds/:id', async(req, res) => {        //ORDERS MATTERS
    const { id } = req.params;
    const campground = await Campground.findById(id);
    res.render('campgrounds/show', { campground });
})

app.get('/campgrounds/:id/edit', async(req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    res.render('campgrounds/edit', { campground });
})

app.put('/campgrounds/:id/', async(req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body })
    res.redirect(`/campgrounds/${campground._id}`);
})

app.delete('/campgrounds/:id/', async(req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
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