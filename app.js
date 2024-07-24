const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const blogRoutes = require('./routes/blogroutes')

// Express app
const app = express();

// Corrected connection string

const dbURI = 'mongodb+srv://kousay:Kn24215679@data.tokx6jg.mongodb.net/Data?retryWrites=true&w=majority&appName=Data';

// Connect to MongoDB
mongoose.connect(dbURI)
  .then((result) => app.listen(3000))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Register view engine
app.set('view engine', 'ejs');

// Middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
//app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});
// Home route
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

// About route
app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// Redirects
app.get('/about-us', (req, res) => {
  res.redirect('/about');
});

// Blog routes
app.use('/blogs', blogRoutes);
// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
